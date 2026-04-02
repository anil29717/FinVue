# Project Implementation Phases

## Phase 1: Foundation & Layout (2 Hours)
- **Scaffold**: Initialize Vite/Next.js with Tailwind CSS, Lucide Icons, and Recharts.
- **Theme**: Define the core design system (Typography, Colors, HSL tokens).
- **Layout**: Build Shell, Sidebar (on Tablet+), and Header with Role Switcher.

## Phase 2: State & Data Management (3 Hours)
- **Store**: Set up React Context + useReducer for global transaction state.
- **Persistence**: Interface with local state using the predefined `mock_data.json`.
- **RBAC Logic**: Implement the role switching mechanism that controls button visibility.

## Phase 3: Dashboard - Visuals (4 Hours)
- **Summary Cards**: Create responsive cards for Balance, Income, and Expense.
- **Charts**: Implement Trend Line Chart and Category Distribution Donut Chart.
- **Insight Cards**: Build calculations for Highest Category, Monthly Comparison, and Savings Rate.

## Phase 4: Transactions & Management (6 Hours)
- **Table Components**: Implement a robust transaction table with sorting and filtering.
- **Search & UI**: Add real-time search functionality and category filter dropdown.
- **Empty States**: Create visually pleasing "No Results" and "No Transactions" states.

## Phase 5: Admin CRUD Implementation (5 Hours)
- **Add Form**: Create a modal/side-sheet for adding results.
- **Edit/Delete Logic**: Build modify/remove functionality with validation and confirmation.
- **Real-time Synchronization**: Ensure all charts/summaries update instantly upon data changes.

## Phase 6: Polish & Verification (3 Hours)
- **Aesthetics**: Add glassmorphism effects, gradients, and micro-animations.
- **Responsive Audit**: Thoroughly test on Mobile, Tablet, and Desktop breakpoints.
- **Documentation**: Finalize README and project-specific instructions.
