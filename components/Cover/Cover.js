import Image from 'next/image'
import React from 'react'


export const Cover = ({children, background}) => {
  return (
    
    <div className="h-96 bg-slate-800 relative min-h-[600px] flex justify-center items-center text-white ">
      <Image alt="Hero" src={background} layout="fill" objectFit="cover" className="mix-blend-soft-light"/>
      <div className="max-w-5xl z-10">
      {children}
      </div>

      </div>
  )
}
