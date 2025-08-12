import { ChevronLeft, ChevronRight, CircleQuestionMark, CloudHail } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import { headers } from 'next/headers';


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

        <div className='upper-section flex flex-row w-full items-center justify-between '>

          {/* TEAM A SCOREBOARD */}
          <div className='relative linear-blue flex flex-col items-center justify-center w-64 h-32 bg-white/80 rounded-tr-2xl rounded-br-2xl mix-blend-plus-lighter'>
            <div className='absolute linear-blue flex flex-col items-center justify-center w-full top-0 rounded-tr-2xl rounded-br-2xl h-10'>
              <img src="/assets/TEAMA.png" className='h-4'></img>
            </div>

            <div className='flex flex-col items-center justify-center w-full -mt-4'>
              <input type='text' className='text-[42px] mt-10 filter drop-shadow-lg text-outline z-50 outline-none w-full text-center' placeholder='0'
                style={{
                  textShadow: [
                    '-1px -1px 0 #000',
                    ' 1px -1px 0 #000',
                    '-1px  1px 0 #000',
                    ' 1px  1px 0 #000',
                  ].join(',')
                }}>

              </input>

              <p className='text-sm filter drop-shadow-lg text-outline z-50 -mt-2 tracking-wide' 
                style={{
                  textShadow: [
                    '-1px -1px 0 #000',
                    ' 1px -1px 0 #000',
                    '-1px  1px 0 #000',
                    ' 1px  1px 0 #000',
                  ].join(',')
                }}>
                POINTS
              </p>
            </div>


          </div>


          {/* QUESTION BOARD */}
          <div className='linear-blue flex flex-col items-center justify-center w-[60%] h-32 bg-white/80 rounded-2xl relative mix-blend-plus-lighter'>
            <div className='linear-blue flex flex-col items-center justify-center w-16 h-16 absolute top-0 -translate-y-[50%] rounded-full mix-blend-plus-lighter'>
              <CircleQuestionMark size="60%"></CircleQuestionMark>
            </div>

            <div className="absolute mb-4 z-50">
              <img src={`/assets/QUESTION${id}.png`} className='h-4'></img>
            </div>

            <p className='text-2xl mt-10 filter drop-shadow-lg text-outline tracking-wide'
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


          {/* TEAM B SCOREBOARD */}
          <div className='relative linear-blue flex flex-col items-center justify-center w-64 h-32 bg-white rounded-tl-2xl rounded-bl-2xl mix-blend-screen'>
            <div className='absolute linear-blue flex flex-col items-center justify-center w-full top-0 rounded-tl-2xl rounded-bl-2xl h-10'>
              <img src="/assets/TEAMB.png" className='h-4'></img>
            </div>

            <div className='flex flex-col items-center justify-center w-full -mt-4'>
              <input type='text' className='text-[42px] mt-10 filter drop-shadow-lg text-outline z-50 outline-none w-full text-center' placeholder='0'
                style={{
                  textShadow: [
                    '-1px -1px 0 #000',
                    ' 1px -1px 0 #000',
                    '-1px  1px 0 #000',
                    ' 1px  1px 0 #000',
                  ].join(',')
                }}>

              </input>

              <p className='text-sm filter drop-shadow-lg text-outline z-50 -mt-2 tracking-wide'
                style={{
                  textShadow: [
                    '-1px -1px 0 #000',
                    ' 1px -1px 0 #000',
                    '-1px  1px 0 #000',
                    ' 1px  1px 0 #000',
                  ].join(',')
                }}>
                POINTS
              </p>
            </div>

          </div>

        </div>

      </div>


      {/* ANSWER BOARD */}
      <AnswerBoard answers={question.answers}></AnswerBoard>


      {/* NAVIGATION BUTTONS */}
      <div className='absolute flex flex-row gap-16 items-center justify-center w-1/2 bottom-8'>
        <Link href={id==1? `/question/${id}` : `/question/${id}`}>
          <div className='flex flex-col w-12 h-12 rounded-full border-[1px] boder-white/80 mix-blend-lighten items-center justify-center'>
            <ChevronLeft className="w-6 h-6 text-white -ml-0.5" />
          </div>
        </Link>

        <Link href={`/question/${id}/wordcloud`}>
          <div className='flex flex-col w-12 h-12 rounded-full border-[1px] boder-white/80 mix-blend-lighten items-center justify-center'>
            <CloudHail className="w-6 h-6 text-white -ml-0.5" />
          </div>
        </Link>

        <Link href={id==4 ? `/` : `/question/${Number(id)+1}`}>
          <div className='flex flex-col w-12 h-12 rounded-full border-[1px] boder-white/80 mix-blend-lighten items-center justify-center z-50'>
            <ChevronRight className="w-6 h-6 text-white ml-0.5"/>
          </div>
        </Link>
      </div>


    </div>
  )
}

