# TSX UI Code Explanation Guide

This guide explains the `.tsx` UI-building files in this project.

Use it while opening the code in your editor. For each file, read the file first, then read the matching explanation here.

This guide focuses on:

- What the file does
- Why each important block exists
- What happens when the code runs
- How to customize it
- What to study as a beginner

## How To Read Any TSX File

Most `.tsx` files in this project follow this pattern:

```tsx
import something

type or interface for props

helper data or helper function

export function ComponentName(props) {
  local state / hooks

  return (
    JSX UI
  )
}
```

### Import Lines

Example:

```tsx
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
```

Why used:

- Imports bring code from another file or package.
- `motion` is used for animation.
- `Button` is a reusable project button.

What happens:

- When this component renders, it can use imported things.

How to customize:

- Add a new import when you need another component, icon, hook, or helper.

### Props Interface

Example:

```tsx
interface ButtonProps {
  variant?: 'primary' | 'outline'
  children: React.ReactNode
}
```

Why used:

- Props define what data the parent can pass into the component.
- TypeScript checks if you pass the wrong data.

What happens:

- Parent component passes props.
- Child component reads props and renders UI.

How to customize:

- Add a new prop when the component needs a new option.

### State

Example:

```tsx
const [showPassword, setShowPassword] = useState(false)
```

Why used:

- State stores data that changes inside a component.

What happens:

- When `setShowPassword` runs, React re-renders the component.

How to customize:

- Add state for UI behavior like open/close, selected tab, input value, menu state.

### Return JSX

Example:

```tsx
return <div className="p-4">Hello</div>
```

Why used:

- JSX describes what appears on screen.

What happens:

- React converts JSX into browser DOM elements.

How to customize:

- Change text, Tailwind classes, components, layout, or conditions.

## App Entry Files

### `src/main.tsx`

Purpose:

- This is the first React file that runs.
- It connects React to `index.html`.

Important flow:

```tsx
createRoot(document.getElementById('root')!).render(...)
```

Why used:

- `document.getElementById('root')` finds the root div in `index.html`.
- `createRoot` tells React where to render the app.

What happens:

- The browser loads `index.html`.
- React takes control of the `root` element.
- The whole app appears inside that root.

Important wrappers:

```tsx
<Provider store={store}>
  <QueryProvider>
    <App />
  </QueryProvider>
</Provider>
```

Why used:

- `Provider` gives Redux state to all components.
- `QueryProvider` gives React Query cache to all components.
- `App` is the main project component.

How to customize:

1. Add a new global provider here if it must wrap the whole app.
2. Keep provider order carefully. If a provider needs Redux, put it inside Redux provider.
3. Do not put page UI here. Use routes and pages.

### `src/App.tsx`

Purpose:

- Adds top-level app providers and router.

Important flow:

```tsx
<AuthProvider>
  <SocketProvider>
    <AppRouter />
  </SocketProvider>
</AuthProvider>
```

Why used:

- `AuthProvider` restores user login from localStorage.
- `SocketProvider` prepares WebSocket connection information.
- `AppRouter` decides which page to show.

What happens:

- App starts.
- Auth session is hydrated.
- WebSocket base URL is available.
- Router displays the correct screen.

How to customize:

1. Add app-wide providers here.
2. Add new pages in `AppRouter`, not here.
3. Keep this file small.

## Provider Files

### `src/app/providers/AuthProvider.tsx`

Purpose:

- Restore saved login data when the app opens.

Important lines:

```tsx
const dispatch = useAppDispatch()
```

Why used:

- Gets Redux dispatch function.

```tsx
useEffect(() => {
  dispatch(hydrateSession())
}, [dispatch])
```

Why used:

- Runs once when provider mounts.
- Calls Redux action to read auth data from localStorage.

What happens:

- If `labora_auth` exists in localStorage, user becomes logged in again after refresh.

How to customize:

1. Add token refresh logic here if needed.
2. Add loading screen if auth restore becomes async.
3. Keep only auth-startup logic here.

### `src/app/providers/QueryProvider.tsx`

Purpose:

- Set up React Query for API data.

Important block:

```tsx
const [queryClient] = useState(() => new QueryClient(...))
```

Why used:

- Creates one stable query client.
- `useState` prevents creating a new client on every render.

Default options:

```tsx
refetchOnWindowFocus: false
staleTime: 60_000
```

Meaning:

- Do not refetch just because browser tab gets focus.
- Data is considered fresh for 60 seconds.

How to customize:

1. Change `staleTime` if data should refresh faster or slower.
2. Turn `refetchOnWindowFocus` on for real-time dashboards.
3. Add global retry settings if API is unstable.

### `src/app/providers/SocketProvider.tsx`

Purpose:

- Provide WebSocket base URL to the app.

Important block:

```tsx
export const SocketContext = createContext<SocketContextValue | null>(null)
```

Why used:

- Creates a React context.

```tsx
const value = useMemo(() => ({ wsBaseUrl: WS_BASE_URL }), [])
```

Why used:

- Keeps the context value stable.

What happens:

- Child components can read WebSocket base URL through context.

How to customize:

1. Add connection status here.
2. Add current socket instance here only if many components need it.
3. Use `useSocket` hook to consume this context.

## Router Files

### `src/app/router/AppRouter.tsx`

Purpose:

- Defines every app URL and which component it renders.

Important block:

```tsx
const router = createBrowserRouter([...])
```

Why used:

- React Router uses this route list to match URLs.

Example:

```tsx
{ path: '/login', element: <LoginPage /> }
```

Meaning:

- When browser URL is `/login`, show `LoginPage`.

Protected route example:

```tsx
{
  path: '/client/dashboard',
  element: (
    <ClientRoute>
      <ClientDashboardLayout>
        <ClientDashboard />
      </ClientDashboardLayout>
    </ClientRoute>
  ),
}
```

Meaning:

- First check user is a client.
- Then show dashboard layout.
- Then show dashboard page inside layout.

How to customize:

1. Add new route object for a new page.
2. Wrap private pages with `ProtectedRoute` or role route.
3. Use layouts around pages that need sidebar/nav.

### `src/app/router/ProtectedRoute.tsx`

Purpose:

- Prevent unauthenticated or wrong-role users from opening private pages.

Important lines:

```tsx
const { isAuthenticated, user } = useAuth()
```

Why used:

- Reads auth state from Redux.

```tsx
if (!isAuthenticated) {
  return <Navigate to="/login" replace state={{ from: location }} />
}
```

Meaning:

- If user is not logged in, redirect to login.

```tsx
if (allowedRoles && !hasRole(user?.role, allowedRoles)) {
  return <Navigate to="/unauthorized" replace />
}
```

Meaning:

- If user role is not allowed, redirect to unauthorized.

How to customize:

1. Add profile-completion checks here if every private page needs it.
2. Add loading UI if auth state becomes async.
3. Keep role logic in helper functions like `hasRole`.

### `src/app/router/ClientRoute.tsx`

Purpose:

- Short wrapper for client-only pages.

Important line:

```tsx
return <ProtectedRoute allowedRoles={['client']}>{children}</ProtectedRoute>
```

Meaning:

- Only logged-in clients can see children.

How to customize:

- Add more roles if a page should be shared.

### `src/app/router/FreelancerRoute.tsx`

Purpose:

- Short wrapper for freelancer-only pages.

Important line:

```tsx
allowedRoles={['freelancer']}
```

How to customize:

- Use this wrapper around freelancer routes.

### `src/app/router/AdminRoute.tsx`

Purpose:

- Short wrapper for admin-only pages.

How to customize:

- Use this wrapper around admin routes.

## Page Files

### `src/pages/Landing.tsx`

Purpose:

- Builds the public home page by stacking landing sections.

Important flow:

```tsx
<Navbar />
<HeroSection />
<StatsSection />
...
<Footer />
```

Why used:

- Each page section is split into a separate component.

What happens:

- Browser shows navbar, hero, stats, categories, testimonials, CTA, footer.

How to customize:

1. Reorder sections by moving component lines.
2. Remove a section by deleting its JSX line.
3. Add a new section by creating a component and importing it.

### `src/pages/Login.tsx`

Purpose:

- Compatibility/public login page file.

What it usually does:

- Points to the feature login page or renders login UI.

How to customize:

- Keep actual login form logic inside `features/auth`.

### `src/pages/Register.tsx`

Purpose:

- Compatibility/public register page file.

How to customize:

- Keep real register form inside `features/auth`.

### `src/pages/Unauthorized.tsx`

Purpose:

- Shows message when user has no permission.

What happens:

- `ProtectedRoute` sends wrong-role users here.

How to customize:

1. Add a button back to home.
2. Add role-specific help message.
3. Keep it simple.

### `src/pages/NotFound.tsx`

Purpose:

- Shows 404 page for unknown URLs.

What happens:

- Route `*` in `AppRouter` catches unmatched URLs.

How to customize:

1. Add home button.
2. Add support link.
3. Add illustration or simple empty state.

## Layout Components

### `src/components/layout/Navbar.tsx`

Purpose:

- Top navigation for public pages and shared layouts.

Common parts:

- Logo
- Navigation links
- Login/register buttons
- Mobile menu if implemented

How to customize:

1. Change nav links in link arrays or JSX.
2. Change logo text/icon.
3. Add active route styling using `NavLink`.
4. Add user dropdown after login.

### `src/components/layout/Footer.tsx`

Purpose:

- Bottom site footer.

Common parts:

- Brand info
- Link groups
- Copyright

How to customize:

1. Add new footer links.
2. Update copyright text.
3. Add social icons.

### `src/components/layout/Sidebar.tsx`

Purpose:

- Sidebar for dashboard-style pages.

How to customize:

1. Add menu item data.
2. Add active route highlighting.
3. Add collapse behavior if needed.

### `src/components/layout/DashboardLayout.tsx`

Purpose:

- Shared layout for admin and freelancer dashboards.

Important flow:

```tsx
<Navbar />
<Sidebar />
<main>{children}</main>
<Footer />
```

Why used:

- Lets multiple dashboard pages share the same page frame.

How to customize:

1. Change `max-w-6xl` to make dashboard wider.
2. Replace `Navbar` with dashboard-specific navbar.
3. Add breadcrumbs above `{children}`.

## Reusable UI Components

### `src/components/ui/Button.tsx`

Purpose:

- One reusable button for the whole app.

Important types:

```tsx
type ButtonVariant = 'primary' | 'secondary' | 'outline' | ...
type ButtonSize = 'sm' | 'md' | 'lg'
```

Why used:

- Limits button styles to known variants.

Important style objects:

```tsx
const variantClasses = {...}
const sizeClasses = {...}
```

Why used:

- Maps props to Tailwind classes.

Important function:

```tsx
function buildClassName(...)
```

Why used:

- Combines base, variant, size, full width, and custom class.

Important render choice:

```tsx
if ('href' in props && props.href) {
  return <Link to={props.href} ...>
}
```

Meaning:

- If `href` exists, render React Router link.
- Otherwise render normal HTML button.

How to customize:

1. Add a new variant to `ButtonVariant`.
2. Add matching classes to `variantClasses`.
3. Add a new size to `ButtonSize`.
4. Use `<Button href="/path">` for navigation.
5. Use `<Button type="submit">` inside forms.

### `src/components/ui/Card.tsx`

Purpose:

- Reusable white panel/card.

Important props:

```tsx
hover?: boolean
padding?: 'none' | 'sm' | 'md' | 'lg'
```

Why used:

- Same card can be static or hover animated.
- Same card can use different padding.

What happens:

- Component renders a `div`.
- Children are placed inside.

How to customize:

1. Change border radius in class `rounded-2xl`.
2. Add new padding option in `paddingClasses`.
3. Set `hover` to true for interactive cards.

### `src/components/ui/Badge.tsx`

Purpose:

- Small label/status pill.

Important props:

```tsx
variant?: BadgeVariant
dot?: boolean
```

Why used:

- Variant controls color.
- Dot shows live/status indicator.

What happens:

- If `dot` is true, it renders a small animated ping dot.

How to customize:

1. Add new variant to `BadgeVariant`.
2. Add matching classes in `badgeClasses`.
3. Change dot color from success to another status.

### `src/components/ui/Input.tsx`

Purpose:

- Simple labeled input.

Important props:

```tsx
label: string
error?: string
```

Why used:

- Always shows label.
- Shows error only when error exists.

How to customize:

1. Add `hint` prop if you want helper text.
2. Change focus ring classes.
3. Use this for simple forms outside auth.

### `src/components/ui/Modal.tsx`

Purpose:

- Reusable popup window.

Important line:

```tsx
if (!isOpen) return null
```

Why used:

- If modal is closed, render nothing.

Important props:

```tsx
title
isOpen
onClose
children
```

What happens:

- Parent controls open/close state.
- Modal calls `onClose` when close button is clicked.

How to customize:

1. Add backdrop click close.
2. Add escape-key close.
3. Add sizes like `sm`, `md`, `lg`.
4. Add footer actions as children.

### `src/components/ui/Table.tsx`

Purpose:

- Simple reusable table.

Important props:

```tsx
columns: string[]
rows: ReactNode[][]
```

Why used:

- `columns` creates table headers.
- `rows` creates table cells.
- `ReactNode` allows text, buttons, badges, links, icons.

What happens:

- `columns.map` creates `<th>`.
- `rows.map` creates `<tr>`.
- `row.map` creates `<td>`.

How to customize:

1. Add empty state when rows length is 0.
2. Add sorting by passing column config instead of strings.
3. Add row click handler.

### `src/components/ui/Loader.tsx`

Purpose:

- Shows loading spinner or loading UI.

How to customize:

1. Change spinner size.
2. Change color.
3. Add loading text.

### `src/components/ui/Skeleton.tsx`

Purpose:

- Shows placeholder blocks while data loads.

Why used:

- Better user experience than blank screen.

How to customize:

1. Change height/width classes.
2. Add different skeleton shapes.
3. Use it in loading states.

## Common Components

### `src/components/common/Pagination.tsx`

Purpose:

- Previous/next page controls.

Important props:

```tsx
page
totalPages
onPageChange
```

Important logic:

```tsx
Math.max(1, page - 1)
Math.min(totalPages, page + 1)
```

Why used:

- Prevents going below page 1 or above last page.

How to customize:

1. Add numbered page buttons.
2. Disable component when loading.
3. Add page size selector.

### `src/components/common/ErrorState.tsx`

Purpose:

- Reusable UI for errors.

How to customize:

1. Add retry button prop.
2. Add icon.
3. Use it in API error states.

### `src/components/common/EmptyState.tsx`

Purpose:

- Reusable UI when there is no data.

How to customize:

1. Add action button.
2. Add illustration.
3. Use it for empty jobs, applications, notifications.

## Auth Pages

### `src/features/auth/pages/LoginPage.tsx`

Purpose:

- Page wrapper for login.

Important flow:

```tsx
<AuthLayout mode="login">
  <LoginForm />
</AuthLayout>
```

Why used:

- `AuthLayout` provides design and marketing side.
- `LoginForm` handles actual form.

How to customize:

1. Change layout text in `AuthLayout`.
2. Change form fields in `LoginForm`.
3. Keep page file small.

### `src/features/auth/pages/RegisterPage.tsx`

Purpose:

- Page wrapper for register.

Important flow:

```tsx
<AuthLayout mode="register">
  <RegisterForm />
</AuthLayout>
```

How to customize:

1. Change register page design in `AuthLayout`.
2. Change steps in `RegisterForm`.

### `src/features/auth/pages/ProfileSetupPage.tsx`

Purpose:

- Role-specific profile setup page after registration.

Important idea:

- Receives `role="client"` or `role="freelancer"` from router.

How to customize:

1. Add separate form sections for each role.
2. Redirect after profile setup.
3. Connect to backend profile API.

## Auth Layout And Auth UI Components

### `src/features/auth/components/AuthLayout.tsx`

Purpose:

- Shared layout for login and register pages.

Important imports:

```tsx
import { lazy, Suspense } from 'react'
```

Why used:

- Lazy-loads heavy marketing components.
- Suspense shows fallback while they load.

Important mode prop:

```tsx
mode: 'login' | 'register'
const isRegister = mode === 'register'
```

Why used:

- Same layout changes content depending on login/register.

Important child render:

```tsx
{children}
```

Why used:

- Login page passes `LoginForm`.
- Register page passes `RegisterForm`.

Important animation:

```tsx
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
```

Meaning:

- Form fades and slides into place.

Important helper components:

- `FloatingDashboardPreviews`
- `ShowcaseFallback`
- `BackgroundShapes`
- `LaboraLogo`

Why used:

- They keep `AuthLayout` organized.

How to customize:

1. Change left card title based on mode.
2. Change right-side marketing text.
3. Remove animations by replacing `motion.div` with `div`.
4. Add another auth mode by extending the `mode` prop.

### `src/features/auth/components/AuthInput.tsx`

Purpose:

- Reusable input for auth forms.

Important code:

```tsx
const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(...)
```

Why used:

- React Hook Form needs a ref to register the input.
- `forwardRef` allows parent form library to access the actual input.

Important accessibility:

```tsx
aria-invalid={error ? 'true' : 'false'}
aria-describedby={...}
```

Why used:

- Helps screen readers understand error/hint state.

How to customize:

1. Add left icon prop.
2. Add right icon prop.
3. Change error colors.
4. Use it with `register('fieldName')`.

### `src/features/auth/components/AuthSelect.tsx`

Purpose:

- Reusable select dropdown for auth forms.

How to customize:

1. Pass different `options`.
2. Add placeholder text.
3. Add disabled state.

### `src/features/auth/components/AuthTextarea.tsx`

Purpose:

- Reusable textarea for longer auth/profile text.

How to customize:

1. Change default rows.
2. Add character counter.
3. Add max length.

### `src/features/auth/components/LoginForm.tsx`

Purpose:

- Handles login form UI and submit logic.

Important hooks:

```tsx
const { login, loading } = useAuth()
const [showPassword, setShowPassword] = useState(false)
const [submitError, setSubmitError] = useState<string | null>(null)
```

Why used:

- `useAuth` gives login function.
- `showPassword` controls password visibility.
- `submitError` displays failed login message.

Important form setup:

```tsx
useForm<LoginFormValues>({
  resolver: zodResolver(loginSchema),
  defaultValues: ...
})
```

Why used:

- React Hook Form manages form fields.
- Zod validates using `loginSchema`.
- Default values initialize fields.

Important submit:

```tsx
const onSubmit = async (values) => {
  await login(values)
}
```

What happens:

- User submits.
- Validation runs.
- If valid, `login` sends API request.
- On success, user goes to dashboard.

How to customize:

1. Add a field to `loginSchema`.
2. Add the input in JSX.
3. Add it to `defaultValues`.
4. Update backend payload if needed.

### `src/features/auth/components/RegisterForm.tsx`

Purpose:

- Handles multi-step registration.

Important state:

```tsx
const [step, setStep] = useState<1 | 2 | 3>(1)
```

Why used:

- Controls which step is visible.

Important form setup:

```tsx
useForm<RegisterFormValues>({
  resolver: zodResolver(registerSchema),
  shouldUnregister: false,
})
```

Why `shouldUnregister: false`:

- Keeps step values even when fields are hidden.

Important role logic:

```tsx
const selectedRole = watch('role')
```

Why used:

- Shows client fields or freelancer fields based on selected role.

Important validation:

```tsx
validateStep(step)
```

Why used:

- Validates only current step before moving forward.

Important submit:

```tsx
await registerUser(buildRegisterPayload(values))
```

What happens:

- Converts form values to backend payload.
- Calls register API.
- Saves user in Redux.
- Navigates to setup page.

How to customize:

1. Add a new field to `registerSchema`.
2. Add default value in `useForm`.
3. Add UI input in correct step.
4. Add field to payload builder.
5. Add backend mapping in auth API.

### `src/features/auth/components/RoleSelector.tsx`

Purpose:

- Lets user choose client or freelancer.

Important data:

```tsx
const roles = [...]
```

Why used:

- Keeps role label, description, and icon in one array.

Important render:

```tsx
roles.map((role) => ...)
```

What happens:

- Creates one button per role.

Selected state:

```tsx
const selected = value === role.value
```

Why used:

- Shows special design for selected role.

How to customize:

1. Change role text in `roles`.
2. Change icons.
3. Add another selectable role by updating types and validation.

### `src/features/auth/components/RegisterStepIndicator.tsx`

Purpose:

- Shows current register step.

How to customize:

1. Rename step labels.
2. Add fourth step.
3. Change active/completed colors.

### `src/features/auth/components/PasswordStrength.tsx`

Purpose:

- Shows password strength feedback.

What happens:

- Reads password text.
- Checks rules like length, uppercase, lowercase, number.
- Displays strength UI.

How to customize:

1. Add special character rule.
2. Change colors.
3. Change labels like weak/medium/strong.

### `src/features/auth/components/ClientProfileFields.tsx`

Purpose:

- Step 2 fields for client registration.

Important props:

```tsx
register
control
errors
```

Why used:

- `register` connects normal inputs.
- `control` connects custom controlled inputs.
- `errors` shows validation messages.

Important `Controller`:

```tsx
<Controller name="hiringNeeds" control={control} render={({ field }) => (...) } />
```

Why used:

- `MultiSelect` is not a normal input.
- Controller connects it to React Hook Form.

How to customize:

1. Add new client field here.
2. Add validation in `registerSchema.ts`.
3. Add default value in `RegisterForm`.
4. Add field to API payload.

### `src/features/auth/components/FreelancerProfileFields.tsx`

Purpose:

- Step 2 fields for freelancer registration.

Important special parts:

- `TagInput` for skills
- `AuthSelect` for experience level
- Custom hourly rate input
- Hidden file input for profile image

Important file upload logic:

```tsx
const fileInputRef = useRef<HTMLInputElement>(null)
```

Why used:

- Lets custom button open hidden file input.

```tsx
onClick={() => fileInputRef.current?.click()}
```

What happens:

- User clicks styled button.
- Browser opens file picker.

How to customize:

1. Add accepted file types.
2. Add image preview.
3. Add file size validation.
4. Add more freelancer fields to schema and payload.

### `src/features/auth/components/MultiSelect.tsx`

Purpose:

- Select multiple options as pill buttons.

Important logic:

```tsx
if (value.includes(option)) {
  onChange(value.filter(...))
} else {
  onChange([...value, option])
}
```

Meaning:

- If already selected, remove it.
- If not selected, add it.

Why `memo`:

```tsx
export default memo(MultiSelect)
```

- Prevents unnecessary re-render when props did not change.

How to customize:

1. Add max selection count.
2. Add search/filter.
3. Change selected pill design.

### `src/features/auth/components/TagInput.tsx`

Purpose:

- Allows typing custom tags like skills.

Important state:

```tsx
const [input, setInput] = useState('')
```

Why used:

- Stores current typed text before it becomes a tag.

Important keyboard logic:

```tsx
if (event.key === 'Enter') addTag(input)
```

Meaning:

- Press Enter to add a tag.

```tsx
Backspace && !input
```

Meaning:

- If input is empty, Backspace removes last tag.

How to customize:

1. Add comma-to-add behavior.
2. Add max tags.
3. Add lowercase normalization.
4. Add duplicate warning.

### `src/features/auth/components/SocialLoginButtons.tsx`

Purpose:

- Shows social login buttons.

How to customize:

1. Connect Google login.
2. Connect GitHub login.
3. Hide until backend supports it.

### `src/features/auth/components/AuthBenefits.tsx`

Purpose:

- Marketing benefit cards on auth layout.

How to customize:

1. Change benefit text.
2. Change icons.
3. Add/remove benefit items.

### `src/features/auth/components/AuthStats.tsx`

Purpose:

- Marketing stats on auth layout.

How to customize:

1. Update numbers.
2. Add animated counter.
3. Change layout.

### `src/features/auth/components/RegisterMarketingPanel.tsx`

Purpose:

- Right-side marketing panel for register page.

How to customize:

1. Change copy.
2. Change cards.
3. Add illustration.

### `src/features/auth/components/RegisterBenefits.tsx`

Purpose:

- Register-specific benefit list.

How to customize:

1. Update benefits.
2. Add role-specific benefits.

### `src/features/auth/components/StatsPanel.tsx`

Purpose:

- Displays grouped stats for auth/register marketing.

How to customize:

1. Pass new stats.
2. Change grid columns.

## Landing Feature Components

### `src/features/landing/components/AnimatedSection.tsx`

Purpose:

- Adds scroll-based animation to landing sections.

Important hooks:

```tsx
const ref = useRef<HTMLElement>(null)
const isInView = useInView(ref, { once: true, margin: '-80px' })
const prefersReducedMotion = useReducedMotion()
```

Why used:

- `ref` tracks the section element.
- `isInView` becomes true when section appears on screen.
- `useReducedMotion` respects accessibility preference.

What happens:

- Section starts hidden.
- When user scrolls to it, it fades/slides in.

How to customize:

1. Change `y: 20` to larger slide distance.
2. Change duration.
3. Set `once: false` if animation should repeat.

### `src/features/landing/components/SectionHeader.tsx`

Purpose:

- Reusable title/subtitle for landing sections.

How to customize:

1. Add eyebrow text.
2. Add center/left alignment prop.
3. Change heading sizes.

### `src/features/landing/HeroSection.tsx`

Purpose:

- First main landing section.

Important parts:

- Intro badge
- Main headline
- Supporting text
- CTA buttons
- Avatar group and rating
- Floating freelancer profile cards

Important animation:

```tsx
useReducedMotion()
```

Why used:

- Stops looping motion for users who prefer reduced motion.

How to customize:

1. Change headline text.
2. Change CTA button links.
3. Replace avatar image URLs.
4. Change floating card values.

### `src/features/landing/StatsSection.tsx`

Purpose:

- Shows platform statistics.

How to customize:

1. Update numbers.
2. Change stat labels.
3. Use `useAnimatedCounter` if counters animate.

### `src/features/landing/CategoriesSection.tsx`

Purpose:

- Shows job/freelancer categories.

How to customize:

1. Add category items.
2. Change icons.
3. Link category cards to search pages.

### `src/features/landing/FreelancersSection.tsx`

Purpose:

- Shows featured freelancers.

How to customize:

1. Replace mock freelancers with API data.
2. Change cards.
3. Add "view profile" links.

### `src/features/landing/HowItWorksSection.tsx`

Purpose:

- Explains the steps of using Labora.

How to customize:

1. Change steps.
2. Add separate client/freelancer tabs.
3. Add icons per step.

### `src/features/landing/RealTimeFeaturesSection.tsx`

Purpose:

- Highlights real-time platform features.

How to customize:

1. Add chat/notification/payment features.
2. Change animation/cards.

### `src/features/landing/TestimonialsSection.tsx`

Purpose:

- Shows user testimonials.

How to customize:

1. Change testimonial data.
2. Add carousel.
3. Add ratings.

### `src/features/landing/ArticlesSection.tsx`

Purpose:

- Shows article/blog previews.

How to customize:

1. Replace static articles with API data.
2. Add article links.
3. Add category badges.

### `src/features/landing/CTASection.tsx`

Purpose:

- Final call-to-action section.

How to customize:

1. Change CTA text.
2. Change buttons.
3. Route to register, jobs, or contact.

## Client Dashboard Feature

### `src/features/client/layout/ClientDashboardLayout.tsx`

Purpose:

- Layout for client dashboard pages.

Important state:

```tsx
const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
```

Why used:

- Controls desktop collapsed sidebar.
- Controls mobile sidebar overlay.

Important data:

```tsx
const { data } = useClientDashboard()
```

Why used:

- Reads unread notification/message counts for top navbar.

How to customize:

1. Add breadcrumbs above main content.
2. Add more layout state.
3. Change padding in `<main>`.

### `src/features/client/pages/ClientDashboard.tsx`

Purpose:

- Main dashboard content page.

Important data loading:

```tsx
const { data, isLoading, isError } = useClientDashboard()
```

Why used:

- Gets dashboard data from React Query.

Important UI states:

```tsx
if (isLoading) return <DashboardLoading />
if (isError || !data) return <DashboardError />
```

Why used:

- Shows correct UI for loading, error, and success.

Important success render:

```tsx
<DashboardStats stats={data.stats} />
<JobOverviewChart data={data.jobOverview} />
<RecentJobs jobs={data.recentJobs} />
```

Meaning:

- Data is split and passed to smaller components.

How to customize:

1. Add new dashboard card by creating component and placing it here.
2. Change grid layout classes.
3. Add filters and pass them to query hook.

### `src/features/client/components/ClientSidebar.tsx`

Purpose:

- Client dashboard side navigation.

How to customize:

1. Add new menu links.
2. Add active route style.
3. Change collapsed width.
4. Add logout menu item.

### `src/features/client/components/ClientTopNavbar.tsx`

Purpose:

- Top bar for client dashboard.

Common elements:

- Mobile menu button
- Search or page controls
- Notification count
- Message count
- Profile button

How to customize:

1. Add search box.
2. Add dropdown menus.
3. Connect notification buttons to pages.

### `src/features/client/components/ClientCard.tsx`

Purpose:

- Dashboard-specific card component.

Common exports:

- `ClientCard`
- `ClientCardHeader`
- `ClientCardBody`
- `ClientSectionSkeleton`

Why used:

- Keeps dashboard card design consistent.

How to customize:

1. Change dashboard card border/shadow.
2. Add action button to header.
3. Add loading variants.

### `src/features/client/components/DashboardStats.tsx`

Purpose:

- Shows top dashboard stat cards.

Important data:

```tsx
const statConfigs = [...]
```

Why used:

- Avoids writing four cards manually.
- Each config defines label, key, icon, colors, and formatter.

Important render:

```tsx
statConfigs.map((config, index) => ...)
```

What happens:

- Creates one card per stat config.

How to customize:

1. Add new stat to `DashboardStats` type.
2. Add value in API data.
3. Add config item in `statConfigs`.
4. Dashboard automatically renders it.

### `src/features/client/components/JobOverviewChart.tsx`

Purpose:

- Bar chart showing monthly job status.

Important chart components:

```tsx
<ResponsiveContainer>
<BarChart data={data}>
<XAxis />
<YAxis />
<Tooltip />
<Legend />
<Bar />
```

Why used:

- Recharts builds the chart.

Important animation:

```tsx
const isInView = useInView(ref, ...)
```

Why used:

- Chart fades/animates when visible.

How to customize:

1. Add another `Bar` for another data field.
2. Change colors.
3. Change height class `h-72`.
4. Replace bar chart with line chart.

### `src/features/client/components/JobStatusChart.tsx`

Purpose:

- Shows job status distribution.

How to customize:

1. Change chart type.
2. Change slice colors from data.
3. Add center total count.

### `src/features/client/components/RecentJobs.tsx`

Purpose:

- Shows recently posted jobs.

How to customize:

1. Add click handler to open job details.
2. Add status badge colors.
3. Add empty state.

### `src/features/client/components/LatestApplications.tsx`

Purpose:

- Shows latest freelancer applications.

How to customize:

1. Add accept/reject buttons.
2. Link freelancer avatar/name to profile.
3. Add loading skeleton.

### `src/features/client/components/RealTimeActivity.tsx`

Purpose:

- Shows recent real-time activity events.

How to customize:

1. Connect to WebSocket updates.
2. Add activity icons by type.
3. Add relative time formatting.

### `src/features/client/components/UpcomingDeadlines.tsx`

Purpose:

- Shows projects with upcoming due dates.

How to customize:

1. Add warning color when days remaining is low.
2. Add calendar link.
3. Sort by due date.

### `src/features/client/components/QuickActions.tsx`

Purpose:

- Shows shortcut action buttons.

How to customize:

1. Add create job action.
2. Add view messages action.
3. Link each action to route.

### `src/features/client/components/ClientProfileCard.tsx`

Purpose:

- Shows client profile summary and completion.

How to customize:

1. Add edit profile button.
2. Add profile completion tips.
3. Replace avatar placeholder.

## Admin And Freelancer Screens

### `src/features/admin/AdminDashboard.tsx`

Purpose:

- Admin dashboard placeholder/page.

How to customize:

1. Add platform stats.
2. Add user management table.
3. Add reports and moderation cards.

### `src/features/freelancer/FreelancerDashboard.tsx`

Purpose:

- Freelancer dashboard placeholder/page.

How to customize:

1. Add proposals summary.
2. Add active contracts.
3. Add earnings chart.
4. Add recommended jobs.

## All TSX Files Checklist

Use this checklist to study every `.tsx` file.

### App and Router

- `src/main.tsx`: app starts here.
- `src/App.tsx`: top-level providers and router.
- `src/app/providers/AuthProvider.tsx`: restores auth session.
- `src/app/providers/QueryProvider.tsx`: creates React Query client.
- `src/app/providers/SocketProvider.tsx`: provides WebSocket config.
- `src/app/router/AppRouter.tsx`: all routes.
- `src/app/router/ProtectedRoute.tsx`: login and role guard.
- `src/app/router/ClientRoute.tsx`: client-only wrapper.
- `src/app/router/FreelancerRoute.tsx`: freelancer-only wrapper.
- `src/app/router/AdminRoute.tsx`: admin-only wrapper.

### Pages

- `src/pages/Landing.tsx`: public home page composition.
- `src/pages/Login.tsx`: public login entry/compatibility page.
- `src/pages/Register.tsx`: public register entry/compatibility page.
- `src/pages/Unauthorized.tsx`: no-permission page.
- `src/pages/NotFound.tsx`: unknown URL page.

### Layout

- `src/components/layout/Navbar.tsx`: top navigation.
- `src/components/layout/Footer.tsx`: footer.
- `src/components/layout/Sidebar.tsx`: dashboard sidebar.
- `src/components/layout/DashboardLayout.tsx`: shared dashboard layout.

### UI

- `src/components/ui/Button.tsx`: reusable button/link.
- `src/components/ui/Card.tsx`: reusable card.
- `src/components/ui/Badge.tsx`: reusable status badge.
- `src/components/ui/Input.tsx`: reusable input.
- `src/components/ui/Loader.tsx`: loading indicator.
- `src/components/ui/Skeleton.tsx`: loading placeholder.
- `src/components/ui/Modal.tsx`: popup modal.
- `src/components/ui/Table.tsx`: reusable table.

### Common

- `src/components/common/Pagination.tsx`: page navigation.
- `src/components/common/ErrorState.tsx`: reusable error state.
- `src/components/common/EmptyState.tsx`: reusable empty state.

### Auth

- `src/features/auth/pages/LoginPage.tsx`: login page wrapper.
- `src/features/auth/pages/RegisterPage.tsx`: register page wrapper.
- `src/features/auth/pages/ProfileSetupPage.tsx`: profile setup page.
- `src/features/auth/components/AuthLayout.tsx`: auth page layout.
- `src/features/auth/components/AuthInput.tsx`: auth input.
- `src/features/auth/components/AuthSelect.tsx`: auth select.
- `src/features/auth/components/AuthTextarea.tsx`: auth textarea.
- `src/features/auth/components/LoginForm.tsx`: login form.
- `src/features/auth/components/RegisterForm.tsx`: register form.
- `src/features/auth/components/RoleSelector.tsx`: client/freelancer role picker.
- `src/features/auth/components/RegisterStepIndicator.tsx`: step indicator.
- `src/features/auth/components/PasswordStrength.tsx`: password strength UI.
- `src/features/auth/components/ClientProfileFields.tsx`: client registration fields.
- `src/features/auth/components/FreelancerProfileFields.tsx`: freelancer registration fields.
- `src/features/auth/components/MultiSelect.tsx`: multi-option selector.
- `src/features/auth/components/TagInput.tsx`: custom tag entry.
- `src/features/auth/components/SocialLoginButtons.tsx`: social auth buttons.
- `src/features/auth/components/AuthBenefits.tsx`: auth marketing benefits.
- `src/features/auth/components/AuthStats.tsx`: auth marketing stats.
- `src/features/auth/components/RegisterMarketingPanel.tsx`: register marketing side panel.
- `src/features/auth/components/RegisterBenefits.tsx`: register benefits.
- `src/features/auth/components/StatsPanel.tsx`: stats panel.

### Landing

- `src/features/landing/HeroSection.tsx`: hero area.
- `src/features/landing/StatsSection.tsx`: stats area.
- `src/features/landing/CategoriesSection.tsx`: categories area.
- `src/features/landing/FreelancersSection.tsx`: featured freelancers.
- `src/features/landing/HowItWorksSection.tsx`: step explanation.
- `src/features/landing/RealTimeFeaturesSection.tsx`: real-time features.
- `src/features/landing/TestimonialsSection.tsx`: testimonials.
- `src/features/landing/ArticlesSection.tsx`: article previews.
- `src/features/landing/CTASection.tsx`: final call-to-action.
- `src/features/landing/components/AnimatedSection.tsx`: section animation wrapper.
- `src/features/landing/components/SectionHeader.tsx`: reusable section heading.

### Client Dashboard

- `src/features/client/layout/ClientDashboardLayout.tsx`: client dashboard frame.
- `src/features/client/pages/ClientDashboard.tsx`: dashboard page.
- `src/features/client/components/ClientSidebar.tsx`: client side navigation.
- `src/features/client/components/ClientTopNavbar.tsx`: client top navbar.
- `src/features/client/components/ClientCard.tsx`: client dashboard card system.
- `src/features/client/components/DashboardStats.tsx`: stat cards.
- `src/features/client/components/JobOverviewChart.tsx`: bar chart.
- `src/features/client/components/JobStatusChart.tsx`: status chart.
- `src/features/client/components/RecentJobs.tsx`: recent jobs list.
- `src/features/client/components/LatestApplications.tsx`: latest applications list.
- `src/features/client/components/RealTimeActivity.tsx`: recent activity list.
- `src/features/client/components/UpcomingDeadlines.tsx`: deadline list.
- `src/features/client/components/QuickActions.tsx`: shortcut actions.
- `src/features/client/components/ClientProfileCard.tsx`: client profile card.

### Role Dashboards

- `src/features/admin/AdminDashboard.tsx`: admin dashboard.
- `src/features/freelancer/FreelancerDashboard.tsx`: freelancer dashboard.

## Step By Step: How To Customize A UI Feature

### Example 1: Add A New Landing Section

1. Create file:

```text
src/features/landing/NewSection.tsx
```

2. Write component:

```tsx
import AnimatedSection from '@/features/landing/components/AnimatedSection'

export default function NewSection() {
  return (
    <AnimatedSection className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-2xl font-bold text-text">New Section</h2>
      </div>
    </AnimatedSection>
  )
}
```

3. Import it in `src/pages/Landing.tsx`.
4. Place `<NewSection />` where you want it.

### Example 2: Add A New Dashboard Card

1. Create component in:

```text
src/features/client/components/NewDashboardCard.tsx
```

2. Use `ClientCard`.
3. Import it in `ClientDashboard.tsx`.
4. Add it inside the grid.

### Example 3: Add A Register Field

1. Add field to `registerSchema.ts`.
2. Add default value in `RegisterForm.tsx`.
3. Add input in `ClientProfileFields.tsx` or `FreelancerProfileFields.tsx`.
4. Add value to `buildRegisterPayload`.
5. Add backend mapping in `auth.api.ts`.

### Example 4: Add A Button Variant

1. Open `src/components/ui/Button.tsx`.
2. Add variant name to `ButtonVariant`.
3. Add Tailwind classes to `variantClasses`.
4. Use it:

```tsx
<Button variant="danger">Delete</Button>
```

## Best Study Order For TSX Files

Study in this order:

1. `src/main.tsx`
2. `src/App.tsx`
3. `src/app/router/AppRouter.tsx`
4. `src/app/router/ProtectedRoute.tsx`
5. `src/components/ui/Button.tsx`
6. `src/components/ui/Card.tsx`
7. `src/pages/Landing.tsx`
8. `src/features/landing/HeroSection.tsx`
9. `src/features/auth/pages/LoginPage.tsx`
10. `src/features/auth/components/LoginForm.tsx`
11. `src/features/auth/components/RegisterForm.tsx`
12. `src/features/client/pages/ClientDashboard.tsx`
13. `src/features/client/components/DashboardStats.tsx`
14. `src/features/client/components/JobOverviewChart.tsx`

## What To Write In Your Notes

For every file, write these five answers:

```text
1. This file renders...
2. It receives these props...
3. It uses these hooks...
4. It calls these child components...
5. To customize it, I can change...
```

This is the fastest way to understand professional React code.
