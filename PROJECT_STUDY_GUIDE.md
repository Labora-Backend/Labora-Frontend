# Labora Frontend Study Guide

This document explains the project in simple words. It is written for a React beginner who knows HTML, CSS, JavaScript, and basic React, but wants to understand bigger project structure, Redux, routing, API flow, form validation, animations, and reusable components.

## 1. What This Project Is

Labora is a freelancing platform frontend.

It has:

- A public landing page
- Login and register pages
- Role-based dashboards
- Separate flows for client, freelancer, and admin users
- API service files for backend communication
- Redux state for global app data
- React Query for server data loading and caching
- Tailwind CSS for styling
- Framer Motion for animation
- Recharts for dashboard charts

Think of it like this:

```text
Browser
  -> main.tsx
  -> App.tsx
  -> Providers
  -> Router
  -> Page
  -> Feature Components
  -> API / Redux / React Query
```

## 2. Main Technologies

### React

React builds the UI using components.

Example:

```tsx
<DashboardStats stats={data.stats} />
```

This means: render the `DashboardStats` component and give it `stats` data.

### TypeScript

TypeScript is JavaScript with types.

Example:

```ts
interface User {
  id: string
  name: string
  email: string
  role: UserRole
}
```

This tells the project what shape a user object should have.

### Vite

Vite runs and builds the React project.

Important commands:

```bash
npm run dev
npm run build
```

### React Router

React Router decides which page to show for each URL.

Example:

```text
/login              -> Login page
/register           -> Register page
/client/dashboard   -> Client dashboard
/admin/dashboard    -> Admin dashboard
```

### Redux Toolkit

Redux stores global state. Global state means data many parts of the app need.

This project stores:

- Auth/session data
- Notifications
- Chat messages

### React Query

React Query is used for backend data fetching and caching.

Example:

```ts
useClientDashboard()
```

This loads dashboard data and gives loading/error/data states.

### Axios

Axios sends HTTP requests to the backend.

Example:

```ts
api.post('/auth/login/', body)
```

### Tailwind CSS

Tailwind styles elements using utility classes.

Example:

```tsx
<div className="rounded-xl bg-white p-5 shadow-card">
```

Means rounded corners, white background, padding, and shadow.

### Framer Motion

Framer Motion adds animations.

Example:

```tsx
<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
```

Means the div fades in.

## 3. Folder Structure

```text
src/
  app/
    providers/
    router/
    store/

  components/
    common/
    layout/
    ui/

  features/
    auth/
    client/
    landing/
    admin/
    freelancer/

  services/
    api/
    websocket/

  hooks/
  pages/
  styles/
  types/
  utils/
```

### `src/app`

App-level setup lives here.

This includes:

- Redux store
- Providers
- Routes
- Protected routes

### `src/components`

Reusable components live here.

Examples:

- `Button`
- `Card`
- `Badge`
- `Modal`
- `Navbar`
- `Footer`

These are not tied to only one feature.

### `src/features`

Feature-specific code lives here.

Examples:

- Auth feature
- Client dashboard feature
- Landing page feature

This is a common professional React structure.

### `src/services`

API and WebSocket connection code lives here.

The UI should not directly write long API logic. Instead, components call service functions.

### `src/types`

Shared TypeScript types live here.

Types explain data shapes.

### `src/utils`

Small helper functions and constants live here.

Examples:

- Currency formatting
- Date formatting
- Permission checking
- Environment constants

## 4. App Startup Flow

### Step 1: `src/main.tsx`

This is the first React file.

It does these things:

1. Finds the HTML element with id `root`
2. Creates the React app
3. Wraps the app with Redux
4. Wraps the app with React Query
5. Renders `<App />`

Important code idea:

```tsx
<Provider store={store}>
  <QueryProvider>
    <App />
  </QueryProvider>
</Provider>
```

Meaning:

- Redux store is available everywhere
- React Query is available everywhere
- Then the real app starts

### Step 2: `src/App.tsx`

This file adds app-wide providers:

```tsx
<AuthProvider>
  <SocketProvider>
    <AppRouter />
  </SocketProvider>
</AuthProvider>
```

Meaning:

- `AuthProvider` restores login session from localStorage
- `SocketProvider` gives WebSocket base URL
- `AppRouter` shows the correct page

### Step 3: `src/app/router/AppRouter.tsx`

This file defines all routes.

Main routes:

```text
/                              Landing
/login                         LoginPage
/register                      RegisterPage
/client/profile/setup          Client profile setup
/freelancer/profile/setup      Freelancer profile setup
/client/dashboard              Client dashboard
/freelancer/dashboard          Freelancer dashboard
/admin/dashboard               Admin dashboard
/unauthorized                  Unauthorized page
*                               Not found page
```

## 5. Routing and Protected Routes

Some pages should only be visible after login.

For example:

```tsx
<ClientRoute>
  <ClientDashboard />
</ClientRoute>
```

This means:

1. Check if user is logged in
2. Check if user role is `client`
3. If yes, show dashboard
4. If not logged in, go to `/login`
5. If wrong role, go to `/unauthorized`

### Important Files

```text
src/app/router/ProtectedRoute.tsx
src/app/router/ClientRoute.tsx
src/app/router/FreelancerRoute.tsx
src/app/router/AdminRoute.tsx
```

### Beginner Explanation

`ProtectedRoute` is the main guard.

`ClientRoute`, `FreelancerRoute`, and `AdminRoute` are small wrappers around `ProtectedRoute`.

This avoids repeating role-checking code everywhere.

## 6. Redux Store Flow

Redux files are here:

```text
src/app/store/index.ts
src/app/store/authSlice.ts
src/app/store/chatSlice.ts
src/app/store/notificationSlice.ts
```

### `index.ts`

This creates the store:

```ts
reducer: {
  auth: authReducer,
  notifications: notificationReducer,
  chat: chatReducer,
}
```

This means the Redux state looks like:

```text
state.auth
state.notifications
state.chat
```

### `authSlice.ts`

This stores login state.

Important state:

```ts
isAuthenticated
user
role
accessToken
tokens
loading
```

Important actions:

```text
setCredentials  -> save logged-in user and token
hydrateSession  -> restore saved login from localStorage
logout          -> clear user and token
setLoading      -> show loading state
```

### Auth Flow

```text
User submits login form
  -> useAuth hook calls authApi.login()
  -> backend returns user and tokens
  -> Redux dispatches setCredentials()
  -> authSlice saves data in Redux and localStorage
  -> user is redirected to correct dashboard
```

### Why localStorage?

Redux state disappears when the browser refreshes.

`localStorage` stays after refresh.

So this project saves auth data in localStorage and restores it using `hydrateSession`.

## 7. Auth Provider Flow

File:

```text
src/app/providers/AuthProvider.tsx
```

This runs when the app starts:

```ts
dispatch(hydrateSession())
```

Meaning:

- Check localStorage
- If login data exists, put it back into Redux
- User stays logged in after page refresh

## 8. React Query Flow

File:

```text
src/app/providers/QueryProvider.tsx
```

This creates a `QueryClient`.

The app uses React Query for data that comes from the backend.

Example:

```ts
useClientDashboard()
```

This returns:

```text
data
isLoading
isError
```

So components can write:

```tsx
if (isLoading) return <DashboardLoading />
if (isError) return <DashboardError />
return <DashboardContent />
```

### Redux vs React Query

Use Redux for app-wide client state:

- logged-in user
- selected chat room
- notifications in memory

Use React Query for server state:

- dashboard data
- jobs from backend
- applications from backend

## 9. API Flow

Main API setup:

```text
src/services/api/axios.ts
```

This creates one shared Axios instance:

```ts
export const api = axios.create({
  baseURL: API_BASE_URL,
})
```

It also adds the login token automatically:

```ts
config.headers.Authorization = `Bearer ${tokens.accessToken}`
```

Meaning:

- You do not need to manually add token in every API call
- Axios interceptor handles it

### Environment Constants

File:

```text
src/utils/constants.ts
```

Important values:

```ts
API_BASE_URL
WS_BASE_URL
APP_NAME
```

They come from `.env`.

Example:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

## 10. Authentication Feature

Folder:

```text
src/features/auth/
```

Important parts:

```text
pages/
  LoginPage.tsx
  RegisterPage.tsx
  ProfileSetupPage.tsx

components/
  LoginForm.tsx
  RegisterForm.tsx
  AuthInput.tsx
  RoleSelector.tsx
  PasswordStrength.tsx
  ClientProfileFields.tsx
  FreelancerProfileFields.tsx

schemas/
  loginSchema.ts
  registerSchema.ts

services/
  auth.api.ts

hooks/
  useAuth.ts

types/
  auth.ts
```

### Login Page Flow

```text
LoginPage
  -> AuthLayout
  -> LoginForm
  -> useAuth().login()
  -> authApi.login()
  -> Redux setCredentials()
  -> navigate to dashboard
```

### Login Form

File:

```text
src/features/auth/components/LoginForm.tsx
```

It uses:

- `useState` for show/hide password
- `react-hook-form` for form handling
- `zodResolver` for validation
- `useAuth` for login
- `Button` and `AuthInput` reusable components
- `motion.div` for button animation

### Login Validation

File:

```text
src/features/auth/schemas/loginSchema.ts
```

Rules:

- identifier is required
- password must be at least 6 characters
- rememberMe is optional

### Register Page Flow

```text
RegisterPage
  -> AuthLayout
  -> RegisterForm
  -> Step 1 account details
  -> Step 2 role-specific profile details
  -> Step 3 review and terms
  -> useAuth().register()
  -> authApi.register()
  -> Redux setCredentials()
  -> navigate to profile setup
```

### Register Form Steps

File:

```text
src/features/auth/components/RegisterForm.tsx
```

Step 1:

- full name
- username
- email
- password
- confirm password
- role

Step 2:

- if client: company/hiring information
- if freelancer: skills/professional information

Step 3:

- review details
- accept terms
- create account

### Why `watch()` Is Used

React Hook Form `watch()` reads current form values.

Example:

```ts
const selectedRole = watch('role')
```

This helps the form decide whether to show client fields or freelancer fields.

### Why `setValue()` Is Used

When the user changes role, old role fields are cleared.

Example:

If user changes from freelancer to client:

- freelancer skills cleared
- portfolio URL cleared
- professional title cleared

This prevents wrong data from being submitted.

### Zod Validation

File:

```text
src/features/auth/schemas/registerSchema.ts
```

Zod checks rules like:

- full name required
- username minimum length
- valid email
- strong password
- password and confirm password must match
- client must choose industry
- freelancer must add professional title, skills, and experience level
- terms must be accepted

## 11. Auth API

File:

```text
src/features/auth/services/auth.api.ts
```

This file talks to backend endpoints:

```text
/auth/register/
/auth/login/
/auth/logout/
/auth/token/refresh/
/auth/me/
```

### Important Detail: Mock Fallback

The auth API has fallback mock data.

Meaning:

- It first tries backend request
- If backend fails, it returns fake login/register data

That is useful during frontend development because you can test UI even when backend is not ready.

## 12. Landing Page Feature

Main page:

```text
src/pages/Landing.tsx
```

Feature folder:

```text
src/features/landing/
```

Landing page is built by stacking sections:

```tsx
<Navbar />
<HeroSection />
<StatsSection />
<CategoriesSection />
<FreelancersSection />
<HowItWorksSection />
<RealTimeFeaturesSection />
<TestimonialsSection />
<ArticlesSection />
<CTASection />
<Footer />
```

### Beginner Explanation

The landing page does not contain all UI in one big file.

Instead, each section is a separate component.

This makes code easier to read:

- Hero code stays in `HeroSection`
- Stats code stays in `StatsSection`
- Testimonials code stays in `TestimonialsSection`

### Animation

File:

```text
src/features/landing/components/AnimatedSection.tsx
```

This wraps sections with scroll animation.

It uses:

- `useRef` to point to the section
- `useInView` to know when it appears on screen
- `useReducedMotion` for accessibility
- `motion.section` for animation

Simple meaning:

```text
When section comes into view, fade and slide it in.
```

## 13. Client Dashboard Feature

Folder:

```text
src/features/client/
```

Important files:

```text
pages/ClientDashboard.tsx
layout/ClientDashboardLayout.tsx
hooks/useClientDashboard.ts
services/clientDashboard.api.ts
types/dashboard.ts
components/
```

### Client Dashboard Flow

```text
Route /client/dashboard
  -> ClientRoute checks login and role
  -> ClientDashboardLayout renders sidebar and top navbar
  -> ClientDashboard loads data
  -> Dashboard components render cards, charts, jobs, applications, activity
```

### Data Loading

File:

```text
src/features/client/hooks/useClientDashboard.ts
```

It uses React Query:

```ts
useQuery({
  queryKey: ['client-dashboard'],
  queryFn: clientDashboardApi.getDashboard,
})
```

Meaning:

- `queryKey` is the cache name
- `queryFn` is the function that loads data

### Client Dashboard API

File:

```text
src/features/client/services/clientDashboard.api.ts
```

This file contains:

- API endpoints
- mock dashboard data
- functions to fetch dashboard data
- fallback if backend fails

### Client Dashboard Page

File:

```text
src/features/client/pages/ClientDashboard.tsx
```

It handles 3 states:

```tsx
if (isLoading) return <DashboardLoading />
if (isError || !data) return <DashboardError />
return <DashboardUI />
```

This is a very common React pattern.

### Dashboard Components

Examples:

```text
DashboardStats.tsx
JobOverviewChart.tsx
JobStatusChart.tsx
LatestApplications.tsx
QuickActions.tsx
RealTimeActivity.tsx
RecentJobs.tsx
UpcomingDeadlines.tsx
ClientProfileCard.tsx
```

Each component has one job.

Example:

`DashboardStats` only displays stat cards.

`JobOverviewChart` only displays a chart.

`RecentJobs` only displays recent jobs.

This is called component separation.

## 14. Charts

Charts use Recharts.

Example file:

```text
src/features/client/components/JobOverviewChart.tsx
```

It uses:

```tsx
<ResponsiveContainer>
  <BarChart data={data}>
```

Beginner meaning:

- `ResponsiveContainer` makes chart resize with screen
- `BarChart` creates bar chart
- `XAxis` and `YAxis` show chart axes
- `Tooltip` shows hover popup
- `Bar` draws each bar group

## 15. Reusable UI Components

Folder:

```text
src/components/ui/
```

Examples:

```text
Button.tsx
Card.tsx
Badge.tsx
Input.tsx
Modal.tsx
Loader.tsx
Skeleton.tsx
Table.tsx
```

### Why Reusable Components?

Instead of writing button styles again and again, the project has one `Button` component.

Example:

```tsx
<Button variant="primary" size="lg">
  Sign In
</Button>
```

This keeps design consistent.

### Button Component

File:

```text
src/components/ui/Button.tsx
```

It supports:

- variants: primary, secondary, outline, ghost, white, danger
- sizes: sm, md, lg
- full width buttons
- normal button mode
- link mode with `href`

Example as button:

```tsx
<Button type="submit">Submit</Button>
```

Example as link:

```tsx
<Button href="/register">Register</Button>
```

## 16. Layout Components

Folder:

```text
src/components/layout/
```

Examples:

```text
Navbar.tsx
Footer.tsx
Sidebar.tsx
DashboardLayout.tsx
```

Layout components control page structure.

They usually do not contain business logic.

Example:

`DashboardLayout` places:

- Navbar
- Sidebar
- Main content
- Footer

## 17. TypeScript Types

Types make the data clear.

Example file:

```text
src/features/client/types/dashboard.ts
```

It defines dashboard data:

```ts
export interface ClientDashboardData {
  stats: DashboardStats
  jobOverview: JobOverviewPoint[]
  jobStatus: JobStatusSlice[]
  recentJobs: RecentJob[]
  latestApplications: LatestApplication[]
  realTimeActivity: RealTimeActivityItem[]
  upcomingDeadlines: UpcomingDeadline[]
  profile: ClientProfileSummary
  unreadNotifications: number
  unreadMessages: number
}
```

This helps you understand what data the dashboard expects.

### How to Read Types

```ts
name: string
```

Means name must be text.

```ts
jobsPosted: number
```

Means jobsPosted must be a number.

```ts
recentJobs: RecentJob[]
```

Means recentJobs is an array of `RecentJob` objects.

## 18. Styling System

Main styling files:

```text
src/styles/tailwind.css
src/styles/globals.css
tailwind.config.js
```

### Tailwind Config

File:

```text
tailwind.config.js
```

This project defines custom colors:

```text
primary      purple
secondary    cyan
background   light gray
text         dark slate
success      green
```

So you can write:

```tsx
className="bg-primary text-white"
```

Instead of:

```tsx
style={{ backgroundColor: '#7C3AED', color: 'white' }}
```

## 19. Animation Patterns

This project uses Framer Motion.

Common animation props:

```tsx
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.4 }}
```

Meaning:

- Start invisible and slightly lower
- Animate to visible and normal position
- Take 0.4 seconds

### AnimatePresence

Used in register form.

It helps animate components when they enter or leave.

Example:

```tsx
<AnimatePresence mode="wait">
  {step === 1 && <motion.div />}
  {step === 2 && <motion.div />}
</AnimatePresence>
```

Meaning:

- When user moves from step 1 to step 2
- Old step animates out
- New step animates in

## 20. Hooks

Hooks are reusable logic.

Examples:

```text
src/hooks/useAuth.ts
src/hooks/useDebounce.ts
src/hooks/usePagination.ts
src/hooks/useSocket.ts
src/features/client/hooks/useClientDashboard.ts
src/features/landing/hooks/useAnimatedCounter.ts
src/features/landing/hooks/useSectionLoading.ts
```

### Custom Hook Idea

A custom hook is a function that uses React features and returns useful logic/data.

Example:

```ts
const { data, isLoading } = useClientDashboard()
```

This hides the React Query code from the component.

The component only cares about the result.

## 21. WebSocket Setup

Files:

```text
src/app/providers/SocketProvider.tsx
src/services/websocket/socket.ts
src/services/websocket/chatSocket.ts
src/hooks/useSocket.ts
```

The provider gives the WebSocket base URL to the app.

This is used for real-time features like:

- chat
- notifications
- activity updates

Current project has placeholders/foundation for WebSockets.

## 22. Admin and Freelancer

Files:

```text
src/features/admin/AdminDashboard.tsx
src/features/freelancer/FreelancerDashboard.tsx
```

These are role-specific dashboard pages.

They are protected by:

```text
AdminRoute
FreelancerRoute
```

The app is already structured so these areas can grow later.

## 23. Important Project Patterns

### Pattern 1: Page Component

A page is connected to a route.

Example:

```text
/login -> LoginPage
```

Pages usually arrange layouts and feature components.

### Pattern 2: Feature Folder

Code for one feature stays together.

Example:

```text
features/auth/
  components/
  hooks/
  pages/
  schemas/
  services/
  types/
```

This is better than putting all components in one huge folder.

### Pattern 3: Service File

API calls stay in service files.

Example:

```text
auth.api.ts
clientDashboard.api.ts
```

Components should not contain long backend request logic.

### Pattern 4: Type File

Types describe the shape of data.

This makes code easier to understand and safer.

### Pattern 5: Small Components

Big UI is split into smaller parts.

Example:

```text
ClientDashboard
  -> DashboardStats
  -> JobOverviewChart
  -> RecentJobs
  -> LatestApplications
```

Each file becomes easier to study.

## 24. How to Study This Project

Use this order:

1. Start with `src/main.tsx`
2. Read `src/App.tsx`
3. Read `src/app/router/AppRouter.tsx`
4. Read route guards in `src/app/router/`
5. Read Redux store in `src/app/store/`
6. Read auth flow in `src/features/auth/`
7. Read landing page in `src/pages/Landing.tsx`
8. Read client dashboard in `src/features/client/`
9. Read UI components in `src/components/ui/`
10. Read utility functions in `src/utils/`

## 25. Best Files for Learning

### For App Flow

```text
src/main.tsx
src/App.tsx
src/app/router/AppRouter.tsx
```

### For Redux

```text
src/app/store/index.ts
src/app/store/authSlice.ts
```

### For Login/Register

```text
src/features/auth/components/LoginForm.tsx
src/features/auth/components/RegisterForm.tsx
src/features/auth/hooks/useAuth.ts
src/features/auth/services/auth.api.ts
```

### For Forms and Validation

```text
src/features/auth/schemas/loginSchema.ts
src/features/auth/schemas/registerSchema.ts
```

### For Dashboard Data

```text
src/features/client/hooks/useClientDashboard.ts
src/features/client/services/clientDashboard.api.ts
src/features/client/pages/ClientDashboard.tsx
```

### For Charts

```text
src/features/client/components/JobOverviewChart.tsx
src/features/client/components/JobStatusChart.tsx
```

### For Animation

```text
src/features/landing/components/AnimatedSection.tsx
src/features/auth/components/RegisterForm.tsx
src/features/client/pages/ClientDashboard.tsx
```

### For Reusable Components

```text
src/components/ui/Button.tsx
src/components/ui/Card.tsx
src/components/ui/Badge.tsx
```

## 26. Simple Feature Flow Examples

### Example: Login

```text
User opens /login
  -> AppRouter shows LoginPage
  -> LoginPage renders AuthLayout and LoginForm
  -> User fills form
  -> React Hook Form collects values
  -> Zod validates values
  -> useAuth.login sends request
  -> authApi.login calls backend
  -> Redux stores user
  -> navigate to role dashboard
```

### Example: Client Dashboard

```text
User opens /client/dashboard
  -> ClientRoute checks auth and role
  -> ClientDashboardLayout shows sidebar and top nav
  -> ClientDashboard calls useClientDashboard
  -> React Query calls clientDashboardApi.getDashboard
  -> Dashboard shows loading skeleton
  -> Data arrives
  -> Stats, charts, jobs, applications, activity render
```

### Example: Landing Page Animation

```text
Landing page renders sections
  -> Each section uses AnimatedSection
  -> Framer Motion checks if section is visible
  -> Section fades/slides into view
```

## 27. Common Beginner Confusions

### Why are there so many files?

Because big projects split code by responsibility.

One file should not do everything.

### Why are there two `useAuth` files?

There is:

```text
src/hooks/useAuth.ts
src/features/auth/hooks/useAuth.ts
```

The shared one simply reads auth state from Redux.

The feature one has login, register, logout, navigation, and mutations.

### Why use Redux and localStorage?

Redux makes auth data available while the app is running.

localStorage keeps auth data after refresh.

### Why use React Query if Redux exists?

React Query is better for backend data because it handles:

- loading state
- error state
- caching
- refetching

Redux is better for app UI/session state.

### Why use Zod?

Zod keeps validation rules separate from JSX.

Instead of manually writing many `if` checks inside the component, schemas hold the rules.

### Why use mock fallback data?

So frontend pages can be built and tested even when backend APIs are not ready.

## 28. Mental Model

When you open any feature, ask:

1. What route shows this feature?
2. What page component starts it?
3. Does it use a layout?
4. Does it fetch data?
5. Does it use Redux?
6. Does it use React Query?
7. Which small components render the UI?
8. Which types describe the data?
9. Which service talks to backend?

If you answer these questions, you can understand most professional React codebases.

## 29. Mini Glossary

### Component

A reusable piece of UI.

### Props

Data passed from parent component to child component.

### State

Data that can change and cause UI to update.

### Hook

A function that uses React features like state, effects, context, or external libraries.

### Provider

A wrapper component that makes some data/tool available to child components.

### Route

A URL path connected to a page.

### Guard

A component that checks permission before showing a page.

### Slice

A Redux Toolkit file that contains state and actions for one part of Redux.

### Mutation

A React Query action that changes data, like login/register/post/update/delete.

### Query

A React Query action that reads data, like dashboard/jobs/applications.

### Schema

A validation definition that describes what form data is allowed.

## 30. Final Advice

Do not try to understand the whole project in one sitting.

Study one flow at a time:

1. Login flow
2. Register flow
3. Landing page flow
4. Client dashboard flow
5. Redux store
6. API services
7. Animations

After each flow, write a small comment in your own words:

```text
This file exists because...
This component receives...
This function returns...
This state changes when...
```

That habit will make advanced React code much easier.
