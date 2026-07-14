import { motion } from 'framer-motion'

export default function SocialLoginButtons() {
  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-3 text-text-muted">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
          className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-text transition-colors hover:bg-slate-50"
          aria-label="Continue with Google"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Google
        </motion.button>

        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
          className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-text transition-colors hover:bg-slate-50"
          aria-label="Continue with GitHub"
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.935 1.05-.105 2.16-.525 2.16-2.355 0-.525-.195-1.005-.51-1.425.045-.495-.105-1.245-.495-1.875 0 0-.42-.135-1.365.525-.405-.12-.84-.18-1.275-.18-.435 0-.87.06-1.275.18-.945-.675-1.365-.525-1.365-.525-.39.63-.54 1.38-.495 1.875-.315.42-.51.9-.51 1.425 0 1.83 1.11 2.25 2.16 2.355-.675.585-1.08 1.335-1.23 1.935-.24.675-1.02 1.965-4.035 1.41 0 1.005-.015 1.95-.015 2.235 0 .315.225.69.825.57A12.02 12.02 0 0012 24c6.63 0 12-5.37 12-12 0-6.63-5.37-12-12-12z" />
          </svg>
          GitHub
        </motion.button>
      </div>
    </div>
  )
}
