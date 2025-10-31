TanStack Router and how it is architected in this project.

TanStack Router is a powerful, type-safe routing library for React. In this project, it uses a **file-based routing** system. This means the structure of the files and folders inside the `src/routes` directory directly defines the URL paths of your application.

Here’s a breakdown of its core concepts and how they are implemented here.

### 1. The Root of the Application (`src/routes/__root.tsx`)

Every route in the application starts from the root. This file defines the absolute top-level component that wraps every single page. It's the perfect place for things that should always be present, like a navigation progress bar or toast notifications.

```typescript
// src/routes/__root.tsx

import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { NavigationProgress } from '@/components/navigation-progress';
import { Toaster } from '@/components/ui/sonner';
// ... other imports

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: () => (
    <>
      <NavigationProgress />
      <Outlet /> {/* Child routes will be rendered here */}
      <Toaster duration={5000} />
      {/* ... Devtools */}
    </>
  ),
  // ...
});
```

*   `createRootRouteWithContext`: Initializes the root of your application.
*   `<Outlet />`: This is the placeholder where the actual page component (like a dashboard or a settings page) will be rendered.

### 2. Nested Routes and Layouts (`src/routes/_authenticated/route.tsx`)

Folders with an underscore prefix, like `_authenticated`, don't add a segment to the URL. Instead, they create a **layout route**. This is a powerful pattern for wrapping a group of related pages in a shared layout.

In this project, `_authenticated` is used to protect routes that require a user to be logged in. Any route inside this folder will be rendered within the `AuthenticatedLayout` component.

```typescript
// src/routes/_authenticated/route.tsx

import { createFileRoute } from '@tanstack/react-router';
import { AuthenticatedLayout } from '@/components/layout/authenticated-layout';

// This route corresponds to the `_authenticated` folder
export const Route = createFileRoute('/_authenticated')({
  // All child routes will be rendered inside this component
  component: AuthenticatedLayout,
});
```

This means that pages like `/users`, `/tasks`, and `/settings` will all share the same sidebar, header, and overall structure provided by `AuthenticatedLayout`.

### 3. A Concrete Page Route (`src/routes/_authenticated/users/index.tsx`)

This file defines the page that is rendered when a user navigates to `/users`.

*   The file path `src/routes/_authenticated/users/index.tsx` maps directly to the URL `/users`.
*   The `index.tsx` file name indicates that it is the default file for the `/users` directory.

```typescript
// src/routes/_authenticated/users/index.tsx

import z from 'zod';
import { createFileRoute } from '@tanstack/react-router';
import { Users } from '@/features/users';
import { roles } from '@/features/users/data/data';

// 1. Define a schema for URL search parameters
const usersSearchSchema = z.object({
  page: z.number().optional().catch(1),
  pageSize: z.number().optional().catch(10),
  status: z.array(z.string()).optional(),
  role: z.array(z.enum(roles.map(r => r.value))).optional(),
  username: z.string().optional(),
});

// 2. Create the route for the '/users' path
export const Route = createFileRoute('/_authenticated/users/')({
  // 3. Validate search params against the schema
  validateSearch: usersSearchSchema,
  // 4. Render the Users component for this route
  component: Users,
});
```

This file showcases one of the most powerful features of TanStack Router: **Type-Safe Search Params**.

1.  A `zod` schema (`usersSearchSchema`) is defined to specify the expected shape and type of the URL's query parameters (e.g., `?page=2&status=active`).
2.  `createFileRoute` links the file to the `/users` URL.
3.  `validateSearch` automatically parses, validates, and type-safes the search parameters from the URL. If a user navigates to `/users?page=abc`, TanStack Router can catch the invalid type and handle it gracefully.
4.  The `component` property tells the router to render the main `Users` feature component for this page.

### Summary of the Flow

When you navigate to `/users?page=2` in this application:

1.  The **root route** (`__root.tsx`) renders first, giving you the `NavigationProgress` bar and `Toaster`.
2.  Because the URL is inside the `_authenticated` path, the **authenticated layout** (`_authenticated/route.tsx`) renders next, giving you the main sidebar and header.
3.  Finally, the **users page route** (`_authenticated/users/index.tsx`) matches, validates the `page=2` search parameter, and renders the `Users` component inside the authenticated layout.
