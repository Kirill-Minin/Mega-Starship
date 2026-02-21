import { PrismaClient } from '@prisma/client'
import { Kafka } from 'kafkajs'

const prisma = new PrismaClient()

const kafka = new Kafka({
  brokers: (process.env.KAFKA_BROKERS || 'localhost:9092').split(','),
  clientId: 'bookings-outbox-publisher'
})

const producer = kafka.producer()

export async function publishOutboxLoop() {
  await producer.connect()
  console.log('Outbox publisher connected to Kafka')

  while (true) {
    const entries = await prisma.outbox.findMany({ where: { processed: false }, take: 10 })
    if (entries.length === 0) {
      await new Promise((r) => setTimeout(r, 2000))
      continue
    }

    for (const e of entries) {
      try {
        const payload = JSON.parse(e.payload)
        const topic = `bookings.${payload.eventType}`
        await producer.send({ topic, messages: [{ key: e.id, value: e.payload }] })
        await prisma.outbox.update({ where: { id: e.id }, data: { processed: true } })
        console.log(`published outbox ${e.id} -> ${topic}`)
      } catch (err) {
        console.error('publish error', err)
      }
    }
  }
}
