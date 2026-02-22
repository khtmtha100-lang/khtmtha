import React from 'react'

// Usage: wrap the target/button inside <Highlight show={showTutorial}>...</Highlight>
// When `show` is true the fullscreen dark overlay is rendered and the wrapped
// child is kept at a higher z-index so it appears 'lit' above the overlay.
const Highlight = ({ show = false, children, overlayClass = '', targetClass = '' }) => {
  return (
    <div className="relative">
      {show && <div className={`fixed inset-0 bg-black/40 z-30 pointer-events-none transition-opacity duration-300 ${overlayClass}`} />}
      <div className={`${show ? 'z-40 relative' : ''} ${targetClass}`}>
        {children}
      </div>
    </div>
  )
}

export default Highlight
