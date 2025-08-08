import Link from "next/link";

export default function Home() {
  return (
    <main className="relative z-10 flex flex-col w-full h-screen items-center justify-center">
      {/* Video is now an absolutely-positioned child of <main> */}
      <video
        src="/BG/BG3.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-bottom -z-10"
      />

      {/* Header */}
      <div className="flex flex-col items-center justify-center">
        <div className="h-36">
          <img src="/BG/MEGA.png" className="h-full object-cover" alt="Mega Logo" />
        </div>
        <div className="h-54 -mt-4">
          <img src="/BG/FEUD.png" className="h-full object-cover" alt="Feud Logo" />
        </div>
      </div>

      {/* Navigation Button */}
      <Link href={"/question/1"}>
        <div className="button-start py-4 px-32 rounded-2xl mt-16 font-['Gasoek One']">
          START
        </div>
      </Link>
    </main>
  );
}
