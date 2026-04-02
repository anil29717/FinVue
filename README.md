# FinVue - Premium Finance Dashboard

FinVue is a modern, interactive dashboard built with React and Tailwind CSS for tracking personal finances. It offers real-time data visualization, categorization, and role-based access control.

## 🚀 Features

- **Dynamic Insights**: Automated calculation of Balance, Income, and Expenses.
- **Rich Data Visualizations**: 
  - **Balance Trend**: Area chart for growth analysis.
  - **Spending Breakdown**: Donut chart for category distribution.
- **Transaction Management**: 
  - Full CRUD capabilities for Admins.
  - Interactive table with global search and multi-column sorting.
  - Type-based (Income/Expense) and category filters.
- **Role-Based Access Control (RBAC)**: Persistent role switcher for Viewer and Admin modes.
- **Premium UI**: Glassmorphism effects, HSL gradients, and smooth Framer Motion animations.
- **Toast Notifications**: Non-intrusive feedback via `react-toastify`.

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite
- **Styling**: Tailwind CSS v4
- **State Management**: React Context API + useReducer
- **Charts**: Recharts
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Notifications**: React Toastify

## 📂 Project Structure

- `src/components`: UI components (Layout, Cards, Charts, Tables, Forms).
- `src/context`: Global state management.
- `src/hooks`: Data calculation and utility hooks.
- `src/data`: Mock transaction data.
- `docs/`: Comprehensive project requirements, flows, and feature lists.

## 🏁 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser at `http://localhost:5173`.

## 🧪 Usage

- **Switch Role**: Use the toggle in the sidebar to swap between **Viewer** (Read-only) and **Admin** (Full CRUD).
- **Manage Transactions**: Click the **Add** button in Admin mode to record new entries. Use the icons in the table rows to edit or delete.
- **Analyze**: Hover over charts to see detailed tooltips and review the "Financial Insights" section for spending patterns.
