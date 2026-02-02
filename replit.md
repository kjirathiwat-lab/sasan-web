# SASAN Memorial Services Website

## Overview

SASAN is a premium memorial service website built with React and Express. The application helps families create meaningful final farewells through a sophisticated, minimalist web experience. The site features a dark theme with gold accents, Thai/English language support, and an interactive service package selector for funeral arrangements.

The project follows a modern full-stack JavaScript architecture with a React frontend (Vite), Express backend, and PostgreSQL database using Drizzle ORM. It's designed as a single-page application with smooth animations and a mobile-first responsive approach.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with custom plugins for Replit integration
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with custom theme configuration
- **UI Components**: shadcn/ui component library (Radix primitives)
- **Animations**: Framer Motion for page transitions and scroll effects
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express 5
- **Language**: TypeScript (ESM modules)
- **API Pattern**: REST endpoints defined in shared route contracts
- **Session Management**: Express sessions with PostgreSQL store (connect-pg-simple)

### Data Storage
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM with drizzle-zod for schema validation
- **Schema Location**: `shared/schema.ts` contains all table definitions
- **Migrations**: Managed via drizzle-kit (`npm run db:push`)

### Key Design Patterns
- **Shared Types**: Schema and API contracts in `shared/` directory are imported by both client and server
- **Type-Safe API**: Route definitions include input/output schemas using Zod
- **Component Architecture**: Reusable UI components in `client/src/components/ui/`
- **Internationalization**: Custom LanguageContext for Thai/English language switching

### Project Structure
```
client/           # React frontend
  src/
    components/   # React components and UI library
    hooks/        # Custom React hooks
    lib/          # Utilities and query client
    pages/        # Page components
server/           # Express backend
  routes.ts       # API route handlers
  storage.ts      # Database operations
  db.ts           # Database connection
shared/           # Shared types and schemas
  schema.ts       # Drizzle table definitions
  routes.ts       # API route contracts
```

## External Dependencies

### Database
- **PostgreSQL**: Primary database (requires DATABASE_URL environment variable)
- **Drizzle ORM**: Database queries and schema management
- **connect-pg-simple**: Session storage in PostgreSQL

### UI Framework
- **Radix UI**: Accessible component primitives (dialogs, menus, forms, etc.)
- **shadcn/ui**: Pre-styled component library built on Radix
- **Lucide React**: Icon library

### Build & Development
- **Vite**: Frontend build tool with HMR
- **esbuild**: Server bundling for production
- **TypeScript**: Type checking across the entire codebase

### Fonts (Google Fonts)
- Playfair Display (serif headings)
- Inter (sans-serif body)
- Noto Sans Thai (Thai text support)
- Great Vibes (decorative script)