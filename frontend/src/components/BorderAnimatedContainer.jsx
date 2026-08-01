import React from 'react'

const BorderAnimatedContainer = ({ children }) => {
  return (
   <div className="w-full max-w-105.5 group [background:linear-gradient(45deg,#172033,var(--color-slate-800)_50%,#172033)_padding-box,conic-gradient(from_var(--border-angle),var(--color-slate-600)_80%,var(--color-indigo-500)_86%,var(--color-indigo-300)_90%,var(--color-indigo-500)_94%,var(--color-slate-600))_border-box] rounded-2xl border border-transparent animate-border">
  {children}
</div>
  )
}

export default BorderAnimatedContainer