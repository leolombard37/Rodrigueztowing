# Rodriguez Towing & Recovery - Project Specs

## Live URLs

| Environment | URL |
|-------------|-----|
| **Production** | https://rodrigueztowingky.com |
| **Admin Dashboard** | https://rodrigueztowingky.com/admin |
| **Admin Login** | https://rodrigueztowingky.com/login |

---

## Admin Credentials

| Field | Value |
|-------|-------|
| Email | `admin@rodrigueztowingky.com` |
| Password | `TowingAdmin2026` |

---

## Business Information

- **Company Name:** Rodriguez Towing & Recovery
- **Location:** Kentucky (Focus areas: I-75, I-65, Lexington, Bowling Green)
- **Contact Phone:** (929) 373-8832
- **CTA Phone:** (502) 793-0829
- **Languages:** English / Español
- **Colors:** Orange (#FFA500), Black (#000000)

---

## Services

- Light Duty Towing
- Heavy Duty Towing (Semi trucks)
- Roadside Assistance (Fuel/Jumpstart)
- Impound Services

---

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS (Mobile-first) |
| Icons | Lucide-React |
| Language | TypeScript |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Hosting | Vercel |
| Analytics | Vercel Analytics + Speed Insights |
| Repository | GitHub |

---

## Project Structure

```
kentucky-towing/
├── app/
│   ├── layout.tsx              # Root layout with JSON-LD schema
│   ├── page.tsx                # Homepage
│   ├── globals.css
│   ├── admin/                  # Admin dashboard
│   │   ├── page.tsx            # Dashboard overview
│   │   ├── contacts/           # Contact messages
│   │   ├── quotes/             # Quote requests
│   │   └── reviews/            # Review moderation
│   ├── api/                    # API routes
│   ├── contact/page.tsx        # Contact form
│   ├── login/page.tsx          # Admin login
│   ├── quote/page.tsx          # Quote request form
│   ├── reviews/page.tsx        # Review submission form
│   ├── services/page.tsx       # Services listing
│   └── service-areas/
│       ├── page.tsx            # Service areas index
│       └── [city]/page.tsx     # Dynamic city pages
├── actions/                    # Server actions
│   ├── contact.ts              # Contact form submission
│   ├── quote.ts                # Quote request submission
│   └── review.ts               # Review submission
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # Sticky navbar with Call Now CTA
│   │   └── Footer.tsx          # Site footer
│   └── sections/               # Page sections
├── lib/
│   ├── supabase-server.ts      # Supabase server client
│   └── validations/            # Zod schemas
├── public/
│   └── images/                 # Static images
├── utils/
│   └── json-ld.ts              # Schema markup generators
├── middleware.ts               # Auth middleware
└── tailwind.config.ts          # Brand color palette
```

---

## Database Schema (Supabase)

### Project Details

| Setting | Value |
|---------|-------|
| Project ID | `hofdhokiqotowgzulyus` |
| URL | `https://hofdhokiqotowgzulyus.supabase.co` |
| RLS Status | Disabled (for simplicity) |

### Table: `contacts`

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| name | text | Customer name |
| phone | text | Phone number |
| email | text | Email (optional) |
| message | text | Message content |
| created_at | timestamptz | Submission time |

### Table: `quote_requests`

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| name | text | Customer name |
| phone | text | Phone number |
| email | text | Email (optional) |
| service_type | text | Light Duty, Heavy Duty |
| vehicle_info | text | Year, make, model |
| pickup_location | text | Where the vehicle is |
| dropoff_location | text | Destination |
| notes | text | Additional details |
| status | text | pending/contacted/completed |
| is_urgent | boolean | Urgent request flag |
| created_at | timestamptz | Submission time |

### Table: `reviews`

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| name | text | Customer name |
| city | text | City (optional) |
| rating | integer | 1-5 stars |
| comment | text | Review text |
| service_type | text | Service used |
| is_approved | boolean | Approval status (default: false) |
| created_at | timestamptz | Submission time |

---

## Key Features

### Public Pages
- [x] Sticky header with "Call Now" button
- [x] Mobile-first responsive design
- [x] JSON-LD Schema for EmergencyService & LocalBusiness
- [x] Hero section with logo overlay
- [x] Bilingual badge (English / Español)
- [x] Services grid with custom icons
- [x] Photo gallery section
- [x] Customer reviews section with star ratings
- [x] Kentucky locations section for local SEO
- [x] Brand colors (Orange/Black) throughout

### Forms
- [x] Contact form with database integration
- [x] Quote request form with database integration
- [x] Review submission form with moderation workflow

### Admin Dashboard
- [x] Secure login with Supabase Auth
- [x] Dashboard with stats overview
- [x] Contact messages viewer
- [x] Quote requests management
- [x] Review moderation (approve/reject)

### DevOps
- [x] GitHub repository with auto-deploy
- [x] Vercel hosting with custom domain
- [x] Vercel Analytics & Speed Insights

---

## Environment Variables

### Vercel (Production)

```env
NEXT_PUBLIC_SUPABASE_URL=https://hofdhokiqotowgzulyus.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>

# Optional - for notifications
RESEND_API_KEY=<for-email-notifications>
BUSINESS_EMAIL=<notification-recipient>
TWILIO_ACCOUNT_SID=<for-sms>
TWILIO_AUTH_TOKEN=<for-sms>
TWILIO_PHONE_NUMBER=<for-sms>
ALERT_PHONE_NUMBERS=<comma-separated>
```

---

## Commands

```bash
# Development
npm run dev          # Start dev server (localhost:3000)

# Build
npm run build        # Production build

# Production
npm run start        # Start production server

# Linting
npm run lint         # Run ESLint

# Deploy
npx vercel --prod    # Manual deploy to production
```

---

## Deployment

### URLs & Dashboards

| Service | URL |
|---------|-----|
| Production Site | https://rodrigueztowingky.com |
| Vercel Dashboard | https://vercel.com/leonardo-lombards-projects/kentucky-towing |
| GitHub Repository | https://github.com/leolombard37/Rodrigueztowing |
| Supabase Dashboard | https://supabase.com/dashboard/project/hofdhokiqotowgzulyus |

### Auto-Deploy Workflow

```
Edit code locally
     ↓
git add . && git commit -m "changes"
     ↓
git push origin main
     ↓
Vercel auto-deploys to production
```

---

## Security Notes

- **RLS Status:** Currently disabled for simplicity
- **Protection:** Supabase keys are server-side only (NEXT_PUBLIC keys are safe)
- **Auth:** Admin access requires Supabase authentication
- **Recommendation:** Enable RLS via Supabase dashboard for additional security

---

## Service Areas

- Lexington, KY
- Louisville, KY
- Bowling Green, KY
- Georgetown, KY
- Frankfort, KY
- I-75 Corridor
- I-65 Corridor

---

## Maintenance

### Regular Tasks
- Monitor Vercel deployment logs
- Check Supabase usage/limits
- Review and approve customer reviews
- Respond to quote requests promptly

### Updating Content
1. Edit files locally
2. Test with `npm run dev`
3. Commit and push to GitHub
4. Vercel auto-deploys

---

*Last updated: January 24, 2026*
