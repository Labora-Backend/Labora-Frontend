import AuthLayout from '@/features/auth/components/AuthLayout'
import RegisterForm from '@/features/auth/components/RegisterForm'

export default function RegisterPage() {
  return (
    <AuthLayout mode="register">
      <RegisterForm />
    </AuthLayout>
  )
}

export { RegisterPage }
