import { ArrowLeftToLine, ChevronLeft, ChevronRight, CircleQuestionMark, CloudHail } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import { headers } from 'next/headers';
import MusicButton from "@/components/MusicButton";

import AnswerBoard from '@/components/AnswerBoard';

export default async function page({ params }) {

  // 1) Await the params object
  const { id } = await params;

  // 2) Await headers()
  const hdr = await headers();
  const host = hdr.get("x-forwarded-host") ?? hdr.get("host");
  const protocol = host?.includes("localhost") ? "http" : "https";
  const origin = `${protocol}://${host}`;

  // 3) Build an Absolute URL
  const res = await fetch(
    `${origin}/api/questions/${id}`,
    { next: { revalidate: 0 } }
  );

  if (!res.ok) return <p>Question not found.</p>;
  const question = await res.json();

  return (

    <div className="relative flex flex-col w-full h-screen items-center justify-center isolation isolate">
      {/* VIDEO BG */}
      <video
        src="/BG/BG4.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-top -z-20"
      />


      <div className='absolute w-full h-full black-overlay mix-blend-overlay -z-20 top-0'></div>
      <div className='absolute w-full h-full black-overlay-top mix-blend-multiply -z-20 top-0'></div>

      {/* MAIN CONTAINER */}
      <div className='flex flex-col items-center justify-center w-full -mt-8 '>

        <div className='outline-[1px] flex flex-col items-center justify-center rounded-2xl p-8'>
          <div className='rounded-2xl overflow-hidden flex justify-center w-[85%] h-auto mb-8'>
            <img src={`/assets/wordcloud/${id}.png`} className='w-full h-full'></img>
          </div>


          <p className='text-sm filter drop-shadow-lg text-outline z-50 -mt-2 tracking-widest'
          >
            Based on the Company's Facebook Posts from January to July 2025
          </p>

        </div>



      </div>

      <MusicButton defaultVolume={0.2} src="/BG/BGM-Think.mp3"/>

      {/* NAVIGATION BUTTONS */}
      <div className='absolute flex flex-row gap-16 items-center justify-center w-1/2 bottom-8'>

        <Link href={`/question/${id}/board`}>
          <div className='flex flex-col w-12 h-12 rounded-full border-[1px] boder-white/80 mix-blend-lighten items-center justify-center'>
            <ArrowLeftToLine className="w-6 h-6 text-white -ml-0.5" />
          </div>
        </Link>

      </div>


    </div>
  )
}

