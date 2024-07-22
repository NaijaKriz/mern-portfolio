import React from 'react'

function Loader() {
  return (
    <div className="h-screen flex items-center justify-center fixed inset-0 bg-primary z-[10000]">
        <div className="flex gap-5 text-7xl font-semibold sm:text-5xl">
            <h1 className="text-secondary i">I</h1>
            <h1 className="text-white c">C</h1>
            <h1 className="text-tertiary I">I</h1>
        </div>
    </div>
  )
}

export default Loader