# Program Engineering Blueprint — Iowa Trail Rides ERP

Welcome to the Program Engineering Blueprint for the Iowa Trail Rides (All Events Decisions) ERP system. This folder contains the strategic architecture, roadmap, and planning documents for building a multi-tenant enterprise resource planning platform.

## 📋 Contents

### Architecture & Design
- **[C4-DIAGRAMS.md](./C4-DIAGRAMS.md)** — C4 Model diagrams (Context, Container, Component levels)
  - System context and external integrations
  - Microservices architecture with event-driven data flow
  - Deep-dive into Bookings Service with transactional outbox pattern

### Related Documentation
- **[../architecture/](../architecture/)** — Detailed mermaid diagrams
  - `iowa-crm-architecture.mmd` — High-level 7-pillar architecture
  - `c4-context.mmd` — System boundaries
  - `c4-container.mmd` — Services, databases, infrastructure
  - `c4-component-bookings.mmd` — Bookings microservice internals

- **[../contracts/](../contracts/)** — Event contracts (JSON Schema)
  - Event schemas for BookingCreated, CustomerCreated, TourAvailabilityChanged, etc.
  - Ensures contract compliance across services

- **[../DEPLOY_UI.md](../DEPLOY_UI.md)** — UI deployment on GitHub Pages + Entra ID configuration

## 🎯 System Overview

**All Events Decisions (AED)** is a multi-tenant ERP designed for tour/booking operations:
- Multi-company support (each company = separate tenant)
- Event-driven microservices architecture
- Transactional outbox pattern for reliable event publishing
- Azure-native infrastructure (PostgreSQL, Event Hubs, AKS, Key Vault)
- Microsoft Entra ID for authentication

### 7 Core Pillars

1. **Client Interfaces** — Web UI, Mobile, Webhooks
2. **API Gateway & Security** — OAuth2/OIDC via Entra ID, rate-limiting, WAF
3. **Microservices** — Contacts, Bookings, Tours, Operators, Marketing, Reports, AI
4. **Event Bus** — Kafka/Event Hubs for async communication
5. **Unified Data Storage** — PostgreSQL (per-service), Redis, Blob Storage, ClickHouse
6. **Cloud Infrastructure** — AKS, Key Vault, Application Gateway, monitoring
7. **CI/CD** — GitHub Actions, ACR, GitOps-ready

## 📈 Roadmap Phases

*To be detailed in `roadmap.md` (forthcoming)*

- **MVP** — Bookings + Tours + simple reporting (4-6 weeks)
- **v1.0** — Full CRM (Contacts, Marketing, Finance) + multi-tenancy (3 months)
- **v2.0** — AI intelligence layer + advanced analytics (2-3 months)
- **v3.0** — Mobile app + enhanced integrations (ongoing)

## 🔧 Tech Stack

- **Languages**: TypeScript (Node.js), Python (AI/ML)
- **Frameworks**: Express, NestJS, Prisma (ORM)
- **Databases**: PostgreSQL, Redis, ClickHouse
- **Event Streaming**: Kafka / Azure Event Hubs
- **Container Orchestration**: Kubernetes (AKS)
- **Cloud**: Microsoft Azure
- **Auth**: Microsoft Entra ID (OAuth2/OIDC)
- **Monitoring**: Prometheus, Grafana, Jaeger, Log Analytics

## 🚀 Getting Started

1. **Understand the architecture**: Start with [C4-DIAGRAMS.md](./C4-DIAGRAMS.md)
2. **Review event contracts**: Check [../contracts/](../contracts/) for event schemas
3. **Deploy locally**: See [../../services/bookings-service/README.md](../../services/bookings-service/README.md) for local dev setup
4. **Deploy UI**: Follow [../DEPLOY_UI.md](../DEPLOY_UI.md) for GitHub Pages + Entra ID

## 📝 Contributing

- Update architecture diagrams in `.mmd` format (Mermaid syntax)
- Keep event schemas in JSON Schema format
- Document decisions in markdown with links to related diagrams
- Use GitHub Issues and Projects for roadmap tracking

## ❓ Questions?

Refer to [../index.md](../index.md) for the full documentation index.
