# Source Code Documentation (Generated)

Generated for: `src`

Total files documented: **129**

---

## src/App.css

- **Category:** Core/App
- **Purpose:** Style definitions for global/theme/component visuals.
- **Style Role:** Global/component styling rules and utility overrides.
- **Key CSS Variables:** None detected

## src/App.tsx

- **Category:** Core/App
- **Purpose:** Feature/component implementation used by the app flow.
- **Key Exports:** default function App
- **Interfaces/Types:** None
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** None
- **Hooks Used:** None
- **Animations Used:** None detected
- **Flow Impact:** realtime communication
- **Key Dependencies:** @/app/providers/AuthProvider, @/app/providers/SocketProvider, @/app/router/AppRouter

## src/app/providers/AuthProvider.tsx

- **Category:** App Providers
- **Purpose:** Provides app-wide context/state to child components.
- **Key Exports:** function AuthProvider
- **Interfaces/Types:** PropsWithChildren
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** None
- **Hooks Used:** useEffect, useAppDispatch
- **Animations Used:** None detected
- **Flow Impact:** redux state updates
- **Key Dependencies:** react, @/app/store, @/app/store/authSlice

## src/app/providers/QueryProvider.tsx

- **Category:** App Providers
- **Purpose:** Provides app-wide context/state to child components.
- **Key Exports:** function QueryProvider
- **Interfaces/Types:** PropsWithChildren
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** None
- **Hooks Used:** useState
- **Animations Used:** None detected
- **Flow Impact:** server-state fetch/mutation
- **Key Dependencies:** @tanstack/react-query, react

## src/app/providers/SocketProvider.tsx

- **Category:** App Providers
- **Purpose:** Provides app-wide context/state to child components.
- **Key Exports:** function SocketProvider, const SocketContext
- **Interfaces/Types:** SocketContextValue, PropsWithChildren
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** None
- **Hooks Used:** useMemo
- **Animations Used:** None detected
- **Flow Impact:** realtime communication
- **Key Dependencies:** react, @/utils/constants

## src/app/router/AdminRoute.tsx

- **Category:** App Routing
- **Purpose:** Guards/controls access to a route by auth/role state.
- **Key Exports:** function AdminRoute
- **Interfaces/Types:** None
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** None
- **Hooks Used:** None
- **Animations Used:** None detected
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** react, @/app/router/ProtectedRoute

## src/app/router/AppRouter.tsx

- **Category:** App Routing
- **Purpose:** Defines route tree and navigation rules.
- **Key Exports:** function AppRouter
- **Interfaces/Types:** None
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** router
- **Hooks Used:** None
- **Animations Used:** None detected
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** react-router-dom, @/app/router/AdminRoute, @/app/router/ClientRoute, @/app/router/FreelancerRoute, @/components/layout/DashboardLayout, @/features/admin/AdminDashboard, @/features/client/layout/ClientDashboardLayout, @/features/client/pages/ClientDashboard, @/features/freelancer/FreelancerDashboard, @/features/auth/pages/ProfileSetupPage, @/features/auth/pages/LoginPage, @/features/auth/pages/RegisterPage, @/pages/Landing, @/pages/NotFound, @/pages/Unauthorized

## src/app/router/ClientRoute.tsx

- **Category:** App Routing
- **Purpose:** Guards/controls access to a route by auth/role state.
- **Key Exports:** function ClientRoute
- **Interfaces/Types:** None
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** None
- **Hooks Used:** None
- **Animations Used:** None detected
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** react, @/app/router/ProtectedRoute

## src/app/router/FreelancerRoute.tsx

- **Category:** App Routing
- **Purpose:** Guards/controls access to a route by auth/role state.
- **Key Exports:** function FreelancerRoute
- **Interfaces/Types:** None
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** None
- **Hooks Used:** None
- **Animations Used:** None detected
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** react, @/app/router/ProtectedRoute

## src/app/router/ProtectedRoute.tsx

- **Category:** App Routing
- **Purpose:** Guards/controls access to a route by auth/role state.
- **Key Exports:** function ProtectedRoute
- **Interfaces/Types:** ProtectedRouteProps
- **Props Contracts:** ProtectedRouteProps
- **Main Variables/Constants:** None
- **Hooks Used:** useLocation, useAuth
- **Animations Used:** None detected
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** react, react-router-dom, @/hooks/useAuth, @/types/auth, @/utils/permissions

## src/app/store/authSlice.ts

- **Category:** Redux Store
- **Purpose:** Redux slice for state, actions, and reducers.
- **Key Exports:** No explicit exports detected
- **Interfaces/Types:** AuthState, PayloadAction
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** initialState, authSlice
- **Hooks Used:** None
- **Animations Used:** None detected
- **Flow Impact:** redux state updates
- **Key Dependencies:** @reduxjs/toolkit, @/features/auth/types/auth

## src/app/store/chatSlice.ts

- **Category:** Redux Store
- **Purpose:** Redux slice for state, actions, and reducers.
- **Key Exports:** No explicit exports detected
- **Interfaces/Types:** ChatMessage, ChatState, PayloadAction
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** initialState, chatSlice
- **Hooks Used:** None
- **Animations Used:** None detected
- **Flow Impact:** redux state updates
- **Key Dependencies:** @reduxjs/toolkit

## src/app/store/index.ts

- **Category:** Redux Store
- **Purpose:** Feature/component implementation used by the app flow.
- **Key Exports:** const store, const useAppDispatch, const useAppSelector
- **Interfaces/Types:** TypedUseSelectorHook, RootState, AppDispatch
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** None
- **Hooks Used:** useDispatch, useSelector, useAppDispatch, useAppSelector
- **Animations Used:** None detected
- **Flow Impact:** redux state updates, redux state read
- **Key Dependencies:** @reduxjs/toolkit, react-redux, @/app/store/authSlice, @/app/store/chatSlice, @/app/store/notificationSlice

## src/app/store/notificationSlice.ts

- **Category:** Redux Store
- **Purpose:** Redux slice for state, actions, and reducers.
- **Key Exports:** No explicit exports detected
- **Interfaces/Types:** NotificationState, PayloadAction
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** initialState, notificationSlice
- **Hooks Used:** None
- **Animations Used:** None detected
- **Flow Impact:** redux state updates
- **Key Dependencies:** @reduxjs/toolkit, @/types/notification

## src/assets/hero.png

- **Category:** Static Assets
- **Purpose:** Marketing/presentation UI for feature messaging and metrics.
- **File Type:** .png
- **Code/Usage Notes:** Static resource loaded by UI/components.

## src/assets/react.svg

- **Category:** Static Assets
- **Purpose:** Image/vector asset used in UI.
- **File Type:** .svg
- **Code/Usage Notes:** Static resource loaded by UI/components.

## src/assets/vite.svg

- **Category:** Static Assets
- **Purpose:** Image/vector asset used in UI.
- **File Type:** .svg
- **Code/Usage Notes:** Static resource loaded by UI/components.

## src/components/common/EmptyState.tsx

- **Category:** Shared Common Components
- **Purpose:** Feature/component implementation used by the app flow.
- **Key Exports:** function EmptyState
- **Interfaces/Types:** EmptyStateProps
- **Props Contracts:** EmptyStateProps
- **Main Variables/Constants:** None
- **Hooks Used:** None
- **Animations Used:** None detected
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** None

## src/components/common/ErrorState.tsx

- **Category:** Shared Common Components
- **Purpose:** Feature/component implementation used by the app flow.
- **Key Exports:** function ErrorState
- **Interfaces/Types:** ErrorStateProps
- **Props Contracts:** ErrorStateProps
- **Main Variables/Constants:** None
- **Hooks Used:** None
- **Animations Used:** None detected
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** None

## src/components/common/Pagination.tsx

- **Category:** Shared Common Components
- **Purpose:** Feature/component implementation used by the app flow.
- **Key Exports:** function Pagination
- **Interfaces/Types:** PaginationProps
- **Props Contracts:** PaginationProps
- **Main Variables/Constants:** None
- **Hooks Used:** None
- **Animations Used:** None detected
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** None

## src/components/layout/DashboardLayout.tsx

- **Category:** Shared Layout Components
- **Purpose:** Layout wrapper that arranges page structure and slots.
- **Key Exports:** function DashboardLayout
- **Interfaces/Types:** None
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** None
- **Hooks Used:** None
- **Animations Used:** None detected
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** react, @/components/layout/Footer, @/components/layout/Navbar, @/components/layout/Sidebar

## src/components/layout/Footer.tsx

- **Category:** Shared Layout Components
- **Purpose:** Feature/component implementation used by the app flow.
- **Key Exports:** function Footer
- **Interfaces/Types:** None
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** footerLinks, socialLinks
- **Hooks Used:** None
- **Animations Used:** None detected
- **Flow Impact:** form submission pipeline
- **Key Dependencies:** react-router-dom, @/components/ui/Button

## src/components/layout/Navbar.tsx

- **Category:** Shared Layout Components
- **Purpose:** Feature/component implementation used by the app flow.
- **Key Exports:** function Navbar
- **Interfaces/Types:** None
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** navLinks
- **Hooks Used:** useEffect, useState
- **Animations Used:** framer-motion
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** lucide-react, react, react-router-dom, framer-motion, @/components/ui/Button

## src/components/layout/Sidebar.tsx

- **Category:** Shared Layout Components
- **Purpose:** Feature/component implementation used by the app flow.
- **Key Exports:** function Sidebar
- **Interfaces/Types:** None
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** links
- **Hooks Used:** None
- **Animations Used:** None detected
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** react-router-dom

## src/components/ui/Badge.tsx

- **Category:** Shared UI Components
- **Purpose:** Feature/component implementation used by the app flow.
- **Key Exports:** function Badge
- **Interfaces/Types:** BadgeProps, BadgeVariant
- **Props Contracts:** BadgeProps
- **Main Variables/Constants:** badgeClasses
- **Hooks Used:** None
- **Animations Used:** framer-motion
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** react

## src/components/ui/Button.tsx

- **Category:** Shared UI Components
- **Purpose:** Feature/component implementation used by the app flow.
- **Key Exports:** function Button
- **Interfaces/Types:** ButtonBaseProps, ButtonAsButton, ButtonAsLink, ButtonVariant, ButtonSize, ButtonProps
- **Props Contracts:** ButtonBaseProps
- **Main Variables/Constants:** variantClasses, sizeClasses, baseClasses
- **Hooks Used:** None
- **Animations Used:** None detected
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** react, react-router-dom

## src/components/ui/Card.tsx

- **Category:** Shared UI Components
- **Purpose:** Feature/component implementation used by the app flow.
- **Key Exports:** function Card
- **Interfaces/Types:** CardProps
- **Props Contracts:** CardProps
- **Main Variables/Constants:** paddingClasses
- **Hooks Used:** None
- **Animations Used:** None detected
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** react

## src/components/ui/Input.tsx

- **Category:** Shared UI Components
- **Purpose:** Reusable form control UI with styling/validation wiring.
- **Key Exports:** function Input
- **Interfaces/Types:** InputProps
- **Props Contracts:** InputProps
- **Main Variables/Constants:** None
- **Hooks Used:** None
- **Animations Used:** None detected
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** react

## src/components/ui/Loader.tsx

- **Category:** Shared UI Components
- **Purpose:** Feature/component implementation used by the app flow.
- **Key Exports:** function Loader
- **Interfaces/Types:** None
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** None
- **Hooks Used:** None
- **Animations Used:** None detected
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** None

## src/components/ui/Modal.tsx

- **Category:** Shared UI Components
- **Purpose:** Feature/component implementation used by the app flow.
- **Key Exports:** function Modal
- **Interfaces/Types:** ModalProps
- **Props Contracts:** ModalProps
- **Main Variables/Constants:** None
- **Hooks Used:** None
- **Animations Used:** None detected
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** react

## src/components/ui/Skeleton.tsx

- **Category:** Shared UI Components
- **Purpose:** Feature/component implementation used by the app flow.
- **Key Exports:** function Skeleton, function FreelancerCardSkeleton, function ArticleCardSkeleton
- **Interfaces/Types:** SkeletonProps
- **Props Contracts:** SkeletonProps
- **Main Variables/Constants:** None
- **Hooks Used:** None
- **Animations Used:** None detected
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** None

## src/components/ui/Table.tsx

- **Category:** Shared UI Components
- **Purpose:** Feature/component implementation used by the app flow.
- **Key Exports:** function Table
- **Interfaces/Types:** TableProps
- **Props Contracts:** TableProps
- **Main Variables/Constants:** None
- **Hooks Used:** None
- **Animations Used:** None detected
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** react

## src/features/admin/AdminDashboard.tsx

- **Category:** Feature Module
- **Purpose:** Feature/component implementation used by the app flow.
- **Key Exports:** function AdminDashboard
- **Interfaces/Types:** None
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** None
- **Hooks Used:** None
- **Animations Used:** None detected
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** @/components/ui/Badge

## src/features/auth/components/AuthBenefits.tsx

- **Category:** Feature: Authentication
- **Purpose:** Marketing/presentation UI for feature messaging and metrics.
- **Key Exports:** default function AuthBenefits
- **Interfaces/Types:** Benefit
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** benefits, containerVariants, itemVariants
- **Hooks Used:** None
- **Animations Used:** framer-motion, variants-based transitions
- **Flow Impact:** realtime communication
- **Key Dependencies:** framer-motion, lucide-react

## src/features/auth/components/AuthInput.tsx

- **Category:** Feature: Authentication
- **Purpose:** Reusable form control UI with styling/validation wiring.
- **Key Exports:** No explicit exports detected
- **Interfaces/Types:** AuthInputProps, InputHTMLAttributes
- **Props Contracts:** AuthInputProps
- **Main Variables/Constants:** AuthInput
- **Hooks Used:** None
- **Animations Used:** None detected
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** react

## src/features/auth/components/AuthLayout.tsx

- **Category:** Feature: Authentication
- **Purpose:** Layout wrapper that arranges page structure and slots.
- **Key Exports:** default function AuthLayout
- **Interfaces/Types:** AuthLayoutProps, ReactNode
- **Props Contracts:** AuthLayoutProps
- **Main Variables/Constants:** AuthBenefits, AuthStats, RegisterMarketingPanel
- **Hooks Used:** useReducedMotion
- **Animations Used:** framer-motion, reduced-motion accessibility support
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** framer-motion, react, react-router-dom, lucide-react

## src/features/auth/components/AuthSelect.tsx

- **Category:** Feature: Authentication
- **Purpose:** Reusable form control UI with styling/validation wiring.
- **Key Exports:** No explicit exports detected
- **Interfaces/Types:** AuthSelectProps, SelectHTMLAttributes
- **Props Contracts:** AuthSelectProps
- **Main Variables/Constants:** AuthSelect
- **Hooks Used:** None
- **Animations Used:** None detected
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** react

## src/features/auth/components/AuthStats.tsx

- **Category:** Feature: Authentication
- **Purpose:** Marketing/presentation UI for feature messaging and metrics.
- **Key Exports:** default function AuthStats
- **Interfaces/Types:** StatItem
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** stats
- **Hooks Used:** useInView, useReducedMotion, useEffect, useRef, useState
- **Animations Used:** framer-motion, in-view trigger animation, reduced-motion accessibility support
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** framer-motion, react

## src/features/auth/components/AuthTextarea.tsx

- **Category:** Feature: Authentication
- **Purpose:** Reusable form control UI with styling/validation wiring.
- **Key Exports:** No explicit exports detected
- **Interfaces/Types:** AuthTextareaProps, TextareaHTMLAttributes
- **Props Contracts:** AuthTextareaProps
- **Main Variables/Constants:** AuthTextarea
- **Hooks Used:** None
- **Animations Used:** None detected
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** react

## src/features/auth/components/ClientProfileFields.tsx

- **Category:** Feature: Authentication
- **Purpose:** Feature/component implementation used by the app flow.
- **Key Exports:** No explicit exports detected
- **Interfaces/Types:** ClientProfileFieldsProps, Control, FieldErrors, UseFormRegister
- **Props Contracts:** ClientProfileFieldsProps
- **Main Variables/Constants:** None
- **Hooks Used:** None
- **Animations Used:** None detected
- **Flow Impact:** input validation
- **Key Dependencies:** react, react-hook-form, @/features/auth/components/AuthInput, @/features/auth/components/AuthSelect, @/features/auth/components/AuthTextarea, @/features/auth/components/MultiSelect, @/features/auth/schemas/registerSchema

## src/features/auth/components/FreelancerProfileFields.tsx

- **Category:** Feature: Authentication
- **Purpose:** Feature/component implementation used by the app flow.
- **Key Exports:** No explicit exports detected
- **Interfaces/Types:** FreelancerProfileFieldsProps, Control, FieldErrors, UseFormRegister
- **Props Contracts:** FreelancerProfileFieldsProps
- **Main Variables/Constants:** None
- **Hooks Used:** useRef
- **Animations Used:** None detected
- **Flow Impact:** input validation
- **Key Dependencies:** react, lucide-react, react-hook-form, @/features/auth/components/AuthInput, @/features/auth/components/AuthSelect, @/features/auth/components/AuthTextarea, @/features/auth/components/TagInput, @/features/auth/schemas/registerConstants, @/features/auth/schemas/registerSchema

## src/features/auth/components/LoginForm.tsx

- **Category:** Feature: Authentication
- **Purpose:** Collects, validates, and submits user input.
- **Key Exports:** default function LoginForm
- **Interfaces/Types:** LoginFormValues
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** None
- **Hooks Used:** useState, useForm, useAuth
- **Animations Used:** framer-motion, hover interaction animation, tap/click animation
- **Flow Impact:** input validation, form submission pipeline
- **Key Dependencies:** @hookform/resolvers/zod, framer-motion, lucide-react, react, react-hook-form, react-router-dom, @/components/ui/Button, @/features/auth/components/AuthInput, @/features/auth/components/SocialLoginButtons, @/features/auth/hooks/useAuth, @/features/auth/schemas/loginSchema

## src/features/auth/components/MultiSelect.tsx

- **Category:** Feature: Authentication
- **Purpose:** Reusable form control UI with styling/validation wiring.
- **Key Exports:** No explicit exports detected
- **Interfaces/Types:** MultiSelectProps
- **Props Contracts:** MultiSelectProps
- **Main Variables/Constants:** None
- **Hooks Used:** None
- **Animations Used:** None detected
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** react, lucide-react

## src/features/auth/components/PasswordStrength.tsx

- **Category:** Feature: Authentication
- **Purpose:** Feature/component implementation used by the app flow.
- **Key Exports:** default function PasswordStrength
- **Interfaces/Types:** PasswordStrengthProps, StrengthLevel
- **Props Contracts:** PasswordStrengthProps
- **Main Variables/Constants:** None
- **Hooks Used:** None
- **Animations Used:** framer-motion
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** framer-motion

## src/features/auth/components/RegisterBenefits.tsx

- **Category:** Feature: Authentication
- **Purpose:** Marketing/presentation UI for feature messaging and metrics.
- **Key Exports:** default function RegisterBenefits
- **Interfaces/Types:** Feature, LucideIcon
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** features, containerVariants, itemVariants
- **Hooks Used:** useReducedMotion
- **Animations Used:** framer-motion, variants-based transitions, reduced-motion accessibility support
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** framer-motion

## src/features/auth/components/RegisterForm.tsx

- **Category:** Feature: Authentication
- **Purpose:** Collects, validates, and submits user input.
- **Key Exports:** default function RegisterForm
- **Interfaces/Types:** UseFormSetError, RegisterFormValues
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** fadeSlide
- **Hooks Used:** useCallback, useState, useForm, useAuth
- **Animations Used:** framer-motion, hover interaction animation, tap/click animation
- **Flow Impact:** input validation, form submission pipeline
- **Key Dependencies:** @hookform/resolvers/zod, framer-motion, lucide-react, react, react-hook-form, react-router-dom, zod, @/components/ui/Button, @/features/auth/components/AuthInput, @/features/auth/components/ClientProfileFields, @/features/auth/components/FreelancerProfileFields, @/features/auth/components/PasswordStrength, @/features/auth/components/RegisterStepIndicator, @/features/auth/components/RoleSelector, @/features/auth/hooks/useAuth, @/features/auth/types/auth

## src/features/auth/components/RegisterMarketingPanel.tsx

- **Category:** Feature: Authentication
- **Purpose:** Marketing/presentation UI for feature messaging and metrics.
- **Key Exports:** default function RegisterMarketingPanel
- **Interfaces/Types:** FeatureCard, StatItem, Variants, LucideIcon
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** navLinks, features, stats, containerVariants, revealVariants
- **Hooks Used:** useInView, useReducedMotion, useEffect, useRef, useState, useNavigate
- **Animations Used:** framer-motion, variants-based transitions, hover interaction animation, tap/click animation, in-view trigger animation, reduced-motion accessibility support
- **Flow Impact:** navigation flow control
- **Key Dependencies:** framer-motion, react, react-router-dom

## src/features/auth/components/RegisterStepIndicator.tsx

- **Category:** Feature: Authentication
- **Purpose:** Feature/component implementation used by the app flow.
- **Key Exports:** No explicit exports detected
- **Interfaces/Types:** RegisterStepIndicatorProps
- **Props Contracts:** RegisterStepIndicatorProps
- **Main Variables/Constants:** STEPS
- **Hooks Used:** None
- **Animations Used:** None detected
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** react

## src/features/auth/components/RoleSelector.tsx

- **Category:** Feature: Authentication
- **Purpose:** Reusable form control UI with styling/validation wiring.
- **Key Exports:** default function RoleSelector
- **Interfaces/Types:** RoleSelectorProps, SelectableRole
- **Props Contracts:** RoleSelectorProps
- **Main Variables/Constants:** roles
- **Hooks Used:** None
- **Animations Used:** framer-motion, hover interaction animation, tap/click animation
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** framer-motion, lucide-react, @/features/auth/types/auth

## src/features/auth/components/SocialLoginButtons.tsx

- **Category:** Feature: Authentication
- **Purpose:** Feature/component implementation used by the app flow.
- **Key Exports:** default function SocialLoginButtons
- **Interfaces/Types:** None
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** None
- **Hooks Used:** None
- **Animations Used:** framer-motion, hover interaction animation, tap/click animation
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** framer-motion

## src/features/auth/components/StatsPanel.tsx

- **Category:** Feature: Authentication
- **Purpose:** Marketing/presentation UI for feature messaging and metrics.
- **Key Exports:** default function StatsPanel
- **Interfaces/Types:** StatItem
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** stats
- **Hooks Used:** useInView, useReducedMotion, useEffect, useRef, useState
- **Animations Used:** framer-motion, in-view trigger animation, reduced-motion accessibility support
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** framer-motion, react

## src/features/auth/components/TagInput.tsx

- **Category:** Feature: Authentication
- **Purpose:** Reusable form control UI with styling/validation wiring.
- **Key Exports:** No explicit exports detected
- **Interfaces/Types:** TagInputProps, KeyboardEvent
- **Props Contracts:** TagInputProps
- **Main Variables/Constants:** None
- **Hooks Used:** useState
- **Animations Used:** None detected
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** react, lucide-react

## src/features/auth/hooks/useAuth.ts

- **Category:** Feature: Authentication
- **Purpose:** Reusable hook encapsulating logic/state side-effects.
- **Key Exports:** function useAuth
- **Interfaces/Types:** None
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** ROLE_PATHS, REGISTER_ROLE_PATHS
- **Hooks Used:** useMutation, useNavigate, useAppDispatch, useAppSelector, useAuth
- **Animations Used:** None detected
- **Flow Impact:** navigation flow control, server-state fetch/mutation, redux state updates
- **Key Dependencies:** @tanstack/react-query, react-router-dom, @/app/store, @/app/store/authSlice, @/features/auth/services/auth.api, @/features/auth/types/auth

## src/features/auth/pages/LoginPage.tsx

- **Category:** Feature: Authentication
- **Purpose:** Page-level screen composed from feature and shared components.
- **Key Exports:** default function LoginPage
- **Interfaces/Types:** None
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** None
- **Hooks Used:** None
- **Animations Used:** None detected
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** @/features/auth/components/AuthLayout, @/features/auth/components/LoginForm

## src/features/auth/pages/ProfileSetupPage.tsx

- **Category:** Feature: Authentication
- **Purpose:** Page-level screen composed from feature and shared components.
- **Key Exports:** default function ProfileSetupPage
- **Interfaces/Types:** ProfileSetupPageProps, SetupRole
- **Props Contracts:** ProfileSetupPageProps
- **Main Variables/Constants:** roleConfig
- **Hooks Used:** useReducedMotion
- **Animations Used:** framer-motion, reduced-motion accessibility support
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** framer-motion, lucide-react, @/features/auth/types/auth

## src/features/auth/pages/RegisterPage.tsx

- **Category:** Feature: Authentication
- **Purpose:** Page-level screen composed from feature and shared components.
- **Key Exports:** default function RegisterPage
- **Interfaces/Types:** None
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** None
- **Hooks Used:** None
- **Animations Used:** None detected
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** @/features/auth/components/AuthLayout, @/features/auth/components/RegisterForm

## src/features/auth/schemas/loginSchema.ts

- **Category:** Feature: Authentication
- **Purpose:** Validation rules and constraints for form input.
- **Key Exports:** const loginSchema
- **Interfaces/Types:** LoginFormValues
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** None
- **Hooks Used:** None
- **Animations Used:** None detected
- **Flow Impact:** input validation
- **Key Dependencies:** zod

## src/features/auth/schemas/registerConstants.ts

- **Category:** Feature: Authentication
- **Purpose:** Centralized constants/config values used by the feature.
- **Key Exports:** const INDUSTRIES, const COMPANY_SIZES, const HIRING_NEEDS, const EXPERIENCE_LEVELS, const SUGGESTED_SKILLS
- **Interfaces/Types:** Industry, CompanySize, HiringNeed, ExperienceLevel
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** None
- **Hooks Used:** None
- **Animations Used:** None detected
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** None

## src/features/auth/schemas/registerSchema.ts

- **Category:** Feature: Authentication
- **Purpose:** Validation rules and constraints for form input.
- **Key Exports:** const registerSchema, const step1Schema, const step2ClientSchema, const step2FreelancerSchema, const step3Schema, const STEP1_FIELDS, const STEP2_CLIENT_FIELDS, const STEP2_FREELANCER_FIELDS, const STEP3_FIELDS
- **Interfaces/Types:** RegisterFormValues
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** optionalUrl, accountBase
- **Hooks Used:** None
- **Animations Used:** None detected
- **Flow Impact:** input validation
- **Key Dependencies:** zod

## src/features/auth/services/auth.api.ts

- **Category:** Feature: Authentication
- **Purpose:** Wraps HTTP endpoints and request/response handling.
- **Key Exports:** const AUTH_ENDPOINTS, const authApi
- **Interfaces/Types:** None
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** emailSchema, isEmail
- **Hooks Used:** None
- **Animations Used:** None detected
- **Flow Impact:** API communication, input validation
- **Key Dependencies:** zod, @/services/api/axios

## src/features/auth/types/auth.ts

- **Category:** Feature: Authentication
- **Purpose:** TypeScript contracts and shared data models.
- **Key Exports:** No explicit exports detected
- **Interfaces/Types:** User, AuthTokens, AuthResponse, LoginPayload, RegisterBasePayload, ClientRegisterPayload, FreelancerRegisterPayload, AuthApiEndpoints, UserRole, RegisterPayload
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** None
- **Hooks Used:** None
- **Animations Used:** None detected
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** None

## src/features/client/components/ClientCard.tsx

- **Category:** Feature: Client Dashboard
- **Purpose:** Feature/component implementation used by the app flow.
- **Key Exports:** function ClientCard, function ClientCardHeader, function ClientCardBody, function ClientSectionSkeleton
- **Interfaces/Types:** ClientCardProps
- **Props Contracts:** ClientCardProps
- **Main Variables/Constants:** None
- **Hooks Used:** None
- **Animations Used:** framer-motion, hover interaction animation
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** framer-motion, react

## src/features/client/components/ClientProfileCard.tsx

- **Category:** Feature: Client Dashboard
- **Purpose:** Feature/component implementation used by the app flow.
- **Key Exports:** default function ClientProfileCard
- **Interfaces/Types:** ClientProfileCardProps
- **Props Contracts:** ClientProfileCardProps
- **Main Variables/Constants:** None
- **Hooks Used:** None
- **Animations Used:** None detected
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** @/components/ui/Button, @/features/client/types/dashboard, @/features/client/components/ClientCard

## src/features/client/components/ClientSidebar.tsx

- **Category:** Feature: Client Dashboard
- **Purpose:** Feature/component implementation used by the app flow.
- **Key Exports:** default function ClientSidebar
- **Interfaces/Types:** NavItem, ClientSidebarProps
- **Props Contracts:** ClientSidebarProps
- **Main Variables/Constants:** navItems
- **Hooks Used:** None
- **Animations Used:** framer-motion
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** lucide-react, react-router-dom, framer-motion

## src/features/client/components/ClientTopNavbar.tsx

- **Category:** Feature: Client Dashboard
- **Purpose:** Feature/component implementation used by the app flow.
- **Key Exports:** default function ClientTopNavbar
- **Interfaces/Types:** ClientTopNavbarProps
- **Props Contracts:** ClientTopNavbarProps
- **Main Variables/Constants:** None
- **Hooks Used:** useEffect, useRef, useState, useDispatch, useAuth
- **Animations Used:** None detected
- **Flow Impact:** redux state updates
- **Key Dependencies:** react, react-redux, react-router-dom, @/app/store/authSlice, @/hooks/useAuth

## src/features/client/components/DashboardStats.tsx

- **Category:** Feature: Client Dashboard
- **Purpose:** Marketing/presentation UI for feature messaging and metrics.
- **Key Exports:** default function DashboardStats
- **Interfaces/Types:** StatConfig, DashboardStatsProps
- **Props Contracts:** DashboardStatsProps
- **Main Variables/Constants:** statConfigs
- **Hooks Used:** None
- **Animations Used:** framer-motion
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** lucide-react, framer-motion, @/utils/currency, @/features/client/types/dashboard, @/features/client/components/ClientCard

## src/features/client/components/JobOverviewChart.tsx

- **Category:** Feature: Client Dashboard
- **Purpose:** Feature/component implementation used by the app flow.
- **Key Exports:** default function JobOverviewChart
- **Interfaces/Types:** JobOverviewChartProps
- **Props Contracts:** JobOverviewChartProps
- **Main Variables/Constants:** None
- **Hooks Used:** useInView, useRef
- **Animations Used:** framer-motion, in-view trigger animation
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** framer-motion, react, @/features/client/types/dashboard, @/features/client/components/ClientCard

## src/features/client/components/JobStatusChart.tsx

- **Category:** Feature: Client Dashboard
- **Purpose:** Feature/component implementation used by the app flow.
- **Key Exports:** default function JobStatusChart
- **Interfaces/Types:** JobStatusChartProps
- **Props Contracts:** JobStatusChartProps
- **Main Variables/Constants:** None
- **Hooks Used:** useInView, useRef
- **Animations Used:** framer-motion, in-view trigger animation
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** framer-motion, react, recharts, @/features/client/types/dashboard, @/features/client/components/ClientCard

## src/features/client/components/LatestApplications.tsx

- **Category:** Feature: Client Dashboard
- **Purpose:** Feature/component implementation used by the app flow.
- **Key Exports:** default function LatestApplications
- **Interfaces/Types:** LatestApplicationsProps
- **Props Contracts:** LatestApplicationsProps
- **Main Variables/Constants:** statusVariant, statusLabel
- **Hooks Used:** None
- **Animations Used:** None detected
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** lucide-react, react-router-dom, @/components/ui/Badge, @/features/client/types/dashboard, @/features/client/components/ClientCard

## src/features/client/components/QuickActions.tsx

- **Category:** Feature: Client Dashboard
- **Purpose:** Feature/component implementation used by the app flow.
- **Key Exports:** default function QuickActions
- **Interfaces/Types:** QuickAction
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** actions
- **Hooks Used:** None
- **Animations Used:** None detected
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** lucide-react, react-router-dom, @/features/client/components/ClientCard

## src/features/client/components/RealTimeActivity.tsx

- **Category:** Feature: Client Dashboard
- **Purpose:** Feature/component implementation used by the app flow.
- **Key Exports:** default function RealTimeActivity
- **Interfaces/Types:** RealTimeActivityProps
- **Props Contracts:** RealTimeActivityProps
- **Main Variables/Constants:** activityConfig
- **Hooks Used:** None
- **Animations Used:** None detected
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** lucide-react, @/features/client/types/dashboard, @/features/client/components/ClientCard, @/features/client/utils/formatRelativeTime

## src/features/client/components/RecentJobs.tsx

- **Category:** Feature: Client Dashboard
- **Purpose:** Feature/component implementation used by the app flow.
- **Key Exports:** default function RecentJobs
- **Interfaces/Types:** RecentJobsProps
- **Props Contracts:** RecentJobsProps
- **Main Variables/Constants:** statusVariant, statusLabel
- **Hooks Used:** None
- **Animations Used:** None detected
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** lucide-react, react-router-dom, @/components/ui/Badge, @/features/client/types/dashboard, @/features/client/components/ClientCard

## src/features/client/components/UpcomingDeadlines.tsx

- **Category:** Feature: Client Dashboard
- **Purpose:** Feature/component implementation used by the app flow.
- **Key Exports:** default function UpcomingDeadlines
- **Interfaces/Types:** UpcomingDeadlinesProps
- **Props Contracts:** UpcomingDeadlinesProps
- **Main Variables/Constants:** None
- **Hooks Used:** None
- **Animations Used:** None detected
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** lucide-react, @/features/client/types/dashboard, @/features/client/components/ClientCard

## src/features/client/hooks/useClientDashboard.ts

- **Category:** Feature: Client Dashboard
- **Purpose:** Reusable hook encapsulating logic/state side-effects.
- **Key Exports:** function useClientDashboard, const CLIENT_DASHBOARD_QUERY_KEY
- **Interfaces/Types:** None
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** None
- **Hooks Used:** useQuery, useClientDashboard
- **Animations Used:** None detected
- **Flow Impact:** server-state fetch/mutation
- **Key Dependencies:** @tanstack/react-query, @/features/client/services/clientDashboard.api

## src/features/client/layout/ClientDashboardLayout.tsx

- **Category:** Feature: Client Dashboard
- **Purpose:** Layout wrapper that arranges page structure and slots.
- **Key Exports:** function ClientDashboardLayout
- **Interfaces/Types:** None
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** None
- **Hooks Used:** useState, useClientDashboard
- **Animations Used:** None detected
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** react, @/features/client/components/ClientSidebar, @/features/client/components/ClientTopNavbar, @/features/client/hooks/useClientDashboard

## src/features/client/pages/ClientDashboard.tsx

- **Category:** Feature: Client Dashboard
- **Purpose:** Page-level screen composed from feature and shared components.
- **Key Exports:** default function ClientDashboard
- **Interfaces/Types:** None
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** None
- **Hooks Used:** useClientDashboard
- **Animations Used:** framer-motion
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** framer-motion, @/features/client/components/ClientProfileCard, @/features/client/components/DashboardStats, @/features/client/components/JobOverviewChart, @/features/client/components/JobStatusChart, @/features/client/components/LatestApplications, @/features/client/components/QuickActions, @/features/client/components/RealTimeActivity, @/features/client/components/RecentJobs, @/features/client/components/UpcomingDeadlines, @/features/client/components/ClientCard, @/features/client/hooks/useClientDashboard

## src/features/client/services/clientDashboard.api.ts

- **Category:** Feature: Client Dashboard
- **Purpose:** Wraps HTTP endpoints and request/response handling.
- **Key Exports:** const mockClientDashboardData, const clientDashboardApi
- **Interfaces/Types:** None
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** ENDPOINTS
- **Hooks Used:** None
- **Animations Used:** None detected
- **Flow Impact:** API communication
- **Key Dependencies:** @/services/api/axios, @/features/client/types/dashboard

## src/features/client/types/dashboard.ts

- **Category:** Feature: Client Dashboard
- **Purpose:** TypeScript contracts and shared data models.
- **Key Exports:** No explicit exports detected
- **Interfaces/Types:** DashboardStats, JobOverviewPoint, JobStatusSlice, RecentJob, LatestApplication, RealTimeActivityItem, UpcomingDeadline, ClientProfileSummary, ClientDashboardData, JobStatus, ApplicationStatus, ActivityType
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** None
- **Hooks Used:** None
- **Animations Used:** None detected
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** None

## src/features/client/utils/formatRelativeTime.ts

- **Category:** Feature: Client Dashboard
- **Purpose:** Collects, validates, and submits user input.
- **Key Exports:** function formatRelativeTime
- **Interfaces/Types:** None
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** None
- **Hooks Used:** None
- **Animations Used:** None detected
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** None

## src/features/freelancer/FreelancerDashboard.tsx

- **Category:** Feature Module
- **Purpose:** Feature/component implementation used by the app flow.
- **Key Exports:** function FreelancerDashboard
- **Interfaces/Types:** None
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** rows
- **Hooks Used:** None
- **Animations Used:** None detected
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** @/components/ui/Badge, @/components/ui/Table

## src/features/landing/ArticlesSection.tsx

- **Category:** Feature: Landing Page
- **Purpose:** Marketing/presentation UI for feature messaging and metrics.
- **Key Exports:** default function ArticlesSection
- **Interfaces/Types:** Article
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** articles, containerVariants, itemVariants
- **Hooks Used:** useSectionLoading
- **Animations Used:** framer-motion, variants-based transitions
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** framer-motion, lucide-react, react-router-dom, @/components/ui/Badge, @/components/ui/Card, @/components/ui/Skeleton, @/features/landing/components/AnimatedSection, @/features/landing/components/SectionHeader, @/features/landing/hooks/useSectionLoading

## src/features/landing/CategoriesSection.tsx

- **Category:** Feature: Landing Page
- **Purpose:** Marketing/presentation UI for feature messaging and metrics.
- **Key Exports:** default function CategoriesSection
- **Interfaces/Types:** Category
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** categories, containerVariants, itemVariants
- **Hooks Used:** None
- **Animations Used:** framer-motion, variants-based transitions
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** framer-motion, lucide-react, @/components/ui/Card, @/features/landing/components/AnimatedSection, @/features/landing/components/SectionHeader

## src/features/landing/components/AnimatedSection.tsx

- **Category:** Feature: Landing Page
- **Purpose:** Marketing/presentation UI for feature messaging and metrics.
- **Key Exports:** default function AnimatedSection
- **Interfaces/Types:** AnimatedSectionProps
- **Props Contracts:** AnimatedSectionProps
- **Main Variables/Constants:** None
- **Hooks Used:** useInView, useReducedMotion, useRef
- **Animations Used:** framer-motion, in-view trigger animation, reduced-motion accessibility support
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** framer-motion, react

## src/features/landing/components/SectionHeader.tsx

- **Category:** Feature: Landing Page
- **Purpose:** Marketing/presentation UI for feature messaging and metrics.
- **Key Exports:** default function SectionHeader
- **Interfaces/Types:** SectionHeaderProps
- **Props Contracts:** SectionHeaderProps
- **Main Variables/Constants:** None
- **Hooks Used:** None
- **Animations Used:** None detected
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** lucide-react, react-router-dom

## src/features/landing/CTASection.tsx

- **Category:** Feature: Landing Page
- **Purpose:** Marketing/presentation UI for feature messaging and metrics.
- **Key Exports:** default function CTASection
- **Interfaces/Types:** None
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** None
- **Hooks Used:** useReducedMotion
- **Animations Used:** framer-motion, reduced-motion accessibility support
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** framer-motion, @/components/ui/Button, @/features/landing/components/AnimatedSection

## src/features/landing/FreelancersSection.tsx

- **Category:** Feature: Landing Page
- **Purpose:** Marketing/presentation UI for feature messaging and metrics.
- **Key Exports:** default function FreelancersSection
- **Interfaces/Types:** Freelancer
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** freelancers, containerVariants, itemVariants
- **Hooks Used:** useSectionLoading
- **Animations Used:** framer-motion, variants-based transitions
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** framer-motion, lucide-react, @/components/ui/Badge, @/components/ui/Card, @/components/ui/Skeleton, @/features/landing/components/AnimatedSection, @/features/landing/components/SectionHeader, @/features/landing/hooks/useSectionLoading

## src/features/landing/HeroSection.tsx

- **Category:** Feature: Landing Page
- **Purpose:** Marketing/presentation UI for feature messaging and metrics.
- **Key Exports:** default function HeroSection
- **Interfaces/Types:** None
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** avatars
- **Hooks Used:** useReducedMotion
- **Animations Used:** framer-motion, reduced-motion accessibility support
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** framer-motion, lucide-react, @/components/ui/Button, @/components/ui/Card, @/features/landing/components/AnimatedSection

## src/features/landing/hooks/useAnimatedCounter.ts

- **Category:** Feature: Landing Page
- **Purpose:** Reusable hook encapsulating logic/state side-effects.
- **Key Exports:** function useAnimatedCounter
- **Interfaces/Types:** CounterConfig
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** None
- **Hooks Used:** useEffect, useRef, useState, useInView, useReducedMotion, useAnimatedCounter
- **Animations Used:** framer-motion, in-view trigger animation, reduced-motion accessibility support
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** react, framer-motion

## src/features/landing/hooks/useSectionLoading.ts

- **Category:** Feature: Landing Page
- **Purpose:** Marketing/presentation UI for feature messaging and metrics.
- **Key Exports:** function useSectionLoading
- **Interfaces/Types:** None
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** None
- **Hooks Used:** useEffect, useState, useSectionLoading
- **Animations Used:** None detected
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** react

## src/features/landing/HowItWorksSection.tsx

- **Category:** Feature: Landing Page
- **Purpose:** Marketing/presentation UI for feature messaging and metrics.
- **Key Exports:** default function HowItWorksSection
- **Interfaces/Types:** Step
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** steps, containerVariants, itemVariants
- **Hooks Used:** None
- **Animations Used:** framer-motion, variants-based transitions
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** framer-motion, lucide-react, @/features/landing/components/AnimatedSection, @/features/landing/components/SectionHeader

## src/features/landing/RealTimeFeaturesSection.tsx

- **Category:** Feature: Landing Page
- **Purpose:** Marketing/presentation UI for feature messaging and metrics.
- **Key Exports:** default function RealTimeFeaturesSection
- **Interfaces/Types:** Feature
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** features, containerVariants, itemVariants
- **Hooks Used:** None
- **Animations Used:** framer-motion, variants-based transitions
- **Flow Impact:** realtime communication
- **Key Dependencies:** framer-motion, lucide-react, @/features/landing/components/AnimatedSection

## src/features/landing/StatsSection.tsx

- **Category:** Feature: Landing Page
- **Purpose:** Marketing/presentation UI for feature messaging and metrics.
- **Key Exports:** default function StatsSection
- **Interfaces/Types:** StatItem
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** stats
- **Hooks Used:** useAnimatedCounter
- **Animations Used:** None detected
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** lucide-react, @/features/landing/components/AnimatedSection, @/features/landing/hooks/useAnimatedCounter

## src/features/landing/TestimonialsSection.tsx

- **Category:** Feature: Landing Page
- **Purpose:** Marketing/presentation UI for feature messaging and metrics.
- **Key Exports:** default function TestimonialsSection
- **Interfaces/Types:** Testimonial
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** testimonials, SLIDE_INTERVAL
- **Hooks Used:** useReducedMotion, useCallback, useEffect, useState
- **Animations Used:** framer-motion, reduced-motion accessibility support
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** framer-motion, lucide-react, react, @/components/ui/Card, @/features/landing/components/AnimatedSection, @/features/landing/components/SectionHeader

## src/hooks/useAuth.ts

- **Category:** Global Hooks
- **Purpose:** Reusable hook encapsulating logic/state side-effects.
- **Key Exports:** const useAuth
- **Interfaces/Types:** None
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** None
- **Hooks Used:** useAppSelector, useAuth
- **Animations Used:** None detected
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** @/app/store

## src/hooks/useDebounce.ts

- **Category:** Global Hooks
- **Purpose:** Reusable hook encapsulating logic/state side-effects.
- **Key Exports:** function useDebounce
- **Interfaces/Types:** None
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** None
- **Hooks Used:** useEffect, useState, useDebounce
- **Animations Used:** None detected
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** react

## src/hooks/usePagination.ts

- **Category:** Global Hooks
- **Purpose:** Reusable hook encapsulating logic/state side-effects.
- **Key Exports:** function usePagination
- **Interfaces/Types:** None
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** None
- **Hooks Used:** useMemo, useState, usePagination
- **Animations Used:** None detected
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** react

## src/hooks/useSocket.ts

- **Category:** Global Hooks
- **Purpose:** Manages realtime socket connection/events.
- **Key Exports:** const useSocket
- **Interfaces/Types:** None
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** None
- **Hooks Used:** useContext, useSocket
- **Animations Used:** None detected
- **Flow Impact:** realtime communication
- **Key Dependencies:** react, @/app/providers/SocketProvider

## src/index.css

- **Category:** Core/App
- **Purpose:** Style definitions for global/theme/component visuals.
- **Style Role:** Global/component styling rules and utility overrides.
- **Key CSS Variables:** --text, --text-h, --bg, --border, --code-bg, --accent, --accent-bg, --accent-border, --social-bg, --shadow, --sans, --heading, --mono

## src/main.tsx

- **Category:** Core/App
- **Purpose:** Feature/component implementation used by the app flow.
- **Key Exports:** No explicit exports detected
- **Interfaces/Types:** None
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** None
- **Hooks Used:** None
- **Animations Used:** None detected
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** react, react-dom/client, react-redux, @/App, @/app/providers/QueryProvider, @/app/store

## src/pages/Landing.tsx

- **Category:** Top-Level Pages
- **Purpose:** Page-level screen composed from feature and shared components.
- **Key Exports:** default function Landing
- **Interfaces/Types:** None
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** None
- **Hooks Used:** None
- **Animations Used:** None detected
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** @/components/layout/Navbar, @/components/layout/Footer, @/features/landing/HeroSection, @/features/landing/StatsSection, @/features/landing/CategoriesSection, @/features/landing/FreelancersSection, @/features/landing/HowItWorksSection, @/features/landing/RealTimeFeaturesSection, @/features/landing/TestimonialsSection, @/features/landing/ArticlesSection, @/features/landing/CTASection

## src/pages/Login.tsx

- **Category:** Top-Level Pages
- **Purpose:** Page-level screen composed from feature and shared components.
- **Key Exports:** No explicit exports detected
- **Interfaces/Types:** None
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** None
- **Hooks Used:** None
- **Animations Used:** None detected
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** None

## src/pages/NotFound.tsx

- **Category:** Top-Level Pages
- **Purpose:** Page-level screen composed from feature and shared components.
- **Key Exports:** function NotFound
- **Interfaces/Types:** None
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** None
- **Hooks Used:** None
- **Animations Used:** None detected
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** react-router-dom, @/components/ui/Button

## src/pages/Register.tsx

- **Category:** Top-Level Pages
- **Purpose:** Page-level screen composed from feature and shared components.
- **Key Exports:** No explicit exports detected
- **Interfaces/Types:** None
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** None
- **Hooks Used:** None
- **Animations Used:** None detected
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** None

## src/pages/Unauthorized.tsx

- **Category:** Top-Level Pages
- **Purpose:** Page-level screen composed from feature and shared components.
- **Key Exports:** function Unauthorized
- **Interfaces/Types:** None
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** None
- **Hooks Used:** None
- **Animations Used:** None detected
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** react-router-dom, @/components/ui/Button

## src/services/api/admin.api.ts

- **Category:** API Service Layer
- **Purpose:** Wraps HTTP endpoints and request/response handling.
- **Key Exports:** const adminApi
- **Interfaces/Types:** None
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** None
- **Hooks Used:** None
- **Animations Used:** None detected
- **Flow Impact:** API communication
- **Key Dependencies:** @/services/api/axios

## src/services/api/application.api.ts

- **Category:** API Service Layer
- **Purpose:** Wraps HTTP endpoints and request/response handling.
- **Key Exports:** const applicationApi
- **Interfaces/Types:** None
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** None
- **Hooks Used:** None
- **Animations Used:** None detected
- **Flow Impact:** API communication
- **Key Dependencies:** @/services/api/axios

## src/services/api/auth.api.ts

- **Category:** API Service Layer
- **Purpose:** Wraps HTTP endpoints and request/response handling.
- **Key Exports:** const login, const register
- **Interfaces/Types:** None
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** None
- **Hooks Used:** None
- **Animations Used:** None detected
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** @/features/auth/services/auth.api

## src/services/api/axios.ts

- **Category:** API Service Layer
- **Purpose:** Feature/component implementation used by the app flow.
- **Key Exports:** const api
- **Interfaces/Types:** None
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** None
- **Hooks Used:** None
- **Animations Used:** None detected
- **Flow Impact:** API communication
- **Key Dependencies:** axios, @/utils/constants

## src/services/api/chat.api.ts

- **Category:** API Service Layer
- **Purpose:** Wraps HTTP endpoints and request/response handling.
- **Key Exports:** const chatApi
- **Interfaces/Types:** None
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** None
- **Hooks Used:** None
- **Animations Used:** None detected
- **Flow Impact:** API communication
- **Key Dependencies:** @/services/api/axios

## src/services/api/job.api.ts

- **Category:** API Service Layer
- **Purpose:** Wraps HTTP endpoints and request/response handling.
- **Key Exports:** const jobApi
- **Interfaces/Types:** None
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** None
- **Hooks Used:** None
- **Animations Used:** None detected
- **Flow Impact:** API communication
- **Key Dependencies:** @/services/api/axios

## src/services/api/notification.api.ts

- **Category:** API Service Layer
- **Purpose:** Wraps HTTP endpoints and request/response handling.
- **Key Exports:** const notificationApi
- **Interfaces/Types:** None
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** None
- **Hooks Used:** None
- **Animations Used:** None detected
- **Flow Impact:** API communication
- **Key Dependencies:** @/services/api/axios

## src/services/api/payment.api.ts

- **Category:** API Service Layer
- **Purpose:** Wraps HTTP endpoints and request/response handling.
- **Key Exports:** const paymentApi
- **Interfaces/Types:** None
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** None
- **Hooks Used:** None
- **Animations Used:** None detected
- **Flow Impact:** API communication
- **Key Dependencies:** @/services/api/axios

## src/services/api/review.api.ts

- **Category:** API Service Layer
- **Purpose:** Wraps HTTP endpoints and request/response handling.
- **Key Exports:** const reviewApi
- **Interfaces/Types:** None
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** None
- **Hooks Used:** None
- **Animations Used:** None detected
- **Flow Impact:** API communication
- **Key Dependencies:** @/services/api/axios

## src/services/websocket/chatSocket.ts

- **Category:** WebSocket Layer
- **Purpose:** Manages realtime socket connection/events.
- **Key Exports:** function createChatSocket
- **Interfaces/Types:** None
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** None
- **Hooks Used:** None
- **Animations Used:** None detected
- **Flow Impact:** realtime communication
- **Key Dependencies:** @/services/websocket/socket

## src/services/websocket/socket.ts

- **Category:** WebSocket Layer
- **Purpose:** Manages realtime socket connection/events.
- **Key Exports:** function createAppWebSocket
- **Interfaces/Types:** WebSocketHandlers
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** None
- **Hooks Used:** None
- **Animations Used:** None detected
- **Flow Impact:** realtime communication
- **Key Dependencies:** @/utils/constants

## src/styles/globals.css

- **Category:** Styling
- **Purpose:** Style definitions for global/theme/component visuals.
- **Style Role:** Global/component styling rules and utility overrides.
- **Key CSS Variables:** None detected

## src/styles/tailwind.css

- **Category:** Styling
- **Purpose:** Style definitions for global/theme/component visuals.
- **Style Role:** Global/component styling rules and utility overrides.
- **Key CSS Variables:** None detected

## src/types/application.ts

- **Category:** Global Types
- **Purpose:** TypeScript contracts and shared data models.
- **Key Exports:** No explicit exports detected
- **Interfaces/Types:** JobApplication
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** None
- **Hooks Used:** None
- **Animations Used:** None detected
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** None

## src/types/auth.ts

- **Category:** Global Types
- **Purpose:** TypeScript contracts and shared data models.
- **Key Exports:** No explicit exports detected
- **Interfaces/Types:** None
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** None
- **Hooks Used:** None
- **Animations Used:** None detected
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** None

## src/types/job.ts

- **Category:** Global Types
- **Purpose:** TypeScript contracts and shared data models.
- **Key Exports:** No explicit exports detected
- **Interfaces/Types:** Job
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** None
- **Hooks Used:** None
- **Animations Used:** None detected
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** None

## src/types/notification.ts

- **Category:** Global Types
- **Purpose:** TypeScript contracts and shared data models.
- **Key Exports:** No explicit exports detected
- **Interfaces/Types:** AppNotification
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** None
- **Hooks Used:** None
- **Animations Used:** None detected
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** None

## src/types/review.ts

- **Category:** Global Types
- **Purpose:** TypeScript contracts and shared data models.
- **Key Exports:** No explicit exports detected
- **Interfaces/Types:** Review
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** None
- **Hooks Used:** None
- **Animations Used:** None detected
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** None

## src/utils/constants.ts

- **Category:** Utilities
- **Purpose:** Centralized constants/config values used by the feature.
- **Key Exports:** const APP_NAME, const API_BASE_URL, const WS_BASE_URL
- **Interfaces/Types:** None
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** None
- **Hooks Used:** None
- **Animations Used:** None detected
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** None

## src/utils/currency.ts

- **Category:** Utilities
- **Purpose:** Feature/component implementation used by the app flow.
- **Key Exports:** const formatCurrency
- **Interfaces/Types:** None
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** None
- **Hooks Used:** None
- **Animations Used:** None detected
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** None

## src/utils/date.ts

- **Category:** Utilities
- **Purpose:** Feature/component implementation used by the app flow.
- **Key Exports:** const formatDate
- **Interfaces/Types:** None
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** None
- **Hooks Used:** None
- **Animations Used:** None detected
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** None

## src/utils/jwt.ts

- **Category:** Utilities
- **Purpose:** Feature/component implementation used by the app flow.
- **Key Exports:** const decodeJwtPayload
- **Interfaces/Types:** JwtPayload
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** None
- **Hooks Used:** None
- **Animations Used:** None detected
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** None

## src/utils/permissions.ts

- **Category:** Utilities
- **Purpose:** Feature/component implementation used by the app flow.
- **Key Exports:** const hasRole
- **Interfaces/Types:** None
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** None
- **Hooks Used:** None
- **Animations Used:** None detected
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** @/types/auth

## src/vite-env.d.ts

- **Category:** Core/App
- **Purpose:** Feature/component implementation used by the app flow.
- **Key Exports:** No explicit exports detected
- **Interfaces/Types:** ImportMetaEnv, ImportMeta
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** None
- **Hooks Used:** None
- **Animations Used:** None detected
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** None

## src/vite.config.ts

- **Category:** Core/App
- **Purpose:** Feature/component implementation used by the app flow.
- **Key Exports:** No explicit exports detected
- **Interfaces/Types:** None
- **Props Contracts:** No explicit *Props interface found
- **Main Variables/Constants:** None
- **Hooks Used:** None
- **Animations Used:** None detected
- **Flow Impact:** Primarily presentational or type-only role
- **Key Dependencies:** None

