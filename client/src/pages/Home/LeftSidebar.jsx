import React from 'react'

function LeftSidebar() {
  return (
    <div className=" fixed left-0 bottom-0 px-10 sm:static sm:p-10 sm:text-2xl">
        <div className="flex flex-col gap-3 items-center">
        <div className="flex flex-col gap-5 text-gray-500 sm:flex-row">
        <i class="ri-facebook-circle-line"></i>
        <i class="ri-mail-line"></i>
        <i class="ri-instagram-line"></i>
        <i class="ri-linkedin-box-line"></i>
        <i class="ri-github-fill"></i>
        </div>
        <div className="w-[1px] h-32 bg-[#125f63] sm:hidden">

        </div>
        </div>
    </div>
  )
}

export default LeftSidebar