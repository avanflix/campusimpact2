# CineQuest — Campus Workshop & Reel Competition

A Next.js (App Router, TypeScript, Tailwind CSS) landing page and registration
system for a two-day campus workshop tour.

- **Day 1 — Workshop**: 5 tracks (Direction, Acting, Photography,
  Videography, Modeling). Individual registration, ₹299 per student. No
  account required.
- **Day 2 — Reel Competition**: Teams of 4 compete for a ₹25,000 prize pool.
  Entry fee ₹499 per team. Requires a CineQuest account — the registration
  form appears on the dashboard after signing in.

## Tech stack

- Next.js 16 (App Router) + TypeScript — all UI is `.tsx`, no `.html` files
- Tailwind CSS v4 with a custom light, colourful theme (no black background)
- MongoDB + Mongoose for persistence
- JWT (signed, httpOnly cookie) for session management
- react-hook-form + zod for form validation (shared client/server schemas)

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy the env file and fill in your values:

   ```bash
   cp .env.example .env.local
   ```

   - `MONGODB_URI` — your MongoDB connection string (local or MongoDB Atlas)
   - `JWT_SECRET` — any long random string, used to sign session cookies

3. Make sure MongoDB is running (locally via `mongod`, or use an Atlas
   cluster — no extra setup needed beyond the connection string).

4. Run the dev server:

   ```bash
   npm run dev
   ```

   Visit http://localhost:3000

## Project structure

```
src/
  app/
    page.tsx                  Landing page (Hero, Schedule, Tracks, etc.)
    layout.tsx                Root layout (fonts, metadata)
    globals.css               Theme tokens (colors, fonts, form styles)
    register/page.tsx         Create account
    login/page.tsx            Sign in
    dashboard/page.tsx        Protected — Reel Competition registration form
    api/
      auth/
        register/route.ts     POST — create account, set session cookie
        login/route.ts         POST — verify credentials, set session cookie
        logout/route.ts        POST — clear session cookie
        me/route.ts             GET  — current session user
      registrations/
        workshop/route.ts       POST — Day 1 individual registration (open)
        competition/route.ts     POST/GET — Day 2 team registration (auth required)

  components/
    Navbar.tsx                       Auth-aware nav (Sign in / Register / Dashboard)
    Hero.tsx                          Hero section with Day 1 / Day 2 "ticket" cards
    Schedule.tsx                      Two-day overview + shared SectionHeading
    WorkshopTracks.tsx                Day 1 track grid
    CompetitionHighlight.tsx          Day 2 prize pool + CTAs
    WorkshopRegistrationSection.tsx   Wraps the Day 1 form
    WorkshopRegisterForm.tsx          Day 1 individual registration form
    CompetitionRegisterForm.tsx       Day 2 team-of-4 registration form
    FaqSection.tsx                    FAQ cards
    Footer.tsx                        Footer

  lib/
    db.ts                      Cached Mongoose connection
    auth.ts                    JWT sign/verify, session cookie helpers
    validation.ts              Zod schemas (shared by API routes + forms)
    constants.ts               Shared constants (fees, tracks, team size)
    content.ts                 Landing page copy/content

  models/
    User.ts                       Student account
    WorkshopRegistration.ts       Day 1 registration (individual, ₹299)
    CompetitionRegistration.ts    Day 2 registration (team of 4, ₹499)
```

## Data model

### User
One account per student: `fullName`, `email`, `phone`, `college`,
`passwordHash`. Created via `/register`, authenticated via `/login`.

### WorkshopRegistration (Day 1)
Individual sign-up for one of the 5 tracks. Does **not** require an account
— anyone can register from the landing page. If the visitor happens to be
logged in, the registration is also linked to their `User` document.
Fee: ₹299, `paymentStatus` defaults to `pending`.

### CompetitionRegistration (Day 2)
Created only by a logged-in user (the team leader). Contains exactly 4
`members` (each with name, email, phone, college), a `teamName`, and a
`reelConcept`. Fee: ₹499 per team, `paymentStatus` defaults to `pending`.

## Authentication flow

1. `/register` → `POST /api/auth/register` creates the `User`, hashes the
   password with bcrypt, signs a JWT, and sets it as an httpOnly cookie.
2. `/login` → `POST /api/auth/login` verifies credentials the same way.
3. `/dashboard` is a server component that calls `getSession()` — if there's
   no valid session cookie, it redirects to `/login`.
4. The Navbar calls `GET /api/auth/me` client-side to show "Sign in /
   Register" vs "Hi, {name} / Reel Competition Form / Log out".
5. `POST /api/registrations/competition` requires a valid session; it 401s
   otherwise.

## Notes on payments

This project records registrations with a `paymentStatus` field
(`pending` / `completed` / `failed`) and an optional `paymentReference`, but
does not integrate a live payment gateway. Wire up your preferred provider
(Razorpay, Stripe, etc.) and update `paymentStatus`/`paymentReference` on
successful payment.
