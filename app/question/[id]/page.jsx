import Link from 'next/link';
import React from 'react'

export default async function page ({params}) {

  const {id} = await params;
  return (

    <div className="relative z-10 flex flex-col w-full h-screen items-center justify-center">
      {/* Video is now an absolutely-positioned child of <main> */}
      <video
        src="/BG/BG2.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-bottom -z-10"
      />

      {/* Your blended-gradient button */}
      <Link href={"#"}>
        <div className="button-start py-4 px-32 rounded-2xl mt-16 font-['Gasoek One']">
          START
        </div>
      </Link>
    </div>
  )
}

