# 🍽️ Delhi Date Eats Guide - Modern Stack Integration

A React TypeScript app for discovering the perfect restaurants for dates in Delhi, now powered by **Convex DB**, **Better Auth**, and modern tooling.

## 🎯 Project Status

### ✅ Phase 1: Complete (Convex + Better Auth)
- Real-time Convex database with 6 tables
- Better Auth email/password authentication
- Login/Signup pages with beautiful UI
- User session management
- Protected routes ready
- 30+ backend functions (queries & mutations)

### 🚧 Phase 2: Pending (Data Migration)
- Migrate pages to use Convex queries
- Remove static data dependency
- Implement real-time updates

### 📋 Phase 3: Planned (User Features)
- Favorites system
- Restaurant bookings
- Review submission
- User profiles

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Git installed
- A Convex account (free - we'll create during setup)

### Setup Instructions

**Follow the detailed guide:** [`CONVEX_SETUP_MANUAL.md`](./CONVEX_SETUP_MANUAL.md)

**Quick version:**

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Initialize Convex** (Interactive - do in your terminal)
   ```bash
   npm run convex:dev
   ```
   - Login to Convex (browser will open)
   - Create project "delhi-date-eats-guide"
   - Copy your deployment URL

3. **Configure environment**
   ```bash
   # Create .env.local and add:
   VITE_CONVEX_URL=https://your-deployment.convex.cloud
   VITE_APP_URL=http://localhost:8080
   ```

4. **Seed database**
   - Open https://dashboard.convex.dev
   - Go to Functions tab
   - Run `seedRestaurants:seedRestaurants`

5. **Start development**
   ```bash
   npm run dev
   ```

6. **Verify setup**
   ```bash
   ./verify-setup.sh
   ```

## 📦 Tech Stack

### Frontend
- **React 18.3** - UI library
- **TypeScript 5.5** - Type safety
- **Vite 5.4** - Build tool
- **Tailwind CSS** - Styling
- **Shadcn UI** - Component library
- **React Router 6** - Navigation

### Backend (Serverless)
- **Convex 1.28** - Real-time database & backend
- **Better Auth 1.3** - Authentication
- **TanStack Query 5.56** - Server state (ready for Phase 2)

### Coming Soon
- **TanStack Router** - Type-safe routing (Phase 3)
- **XState** - State machines for complex flows (Phase 4)

## 🗂️ Project Structure

```
delhi-date-eats-guide/
├── convex/                      # Backend (Convex)
│   ├── schema.ts               # Database schema
│   ├── restaurants.ts          # Restaurant functions
│   ├── users.ts                # User functions
│   ├── bookings.ts             # Booking functions
│   ├── reviews.ts              # Review functions
│   └── seedRestaurants.ts      # Data seeding
│
├── src/
│   ├── components/
│   │   ├── ui/                 # Shadcn components (50+)
│   │   ├── Navbar.tsx          # Auth-enabled navbar
│   │   ├── ProtectedRoute.tsx  # Route guard
│   │   └── ...
│   ├── pages/
│   │   ├── Index.tsx           # Home page
│   │   ├── Restaurants.tsx     # Restaurant listing
│   │   ├── RestaurantDetail.tsx
│   │   ├── Recommendations.tsx # Smart recommendations
│   │   ├── Login.tsx           # Auth pages
│   │   └── Signup.tsx
│   ├── hooks/
│   │   ├── useConvexAuth.ts    # Auth + Convex sync
│   │   └── useConvexQuery.ts   # Convex query wrapper
│   ├── lib/
│   │   └── auth-client.ts      # Better Auth config
│   ├── types/
│   │   └── restaurant.ts       # TypeScript types
│   └── data/
│       └── restaurants.ts      # Static data (Phase 2 will remove)
│
├── .env.local                  # Environment config
├── CONVEX_SETUP_MANUAL.md      # Detailed setup guide
├── PHASE1_SETUP.md             # Phase 1 documentation
└── verify-setup.sh             # Setup verification script
```

## 🛠️ Available Scripts

```bash
# Development
npm run dev              # Start Vite dev server (port 8080)
npm run convex:dev       # Start Convex dev server + watch

# Production
npm run build            # Build for production
npm run convex:deploy    # Deploy Convex functions

# Utilities
npm run lint             # Run ESLint
npm run preview          # Preview production build
./verify-setup.sh        # Verify Phase 1 setup
```

## 🗄️ Database Schema

### Tables
1. **users** - User profiles with preferences
2. **restaurants** - Restaurant data (name, area, cuisine, ratings, etc.)
3. **favorites** - User favorite restaurants
4. **reviews** - User reviews with ratings
5. **bookings** - Restaurant reservations
6. **datePlans** - Multi-restaurant date itineraries

### Key Features
- Real-time reactive queries
- Automatic TypeScript types
- Indexed for fast queries
- Full-text search on restaurant names

## 🔐 Authentication

- **Email/Password** - Working ✅
- **OAuth (Google)** - Coming soon
- **Session Management** - Persistent ✅
- **Protected Routes** - Ready ✅

## 📱 Features

### Current (Phase 1)
- ✅ Browse restaurants
- ✅ Filter by area, cuisine, price, date score
- ✅ Smart recommendations by occasion
- ✅ Restaurant detail pages
- ✅ User authentication
- ✅ Responsive design

### Coming (Phase 2-3)
- 🔄 Real-time data from Convex
- 🔄 Save favorites
- 🔄 Book reservations
- 🔄 Write reviews
- 🔄 User profiles
- 🔄 Date planning itineraries

## 🧪 Testing

### Manual Testing Checklist

1. **Authentication Flow**
   - [ ] Sign up with email/password
   - [ ] Sign in
   - [ ] User avatar shows in navbar
   - [ ] Sign out works

2. **Navigation**
   - [ ] Home page loads
   - [ ] Restaurants page shows listings
   - [ ] Click restaurant → Detail page
   - [ ] Recommendations page filters work

3. **Database (Convex Dashboard)**
   - [ ] 6 restaurants in database
   - [ ] User appears after signup
   - [ ] All tables exist

## 🐛 Troubleshooting

See [`CONVEX_SETUP_MANUAL.md`](./CONVEX_SETUP_MANUAL.md) for:
- Common issues and solutions
- Environment variable problems
- Database connection issues
- Auth not working

## 📚 Documentation

- **Setup Guide**: [`CONVEX_SETUP_MANUAL.md`](./CONVEX_SETUP_MANUAL.md)
- **Phase 1 Details**: [`PHASE1_SETUP.md`](./PHASE1_SETUP.md)
- **Convex Docs**: https://docs.convex.dev
- **Better Auth Docs**: https://www.better-auth.com

## 🤝 Contributing

This is a demonstration project showing modern React + Convex integration.

## 📄 License

Private project

## 🎯 Roadmap

- [x] **Phase 1**: Convex + Better Auth integration
- [ ] **Phase 2**: Migrate to Convex queries
- [ ] **Phase 3**: TanStack Router upgrade
- [ ] **Phase 4**: XState for complex flows
- [ ] **Phase 5**: User features (favorites, bookings, reviews)

---

**Current Branch:** `claude/analyze-codebase-tech-stack-011CUoYw7xwzvHbf2sDfiCft`

Built with ❤️ for discovering Delhi's best date spots
