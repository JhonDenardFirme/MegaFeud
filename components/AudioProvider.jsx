"use client";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const AudioCtx = createContext(null);

export function AudioProvider({ children }) {
  const audioRef = useRef(null);
  const autoplayNextRef = useRef(true);

  const [isPlaying, setIsPlaying] = useState(false);
  const [needsAction, setNeedsAction] = useState(false);

  const [volume, _setVolume] = useState(() => {
    if (typeof window === "undefined") return 1;
    const saved = Number(localStorage.getItem("bg-vol"));
    return Number.isFinite(saved) ? saved : 1;
  });

  const [src, _setSrc] = useState(() => {
    if (typeof window === "undefined") return "/BG/BGM-Main2.mp3";
    return localStorage.getItem("bg-src") || "/BG/BGM-Main2.mp3";
  });

  const [userAdjusted, setUserAdjusted] = useState(false);
  const pathname = usePathname();

  // Try autoplay once
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = volume;
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

  // Auto volume per route unless user changed it
  useEffect(() => {
    if (userAdjusted) return;
    const target = pathname === "/" ? 1 : 0.2; // home=100%, others=20%
    _setVolume(target);
    if (audioRef.current) audioRef.current.volume = target;
    if (typeof window !== "undefined") localStorage.setItem("bg-vol", String(target));
  }, [pathname, userAdjusted]);

  // React to source changes (decide whether to autoplay the new track)
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    // ensure DOM updates and reset buffer
    a.load();
    if (autoplayNextRef.current) {
      (async () => {
        try {
          await a.play();
          setIsPlaying(true);
          setNeedsAction(false);
        } catch {
          setNeedsAction(true);
        }
      })();
    } else {
      a.pause();
      setIsPlaying(false);
    }
  }, [src]);

  const play = async () => {
    const a = audioRef.current;
    if (!a) return;
    await a.play();
    setIsPlaying(true);
    setNeedsAction(false);
  };

  const pause = () => {
    const a = audioRef.current;
    if (!a) return;
    a.pause();
    setIsPlaying(false);
  };

  const toggle = async () => {
    if (isPlaying) {
      pause();
    } else {
      await play();
    }
  };

  const setVolume = (v) => {
    setUserAdjusted(true);
    _setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
    if (typeof window !== "undefined") localStorage.setItem("bg-vol", String(v));
  };

  // NEW: change track source; default autoplay follows current play state
  const setSrc = (newSrc, opts = {}) => {
    if (!newSrc || newSrc === src) return;
    // autoplay next track if we’re currently playing (unless overridden)
    const shouldAutoplay = opts.autoplay != null ? !!opts.autoplay : isPlaying;
    autoplayNextRef.current = shouldAutoplay;
    _setSrc(newSrc);
    if (typeof window !== "undefined") localStorage.setItem("bg-src", newSrc);
  };

  return (
    <AudioCtx.Provider
      value={{ isPlaying, needsAction, volume, src, play, pause, toggle, setVolume, setSrc }}
    >
      {children}
      <audio ref={audioRef} src={src} loop preload="auto" />
    </AudioCtx.Provider>
  );
}

export const useAudio = () => {
  const ctx = useContext(AudioCtx);
  if (!ctx) throw new Error("useAudio must be used within <AudioProvider>");
  return ctx;
};
