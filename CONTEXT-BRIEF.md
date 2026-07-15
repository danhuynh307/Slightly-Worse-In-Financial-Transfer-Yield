# Swifty — one-page brief

**What:** internal AI-native "new worker hub" (Confluence + LinkedIn + Slack + Notion). Core = an "ask anything" search that finds people/expertise/knowledge and ranks who can help + why. 2-day hackathon. Team: *Slightly Worse In Financial Transfer Yield*. Repo: `danhuynh307/Slightly-Worse-In-Financial-Transfers` (`main`). No real auth (fake auth).

**Stack:** Spring Boot 4.1 / Java 21 / Maven · JPA + H2 (dev) / Postgres (prod) + Flyway · Spring AI 2.0 (Claude, `claude-haiku-4-5-20251001`) · springdoc/Swagger · React 19 + TS + Vite + Tailwind v4 + shadcn/ui · TanStack Query · React Router · Docker Compose (Postgres) · GitHub Actions CI.

**Layout:** `backend/` (Spring), `frontend/` (Vite), `docker-compose.yml`, `.github/workflows/ci.yml`, `README.md`, `CONTEXT.md`.

**Backend** (`com.slightlyworse.swifthub`): layered controller → service → repository → entity, plus `dto/ exception/ config/`. Global `/api` prefix via `WebConfig`. Controllers return DTOs (entities stay internal). `@Valid` validation. `GlobalExceptionHandler` → JSON `{status,error,message,timestamp}`. Schema owned by Flyway (`db/migration/V1__init.sql`); `ddl-auto=validate`. Profiles: `dev`=H2 (default), `postgres`=Docker. Fake auth: `GET /api/me` reads `X-User-Id` header. AI in `AiService` (Spring AI `ChatClient`); key from `ANTHROPIC_API_KEY`, server-side only; app boots without a key.

**Entity (only one so far):** `User { id, name, title, team, bio, photoUrl }`, seeded on startup (Dan/Russell/Sarah).

**Endpoints:** `GET/POST /api/users`, `GET /api/users/{id}`, `GET /api/me`, `POST /api/ai/bio`, `POST /api/ai/expertise`. Swagger at `/swagger-ui.html`.

**Frontend** (`frontend/src`): `api/` (`client.ts` = fetch wrapper, sends `X-User-Id` from `lib/session.ts`, relative URLs via Vite proxy `/api`→:8080; + `users.ts`, `me.ts`), `hooks/` (TanStack Query, `useUsers`), `context/CurrentUserContext` (fake-auth identity, localStorage), `components/` (`Layout`, `Sidebar`, `UserSwitcher`, `UserCard`, `ui/*` shadcn), `pages/` (`HomePage`, `ExpertsPage` = reference, stubs), `types/`, `lib/`. Alias `@/*`→`src/`.

**Feature pattern (vertical slice, copy `User`):** BE = entity → Flyway `V#` → repository → dto → service → controller (plain path, served under `/api`). FE = type → `api/x.ts` → `hooks/useX.ts` → page (copy `ExpertsPage`).

**Run:** `cd backend && ./mvnw spring-boot:run` (:8080) · `cd frontend && npm install && npm run dev` (:5173) · optional `docker compose up -d` + `SPRING_PROFILES_ACTIVE=postgres` · optional `export ANTHROPIC_API_KEY=...`.

**Status:** foundation done + pushed (6 phases, CI green). **UI redesign is planned, NOT yet coded** — app still uses the old indigo/slate UI + default shadcn theme in `index.css`; next step is to rewrite `index.css` as the Swifty token layer, then shell + AI-search Home.

**Design direction (agreed):** "modern enterprise → intelligent workspace" (Linear/Notion, not a KPI dashboard). AI is the hero: "Ask Swifty anything…" bar → ranked people with *why*; expertise-graph profiles (confidence bars, "best known for"); minimal chrome, hairlines over boxes. Palette: neutral near-white `#FAFAF9`, near-black text, turquoise/mint accent (`#ACF9E9` family, deep teal `#0A7668` text) used only for AI/intelligence. Light default; token-driven for later dark mode + density/text-size personalization.

**Gotchas:** no Docker installed locally (only H2 verified) · AI needs `ANTHROPIC_API_KEY` · Windows + OneDrive; git pushes via Git Credential Manager (may need re-auth).
