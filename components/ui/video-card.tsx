"use client";

import { motion } from "motion/react";
import { useRef, useEffect, useState } from "react";

interface VideoCardProps {
  src: string;
  title: string;
  aspectRatio?: "video" | "reel";
  delay?: number;
  className?: string;
}

export default function VideoCard({
  src,
  title,
  aspectRatio = "video",
  delay = 0,
  className = "",
}: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
          setIsPlaying(true);
        } else {
          video.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      const newMuted = !isMuted;
      videoRef.current.muted = newMuted;
      setIsMuted(newMuted);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className={`group hover:border-primary/40 hover:shadow-primary/10 relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md transition-all hover:shadow-2xl ${
        aspectRatio === "reel"
          ? "mx-auto aspect-[9/16] w-full max-w-[320px]"
          : "aspect-video w-full"
      } ${className}`}
    >
      <video
        ref={videoRef}
        src={src}
        title={title}
        className="h-full w-full object-cover"
        muted={isMuted}
        loop
        playsInline
      />

      {/* Overlay UI */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="absolute right-6 bottom-6 left-6 flex items-center justify-between">
        <div className="flex flex-col space-y-1">
          <span className="text-sm font-semibold text-white/90 drop-shadow-md">
            {title}
          </span>
          <div className="flex items-center space-x-2">
            <div
              className={`h-1.5 w-1.5 rounded-full ${isPlaying ? "bg-primary animate-pulse" : "bg-white/20"}`}
            />
            <span className="text-[10px] tracking-tighter text-white/40 uppercase">
              {isPlaying ? "Playing" : "Paused"}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-white/20 active:scale-95"
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          {/* Mute/Unmute Button */}
          <button
            onClick={toggleMute}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-white/20 active:scale-95"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77zM3 9v6h4l5 5V4L7 9H3zm7-.17v6.34L7.83 13H5v-2h2.83L10 8.83z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Decorative Border Glow */}
      <div className="bg-primary/5 absolute inset-0 -z-10 rounded-3xl opacity-0 transition-opacity group-hover:opacity-100" />
    </motion.div>
  );
}
