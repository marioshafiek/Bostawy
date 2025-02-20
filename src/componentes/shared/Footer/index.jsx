//React
import React from 'react'
//Images
import Logo from "../../../assets/svg/BostawyLogo.svg?react";

const Footer = () => {
  return (
    <>
        <div className='flex justify-between items-center px-10'>
            <div className="text-[#e30715]">
                <Logo className={"w-20 h-20 fill-current"}/>
            </div>
            <div>@BostaTask 2025</div>
        </div>
    </>
  )
}

export default Footer