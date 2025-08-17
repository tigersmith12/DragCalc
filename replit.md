# Overview

This is a modern full-stack web application built with React and Express.js that provides a drag calculation tool for fishing reels. The application allows users to input parameters (max drag of their reel, number of settings, desired setting) and calculates the drag value at a specific setting using a linear distribution formula. The frontend features a clean, responsive UI with dark mode toggle built with shadcn/ui components and Tailwind CSS, while the backend provides a REST API foundation with PostgreSQL database integration via Drizzle ORM.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for fast development and building
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: shadcn/ui component library with Radix UI primitives for accessibility
- **Styling**: Tailwind CSS with custom design tokens and CSS variables for theming
- **Dark Mode**: Custom ThemeProvider with localStorage persistence and toggle component
- **State Management**: React hooks for local state, TanStack Query for server state management
- **Form Handling**: React Hook Form with Zod validation schemas for real-time validation
- **Build Tool**: Vite with custom configuration for development and production builds

## Backend Architecture
- **Framework**: Express.js with TypeScript for type safety
- **Development**: tsx for running TypeScript directly in development
- **API Structure**: RESTful API with `/api` prefix for all endpoints
- **Error Handling**: Global error middleware for consistent error responses
- **Logging**: Custom request/response logging middleware for API monitoring
- **Build Process**: esbuild for production builds with ES modules format

## Data Storage Solutions
- **Database**: PostgreSQL with Neon Database serverless driver
- **ORM**: Drizzle ORM for type-safe database interactions
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Development Storage**: In-memory storage implementation for development/testing
- **Schema Definition**: Shared schema definitions between frontend and backend using Zod

## Authentication and Authorization
- **Session Management**: PostgreSQL session store with connect-pg-simple
- **User Schema**: Basic user model with username/password fields
- **Storage Interface**: Abstracted storage layer supporting both memory and database implementations

## External Dependencies
- **Database**: Neon Database (PostgreSQL-compatible serverless database)
- **UI Components**: Radix UI primitives for accessible component foundation
- **Validation**: Zod for runtime type checking and validation
- **Development**: Replit-specific plugins for development environment integration
- **Styling**: Google Fonts integration for typography (Architects Daughter, DM Sans, Fira Code, Geist Mono)
- **Icons**: Lucide React for consistent iconography
- **Date Handling**: date-fns for date manipulation utilities