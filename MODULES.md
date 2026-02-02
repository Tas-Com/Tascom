# 📦 Modules Architecture

> A guide for developers working on this project

---

## What is a Module?

A **module** is a self-contained feature folder. Everything related to that feature lives inside its folder — routes, UI, API calls, types, and hooks.

**Why?**

- ✅ Easy to find code (everything is in one place)
- ✅ Easy to delete/refactor (no scattered dependencies)
- ✅ Teams can work on different modules without conflicts

---

## 📁 Where are modules?

All modules live in:

```
src/modules/
```

---

## 🧱 Module Folder Structure

```
module-name/
│
├── index.ts           → Main exports (context, hooks, components)
├── routes.ts          → Route definitions for this module
│
├── views/             → Pages & UI components
│   └── index.tsx
│
├── repository/        → API calls & data fetching
│   ├── ModuleRepo.ts      → Interface (contract)
│   └── restModule.ts      → Actual API implementation
│
├── entities/          → TypeScript types & interfaces
│   └── Module.ts
│
├── adapters/          → Transform API responses to app format
│   └── toModule.ts
│
├── hooks/             → Custom React hooks
│   └── useModule.ts
│
└── dto/               → Data Transfer Objects (API shapes)
    └── ModuleDto.ts
```

> ⚠️ Not all modules have all folders. Use only what you need.

---

## 📋 Current Modules

| Module          | Description                      | Key Files                             |
| --------------- | -------------------------------- | ------------------------------------- |
| `Auth`          | Login, Register, Logout          | `useRegister.ts`, `AuthRepo.ts`       |
| `tasks`         | Create, edit, delete, view tasks | `TasksRepo.ts`, `TaskDetailsPage.tsx` |
| `profile`       | View & edit user profile         | `ProfileRepo.ts`, `Profile.ts`        |
| `chat`          | Real-time messaging              | `ChatRepo.ts`, `Chat.ts`              |
| `dashboard`     | Overview & statistics            | `views/index.tsx`                     |
| `home`          | Landing page                     | `views/index.tsx`                     |
| `notifications` | User alerts                      | `views/index.tsx`                     |
| `search`        | Search tasks/users               | `map.tsx`, `searchResults.tsx`        |
| `settings`      | User preferences                 | `views/index.tsx`                     |

---

## 🔄 How Data Flows

```
User Action
    ↓
View (React Component)
    ↓
Hook (useModule)
    ↓
Repository (API call)
    ↓
Adapter (transform response)
    ↓
Entity (typed data)
    ↓
Back to View
```

---

## 🛠️ How to Create a New Module

### 1. Create the folder structure

```bash
src/modules/your-module/
├── index.ts
├── routes.ts
├── entities/
│   └── YourEntity.ts
├── repository/
│   ├── YourModuleRepo.ts
│   └── restYourModule.ts
└── views/
    └── index.tsx
```

### 2. Define your entity (types)

```ts
// entities/YourEntity.ts
export interface YourEntity {
  id: string;
  name: string;
  // ... other fields
}
```

### 3. Create the repository interface

```ts
// repository/YourModuleRepo.ts
import { YourEntity } from "../entities/YourEntity";

export interface YourModuleRepo {
  getAll(): Promise<YourEntity[]>;
  getById(id: string): Promise<YourEntity>;
  create(data: Partial<YourEntity>): Promise<YourEntity>;
  update(id: string, data: Partial<YourEntity>): Promise<YourEntity>;
  delete(id: string): Promise<void>;
}
```

### 4. Implement the API calls

```ts
// repository/restYourModule.ts
import { apiClient } from "@/shared/api";
import { YourModuleRepo } from "./YourModuleRepo";

export const restYourModule: YourModuleRepo = {
  getAll: () => apiClient.get("/your-endpoint"),
  getById: (id) => apiClient.get(`/your-endpoint/${id}`),
  // ... etc
};
```

### 5. Add routes

```ts
// routes.ts
export const yourModuleRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/your-module",
  component: YourModulePage,
});
```

### 6. Register routes in `src/routes.tsx`

---

## 📂 Shared Code

Code used across multiple modules goes in:

```
src/shared/
├── api/          → API client (axios instance)
├── components/   → Reusable UI components
├── hooks/        → Common hooks (useDebounce, etc.)
├── utils/        → Helper functions
└── types/        → Global TypeScript types
```

**Rule:** If 2+ modules need the same code, move it to `shared/`.

---

## ❓ FAQ

### Q: Where do I put a new page?

**A:** In the relevant module's `views/` folder.

### Q: Where do I make API calls?

**A:** In the module's `repository/` folder. Never directly in components.

### Q: How do I share data between modules?

**A:** Use **Context Providers**. Here's how it works:

#### Where to create context?

Create `context.tsx` inside the module that **owns** the data:

```
src/modules/your-module/
├── index.tsx      ← exports Provider + hook
├── context.tsx    ← defines the context (optional, can be in index.tsx)
└── ...
```

#### Example: Profile Module

```tsx
// modules/profile/index.tsx
import { createContext, useContext, type PropsWithChildren } from "react";
import { getProfileRepo, type ProfileRepo } from "./repository";

// 1. Create the context
const ProfileContext = createContext<ProfileRepo | null>(null);

// 2. Create the hook for consuming
export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === null) {
    throw new Error("useProfile must be used within ProfileProvider");
  }
  return context;
};

// 3. Create the provider factory
export const createProfileModule = () => {
  const value = getProfileRepo();
  return {
    Provider: ({ children }: PropsWithChildren) => (
      <ProfileContext.Provider value={value}>
        {children}
      </ProfileContext.Provider>
    ),
  };
};
```

#### Which modules need Context?

| Module          | Needs Context? | Why                                           |
| --------------- | -------------- | --------------------------------------------- |
| `Auth`          | ✅ Yes         | User session shared across entire app         |
| `profile`       | ✅ Yes         | Profile data needed in navbar, settings, etc. |
| `tasks`         | ✅ Yes         | Task state shared between list & detail views |
| `notifications` | ✅ Yes         | Badge count shown in header                   |
| `chat`          | ⚠️ Maybe       | Only if chat state needed outside chat pages  |
| `dashboard`     | ❌ No          | Data stays within dashboard views             |
| `home`          | ❌ No          | Static page, no shared state                  |
| `search`        | ❌ No          | Search is self-contained                      |
| `settings`      | ❌ No          | Settings saved to API, not shared in memory   |

#### How to use in other modules?

```tsx
// In any component, anywhere in the app:
import { useProfile } from "@/modules/profile";

function Navbar() {
  const profile = useProfile();
  return <span>{profile.user.name}</span>;
}
```

> ⚠️ **Rule:** The Provider must wrap the component tree. Usually done in `App.tsx` or route layouts.

### Q: Can I import from another module?

**A:** Yes, but only through its `index.ts` exports. Never import internal files directly.

```ts
// ✅ Good
import { useProfile } from "@/modules/profile";

// ❌ Bad
import { restProfile } from "@/modules/profile/repository/restProfile";
```

---

## 🚀 Quick Reference

| I want to...           | Go to...                                      |
| ---------------------- | --------------------------------------------- |
| Add a new page         | `modules/[name]/views/`                       |
| Add an API call        | `modules/[name]/repository/`                  |
| Add a type/interface   | `modules/[name]/entities/`                    |
| Add a shared component | `shared/components/`                          |
| Add a route            | `modules/[name]/routes.ts` → `src/routes.tsx` |

---
