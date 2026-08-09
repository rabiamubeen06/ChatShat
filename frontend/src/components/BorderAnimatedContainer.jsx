import React from 'react'

const BorderAnimatedContainer = ({ children }) => {
  return (
   <div className="w-full h-full flex [background:linear-gradient(45deg,#ffffff,var(--color-lilac-50)_50%,#ffffff)_padding-box,conic-gradient(from_var(--border-angle),
   var(--color-lilac-200)_80%,var(--color-lilac-500)_86%,var(--color-lilac-300)_90%,var(--color-lilac-500)_94%,var(--color-lilac-200))_border-box] dark:[background:linear-gradient(45deg,#2A2233,#362B4A_50%,#2A2233)_padding-box,conic-gradient(from_var(--border-angle),var(--color-lilac-700)_80%,var(--color-lilac-500)_86%,var(--color-lilac-300)_90%,var(--color-lilac-500)_94%,var(--color-lilac-700))_border-box] 
   rounded-none md:rounded-2xl border-0 md:border md:border-transparent animate-border overflow-hidden shadow-none md:shadow-lg">
  {children}
</div>
  )
}

export default BorderAnimatedContainer