# Finance Dashboard - User Flow

## 1. Initial Access & Role Selection
- **Role Toggle**: At the top right of the dashboard, the user can toggle between **Viewer** and **Admin**. 
  - *Default*: Admin (for testing convenience) or Viewer (for security).
- **Immediate State Update**: When the role changes, the global state updates via Context API, and UI elements (buttons/forms) instantly show or hide.

## 2. Dashboard Interaction (Main View)
- **Data Load**: On mount, the application reads the mock data or state-stored transactions.
- **Summary Cards**: Displays Total Balance, Income, and Expenses. Large font sizes (32px Bold) accentuate these totals.
- **Trend Visualization**: A line chart shows the balance over the last 3 months, based on the `date` of each transaction.
- **Spending Distribution**: A donut chart shows categorized expenses, giving the user immediate visual feedback on their top spending areas.

## 3. Transactions & Data Filtering
- **Search**: User types into the search bar; the list filters by description or category in real-time.
- **Type Toggle**: User clicks "Income" or "Expense" tabs to filter the list accordingly.
- **Category Select**: A dropdown allows narrowing down specific categories (e.g., "Dining Out", "Salary").
- **Sort**: Clicking column headers (Date, Amount) sorts the list.

## 4. Admin Operations (CRUD Flow)
- **Add Action**: Admin clicks "+ Add Transaction". A modal or side-form appears.
  - *Validation*: Ensures date is valid, amount > 0, and category is selected.
- **Edit Action**: Admin clicks pencil icon on a row. Form pre-fills with existing data.
- **Delete Action**: Admin clicks trash icon. A confirmation modal appears.
- **Real-time Recalculation**: After any CRUD operation, the Summary Cards and Charts automatically update to reflect the new data state.

## 5. Insights Analysis
- **Auto-Calculations**: The "Insights" section computes:
  - Highest spending category (e.g. "Rent" is $1800).
  - Monthly comparison indicators.
  - Savings rate percentage.
