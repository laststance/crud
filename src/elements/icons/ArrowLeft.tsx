import React, { memo } from 'react'

const ArrowLeft: React.FC = memo(
  () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M7 16l-4-4m0 0l4-4m-4 4h18"
      />
    </svg>
  ),
  () => true
)
ArrowLeft.displayName = 'ArrowLeft'

export default ArrowLeft
