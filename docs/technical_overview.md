# Technical Overview & Implementation Summary

This document provides a deep dive into the architecture, logic, and tools used to build the FinVue Dashboard.

## ⚛️ React.js & Core Logic

### 1. State Management (Context & Reducers)
We used the **React Context API** combined with the **`useReducer` hook** to manage the global state of the application. 
- **File**: `src/context/TransactionContext.jsx`
- **Why?**: A dashboard requires data synchronization across many disparate components (Charts, Summaries, Tables, and Forms). Context avoids "prop drilling" and provides a single source of truth.
- **Logic**: The reducer handles atomic actions like `ADD_TRANSACTION`, `EDIT_TRANSACTION`, `DELETE_TRANSACTION`, and `SET_ROLE`.

### 2. Data Persistence
- **Implementation**: The state is mirrored to **`localStorage`** on every modification.
- **Why?**: This ensures that user data survives page refreshes, providing a consistent experience without the need for a dedicated backend for this prototype.

### 3. Business Logic & Computations
- **File**: `src/hooks/useDashboardData.js`
- **Functions**: 
  - `income/expenses/balance`: Computed via arrays reducers.
  - `breakdownData`: Aggragates expenses by category for the Donut chart.
  - `trendData`: Calculates a running balance over time for the Trend Area chart.
  - `savingsRate`: Computed percentage based on net income vs total income.
- **Optimization**: Wrapped in **`useMemo`** to prevent expensive recalculated on every re-render unless the transaction array changes.

## 🔐 Role-Based Access Control (RBAC)

### 1. User Perspective Logic
- **Roles**: `admin` and `viewer`.
- **Implementation**: The `role` state is checked throughout the UI to conditionally render interactive elements.
- **Viewer Behavior**:
  - No "Add Transaction" button.
  - No "Edit" or "Delete" icons in the transaction table.
  - "Read Only" indicator in the Header.
- **Admin Behavior**:
  - Full access to CRUD modals and inline actions.
  - "Full Control" indicator in the Header.

## 🛠️ Tooling & Dependencies

### 1. Build Layer: Vite 8
- **Why?**: Vite provides nearly instantaneous Hot Module Replacement (HMR) and a highly optimized Rollup-based production build system, significantly reducing development friction.

### 2. Styling: Tailwind CSS v4
- **Features**: CSS-first configuration using `@theme` and `@layer`.
- **Design Decisions**: 
  - **Glassmorphism**: Used `backdrop-blur-md` and semi-transparent backgrounds for a modern look.
  - **Custom Tokens**: Defined specific colors for `income` (emerald) and `expense` (rose) to ensure semantic consistency.

### 3. Data Visualization: Recharts
- **Why?**: Recharts is a composable library built on SVG. It handles responsiveness and animations out of the box, making it ideal for financial dashboards.
- **Customization**: Implemented custom tooltips and linear gradients for a "premium" aesthetic.

### 4. Interactions: Framer Motion
- **Usage**: Used for page-entry animations (`animate-fade-in`) and micro-animations on interactive cards to make the UI feel alive and responsive.

### 5. Notifications: React Toastify
- **Why?**: Replaced standard synchronous `window.alert` with asynchronous, non-blocking toast notifications for better UX flow during CRUD operations.

## 🏁 Summary of Design Choices

The project was built with a **Mobile-First Responsive** approach. Every decision—from using HSL-based color tokens to implementing sophisticated data aggregation in hooks—was prioritized to ensure the application feels like a premium, production-ready product rather than a simple MVP.
