"use client";

import { useEffect, useRef, useState } from "react";

const VIDEO_SRC = "https://axspectech.vercel.app/video/deep-space.mp4";

type AxSpecHeroVideoProps = {
  poster: string;
  alt: string;
};

export function AxSpecHeroVideo({ poster, alt }: AxSpecHeroVideoProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playable, setPlayable] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setPlayable(!motion.matches && !failed);
    apply();
    motion.addEventListener("change", apply);
    return () => motion.removeEventListener("change", apply);
  }, [failed]);

  useEffect(() => {
    const frame = frameRef.current;
    const video = videoRef.current;
    if (!playable || !frame || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          video.pause();
          return;
        }
        if (!video.getAttribute("src")) {
          video.src = VIDEO_SRC;
          video.load();
        }
        video.play().catch(() => setFailed(true));
      },
      { rootMargin: "180px 0px", threshold: 0.2 },
    );

    observer.observe(frame);
    return () => {
      observer.disconnect();
      video.pause();
    };
  }, [playable]);

  const showVideo = playable && !failed;

  return (
    <div ref={frameRef} className="home-axspec-media">
      {showVideo ? (
        <video
          ref={videoRef}
          className="home-axspec-video"
          poster={poster}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          onError={() => setFailed(true)}
        />
      ) : (
        <img src={poster} alt={alt} width={1200} height={630} className="home-axspec-poster" />
      )}
      <div className="home-axspec-shade" aria-hidden="true" />
    </div>
  );
}
