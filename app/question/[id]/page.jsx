import { ChevronLeft, ChevronRight, CircleQuestionMark } from 'lucide-react';
import Link from 'next/link';
import React from 'react'


export default async function page({ params }) {

  const { id } = await params;
  // Choose the right base—on Vercel it'll be VERCEL_URL, locally use localhost
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : `http://localhost:${process.env.PORT || 3000}`

  const res = await fetch(
    `${baseUrl}/api/questions/${id}`,
    { next: { revalidate: 0 } }
  )
  const question = await res.json();

  return (

    <div className="relative z-10 flex flex-col w-full h-screen items-center justify-center isolation isolate">
      {/* VIDEO BG */}
      <video
        src="/BG/BG4.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-top -z-20"
      />
      <div className='absolute w-full h-full black-overlay mix-blend-overlay -z-10'></div>


      {/* MAIN CONTAINER */}
      <div className='flex flex-col items-center justify-center w-full h-screen'>

        <div className='linear-blue flex flex-col items-center justify-center w-[75%] h-48 bg-white/80 rounded-2xl relative mix-blend-plus-lighter'>
          <div className='linear-blue flex flex-col items-center justify-center w-20 h-20 absolute top-0 -translate-y-[50%] rounded-full mix-blend-plus-lighter'>
            <CircleQuestionMark w-full h-full></CircleQuestionMark>
          </div>

          <div className="absolute mb-8 z-50">
            <img src={`/assets/QUESTION${id}.png`} className='h-5'></img>
          </div>



          <p className='text-3xl mt-8 filter drop-shadow-lg text-outline'
            style={{
              textShadow: [
                '-1px -1px 0 #000',
                ' 1px -1px 0 #000',
                '-1px  1px 0 #000',
                ' 1px  1px 0 #000',
              ].join(',')
            }}>
            {question.question}
          </p>
        </div>

      </div>


      

      {/* NAVIGATION BUTTONS */}
      <div className='absolute flex flex-row gap-16 items-center justify-center w-1/2 bottom-8'>
        <Link href="/">
          <div className='flex flex-col w-12 h-12 rounded-full border-[1px] boder-white/80 mix-blend-lighten items-center justify-center'>
            <ChevronLeft className="w-6 h-6 text-white -ml-0.5" />
          </div>
        </Link>

        <Link href={`/question/${id}/board`}>
          <div className='flex flex-col w-12 h-12 rounded-full border-[1px] boder-white/80 mix-blend-lighten items-center justify-center'>
            <ChevronRight className="w-6 h-6 text-white ml-0.5" />
          </div>
        </Link>
      </div>


    </div>
  )
}

