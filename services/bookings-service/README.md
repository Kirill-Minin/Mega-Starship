# Bookings Service (scaffold)

Minimal bookings microservice scaffold demonstrating the transactional outbox pattern and Kafka publishing.

Quick start (dev):

```bash
cd services/bookings-service
npm install
npm run dev
```

This scaffold includes:
- Prisma schema for `Booking` and `Outbox` tables
- simple Express HTTP endpoint to create bookings
- an outbox publisher placeholder (`src/outboxPublisher.ts`) that reads outbox entries and emits to Kafka
