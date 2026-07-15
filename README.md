# New Worker Hub (swiftyhub)

An onboarding hub for new team members: find experts by skill, read "About Me"
profiles, translate acronyms, browse a prompt library, and more. Built as a
2-day hackathon project.

**Stack:** Spring Boot 4.1 (Java 21) · React + TypeScript + Vite + Tailwind +
shadcn/ui · PostgreSQL / H2 · Flyway · Spring AI (Claude).

---

## Quick start

Two terminals. No database install needed for dev — the backend uses an
in-memory H2 database by default.

```bash
# Terminal 1 — backend  (http://localhost:8080)
cd backend
./mvnw spring-boot:run

# Terminal 2 — frontend (http://localhost:5173)
cd frontend
npm install
npm run dev
```

Open http://localhost:5173. The frontend proxies `/api/*` to the backend, so
there's no CORS setup to worry about.

- **API docs (Swagger UI):** http://localhost:8080/swagger-ui.html
- **DB console (H2):** http://localhost:8080/h2-console — JDBC URL
  `jdbc:h2:mem:swifthub`, user `sa`, no password.

## Fake auth

There's no real login. A user switcher in the top-right sets the "current user"
(sent as the `X-User-Id` header, resolved by `GET /api/me`). Pick whoever you
want to act as.

## Using Postgres instead of H2

```bash
docker compose up -d          # starts Postgres on localhost:5432
cd backend
SPRING_PROFILES_ACTIVE=postgres ./mvnw spring-boot:run
```

Schema is managed by Flyway (`backend/src/main/resources/db/migration`), so the
same migrations run on both H2 and Postgres.

## AI features (optional)

The AI endpoints (`POST /api/ai/bio`, `POST /api/ai/expertise`) call Claude via
Spring AI. They need an API key:

```bash
export ANTHROPIC_API_KEY=sk-ant-...    # then start the backend
```

Without a key the app still runs — only the AI endpoints error.

---

## Architecture

```
React (Vite) ──/api──▶ Spring Boot ──▶ Postgres / H2
   TanStack Query        controller → service → repository
   shadcn/ui             DTOs, validation, global error handler
                         Flyway migrations · Spring AI (Claude)
```

### Backend layout (`backend/src/main/java/.../swifthub`)
`controller/` → `service/` → `repository/` → `entity/`, with `dto/`,
`exception/`, `config/`. Entities never leave the service layer; controllers
return DTOs. The `/api` prefix is applied globally in `config/WebConfig`.

### Frontend layout (`frontend/src`)
`api/` (client + one module per feature) · `hooks/` (TanStack Query) ·
`context/` · `components/` (+ `components/ui` from shadcn) · `pages/` ·
`types/` · `lib/`.

---

## Add a feature (the pattern)

Each feature is a vertical slice. Copy the `User` example end-to-end:

**Backend:** `entity/X` → Flyway `V#__add_x.sql` → `repository/XRepository`
→ `dto/` → `service/XService` → `controller/XController` (plain path, served
under `/api`).

**Frontend:** `types` entry → `api/x.ts` (copy `api/users.ts`) →
`hooks/useX.ts` (copy `hooks/useUsers.ts`) → a page (copy `pages/ExpertsPage.tsx`).

## Team task split

| Owner | Frontend page | Backend |
|-------|---------------|---------|
| — | ✅ Experts (reference) | ✅ `User` CRUD + `/api/me` |
| — | About Me | reuse `GET /api/users/{id}` |
| — | Prompt Library | `Prompt` entity + endpoints |
| — | Acronyms | `Acronym` entity + endpoints |
| — | Q&A / Praise / Badges | as time allows |

## Endpoints

| Method | Path | Notes |
|--------|------|-------|
| GET | `/api/users` | list |
| GET | `/api/users/{id}` | one (404 if missing) |
| POST | `/api/users` | create (validated) |
| GET | `/api/me` | current user (via `X-User-Id`) |
| POST | `/api/ai/bio` | generate a bio (needs API key) |
| POST | `/api/ai/expertise` | extract skill tags (needs API key) |
