# SB Services - E-commerce Platform

## Overview

SB Services is a full-stack e-commerce web application for selling virtual goods and services for the "Donut SMP" Minecraft server. The platform features a modern React frontend with a dark, minimalist aesthetic, an Express.js backend API, and PostgreSQL database for persistent storage. Users can browse products, manage a shopping cart, submit feedback, and authenticate via sessions.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight client-side router)
- **State Management**: TanStack React Query for server state, React Context for cart state
- **Styling**: Tailwind CSS v4 with custom CSS variables for theming
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Animations**: Framer Motion for page transitions and micro-interactions
- **Build Tool**: Vite with custom plugins for Replit integration

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript (ESM modules)
- **API Design**: RESTful JSON API under `/api/*` routes
- **Authentication**: Passport.js with Local Strategy, express-session for session management
- **Session Storage**: PostgreSQL via connect-pg-simple

### Data Storage
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM with drizzle-zod for schema validation
- **Schema Location**: `shared/schema.ts` (shared between frontend and backend)
- **Tables**: users, products, orders, feedback

### Project Structure
```
├── client/           # Frontend React application
│   ├── src/
│   │   ├── components/   # UI components including shadcn/ui
│   │   ├── pages/        # Route page components
│   │   ├── lib/          # Utilities, cart context, query client
│   │   └── hooks/        # Custom React hooks
├── server/           # Backend Express application
│   ├── index.ts      # Server entry point
│   ├── routes.ts     # API route definitions
│   ├── auth.ts       # Passport authentication setup
│   ├── storage.ts    # Database operations layer
│   └── db.ts         # Drizzle/PostgreSQL connection
├── shared/           # Shared code between frontend/backend
│   └── schema.ts     # Drizzle database schema definitions
```

### Key Design Decisions
1. **Monorepo Structure**: Frontend and backend in single repository with shared schema definitions for type safety across the stack
2. **Static Product Data**: Products are currently defined in `client/src/lib/products.ts` with database support ready in schema
3. **Session-based Auth**: Uses PostgreSQL-backed sessions rather than JWTs for simpler state management
4. **Component Library**: shadcn/ui provides accessible, customizable components that integrate with the dark theme

## External Dependencies

### Database
- **PostgreSQL**: Primary database, connection via `DATABASE_URL` environment variable
- **Drizzle Kit**: Database migrations stored in `/migrations` directory

### Frontend Libraries
- **@tanstack/react-query**: Server state management and caching
- **framer-motion**: Animation library
- **wouter**: Lightweight routing
- **zod**: Runtime validation with drizzle-zod integration

### Backend Libraries
- **express-session**: Session middleware
- **connect-pg-simple**: PostgreSQL session store
- **passport / passport-local**: Authentication strategy

### Environment Variables Required
- `DATABASE_URL`: PostgreSQL connection string
- `SESSION_SECRET`: Secret key for session encryption (falls back to default in dev)
- `STRIPE_SECRET_KEY`: Stripe API key for payment processing (stored as a Replit secret)

### Payment Integration
- **Stripe**: Used for checkout sessions and payment processing
- **Note**: User declined the Replit Stripe connector integration, so STRIPE_SECRET_KEY is stored as a manual secret
- **Endpoints**: 
  - `/api/create-checkout-session`: Creates Stripe checkout session
  - `/api/checkout-session/:id`: Retrieves session status and updates inventory

## Recent Updates (January 3, 2026)
- Completed project import to Replit environment
- Configured workflow to run on port 5000 with webview output
- Added STRIPE_SECRET_KEY as a Replit secret for payment processing
- Verified application is running successfully with all features working