# Tascom 🗂️

**Tascom** is a production-grade task sharing and helping platform. It's a full project shared between other teams. It's built with clean architecture, scalable modules, and a polished user experience.

---

## ✨ Features

- 📋 **Task Management** - Create, browse, filter, and manage tasks with priorities and statuses
- 🗺️ **Interactive Map** - Explore tasks geographically via an embedded MapLibre GL map
- 📚 **User Dashboard** -  View and manage your tasks and profile
- 🔔 **Notifications** - Stay updated with live user alerts
- 🔍 **Search** - Find tasks and users quickly
- 🔐 **Authentication** - Secure login and registration flow

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Library | React 19 |
| Language | TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS v4 |
| Routing | TanStack Router |
| Data Fetching and Server State Management | TanStack Query (React Query) |
| Forms | React Hook Form + Zod |
| Maps | MapLibre GL + vis.gl/react-maplibre |
| UI Primitives | Radix UI |
| Icons | Lucide React |
| Notifications | Sonner |

---

## 📁 Project Architecture

The project follows a **feature-based modular architecture** where each feature is entirely self-contained.

```
src/
├── modules/          # Feature modules (auth, tasks, chat, map, ...)
│   └── [module]/
│       ├── index.ts          # Public exports
│       ├── routes.ts         # Route definitions
│       ├── views/            # Page components
│       ├── repository/       # API layer (interface + REST impl)
│       ├── entities/         # TypeScript types
│       ├── adapters/         # Response transformers
│       ├── hooks/            # Custom React hooks
│       └── dto/              # API data shapes
│
├── shared/           # Cross-module utilities
│   ├── api/          # Axios instance & interceptors
│   ├── components/   # Reusable UI components
│   ├── hooks/        # Common hooks (useDebounce, etc.)
│   └── utils/        # Helper functions
│
└── store/            # Global Zustand stores
```

> See [MODULES.md](./MODULES.md) for the full module guide and [Guide.md](./Guide.md) for the design system reference.

---

## 🔄 Data Flow

```
User Interaction
      ↓
  View (React Component)
      ↓
  Hook (useModule)
      ↓
  Repository (API call via Axios)
      ↓
  Adapter (transform API response)
      ↓
  Entity (typed, app-ready data)
      ↓
  Back to View
```

---



## 📌 Current Modules

| Module | Description |
|---|---|
| `auth` | Login, registration, and session management |
| `tasks` | Full task CRUD - create, view, edit, delete |
| `home` | Landing / home page |
| `map` | Interactive map view for browsing tasks geographically |
| `search` | Task & user search interface |
| `results` | Search results display |
| `chat` | Real-time messaging between users |
| `notifications` | User alert system |
| `profile` | Authenticated user profile view and editing |
| `userProfile` | Public profile view of other users |
| `dashboard` | Overview and statistics |
| `settings` | User preferences |
| `admin` | Admin panel and management views |

---

## 🧠 Key Concepts Applied

- **Feature-based Modular Architecture** - self-contained modules with clear boundaries
- **Repository Pattern** - API calls abstracted behind interfaces for easy swapping or mocking
- **Adapter Pattern** - API responses transformed before reaching the UI layer
- **Custom Hooks** - encapsulated business logic, reusable across components
- **Compound Components & Composition** - flexible, scalable UI patterns
- **Type Safety** - strict TypeScript with Zod schema validation on forms
- **Optimistic Updates & Caching** - via TanStack Query for a snappy user experience

---
