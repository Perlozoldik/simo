# Velora — InDrive-style Ride-Hailing Platform

A production-shaped, full-stack ride-hailing platform inspired by InDrive: rider-proposed fares, real-time driver negotiation, live tracking, multi-method payments, and a premium dark UI.

This repository is a **monorepo** containing a Next.js frontend and an Express + Prisma backend, ready to run with Docker Compose.

```
velora/
├── apps/
│   ├── web/   # Next.js 14, TypeScript, Tailwind, Framer Motion, Zustand, Socket.io client
│   └── api/   # Express, TypeScript, Prisma (PostgreSQL), Redis, Socket.io
├── docker-compose.yml
├── .env.example
└── package.json (npm workspaces)
```

---

## Highlights

### Frontend (`apps/web`)
- Next.js 14 App Router, TypeScript, Tailwind, Framer Motion, Lucide icons
- Premium dark theme with glassmorphism, subtle gradients, and motion
- Pages
  - **Landing**: hero, features, driver section, CTA, footer
  - **Auth**: login, register (rider/driver toggle), forgot password, email verification, Google OAuth button
  - **Rider dashboard**: booking flow with fare slider + payment selector, live map, trip history, saved places, in-app chat, wallet
  - **Driver dashboard**: online toggle, KPI cards, live map, incoming requests with accept/reject/counter, earnings, verification, vehicle, trips
  - **Admin panel**: KPI overview, live rides, users, drivers, revenue, fraud alerts, platform settings
- Reusable UI primitives: `Button`, `Input`, `Card`, `Badge`, `Avatar`, `Logo`, `Sidebar`, `Topbar`, `MapCanvas`
- Auth API client with automatic JWT refresh, Zustand stores, Socket.io client

### Backend (`apps/api`)
- Express + TypeScript with versioned `/api/v1` API
- **Auth fully implemented**: register, login, JWT access + rotating refresh tokens stored as SHA-256 hashes, email verification, password reset, Google OAuth route stubs
- **Security**: Helmet, strict CORS, cookie-based refresh tokens (`HttpOnly`, `Secure`, `SameSite`), per-route rate limiting, Zod validation everywhere, Argon2 password hashing
- **Domain endpoints** for users, saved places, rides (create, list, get, status, offers, accept), drivers (online toggle, vehicles, documents, payouts), payments (methods, charge), chat (history, send), admin (overview, users, status, settings, fraud, live rides)
- **Real-time** via Socket.io: per-user rooms, ride rooms, driver location pings, fare offer broadcast, chat
- **Prisma schema** covers users, refresh/verification/reset tokens, driver profiles, vehicles, documents, payouts, rides, ride offers, ride events, ratings, chat messages, payments, payment methods, saved places, promo codes, referrals, notifications, fraud alerts, SOS events, platform settings
- **Pricing engine** computes base + distance + time + surge multiplier from configurable platform settings
- Pino structured logging, graceful shutdown, environment validated with Zod

---

## Quick start

### Prerequisites
- Node.js 20+
- Docker + Docker Compose (for PostgreSQL & Redis), or local Postgres/Redis

### 1) Install
```bash
# at the repo root
cp .env.example .env
cp apps/web/.env.example apps/web/.env.local
cp apps/api/.env.example apps/api/.env

npm install
```

> **Generate JWT secrets** (replace placeholders in `apps/api/.env`):
> ```bash
> node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
> ```

### 2) Start infrastructure
```bash
docker compose up -d postgres redis
```

### 3) Run migrations
```bash
npm run prisma:migrate -- --name init
```

### 4) Start the apps
```bash
# in two terminals
npm run dev:api    # http://localhost:4000
npm run dev:web    # http://localhost:3000
```

Or run everything in containers:
```bash
docker compose up --build
```

---

## Architecture

```
┌────────────────────────┐      HTTPS / WSS       ┌────────────────────────┐
│   Next.js (apps/web)   │ ─────────────────────▶ │   Express (apps/api)   │
│  - SSR, App Router     │                        │  - REST /api/v1/*       │
│  - Zustand, RHF, Zod   │ ◀──────────────────── │  - Socket.io gateway    │
│  - Framer Motion       │   JSON / Cookies       │  - Prisma ORM           │
└────────────────────────┘                        └─────────┬──────────────┘
                                                            │
                                       ┌────────────────────┼─────────────────────┐
                                       ▼                    ▼                     ▼
                                  PostgreSQL              Redis                Stripe / PayPal /
                                  (Prisma)             (cache, surge)         Crypto provider
```

### Authentication flow
1. **Register / Login** → server returns short-lived **access JWT** (15m) + sets a **refresh token cookie** (`HttpOnly`, `SameSite`, 30d). The DB stores only the SHA-256 hash of the refresh token.
2. **Access expires** → web client transparently calls `POST /api/v1/auth/refresh`, the server rotates the refresh token, revokes the prior one, and returns a fresh access token.
3. **Email verification** & **password reset** use opaque random tokens (sha256-hashed in DB) sent via email. On password reset, all refresh tokens for the user are revoked.
4. **Google OAuth** is wired with a route stub. To enable, fill `GOOGLE_CLIENT_ID/SECRET/CALLBACK_URL` and connect to passport-google-oauth20.

### Real-time
- The Socket.io gateway authenticates every connection with the access JWT.
- Each user joins `user:{userId}` for personal events (notifications, ride matches, chat).
- Riders + drivers join `ride:{rideId}` to receive driver location pings, fare offers, status changes, and chat.

### Database
A single Prisma schema models the platform end-to-end. See `apps/api/prisma/schema.prisma` for: `User`, `RefreshToken`, `VerificationToken`, `PasswordResetToken`, `DriverProfile`, `Vehicle`, `DriverDocument`, `Payout`, `Ride`, `RideOffer`, `RideEvent`, `Rating`, `ChatMessage`, `SavedPlace`, `PaymentMethodRecord`, `Payment`, `PromoCode`, `Referral`, `Notification`, `FraudAlert`, `SosEvent`, `PlatformSetting`.

---

## API surface (selected)

```
POST   /api/v1/auth/register
POST   /api/v1/auth/login
POST   /api/v1/auth/refresh
POST   /api/v1/auth/logout
POST   /api/v1/auth/verify-email
POST   /api/v1/auth/forgot-password
POST   /api/v1/auth/reset-password
GET    /api/v1/auth/me

GET    /api/v1/users/me
PATCH  /api/v1/users/me
GET    /api/v1/users/me/places
POST   /api/v1/users/me/places
DELETE /api/v1/users/me/places/:id
POST   /api/v1/users/me/sos

POST   /api/v1/rides/estimate
POST   /api/v1/rides
GET    /api/v1/rides
GET    /api/v1/rides/:id
POST   /api/v1/rides/:id/offers
POST   /api/v1/rides/offers/:offerId/accept
POST   /api/v1/rides/:id/status

GET    /api/v1/drivers/me
POST   /api/v1/drivers/online
POST   /api/v1/drivers/vehicles
POST   /api/v1/drivers/documents
POST   /api/v1/drivers/payouts

GET    /api/v1/payments/methods
POST   /api/v1/payments/methods
POST   /api/v1/payments/charge

GET    /api/v1/chat/:rideId
POST   /api/v1/chat/:rideId

GET    /api/v1/admin/overview
GET    /api/v1/admin/users
POST   /api/v1/admin/users/:id/status
GET    /api/v1/admin/rides/live
GET    /api/v1/admin/settings
PATCH  /api/v1/admin/settings
GET    /api/v1/admin/fraud-alerts
```

---

## Deployment

### Frontend → Vercel
1. Import the repo in Vercel; set the project root to `apps/web`.
2. Set environment variables: `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_SOCKET_URL`.
3. Deploy. The `next.config.mjs` already enables `output: "standalone"` for portable builds.

### Backend → Railway / Fly / AWS
1. Provision **PostgreSQL** + **Redis** add-ons.
2. Set environment variables from `apps/api/.env.example`.
3. Build & run the Docker image (`apps/api/Dockerfile`):
   - The image runs `prisma migrate deploy` on start.
   - Default port: `4000`.
4. Configure the WEB_URL and CORS origin to your Vercel URL.
5. For sticky sessions with Socket.io, ensure your load balancer supports it (Railway/Fly do; on AWS use ALB target stickiness).

### Production checklist
- Strong, rotated `JWT_ACCESS_SECRET` and `JWT_REFRESH_SECRET`.
- `NODE_ENV=production` and HTTPS in front of the API (refresh cookies are `Secure` + `SameSite=None`).
- Configure SMTP credentials for transactional emails.
- Configure Stripe / PayPal keys; switch the `payment.routes.ts` charge endpoint to call gateways.
- Add Google OAuth credentials and finalize passport flow.
- Add map provider key on the frontend (`NEXT_PUBLIC_MAPBOX_TOKEN` or `NEXT_PUBLIC_GOOGLE_MAPS_KEY`) and replace `MapCanvas` with the real map.

---

## Roadmap (built-in extension points)

- **AI fraud detection**: write to `FraudAlert`; consume from `/admin/fraud-alerts`.
- **Surge pricing**: `pricing.service.ts` already accepts a `surge` multiplier; wire to a Redis job that recomputes per geohash.
- **Promo & referrals**: `PromoCode` + `Referral` models are in place; add endpoints under `/payments` and `/users/me/referrals`.
- **PWA / offline**: `manifest.webmanifest` is shipped — add a service worker (Workbox) for caching and offline indicators.
- **i18n**: integrate `next-intl` and a locale router.
- **Push notifications**: persist Web Push subscriptions on `User`, fan out via socket gateway.

---

## Scripts

```bash
# root
npm run dev:web         # start Next.js
npm run dev:api         # start Express + Socket.io
npm run build:web
npm run build:api
npm run prisma:migrate  # run migrations against DATABASE_URL
npm run prisma:generate # regenerate Prisma client
```

---

## License

MIT — provided as a starter. You assume full responsibility for production use.
