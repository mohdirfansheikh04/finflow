----------------------------------------------------------------------------

# FinFlow — Personal Finance Dashboard

----------------------------------------------------------------------------

## Project Title
**FinFlow — Personal Finance Dashboard**

-----------------------------------------------------------------------------

## Brief One Line Summary
A fully interactive personal finance web app with real-time transaction tracking, AI-derived insights, role-based access control, and localStorage persistence — built with React, Tailwind CSS, and Recharts.

-----------------------------------------------------------------------------

## Overview
FinFlow is a production-grade personal finance dashboard that lets users track income and expenses, visualise spending patterns, manage budgets, and analyse financial trends — all without a backend. The entire app runs in the browser with data persisted to localStorage. It features five fully functional pages: Dashboard, Transactions, Insights, Settings, and Profile, connected through a shared context layer and a role-based permission system that dynamically gates UI features across Viewer, Admin, and Analyst roles.

-----------------------------------------------------------------------------

## Problem Statement
Most personal finance tools are either too simple (basic spreadsheets) or too complex (bank-integrated SaaS products requiring accounts and APIs). There is a clear gap for a self-contained, privacy-first finance tracker that works offline, requires no backend, stores nothing on a server, and still delivers a polished, data-rich experience. Users also need granular control over who can view versus edit financial data — especially in shared or family finance contexts. FinFlow solves all of this in a single-page React application.

-----------------------------------------------------------------------------
## Project Structure
finflow/
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/
│   │   └── avatar.jpg
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Topbar.jsx
│   │   │   └── AppLayout.jsx
│   │   │
│   │   ├── ui/
│   │   │   ├── Badge.jsx
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Toggle.jsx
│   │   │   ├── Dropdown.jsx
│   │   │   └── Modal.jsx
│   │   │
│   │   ├── dashboard/
│   │   │   ├── StatCard.jsx
│   │   │   ├── BalanceTrendChart.jsx
│   │   │   ├── SpendingDonutChart.jsx
│   │   │   ├── RecentTransactions.jsx
│   │   │   ├── QuickActions.jsx
│   │   │   └── BudgetProgress.jsx
│   │   │
│   │   ├── transactions/
│   │   │   ├── TransactionTable.jsx
│   │   │   ├── TransactionRow.jsx
│   │   │   ├── TransactionFilters.jsx
│   │   │   └── TransactionStats.jsx
│   │   │
│   │   ├── insights/
│   │   │   ├── InsightCard.jsx
│   │   │   ├── IncomeExpensesChart.jsx
│   │   │   ├── SpendingByCategory.jsx
│   │   │   ├── SavingsRate.jsx
│   │   │   └── UpcomingBills.jsx
│   │   │
│   │   ├── settings/
│   │   │   ├── RolePermissions.jsx
│   │   │   ├── DisplayPreferences.jsx
│   │   │   ├── DataManagement.jsx
│   │   │   ├── AccountInfo.jsx
│   │   │   ├── NotificationSettings.jsx
│   │   │   └── StorageStatus.jsx
│   │   │
│   │   └── add-transaction/
│   │       └── AddTransactionModal.jsx
│   │
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Transactions.jsx
│   │   ├── Insights.jsx
│   │   ├── Settings.jsx
│   │   └── Profile.jsx
│   │
│   ├── hooks/
│   │   ├── useTransactions.js
│   │   ├── useTheme.js
│   │   └── useLocalStorage.js
│   │
│   ├── context/
│   │   ├── ThemeContext.jsx
│   │   ├── TransactionContext.jsx
│   │   └── AuthContext.jsx
│   │
│   ├── data/
│   │   └── mockData.js
│   │
│   ├── utils/
│   │   ├── formatCurrency.js
│   │   ├── formatDate.js
│   │   └── calculations.js
│   │
│   ├── constants/
│   │   ├── categories.js
│   │   ├── roles.js
│   │   └── routes.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── package.json

----------------------------------------------------------------------------------------

## Dataset
FinFlow uses a hand-crafted mock dataset of **248 realistic transactions** spanning **July 2024 to June 2025** across 14 categories:

- **Income types:** Salary (monthly $8,500), Freelance payments, Dividend income, Interest income, Year-end bonus
- **Expense types:** Housing (rent $1,800/mo), Food & Dining, Transport, Entertainment, Health, Shopping, Utilities, Insurance, Education, Travel
- **Payment methods:** Visa, Mastercard, Chase Bank Transfer, PayPal, Auto-pay, Brokerage, Cash, Zelle
- **Special attributes:** `isRecurring` flag, subtitle (payment method detail), notes per transaction

All data is seeded from `mockData.js` and stored/retrieved from `localStorage` under the key `finflow_transactions`. Users can also import their own JSON/CSV data through the Settings page.

-----------------------------------------------------------------------------

## Tools and Technologies

|       Category        |                  Technology                           |
|-----------------------|-------------------------------------------------------|
|       UI Design       |                Figma                                  |
|       Framework       |              React 18 (Vite)                          |
|       Styling         |     Tailwind CSS v3 with custom config                |
|        Charts         | Recharts (AreaChart, BarChart, ComposedChart,PieChart)|                                                            
|       Routing         |                React Router v6                        |
|        Icons          |                 Lucide React                          |
|     State Management  |         React Context API + useReducer                |
|     Persistence       |              Browser localStorage                     |
|     Utilities         | clsx, Intl.NumberFormat, Intl.DateTimeFormat          |
|     Build Tool        |                     Vite                              |
|     Language          |                JavaScript (JSX)                       |
|     Fonts             | DM Sans + JetBrains Mono (Google Fonts)               |
---------------------------------------------------------------------------------

## Methods

**Architecture:** The app follows a layered architecture — raw data lives in `mockData.js`, business logic lives in three React Contexts (`ThemeContext`, `AuthContext`, `TransactionContext`), presentation logic lives in custom hooks (`useTransactions`, `useLocalStorage`), and pure calculations live in `utils/calculations.js` with no React dependencies.

**State Management:** `TransactionContext` uses `useReducer` with five action types (ADD, EDIT, DELETE, RESET, SET). Every state change auto-persists via `useEffect`. All expensive derivations (totals, budget progress, monthly summary, category breakdowns) are `useMemo`-wrapped so they only recompute when transactions change.

**Role System:** Three roles (Viewer, Admin, Analyst) are defined in a static permission matrix in `constants/roles.js`. `AuthContext` exposes `can(permission)` and `canFull(permission)` helpers that gate UI elements app-wide — buttons disable, inputs grey out, and actions block silently based on the active role.

**Filtering & Pagination:** The `useTransactions` hook wraps the context and adds local state for search, category, type, date range, sort field/direction, and page. All filtering and sorting runs inside a single `useMemo` pipeline, and every filter setter resets the page to 1 to prevent empty result pages.

**Charting:** Dashboard uses an `AreaChart` with dual series (Balance + Income) and a `ReferenceDot` on the peak value. Insights uses a `ComposedChart` combining grouped `Bar` (Income vs Expenses) with a dashed `Line` (Net Savings), switchable to `AreaChart` mode via a toggle button.

-----------------------------------------------------------------------------

## Key Insights
From the 248-transaction dataset (July 2024 – June 2025):

- **Total income over 12 months:** ~$113,050 (salary + freelance + investments)
- **Total expenses over 12 months:** ~$55,400
- **Net savings over 12 months:** ~$57,650 — a savings rate of approximately **51%**, exceeding the 50% target
- **Largest single transaction:** $8,500 salary deposit (monthly recurring)
- **Highest spending category:** Housing at 37.4% of monthly expenses ($1,800/month rent)
- **Second highest:** Food & Dining at 22% ($1,060/month across groceries + dining)
- **Most volatile category:** Travel — spikes in August 2024 ($1,240) and December 2024 ($840) during vacation seasons
- **Recurring costs:** 7 fixed recurring expenses (rent, Netflix, Spotify, gym, insurance, electric, internet) account for roughly 65% of all monthly expenses
- **MoM expense trend:** Expenses decreased 3.2% from May to June 2025 ($4,980 → $4,820), suggesting improving spend discipline
- **Average daily spend:** $160.67 over the trailing 30-day period

-----------------------------------------------------------------------------

## Dashboard / Model / Output

FinFlow produces five interconnected output views:

**Dashboard** — Three stat cards (Total Balance, Monthly Income, Monthly Expenses) with SVG sparklines, a 6-month AreaChart for balance trend, a donut chart for spending by category, a recent transactions list, a 2×2 quick actions grid, and budget progress bars for the top 3 categories.

**Transactions** — A full paginated data table (10 per page, 248 total) with search, category filter, type filter, date range, and sort controls. Each row shows a category icon, description, subtitle, type badge, date, signed amount, and hover-reveal edit/delete actions. Bulk checkbox selection and CSV export are included.

**Insights** — Four derived metric cards (top spending category, MoM expense change, biggest transaction, avg daily spend), an Income vs Expenses grouped bar chart with net savings overlay, a spending-by-category breakdown with proportional bars, a circular savings rate gauge, and an upcoming recurring bills panel.

**Settings** — A role permission matrix table (Viewer/Admin/Analyst × 9 permissions), display preference toggles (dark mode, compact view, currency format, date format), data management with localStorage usage bar and import/export/clear actions, and a right panel with account info, notification toggles, and per-key storage status.

**Profile** — A hero card with avatar, stats summary (transaction count, savings rate, income/expense record counts), editable name and email fields, account detail rows, and a current month financial summary.

-----------------------------------------------------------------------------

## How to Run this Project

**Prerequisites:** Node.js 18+ and npm

```bash
# 1. Clone or create the project
npm create vite@latest finflow -- --template react
cd finflow

# 2. Install dependencies
npm install react-router-dom recharts lucide-react clsx
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 3. Replace generated files with FinFlow source files
#    (copy all files from the repository into src/)

# 4. Start the development server
npm run dev
```

The app will open at `http://localhost:5173`. No API keys, no backend, no environment variables required. All data is generated from `mockData.js` on first load and persisted to `localStorage` automatically.

To reset all data, go to **Settings → Data Management → Clear All Data** (requires Admin role).

-----------------------------------------------------------------------------

## Results & Conclusion
FinFlow successfully demonstrates that a production-quality, data-rich finance dashboard can be built entirely in the browser with no backend infrastructure. The app handles 248 transactions with instant filtering, sorting, and pagination, renders five chart types using Recharts, enforces a three-tier role permission system, and persists all state across sessions through localStorage — all within a clean, dark-themed UI that closely matches the original Figma-style designs.

The role system proved especially effective — switching from Viewer to Admin or Analyst instantly gates/ungates transaction creation, data export, settings management, and danger-zone actions across every page without any page reload. The context-first architecture kept component code clean, with most pages under 80 lines after extracting logic into hooks.

The main limitation is localStorage's ~5MB cap, which would limit the app to roughly 50,000 transactions before storage pressure becomes a concern. A real deployment would swap the localStorage layer for a lightweight backend (e.g. Supabase or Firebase) with minimal changes to `TransactionContext`.

-----------------------------------------------------------------------------

## Future Work
- **Authentication** — Replace the mock user profile with real sign-in (Supabase Auth or Firebase) so multiple users can have isolated data
- **Bank API integration** — Connect to Plaid or a similar open banking API to auto-import real transactions
- **AI categorisation** — Use an LLM to auto-categorise imported transactions and flag anomalies
- **Recurring bill prediction** — Detect recurring patterns automatically rather than relying on the `isRecurring` flag
- **Mobile app** — Wrap the React app in Capacitor or build a React Native equivalent for iOS/Android
- **Multi-currency support** — Real-time exchange rates via an open API for users with income/expenses in multiple currencies
- **Shared budgets** — Multi-user household mode where Viewer and Admin roles map to family members
- **PDF/Excel reports** — One-click monthly or annual report generation for tax or auditing purposes
- **Dark/light theme parity** — Currently only dark mode is fully designed; a complete light theme would improve accessibility

-----------------------------------------------------------------------------

## Author & Contact

## 👨‍💻 Author

**Mohd Irfan**  
BCA Student | MERN Stack Developer  

## 📞 Contact

- 📧 Email: 📧 Email: [mohdirfan.webdev@gmail.com](mailto:mohdirfan.webdev@gmail.com)
- 🔗 GitHub: [https://github.com/mohdirfansheikh04](https://github.com/mohdirfansheikh04)  
- 💼 LinkedIn: [https://www.linkedin.com/in/mohd-irfan-a7129a2a2/](https://www.linkedin.com/in/mohd-irfan-a7129a2a2/)

------------------------------------------------------------------------------------------
## Project Preview
**Dashboard**
<img width="1917" height="907" alt="Screenshot 2026-04-06 181538" src="https://github.com/user-attachments/assets/f729a6de-0edb-4a41-8c6d-f7dd6d7b52b1" />
**Transaction**
<img width="1919" height="907" alt="Screenshot 2026-04-06 181556" src="https://github.com/user-attachments/assets/ff27adde-0c7c-475a-8e0f-df8364ec2eeb" />
**Insights**
<img width="1919" height="909" alt="Screenshot 2026-04-06 181610" src="https://github.com/user-attachments/assets/cb9e15ca-7b83-4084-9a4e-767e05d32182" />
**Add Transaction**
<img width="1912" height="903" alt="Screenshot 2026-04-06 181623" src="https://github.com/user-attachments/assets/258c36b1-900c-4f75-b127-5b6722734541" />
**Settings**
<img width="1916" height="914" alt="Screenshot 2026-04-06 181734" src="https://github.com/user-attachments/assets/9db6a8b4-72bd-4fe6-9384-d24a2483982c" />
**Profile**
<img width="1919" height="909" alt="Screenshot 2026-04-06 181756" src="https://github.com/user-attachments/assets/821f81a1-9f8a-467a-98e3-aaa44e6366fb" />
-----------------------------------------------------------------------------------------------




