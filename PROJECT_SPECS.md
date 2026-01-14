# Rodriguez Towing & Recovery - Project Specs

## Business Information
- **Company Name:** Rodriguez Towing & Recovery
- **Location:** Kentucky (Focus areas: I-75, I-65, Lexington, Bowling Green)
- **Phone:** (929) 373-8832
- **Languages:** English / Español
- **Colors:** Orange (#FFA500), Black (#000000)

## Services
- Light Duty Towing
- Heavy Duty Towing (Semi trucks)
- Roadside Assistance (Fuel/Jumpstart)
- Impound Services

## Tech Stack
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS (Mobile-first)
- **Icons:** Lucide-React
- **Language:** TypeScript
- **Database:** Supabase (PostgreSQL)
- **Hosting:** Vercel

## Project Structure
```
kentucky-towing/
├── app/
│   ├── layout.tsx              # Root layout with JSON-LD schema
│   ├── page.tsx                # Homepage
│   ├── globals.css
│   ├── contact/page.tsx        # Contact form
│   ├── quote/page.tsx          # Quote request form
│   ├── services/page.tsx       # Services listing
│   └── service-areas/
│       ├── page.tsx            # Service areas index
│       └── [city]/page.tsx     # Dynamic city pages
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # Sticky navbar with Call Now CTA
│   │   └── Footer.tsx          # Site footer
│   └── sections/
│       ├── Hero.tsx            # Hero with logo and CTAs
│       ├── Services.tsx        # Service grid cards
│       └── Locations.tsx       # Kentucky counties (SEO)
├── data/
│   └── constants.ts            # Services, cities, phone number
├── lib/
│   └── supabase.ts             # Supabase client + types
├── utils/
│   └── json-ld.ts              # Schema markup generators
└── tailwind.config.ts          # Brand color palette
```

## Database Schema (Supabase)

### Table: `contacts`
| Column     | Type        | Description          |
|------------|-------------|----------------------|
| id         | uuid        | Primary key          |
| name       | text        | Customer name        |
| phone      | text        | Phone number         |
| email      | text        | Email (optional)     |
| message    | text        | Message content      |
| created_at | timestamptz | Submission time      |

### Table: `quote_requests`
| Column           | Type        | Description              |
|------------------|-------------|--------------------------|
| id               | uuid        | Primary key              |
| name             | text        | Customer name            |
| phone            | text        | Phone number             |
| email            | text        | Email (optional)         |
| service_type     | text        | Light Duty, Heavy Duty   |
| vehicle_info     | text        | Year, make, model        |
| pickup_location  | text        | Where the vehicle is     |
| dropoff_location | text        | Destination              |
| notes            | text        | Additional details       |
| status           | text        | pending/contacted/done   |
| created_at       | timestamptz | Submission time          |

## Key Features Implemented
- [x] Sticky header with "Call Now" button
- [x] Mobile-first responsive design
- [x] JSON-LD Schema for EmergencyService & LocalBusiness
- [x] Hero section with logo as main image
- [x] Bilingual badge (English / Español)
- [x] Services grid mapped from data constants
- [x] Kentucky locations section for local SEO
- [x] Brand colors (Orange/Black) throughout
- [x] Contact form with Supabase integration
- [x] Quote request form with Supabase integration

## Environment Variables
```
NEXT_PUBLIC_SUPABASE_URL=https://lrucxmrtsyqpwpytybfj.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
```

## Commands
```bash
npm run dev    # Start development server
npm run build  # Production build
npm run start  # Start production server
npm run lint   # Run ESLint
```

## Deployment
- **Production URL:** https://www.rodrigueztowing.com
- **Vercel Dashboard:** https://vercel.com/leonardo-lombards-projects/kentucky-towing
- **Supabase Dashboard:** https://supabase.com/dashboard/project/lrucxmrtsyqpwpytybfj
