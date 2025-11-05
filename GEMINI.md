# Gemini Project Context: Shadcn Admin Dashboard

## Project Overview

This is a modern React (v19) admin dashboard application built with Vite and TypeScript. It serves as a feature-rich UI template for future projects, emphasizing responsiveness and accessibility.

**Key Technologies:**
- **UI Framework:** React
- **Build Tool:** Vite
- **Styling:** Tailwind CSS with `shadcn-ui` for a component library built on Radix UI.
- **Routing:** TanStack Router, using a file-based routing system.
- **Data Fetching & State:** TanStack Query for server state management and Zustand for global client-side state.
- **Data Tables:** TanStack Table for creating powerful, interactive data grids.
- **Authentication:** Clerk is used for user authentication features.
- **Language:** TypeScript

## Building and Running

The project's scripts are defined in `package.json` and are intended to be run with `pnpm`.

- **Run the development server:**
  ```bash
  pnpm run dev
  ```

- **Create a production build:**
  ```bash
  pnpm run build
  ```

- **Lint the codebase:**
  ```bash
  pnpm run lint
  ```

## Development Conventions

- **Project Structure:** The codebase is organized by features, located in the `src/features` directory (e.g., `src/features/dashboard`, `src/features/tasks`). This modular approach keeps feature-specific logic, components, and data encapsulated.

- **Component Library:** The core UI is built with `shadcn-ui`. Reusable, generic components are in `src/components/ui`. Components that compose layouts are in `src/components/layout`.

- **Styling:** Styling is done primarily with Tailwind CSS. The `cn` utility function from `src/lib/utils.ts` is used extensively to conditionally apply and merge CSS classes, often in conjunction with `class-variance-authority` (cva) for creating component variants (see `src/components/ui/button.tsx`).

- **Routing:** File-based routing is managed by TanStack Router. Route files are located in `src/routes`. The root layout for the entire application is `src/routes/__root.tsx`. Authenticated routes are nested under `src/routes/_authenticated/`.

- **State Management:**
  - **Client State:** Global client-side state is managed with Zustand (see `src/stores/`).
  - **Server State:** TanStack Query is used for fetching, caching, and managing server state. The global query client is configured in `src/main.tsx`.

- **Data Tables:** Complex data tables are built using TanStack Table. The pattern is to create a feature-specific table component (e.g., `src/features/tasks/components/tasks-table.tsx`) that encapsulates the table logic, state management (including URL state syncing via the `useTableUrlState` hook), and toolbar/pagination components.

- **Adding a New Page:** To add a new page, follow the existing pattern:
  1. Create a new directory in `src/features/` for your page.
  2. Build the main component and any necessary sub-components, data files, and schemas.
  3. Create a new route file in the appropriate `src/routes/` subdirectory (e.g., `src/routes/_authenticated/your-page.tsx`).
  4. Add a link to the new page in the sidebar navigation at `src/components/layout/data/sidebar-data.ts`.

## Session Worklog (2025-11-02)

During this session, we performed the following tasks:

1.  **Project Analysis:** Conducted a step-by-step analysis of the entire project structure, from configuration files (`vite.config.ts`, `package.json`) to application code (`src/`). The findings were documented in `ProjectFlow.md`.

2.  **New Feature Implementation (`Contacts` Page):** As a practical exercise, we created a new "Contacts" page by mirroring the existing "Tasks" feature. This demonstrated the development conventions in action and involved:
    *   Creating the feature directory and files: `src/features/contacts/`.
    *   Building a sophisticated, feature-specific data table (`ContactsTable`) that handles its own state, filtering, and actions.
    *   Defining a new route at `src/routes/_authenticated/contacts/index.tsx`.
    *   Adding a navigation link to the sidebar in `src/components/layout/data/sidebar-data.ts`.

## Session Worklog (2025-11-04)

During this session, we performed the following tasks:

1.  **Implemented Multiselect for Tags:** Changed the "tags" input in the "add contacts dialog" to a multiselect.
2.  **Added Filtering to Contacts Table:** Implemented filtering functionality for the contacts table, including a combined search filter for name and address, and faceted filters for type and tags.
3.  **Fixed Tags Filter Bug:** Resolved an issue with the tags filter where it was not correctly filtering the table rows.
