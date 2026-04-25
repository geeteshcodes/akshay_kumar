import { useEffect, useRef, useState } from "react";

const REELS = [
  {
    id: "kyoto",
    country: "Japan",
    city: "Kyoto",
    caption: "Kimono walks through centuries-old streets",
    videoUrl: "https://www.pexels.com/download/video/31385024/",
    poster: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "vietnam",
    country: "Southeast Asia",
    city: "Vietnam",
    caption: "Emerald karsts of Ha Long Bay",
    videoUrl: "https://www.pexels.com/download/video/30391321/",
    poster: "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "neom",
    country: "Saudi Arabia",
    city: "Neom",
    caption: "Desert horizons & the city of tomorrow",
    videoUrl: "https://www.pexels.com/download/video/19348567/",
    poster: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "basilicata",
    country: "Italy",
    city: "Basilicata",
    caption: "Cave-cut Matera at twilight",
    videoUrl: "https://www.pexels.com/download/video/27562816/",
    poster: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=800&auto=format&fit=crop",
  },
];

function ReelCard({ reel }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    const vid = videoRef.current;
    if (!el || !vid) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          vid.play().catch(() => {});
        } else {
          vid.pause();
        }
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const toggleMute = () => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = !vid.muted;
    setMuted(vid.muted);
  };

  return (
    <div
      ref={containerRef}
      className="group relative w-[260px] md:w-[280px] aspect-[9/16] shrink-0 rounded-[32px] overflow-hidden bg-white shadow-xl shadow-slate-200/80 snap-start cursor-pointer border border-slate-200 p-2 transition-transform duration-300 hover:scale-[1.02]"
      onClick={toggleMute}
    >
      <div className="relative w-full h-full rounded-[24px] overflow-hidden bg-slate-900">
        <img
          src={reel.poster}
          alt={`${reel.city}, ${reel.country}`}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        {!failed && (
          <video
            ref={videoRef}
            src={reel.videoUrl}
            poster={reel.poster}
            muted
            loop
            playsInline
            preload="metadata"
            onError={() => setFailed(true)}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-slate-900/40 pointer-events-none" />

        <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
          <span className="px-3 py-1 bg-white/90 text-sky-600 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full backdrop-blur-sm shadow-sm">
            {reel.country}
          </span>
          <span
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition shadow-sm ${
              muted ? "bg-black/40 text-white/90 backdrop-blur-md border border-white/20" : "bg-white text-slate-900"
            }`}
            aria-hidden="true"
          >
            {muted ? "🔇" : "🔊"}
          </span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
          <h3 className="text-2xl font-black tracking-tight leading-tight mb-2 drop-shadow-md">
            {reel.city}
          </h3>
          <p className="text-xs md:text-sm font-medium text-white/90 line-clamp-2 drop-shadow">
            {reel.caption}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function TravelReels() {
  return (
    <section
      className="py-24 px-6 lg:px-12 max-w-[1440px] mx-auto bg-slate-50/50"
      id="reels"
      aria-label="2026 Travel Reels"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
        <div className="flex flex-col gap-2">
          <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-sky-500">
            IN MOTION
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Reels From the Road
          </h2>
          <p className="text-sm md:text-base text-slate-600 max-w-xl mt-2 font-medium">
            Short clips from our top 2026 destinations. Tap a card to unmute — scroll for more.
          </p>
        </div>
      </div>

      <div
        className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory px-4 -mx-4
                   [&::-webkit-scrollbar]:h-[6px]
                   [&::-webkit-scrollbar-thumb]:bg-slate-300
                   [&::-webkit-scrollbar-thumb]:rounded-full"
      >
        {REELS.map((reel) => (
          <ReelCard key={reel.id} reel={reel} />
        ))}
      </div>
    </section>
  );
}
