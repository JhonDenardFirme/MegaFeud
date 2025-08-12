"use client";
import { useEffect } from "react";
import { Volume2Icon, VolumeOffIcon } from "lucide-react";
import { useAudio } from "./AudioProvider";

export default function MusicButton({ defaultVolume, src }) {
  const { isPlaying, needsAction, play, toggle, setVolume, volume, setSrc, src: currentSrc } =
    useAudio();

  // Optional per-page default volume override
  useEffect(() => {
    if (defaultVolume != null && volume !== defaultVolume) setVolume(defaultVolume);
  }, [defaultVolume]); // eslint-disable-line react-hooks/exhaustive-deps

  // NEW: per-page track source (string). Only change if different.
  useEffect(() => {
    if (src && src !== currentSrc) {
      // keep playing if already playing; otherwise just switch silently
      setSrc(src, { autoplay: isPlaying });
    }
  }, [src, currentSrc, isPlaying, setSrc]);

  const onClick = async () => {
    if (needsAction && !isPlaying) await play();
    else await toggle();
  };

  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 rounded-full p-3 bg-white/20 backdrop-blur text-white hover:cursor-pointer"
      aria-label={isPlaying ? "Pause music" : "Play music"}
    >
      {isPlaying ? <Volume2Icon /> : <VolumeOffIcon />}
    </button>
  );
}
