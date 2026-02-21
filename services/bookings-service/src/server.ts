import { publishOutboxLoop } from './outboxPublisher'

// Start background publishers
publishOutboxLoop().catch((err) => console.error('outbox publisher failed', err))

// NOTE: HTTP server is started from src/index.ts which also initializes Prisma
