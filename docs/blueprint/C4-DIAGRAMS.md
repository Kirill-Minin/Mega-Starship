# C4 Model Diagrams for Iowa Trail Rides ERP

The C4 Model is a simple and intuitive way to document software architecture using hierarchical diagrams. It consists of 4 levels: Context, Container, Component, and Code.

## Overview

- **Context (C1)** — System in context of users and external systems
- **Container (C2)** — Major containers (services, databases, external APIs)
- **Component (C3)** — Internal structure of a single container (example: Bookings Service)
- **Code (C4)** — Classes, interfaces, functions within components (typically shown in IDE)

## Diagrams in This Repository

### 1. C4 Context Diagram
**File:** `c4-context.mmd`

Shows how the Iowa Trail Rides ERP system interacts with:
- **Actors**: Tour customers, operators, admin staff, marketing managers
- **External systems**: Email service, SMS provider, payment gateway, analytics, Microsoft Entra ID

**When to use:** High-level conversations with stakeholders and business teams.

### 2. C4 Container Diagram
**File:** `c4-container.mmd`

Breaks down the system into major components:
- **Client Applications**: Web UI (React), Mobile app, webhooks
- **Infrastructure**: Application Gateway, Key Vault, Entra ID
- **Microservices**: API Gateway, 6+ domain services (Contacts, Bookings, Tours, etc.)
- **Data & Storage**: PostgreSQL, Kafka/Event Hubs, Redis, Blob Storage, ClickHouse
- **Observability**: Logging, metrics, tracing, dashboards
- **CI/CD**: GitHub, Actions, ACR, AKS

**Relationships** show:
- How clients reach services (through API Gateway + WAF)
- How services communicate (via Event Hub for async events)
- How data flows (services → databases, Event Hub → OLAP/Analytics)

**When to use:** Architecture reviews with architects and senior engineers; planning infrastructure; identifying deployment targets.

### 3. C4 Component Diagram (Bookings Service)
**File:** `c4-component-bookings.mmd`

Deep-dive into a single service (Bookings Service):
- **HTTP Controller** — Express routes handling POST /bookings
- **Booking Handler** — Business logic (validation, availability check)
- **Outbox Writer** — Transactional outbox pattern: writes booking + event in same transaction
- **Database** — `booking` and `outbox` tables
- **Outbox Publisher** — Background process polling outbox and publishing to Kafka
- **Event Bus** — Kafka topic for BookingCreated events

**Pattern shown:** Transactional Outbox (at-least-once event publication, no lost events)

**When to use:** Implementation discussions; onboarding new developers; design reviews for reliability.

## How to Read These Diagrams

1. **Boxes** = Containers or Components (systems, services, modules)
2. **Arrows** = Relationships or interactions (calls, publishes, subscribes)
3. **Labels** = Technologies and descriptions
4. **Colors** indicate layers/domains (blue=clients, yellow=security, green=data, purple=async, orange=ci/cd)

## Updating the Diagrams

All diagrams are written in Mermaid syntax and stored as `.mmd` files in `/docs/architecture/`.

To edit:
1. Open the `.mmd` file in a text editor
2. Modify the graph structure
3. Commit and push — GitHub will render the diagram automatically in the README and web interfaces

To export as PNG/PDF:
- Use [Mermaid Live Editor](https://mermaid.live/) and paste the content
- Or install `mermaid-cli` locally:
  ```bash
  npm install -g @mermaid-js/mermaid-cli
  mmdc -i docs/architecture/c4-context.mmd -o c4-context.png
  ```

## Next Steps for Program Engineering Blueprint

Recommended next sections for `/docs/blueprint/`:
1. **00-executive-summary.md** — Goals, scope, success criteria for ERP
2. **01-business-requirements.md** — Functional & non-functional requirements
3. **02-architecture.md** — Detailed explanation of the 7 pillars and service boundaries
4. **03-roadmap.md** — Phased delivery plan (MVP, v1, v2)
5. **04-risks-assumptions.md** — RAID log
6. **05-technology-stack.md** — Tools, frameworks, versions
7. **06-deployment-strategy.md** — Infrastructure, security, HA/DR
8. **07-team-structure.md** — Roles and responsibilities

Would you like me to scaffold these sections?
