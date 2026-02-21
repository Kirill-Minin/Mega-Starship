import express from 'express'
import bodyParser from 'body-parser'
import { v4 as uuidv4 } from 'uuid'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = express()
app.use(bodyParser.json())

app.post('/health', async (_req, res) => res.json({ ok: true }))

app.post('/bookings', async (req, res) => {
  try {
    const { tenantId, customerId, tourId, seats, price, bookingDate } = req.body
    const bookingId = uuidv4()

    // transactional write: create booking + outbox
    await prisma.$transaction(async (tx) => {
      await tx.booking.create({
        data: {
          id: bookingId,
          tenantId,
          customerId,
          tourId,
          status: 'CONFIRMED',
          seats,
          price,
          bookingDate: new Date(bookingDate)
        }
      })

      await tx.outbox.create({
        data: {
          eventType: 'BookingCreated',
          payload: JSON.stringify({
            eventType: 'BookingCreated',
            eventId: uuidv4(),
            schemaVersion: '1.0',
            occurredAt: new Date().toISOString(),
            tenantId,
            booking: { bookingId, customerId, tourId, status: 'CONFIRMED', seats, price, bookingDate }
          })
        }
      })
    })

    res.status(201).json({ bookingId })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'failed to create booking' })
  }
})

const port = process.env.PORT || 4001
app.listen(port, () => console.log(`bookings-service listening on ${port}`))
