# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Next.js towing service website for a Kentucky-based company. Full-stack application with backend API, notifications, and admin dashboard. Focus on performance, conversion optimization, and local SEO.

## Commands

- `npm run dev` - Start development server
- `npm run build` - Production build
- `npm run start` - Start production server
- `npm test` - Run tests
- `npm run lint` - Run ESLint

## Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS (mobile-first)
- **Icons:** Lucide-React
- **Language:** TypeScript

### Backend
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth
- **Email:** Resend with React Email templates
- **SMS:** Twilio (for urgent alerts)
- **Validation:** Zod
- **Rate Limiting:** LRU Cache

## Project Structure

```
kentucky-towing/
├── actions/                    # Server Actions
│   ├── contact.ts              # Contact form submission handler
│   ├── quote.ts                # Quote request submission handler
│   └── review.ts               # Review submission handler
│
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Root layout with Header/Footer
│   ├── page.tsx                # Homepage
│   ├── robots.ts               # Dynamic robots.txt generation
│   ├── sitemap.ts              # Dynamic sitemap generation
│   │
│   ├── admin/                  # Admin Dashboard (protected)
│   │   ├── layout.tsx          # Admin layout with auth check
│   │   ├── page.tsx            # Dashboard with stats
│   │   ├── contacts/page.tsx   # Contact messages viewer
│   │   ├── quotes/page.tsx     # Quote request management
│   │   └── reviews/page.tsx    # Review moderation
│   │
│   ├── contact/page.tsx        # Contact form page
│   ├── login/page.tsx          # Admin login page
│   ├── quote/page.tsx          # Quote request form page
│   ├── reviews/page.tsx        # Public reviews display
│   ├── services/page.tsx       # Services listing page
│   │
│   └── service-areas/          # Dynamic service area pages
│       ├── page.tsx            # Service areas index
│       └── [city]/page.tsx     # Dynamic city pages (SEO)
│
├── components/
│   ├── admin/                  # Admin Dashboard Components
│   │   ├── AdminLayoutClient.tsx  # Client wrapper for mobile sidebar
│   │   ├── ContactsTable.tsx      # Contacts list with modal
│   │   ├── QuotesTable.tsx        # Quotes table with status management
│   │   ├── ReviewsTable.tsx       # Reviews with approval workflow
│   │   ├── Sidebar.tsx            # Responsive sidebar navigation
│   │   └── StatsCard.tsx          # Dashboard stat cards
│   │
│   ├── layout/                 # Layout Components
│   │   ├── Header.tsx          # Sticky header with CTA
│   │   └── Footer.tsx          # Site footer
│   │
│   └── sections/               # Homepage Sections
│       ├── Hero.tsx            # Hero section with CTA
│       ├── Services.tsx        # Services grid
│       ├── GallerySection.tsx  # Photo/video gallery
│       ├── Locations.tsx       # Service areas map
│       └── Reviews.tsx         # Customer reviews carousel
│
├── data/
│   └── constants.ts            # Business data, services, locations
│
├── lib/
│   ├── supabase.ts             # Browser Supabase client
│   ├── supabase-server.ts      # Server Supabase client
│   ├── supabase-admin.ts       # Admin Supabase client (service role)
│   ├── rate-limit.ts           # LRU cache rate limiting
│   │
│   ├── email/                  # Email System
│   │   ├── client.ts           # Resend email client
│   │   └── templates/          # React Email Templates
│   │       ├── customer-confirmation.tsx
│   │       ├── new-contact.tsx
│   │       ├── new-quote.tsx
│   │       └── new-review.tsx
│   │
│   ├── notifications/
│   │   └── index.ts            # Unified notification dispatcher
│   │
│   ├── sms/
│   │   └── client.ts           # Twilio SMS client
│   │
│   └── validations/            # Zod Schemas
│       ├── contact.ts          # Contact form validation
│       ├── quote.ts            # Quote form validation
│       └── review.ts           # Review form validation
│
├── utils/
│   └── json-ld.ts              # SEO JSON-LD schema generators
│
├── middleware.ts               # Auth middleware for admin routes
└── tailwind.config.ts          # Tailwind configuration with brand colors
```

## Architecture

### Server Actions (`/actions`)
- `contact.ts` - Contact form submissions with email notification
- `quote.ts` - Quote request submissions with SMS alerts for urgent requests
- `review.ts` - Review submissions with moderation workflow

### Notifications (`/lib/notifications`)
- Automatic email to business on form submissions
- SMS alerts for urgent requests (Roadside Assistance)
- Customer confirmation emails

### Admin Dashboard (`/app/admin`)
- `/admin` - Dashboard with stats (pending quotes, contacts, reviews)
- `/admin/quotes` - Quote request management with status tracking
- `/admin/contacts` - Contact message viewer with quick actions
- `/admin/reviews` - Review moderation (approve/reject workflow)
- **Mobile responsive** - Collapsible sidebar with hamburger menu

### Database Tables (Supabase)
- `contacts` - Contact form submissions
- `quote_requests` - Quote requests with status tracking (pending/contacted/completed)
- `reviews` - Customer reviews (with is_approved boolean for moderation)

### SEO Features
- Dynamic sitemap.ts for all pages and service areas
- JSON-LD structured data (EmergencyService, LocalBusiness)
- Dynamic service area pages for local SEO
- OpenGraph and Twitter meta tags

## Environment Variables

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Email (Resend)
RESEND_API_KEY=
BUSINESS_EMAIL=
FROM_EMAIL=

# SMS (Twilio)
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=
ALERT_PHONE_NUMBERS=
```

## Code Style

- Use TypeScript for all files
- Prefer functional components with hooks
- Mobile-first responsive design with Tailwind
- Server Actions for form submissions
- Zod schemas for validation
- Client components marked with "use client"

## Business Context

- **Location:** Kentucky (I-75, I-65, Lexington, Bowling Green)
- **Services:** Light Duty, Heavy Duty (Semi), Roadside Assistance, Impound
- **Brand Colors:** High-visibility Yellow/Orange (#FFA500) and Black (#000000)
- **Key Feature:** Sticky header with "Call Now" CTA
- **SEO:** JSON-LD Schema using `EmergencyService` type

## Ignore

- node_modules
- .next
- out
