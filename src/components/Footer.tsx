import React from 'react'

const Footer: React.FC = () => (
  <footer>
    <div className="w-full flex flex-col items-center px-6 border-t mt-16 border-gray-200">
      <div className="py-6 text-center sm:w-2/3">
        <p className="text-sm text-gray-600">© 2021 by Ryota Murakami</p>
      </div>
    </div>
  </footer>
)

export default React.memo(Footer, () => true)
