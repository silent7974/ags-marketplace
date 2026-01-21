'use client'

import { useParams } from "next/navigation";
import { useGetStoreBySlugQuery } from "@/redux/services/storeApi";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  Search,
  Bookmark,
  ShoppingCart,
  MoreVertical,
  Maximize2,
  Play,
  Pause,
} from "lucide-react";

// -------- Main PreviewStore Component --------

function PreviewStore({ store }) {
  const {
    videoPreviewUrl,
    bannerPreviewUrl,
    videoMuted,
    brandName,
  } = store;

  const displayName = brandName?.split(" ")[0] || "Store";

  const [showMaximize, setShowMaximize] = useState(false);
  const [showVideo, setShowVideo] = useState(!!videoPreviewUrl);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const videoRef = useRef(null);
  const rafRef = useRef(null);
  const startRef = useRef(0);
  const elapsedRef = useRef(0);

  const BANNER_DURATION = 5000;
  const RADIUS = 44;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

  useEffect(() => {
    if (paused) return;

    const duration =
      showVideo && videoPreviewUrl
        ? (videoRef.current?.duration || 5) * 1000
        : BANNER_DURATION;

    const start = performance.now() - elapsedRef.current;
    startRef.current = start;

    function tick(now) {
      const elapsed = now - startRef.current;
      elapsedRef.current = elapsed;
      const pct = Math.min(elapsed / duration, 1);
      setProgress(pct);

      if (pct < 1 && !paused) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setProgress(0);
        elapsedRef.current = 0;
        setShowVideo((v) => !v);
      }
    }

    rafRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafRef.current);
  }, [showVideo, paused]);

  function togglePlay() {
    setPaused((p) => !p);
    if (videoRef.current) {
      paused ? videoRef.current.play() : videoRef.current.pause();
    }
  }

  function enterFullscreen() {
    setPaused(true);
    videoRef.current?.pause();
    videoRef.current?.requestFullscreen?.();
  }

  return (
    <div className="max-w-[420px] mx-auto">
      {/* MEDIA */}
      <div
        className="relative w-full h-[360px] bg-black overflow-hidden"
        onClick={() => setShowMaximize((prev) => !prev)}
      >
        <AnimatePresence mode="wait">
          {showVideo && videoPreviewUrl ? (
            <motion.video
              key="video"
              ref={videoRef}
              src={videoPreviewUrl?.url}
              muted={videoMuted}
              autoPlay
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3 }}
            />
          ) : bannerPreviewUrl ? (
            <motion.img
              key="banner"
              src={bannerPreviewUrl?.url}
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3 }}
            />
          ) : null}
        </AnimatePresence>

        {showVideo && showMaximize && (
          <button
            onClick={enterFullscreen}
            className="absolute top-3 left-3 bg-black/70 p-2 rounded-full"
          >
            <Maximize2 size={18} color="#fff" />
          </button>
        )}

        <div className="absolute bottom-3 right-3 w-6 h-6">
          <svg viewBox="0 0 100 100" className="absolute inset-0">
            <circle cx="50" cy="50" r={RADIUS} fill="none" stroke="#fff" strokeWidth="10" opacity="0.5" />
            <circle
              cx="50"
              cy="50"
              r={RADIUS}
              fill="none"
              stroke="#fff"
              strokeWidth="10"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
              strokeLinecap="round"
            />
          </svg>

          <button onClick={togglePlay} className="absolute inset-0 flex items-center justify-center">
            {paused ? <Play size={14} color="#fff" fill="#fff" /> : <Pause size={14} color="#fff" fill="#fff" />}
          </button>
        </div>
      </div>
    </div>
  );
}

// -------- Main page --------

export default function StorePage() {
  const { slug } = useParams();
  const { data: store, error, isLoading } = useGetStoreBySlugQuery(slug);

  if (isLoading) return <p>Loading...</p>;

  if (error || !store || !store.isPublished) {
    return <p>404 - Store not found</p>;
  }

  return <PreviewStore store={store} />;
}