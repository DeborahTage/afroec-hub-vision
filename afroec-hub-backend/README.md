# Afroec Hub — Backend API + Admin Dashboard

Production-ready Spring Boot 3 (Java 21) backend for Afroec Hub. It serves:

- **Public REST API** — student applications, partner inquiries, volunteer
  registrations, contact forms, newsletter and public stats. Consumed by the
  Next.js / marketing frontend. Deployable to Render via Docker.
- **Admin Dashboard** — a Thymeleaf + Bootstrap 5 web UI for managing all data,
  protected by JWT auth and locked to **localhost** by default (never exposed
  publicly on Render).

Both share the same PostgreSQL database.

---

## Tech stack

| Layer      | Technology                         |
|------------|------------------------------------|
| Language   | Java 21 (LTS)                      |
| Framework  | Spring Boot 3.2.x                  |
| Security   | Spring Security + JWT (jjwt 0.12)  |
| Database   | PostgreSQL 15+ (H2 for tests)      |
| ORM        | Spring Data JPA / Hibernate        |
| Build      | Maven 3.9+                         |
| API Docs   | SpringDoc OpenAPI 2.3              |
| Admin UI   | Thymeleaf + Bootstrap 5 + Chart.js |
| Deploy     | Docker / Render                    |

---

## Project layout

```
src/main/java/com/afroechub/
├── config/       # Security, JWT, CORS, rate limiting, data seeding, Render
├── controller/
│   ├── api/      # Public REST API (/api/v1/**)
│   └── admin/    # Admin dashboard (/admin/**)
├── dto/          # request/ and response/ records
├── entity/       # JPA entities (+ BaseEntity)
├── enums/        # Domain enums
├── exception/    # Custom exceptions + global handler
├── repository/   # Spring Data repositories
├── service/      # Service interfaces
│   └── impl/     # Implementations
└── util/         # JWT / validation / date helpers
src/main/resources/
├── application*.yml
├── templates/admin/  # Thymeleaf admin pages + fragments
├── templates/mail/   # HTML email templates
├── static/           # admin.css, admin.js
└── db/               # schema.sql, data.sql (reference only)
```

---

## Running locally

### Option A — Docker Compose (API + PostgreSQL)

```bash
docker compose up --build
```

- API:        http://localhost:8080/api/v1/health
- Swagger UI:  http://localhost:8080/swagger-ui.html
- Admin:       http://localhost:8080/admin/login
- Default admin: `admin` / `Admin@12345` (override via `ADMIN_PASSWORD`)

> In compose, `ADMIN_LOCALHOST_ONLY=false` so the dashboard is reachable
> through the container network. For a bare-metal run it defaults to `true`.

### Option B — Local JDK + Maven (needs a PostgreSQL)

1. Start PostgreSQL and create the database:

```bash
createdb afroec_hub    # user/pass default to afroec_admin/afroec_admin
```

2. Run the app (dev profile is default):

```bash
mvn spring-boot:run
```

Override DB settings via env vars: `DATABASE_URL`, `DATABASE_USERNAME`,
`DATABASE_PASSWORD`.

### Build a jar

```bash
mvn clean package        # produces target/afroec-hub.jar
java -jar target/afroec-hub.jar
```

### Tests

```bash
mvn test                 # uses in-memory H2, profile "test"
```

---

## Public API (base: `/api/v1`)

| Method | Path                              | Description                    |
|--------|-----------------------------------|--------------------------------|
| POST   | `/applications/student`           | Submit student application     |
| POST   | `/applications/academy`           | Submit academy application     |
| POST   | `/applications/product-hub`       | Submit product-hub application |
| POST   | `/applications/community`         | Submit community application   |
| GET    | `/applications/student/{id}?email=` | Application status           |
| POST   | `/partners/inquire`               | Submit partner inquiry         |
| GET    | `/partners/inquire/{id}`          | Partner inquiry status         |
| POST   | `/volunteers/apply`               | Submit volunteer application   |
| GET    | `/volunteers/apply/{id}`          | Volunteer status               |
| POST   | `/contact/submit`                 | Submit contact form            |
| POST   | `/newsletter/subscribe`           | Subscribe                      |
| POST   | `/newsletter/unsubscribe?token=`  | Unsubscribe (token or email)   |
| GET    | `/stats/public`                   | Public website stats           |
| GET    | `/health`                         | Health check                   |

All responses use a consistent envelope:

```json
{ "success": true, "message": "...", "data": { ... }, "timestamp": "..." }
```

Import `postman/AfroecHub.postman_collection.json` for ready-made requests.

---

## Admin dashboard (`/admin`)

| Page              | URL                        |
|-------------------|----------------------------|
| Login             | `/admin/login`             |
| Dashboard         | `/admin/dashboard`         |
| Applications      | `/admin/applications`      |
| Partners          | `/admin/partners`          |
| Volunteers        | `/admin/volunteers`        |
| Contacts          | `/admin/contacts`          |
| Newsletters       | `/admin/newsletters`       |
| Activity Log      | `/admin/activity`          |
| Settings          | `/admin/settings`          |
| CSV export        | `/admin/export/{type}`     |

Features: stat cards, Chart.js charts (over-time / program / gender), searchable
& paginated tables, status management, replies, CSV export, and an audit trail.

---

## Security notes

- **CORS** limited to configured origins (`CORS_ALLOWED_ORIGINS`).
- **Rate limiting** — 10 `POST /api/**` requests/min per IP (in-memory).
- **JWT** — HS256, 24h expiry; admin sessions via HttpOnly cookie.
- **BCrypt** password hashing; **account lockout** after 5 failed attempts (15 min).
- **Admin localhost-only** via `ADMIN_LOCALHOST_ONLY` (default `true`).
- **CSRF** enabled for admin forms (cookie repository), disabled for the JSON
  API and `/admin/api/**`.
- **Activity logging** of all admin actions.

---

## Environment variables

| Variable                 | Default (dev)             | Notes                              |
|--------------------------|---------------------------|------------------------------------|
| `SPRING_PROFILES_ACTIVE` | `dev`                     | `dev` / `prod` / `test`            |
| `DATABASE_URL`           | local postgres            | JDBC URL                           |
| `DATABASE_USERNAME`      | `afroec_admin`            |                                    |
| `DATABASE_PASSWORD`      | `afroec_admin`            |                                    |
| `JWT_SECRET`             | dev secret                | **set a long random value in prod**|
| `JWT_EXPIRATION`         | `86400000`                | ms                                 |
| `ADMIN_USERNAME`         | `admin`                   | seeded on first run                |
| `ADMIN_PASSWORD`         | `Admin@12345`             | seeded on first run                |
| `ADMIN_LOCALHOST_ONLY`   | `true`                    | block admin unless localhost       |
| `CORS_ALLOWED_ORIGINS`   | localhost + afroechub.com | comma-separated                    |
| `MAIL_ENABLED`           | `false`                   | enable outbound email              |
| `SMTP_HOST/PORT/USERNAME/PASSWORD` | —               | SMTP config                        |

---

## Deploying to Render

1. Push this folder to a GitHub repo.
2. In Render, **New → Blueprint** and point at the repo (it reads `render.yaml`).
3. Render provisions the PostgreSQL database and the Docker web service,
   auto-wiring `DATABASE_*`, and generating `JWT_SECRET` and `ADMIN_PASSWORD`.
4. Health check: `/api/v1/health`.

The admin dashboard remains `ADMIN_LOCALHOST_ONLY=true` on Render, so it is not
publicly reachable — run it locally against the same database (or via an SSH
tunnel) for administration.

---

## Design decisions

- Academy / Product Hub / Community submissions all persist into a single
  `student_applications` table (distinguished by `program_type`), matching the
  provided schema. Dedicated request DTOs give the frontend focused payloads.
- List/array fields (partner interests, volunteer skills/languages) use JPA
  `@ElementCollection` tables for portability instead of native `TEXT[]`.
- Schema is managed by Hibernate (`ddl-auto=update`); `db/schema.sql` is
  reference documentation and is not auto-executed.
