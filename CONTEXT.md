# Swifty — Project Context

Context for an AI model or a new contributor. Reflects the current state of the repo.

## What it is
**Swifty** is an internal "new worker hub" / company knowledge tool built for a 2-day
hackathon. Think *Confluence + LinkedIn + Slack + Notion*, but AI-native: the core idea
is an **"ask anything" search that finds people, expertise, and knowledge across the
company**, with AI ranking who can help and why.

- **Team:** Slightly Worse In Financial Transfer Yield
- **GitHub:** `danhuynh307/Slightly-Worse-In-Financial-Transfers` (branch `main`)
- **Auth:** none (hackathon fake auth — act as any seeded user)

## Feature scope (MVP + stretch)
People directory + expert search by skill, About-Me profiles, acronym translator, prompt
library, praise feed, Q&A. AI features: generate a profile bio, extract expertise tags
from text. The flagship interaction is an AI "who knows X?" query returning ranked people
with reasons.

## Tech stack
| Layer | Tech |
|---|---|
| Backend | Spring Boot 4.1, Java 21, Maven (wrapper) |
| Persistence | Spring Data JPA / Hibernate; H2 (dev) / PostgreSQL (prod); Flyway migrations |
| AI | Spring AI 2.0, Anthropic/Claude (`claude-haiku-4-5-20251001` default) |
| API docs | springdoc-openapi 3.0.3 (Swagger UI) |
| Frontend | React 19 + TypeScript + Vite; Tailwind v4; shadcn/ui; Geist font |
| Data layer (FE) | TanStack Query; React Router |
| Infra | Docker Compose (Postgres), GitHub Actions CI |

## Repo structure
```
swifthub/
├─ backend/          Spring Boot app (mvnw, pom.xml, src/)
├─ frontend/         Vite React app
├─ docker-compose.yml   Postgres for local dev
├─ .github/workflows/ci.yml
└─ README.md
```

## Backend architecture
Layered: **controller → service → repository → entity**, plus `dto/`, `exception/`,
`config/`. Package root `com.slightlyworse.swifthub`.

- **`/api` prefix** applied globally to our controllers via `config/WebConfig` (scoped to
  our package so it doesn't touch Swagger).
- **DTOs** — entities never leave the service layer; controllers return DTOs (`UserDto`,
  `CreateUserRequest`).
- **Validation** — Jakarta Bean Validation (`@Valid`) on request DTOs.
- **Error handling** — `GlobalExceptionHandler` (`@RestControllerAdvice`) returns a
  consistent JSON shape: `{ status, error, message, timestamp }`; correct 400/404/405/500.
- **DB schema** — owned by **Flyway** (`src/main/resources/db/migration/V1__init.sql`);
  Hibernate `ddl-auto=validate`.
- **Profiles** — `dev` (H2 in-memory, PostgreSQL-compat mode, **default**) and `postgres`
  (Dockerized Postgres). Same migrations run on both.
- **Fake auth** — `GET /api/me` resolves the "current user" from an `X-User-Id` header
  (defaults to first user). No passwords/sessions.
- **AI** — `AiService` wraps Spring AI `ChatClient`; key read from `ANTHROPIC_API_KEY` env
  var, never client-side. App boots fine without a key (AI calls just error until set).

### Domain model (only entity so far)
`User { id, name, title, team, bio, photoUrl }` — seeded on startup with Dan / Russell /
Sarah via a `CommandLineRunner`.

### Endpoints
| Method | Path | Purpose |
|---|---|---|
| GET | `/api/users` | list users |
| GET | `/api/users/{id}` | one user (404 if missing) |
| POST | `/api/users` | create (validated) |
| GET | `/api/me` | current user (via `X-User-Id`) |
| POST | `/api/ai/bio` | generate a profile bio (needs key) |
| POST | `/api/ai/expertise` | extract skill tags from text (needs key) |

Swagger UI at `/swagger-ui.html`.

## Frontend architecture
`frontend/src/` organized by role:
- **`api/`** — `client.ts` (fetch wrapper; injects `X-User-Id` from `lib/session.ts`; base
  URL is relative so the **Vite dev proxy** forwards `/api` → `localhost:8080`), plus one
  module per feature (`users.ts`, `me.ts`).
- **`hooks/`** — TanStack Query hooks (`useUsers`).
- **`context/`** — `CurrentUserContext` (fake-auth identity; persisted to localStorage).
- **`components/`** — `Layout`, `Sidebar`, `UserSwitcher`, `UserCard`, and
  `components/ui/*` (shadcn: button, card, avatar, select, badge).
- **`pages/`** — `HomePage`, `ExpertsPage` (reference page, wired to backend), plus stubs.
- **`types/`**, **`lib/`** (`session.ts`, `utils.ts`). `@/*` path alias → `src/`.

## The feature pattern (how to add a feature)
A vertical slice, copying the `User` example end-to-end:
- **Backend:** `entity/X` → Flyway `V#__add_x.sql` → `repository/XRepository` → `dto/` →
  `service/XService` → `controller/XController` (plain path, served under `/api`).
- **Frontend:** `types` entry → `api/x.ts` → `hooks/useX.ts` (useQuery) → a page (copy
  `ExpertsPage`).

## How to run
```bash
# backend  -> http://localhost:8080  (Swagger at /swagger-ui.html)
cd backend && ./mvnw spring-boot:run
# frontend -> http://localhost:5173
cd frontend && npm install && npm run dev
# optional Postgres: docker compose up -d  then SPRING_PROFILES_ACTIVE=postgres
# optional AI: export ANTHROPIC_API_KEY=...
```

## Current status
- **Backend + frontend foundation: complete and pushed** (6 phases: restructure,
  DB/Flyway/Docker, backend hardening, fake auth, AI scaffold, frontend upgrades, CI).
  CI is green.
- **UI redesign: in the planning stage.** A design direction is agreed (see below) via an
  HTML mockup, but **it is NOT yet implemented** — the running app still uses the earlier
  plain indigo/slate UI and the default shadcn neutral theme in `frontend/src/index.css`.
  The next coding step is to rewrite `index.css` as the Swifty token layer, then build the
  shell and the AI-search Home.

## Design direction (agreed, not yet coded)
"Clean modern enterprise → intelligent workspace" (Linear/Notion feel, *not* a KPI
dashboard). AI is the hero: an "Ask Swifty anything…" bar with ranked people-answers
("who can help… → 3 people, with *why*"), expertise-graph profiles (confidence bars,
"best known for"), minimal chrome, hairline separators over boxes.
- **Palette:** neutral near-white canvas (`#FAFAF9`), near-black text, **turquoise/mint
  accent** (`#ACF9E9` family; deep teal `~#0A7668` for text, teal→blue-teal gradient for
  the logo/AI moments) used *only* where intelligence appears.
- **Theme:** light is the committed default; token-driven so dark mode + personalization
  (density, text size, accent) are later config, not rewrites.

## Constraints / gotchas
- **No Docker installed locally** → the Postgres path is written but only H2 is verified.
- **AI needs `ANTHROPIC_API_KEY`** to run live.
- Windows + repo under OneDrive; git pushes go through Git Credential Manager (occasionally
  needs re-auth).
