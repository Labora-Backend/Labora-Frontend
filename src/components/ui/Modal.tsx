import type { PropsWithChildren } from 'react'

interface ModalProps extends PropsWithChildren {
  title: string
  isOpen: boolean
  onClose: () => void
}

export function Modal({ title, isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700">
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}