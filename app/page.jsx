'use client';
import { Volume2Icon, VolumeOffIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import MusicButton from "@/components/MusicButton";

export default function Home() {
  const audioRef = useRef(null);
  const [needsAction, setNeedsAction] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);


  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = 0.7;
    (async () => {
      try {
        await a.play();
        setIsPlaying(true);
        setNeedsAction(false);
      } catch {
        setNeedsAction(true);
      }
    })();
  }, []);

  const enableSound = async () => {
    const a = audioRef.current;
    if (!a) return;
    try {
      await a.play();
      setIsPlaying(true);
      setNeedsAction(false);
    } catch {

    }
  };

  const toggleSound = async () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      try {
        await a.play();
        setIsPlaying(true);
      } catch { }
    } else {
      a.pause();
      setIsPlaying(false);
    }
  };

  return (
    <main className="relative z-10 flex flex-col w-full h-screen items-center justify-center">

      <video
        src="/BG/BG3.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-bottom -z-10"
      />




      <MusicButton defaultVolume={1} src="/BG/BGM-Main2.mp3"/>

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
