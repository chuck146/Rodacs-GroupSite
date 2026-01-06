# RODACS Group Website

## Overview

This is a professional website for RODACS Group (RCG), a workflow automation and AI integration consultancy serving small to medium businesses. The application is built as a full-stack TypeScript project with a React frontend and Express backend, using PostgreSQL for data persistence.

The site positions RODACS Group as a strategic technology partner that builds systems (not just websites) to automate business operations including customer follow-ups, appointment booking, and lead management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript, using Vite as the build tool
- **Routing**: Wouter for client-side routing (lightweight alternative to React Router)
- **State Management**: TanStack React Query for server state management
- **UI Components**: shadcn/ui component library with Radix UI primitives
- **Styling**: Tailwind CSS with custom theme configuration
- **Form Handling**: React Hook Form with Zod validation
- **Animations**: Framer Motion for page animations

### Design System
- Primary color: Deep blue (#1E3A5F)
- Accent color: Teal (#0D9488)
- Background: White with subtle gray sections (#F8FAFC)
- Typography: Inter font family
- Component style: New York variant from shadcn/ui

### Backend Architecture
- **Framework**: Express.js running on Node.js
- **Database ORM**: Drizzle ORM with PostgreSQL
- **Schema Validation**: Zod with drizzle-zod integration
- **API Pattern**: RESTful endpoints under `/api` prefix
- **Development**: tsx for TypeScript execution, Vite middleware for HMR

### Data Storage
- **Database**: PostgreSQL (connection via DATABASE_URL environment variable)
- **Schema Location**: `shared/schema.ts` - shared between frontend and backend
- **Tables**: 
  - `users` - User authentication (id, username, password)
  - `contact_submissions` - Contact form entries (id, name, email, company, message, createdAt)

### Build System
- **Client Build**: Vite outputs to `dist/public`
- **Server Build**: esbuild bundles server code to `dist/index.cjs`
- **Development**: Concurrent client and server with HMR
- **Scripts**: `npm run dev` for development, `npm run build` for production

### Directory Structure
```
├── client/src/          # React frontend code
│   ├── components/ui/   # shadcn/ui components
│   ├── pages/           # Page components
│   ├── hooks/           # Custom React hooks
│   └── lib/             # Utilities and query client
├── server/              # Express backend
│   ├── routes.ts        # API route definitions
│   ├── storage.ts       # Database operations
│   └── db.ts            # Database connection
├── shared/              # Shared types and schemas
│   └── schema.ts        # Drizzle schema definitions
└── attached_assets/     # Static assets and images
```

## External Dependencies

### Database
- **PostgreSQL**: Primary database, connected via `DATABASE_URL` environment variable
- **Drizzle Kit**: Database migrations stored in `/migrations` directory
- **Connection Pooling**: Using `pg` Pool for connection management

### Third-Party Services
- **Google Fonts**: Inter font loaded from fonts.googleapis.com

### Key NPM Packages
- **UI**: @radix-ui primitives, class-variance-authority, tailwind-merge
- **Forms**: react-hook-form, @hookform/resolvers, zod
- **Data**: @tanstack/react-query, drizzle-orm, drizzle-zod
- **Server**: express, connect-pg-simple for sessions
- **Build Tools**: vite, esbuild, tsx

### Replit-Specific Integrations
- `@replit/vite-plugin-runtime-error-modal` for error display
- `@replit/vite-plugin-cartographer` and `@replit/vite-plugin-dev-banner` for development
- Custom `vite-plugin-meta-images` for OpenGraph image handling