import AuthLayout from '@/features/auth/components/AuthLayout'
import LoginForm from '@/features/auth/components/LoginForm'

export default function LoginPage() {
  return (
    <AuthLayout mode="login">
      <LoginForm />
    </AuthLayout>
  )
}

export { LoginPage }
