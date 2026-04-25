import React, { useState, useEffect, useCallback } from "react";
import ParallaxHero from "../components/stories/ParallaxHero";
import MoodGrid from "../components/stories/MoodGrid";
import FeaturedNarrative from "../components/stories/FeaturedNarrative";
import TravelReels from "../components/stories/TravelReels";
import Newsletter from "../components/stories/Newsletter";
import Footer from "../components/stories/Footer";

// ─── DATA ────────────────────────────────────────────────────────────────────
const DATA = {
  nav: {
    links: [
      { label: "Chat", href: "#", active: false },
      { label: "Planner", href: "#", active: false },
      { label: "Bookings", href: "#", active: false },
      { label: "Explore", href: "#", active: true },
      { label: "Profile", href: "#", active: false },
    ],
    user: { name: "Guest Traveler", role: "View Profile", initials: "GT" },
  },
  sidebar: {
    categories: [
      { id: "cafes", label: "Cafes & Social", icon: "cafe" },
      { id: "culture", label: "Culture & Art", icon: "art" },
      { id: "nature", label: "Nature & Parks", icon: "nature" },
    ],
    moods: [
      { id: "romantic", label: "Romantic Spot", icon: "heart" },
      { id: "scenic", label: "Scenic Views", icon: "star" },
      { id: "budget", label: "Budget Friendly", icon: "wallet" },
    ],
  },
  places: [
    {
      id: "kyoto",
      city: "Kyoto",
      country: "Japan",
      badge: "KYOTO, JAPAN",
      title: "Authentic Experience",
      description: "Found the hidden shrine behind the bamboo forest....",
      rating: 4.9,
      reviews: 128,
      category: "culture",
      mood: "scenic",
      sceneGradient: "linear-gradient(170deg,#c08080 0%,#d4a070 30%,#8b6040 65%,#3a2a18 100%)",
      avatars: [
        { initials: "KA", color: "#c09bc0" },
        { initials: "MB", color: "#9bbcc0" },
        { initials: "JL", color: "#c0a89b" },
      ],
      reels: [
        { author: "@nomad_jess", caption: "Found the hidden shrine behind the bamboo forest. Literally zen. #hiddenjapan #kyoto", sceneGradient: "linear-gradient(175deg,#c08080 0%,#d4a070 25%,#b07040 50%,#704520 75%,#3a2010 100%)", thumbGradient: "linear-gradient(170deg,#c08080,#8b6040,#3a2a18)", likes: "12.4k", saves: 84 },
        { author: "@kyoto_wander", caption: "Golden pavilion at sunrise — no crowds, no chaos. Just pure magic. #kinkakuji", sceneGradient: "linear-gradient(175deg,#d4b060 0%,#b08040 35%,#805020 65%,#402810 100%)", thumbGradient: "linear-gradient(170deg,#d4b060,#a07030,#504020)", likes: "9.1k", saves: 61 },
        { author: "@sakura_trail", caption: "Arashiyama bamboo grove at dusk is a different world entirely. #arashiyama", sceneGradient: "linear-gradient(175deg,#80b0d0 0%,#507090 40%,#304050 80%,#182030 100%)", thumbGradient: "linear-gradient(170deg,#80b0d0,#507090,#304050)", likes: "7.8k", saves: 49 },
        { author: "@zen_traveler", caption: "Fushimi Inari's thousand torii gates at the golden hour. #fushimiinari #kyoto", sceneGradient: "linear-gradient(175deg,#d47030 0%,#a04020 40%,#502010 80%,#281008 100%)", thumbGradient: "linear-gradient(170deg,#d47030,#a04020,#502010)", likes: "15.2k", saves: 112 },
      ],
    },
    {
      id: "osaka",
      city: "Osaka",
      country: "Japan",
      badge: "OSAKA, JAPAN",
      title: "Street Food Heaven",
      description: "Street food heaven 🌶️🔥 #osaka #foodtrip",
      rating: 4.9,
      reviews: 128,
      category: "cafes",
      mood: "budget",
      sceneGradient: "linear-gradient(170deg,#80b4d0 0%,#90c4a0 35%,#507060 65%,#304830 100%)",
      avatars: [
        { initials: "TS", color: "#9bc0a8" },
        { initials: "RK", color: "#c09b9b" },
        { initials: "PW", color: "#9ba8c0" },
      ],
      reels: [
        { author: "@street_eats", caption: "Street food heaven in Dotonbori. The takoyaki is unreal. #osaka #foodtrip", sceneGradient: "linear-gradient(175deg,#80b4d0 0%,#90c4a0 30%,#507060 60%,#304830 100%)", thumbGradient: "linear-gradient(170deg,#80b4d0,#507060,#304830)", likes: "8.3k", saves: 55 },
        { author: "@osaka_nights", caption: "Namba at midnight — neon everywhere and ramen that hits at 2am. #namba", sceneGradient: "linear-gradient(175deg,#6080c0 0%,#405090 40%,#203060 80%,#101830 100%)", thumbGradient: "linear-gradient(170deg,#6080c0,#405090,#203060)", likes: "6.7k", saves: 38 },
        { author: "@food_pilgrim", caption: "Kuromon market — 170 vendors, unlimited samples, zero regrets. #kuromon", sceneGradient: "linear-gradient(175deg,#c0a070 0%,#907040 40%,#604820 80%,#302410 100%)", thumbGradient: "linear-gradient(170deg,#c0a070,#907040,#604820)", likes: "5.2k", saves: 29 },
      ],
    },
    {
      id: "tokyo",
      city: "Tokyo",
      country: "Japan",
      badge: "TOKYO, JAPAN",
      title: "Neon Nights",
      description: "Neon nights never disappoint 🗾 #tokyo",
      rating: 4.9,
      reviews: 128,
      category: "culture",
      mood: "scenic",
      sceneGradient: "linear-gradient(170deg,#d4a090 0%,#c4904c 35%,#8b5020 60%,#3a2010 100%)",
      avatars: [
        { initials: "YM", color: "#c0c09b" },
        { initials: "HL", color: "#b09bc0" },
        { initials: "FN", color: "#9bc0c0" },
      ],
      reels: [
        { author: "@tokyo_nights", caption: "Neon nights never disappoint. Shibuya at 2am hits different. #tokyo #shibuya", sceneGradient: "linear-gradient(175deg,#d4a090 0%,#c4904c 35%,#8b5020 60%,#3a2010 100%)", thumbGradient: "linear-gradient(170deg,#d4a090,#c4904c,#8b5020)", likes: "18.6k", saves: 143 },
        { author: "@harajuku_soul", caption: "Harajuku on a Sunday morning — fashion as art, streets as runway. #harajuku", sceneGradient: "linear-gradient(175deg,#d080c0 0%,#a05090 40%,#703060 80%,#401830 100%)", thumbGradient: "linear-gradient(170deg,#d080c0,#a05090,#703060)", likes: "11.4k", saves: 88 },
        { author: "@temple_hopper", caption: "Senso-ji at 5am before the tourists wake up. This is the real Tokyo. #sensoji", sceneGradient: "linear-gradient(175deg,#80a0d0 0%,#507090 40%,#304860 80%,#182030 100%)", thumbGradient: "linear-gradient(170deg,#80a0d0,#507090,#304860)", likes: "9.9k", saves: 76 },
        { author: "@mt_fuji_fan", caption: "Chureito pagoda with Fuji behind it — postcard made reality. #fuji #japan", sceneGradient: "linear-gradient(175deg,#e0d0c0 0%,#b0a080 30%,#807060 60%,#403830 100%)", thumbGradient: "linear-gradient(170deg,#e0d0c0,#b0a080,#807060)", likes: "22.1k", saves: 188 },
      ],
    },
    {
      id: "bangkok",
      city: "Bangkok",
      country: "Thailand",
      badge: "BANGKOK, THAILAND",
      title: "Temple & Chaos",
      description: "Temple gold and tuk-tuk chaos — Bangkok never sleeps. #bangkoklife",
      rating: 4.7,
      reviews: 204,
      category: "culture",
      mood: "scenic",
      sceneGradient: "linear-gradient(170deg,#e8c060 0%,#c09030 35%,#806010 65%,#403008 100%)",
      avatars: [
        { initials: "AP", color: "#c0b09b" },
        { initials: "JN", color: "#9bc0b0" },
      ],
      reels: [
        { author: "@siam_seeker", caption: "Wat Pho at golden hour — the reclining Buddha is absolutely colossal. #watpho", sceneGradient: "linear-gradient(175deg,#e8c060 0%,#c09030 35%,#806010 65%,#403008 100%)", thumbGradient: "linear-gradient(170deg,#e8c060,#c09030,#806010)", likes: "10.2k", saves: 77 },
        { author: "@night_bazaar", caption: "Chatuchak weekend market — 15,000 stalls and I still missed half of them. #chatuchak", sceneGradient: "linear-gradient(175deg,#80c090 0%,#509060 35%,#306040 65%,#183020 100%)", thumbGradient: "linear-gradient(170deg,#80c090,#509060,#306040)", likes: "6.4k", saves: 41 },
      ],
    },
    {
      id: "paris",
      city: "Paris",
      country: "France",
      badge: "PARIS, FRANCE",
      title: "City of Light",
      description: "Montmartre at dawn, croissant in hand, zero regrets. #paris #joievivere",
      rating: 4.8,
      reviews: 312,
      category: "culture",
      mood: "romantic",
      sceneGradient: "linear-gradient(170deg,#c0b8e8 0%,#9090c8 35%,#605890 65%,#302848 100%)",
      avatars: [
        { initials: "EC", color: "#b09bc0" },
        { initials: "MD", color: "#c0a09b" },
        { initials: "SB", color: "#9bb8c0" },
      ],
      reels: [
        { author: "@bonjour_wander", caption: "Eiffel Tower from Trocadéro at dusk. Every cliché earns its cliché status. #eiffel", sceneGradient: "linear-gradient(175deg,#c0b8e8 0%,#9090c8 35%,#605890 65%,#302848 100%)", thumbGradient: "linear-gradient(170deg,#c0b8e8,#9090c8,#605890)", likes: "24.1k", saves: 201 },
        { author: "@rue_de_la_paix", caption: "Le Marais on a Tuesday — the pastry game here is undefeated. #lemarais #paris", sceneGradient: "linear-gradient(175deg,#e8c0a0 0%,#c09070 35%,#905840 65%,#482818 100%)", thumbGradient: "linear-gradient(170deg,#e8c0a0,#c09070,#905840)", likes: "8.9k", saves: 63 },
      ],
    },
    {
      id: "chiang-mai",
      city: "Chiang Mai",
      country: "Thailand",
      badge: "CHIANG MAI, THAILAND",
      title: "Jungle & Temples",
      description: "Misty mountains, elephant sanctuaries, the best khao soi ever. #chiangmai",
      rating: 4.6,
      reviews: 97,
      category: "nature",
      mood: "budget",
      sceneGradient: "linear-gradient(170deg,#90c890 0%,#608858 35%,#385830 65%,#1a2c18 100%)",
      avatars: [
        { initials: "LT", color: "#9bc09b" },
        { initials: "WH", color: "#b8c09b" },
      ],
      reels: [
        { author: "@forest_monk", caption: "Doi Inthanon at sunrise — fog rolling through pine and temple bells ringing. #doiinthanon", sceneGradient: "linear-gradient(175deg,#90c890 0%,#608858 35%,#385830 65%,#1a2c18 100%)", thumbGradient: "linear-gradient(170deg,#90c890,#608858,#385830)", likes: "7.1k", saves: 52 },
        { author: "@elephant_trails", caption: "Ethical elephant sanctuary morning — bath time was chaos in the best way. #elephants", sceneGradient: "linear-gradient(175deg,#b8a890 0%,#907860 35%,#605040 65%,#302820 100%)", thumbGradient: "linear-gradient(170deg,#b8a890,#907860,#605040)", likes: "14.3k", saves: 118 },
      ],
    },
  ],
  construction: {
    features: [
      "AI-powered location discovery",
      "Deep trip-day integration",
      "Community reels & reviews",
      "Offline explore maps",
    ],
  },
  actions: [
    { icon: "♡", label: "likes", key: "likes" },
    { icon: "🔖", label: "saves", key: "saves" },
    { icon: "💬", label: "Save to trip", key: null },
    { icon: "⊞", label: "", key: null },
  ],
};

// ─── ICONS ───────────────────────────────────────────────────────────────────
const Icon = ({ name, size = 16, color = "currentColor" }) => {
  const s = { width: size, height: size, flexShrink: 0 };
  const icons = {
    cafe: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>,
    art: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>,
    nature: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><path d="M3 17l4-8 4 4 4-6 4 10"/></svg>,
    heart: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>,
    star: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    wallet: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
    search: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    filter: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/></svg>,
    grid: <svg style={s} viewBox="0 0 16 16" fill="none" stroke={color} strokeWidth="1.5"><rect x="1" y="1" width="5" height="5" rx="1"/><rect x="10" y="1" width="5" height="5" rx="1"/><rect x="1" y="10" width="5" height="5" rx="1"/><rect x="10" y="10" width="5" height="5" rx="1"/></svg>,
    map: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><circle cx="12" cy="10" r="3"/><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/></svg>,
    reels: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><rect x="2" y="2" width="9" height="9"/><rect x="13" y="2" width="9" height="9"/><rect x="2" y="13" width="9" height="9"/><rect x="13" y="13" width="9" height="9"/></svg>,
  };
  return icons[name] || null;
};

// ─── STAR RATING ─────────────────────────────────────────────────────────────
const StarRating = ({ rating }) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span style={{ color: "#f5a623", fontSize: 12 }}>
      {"★".repeat(full)}{half ? "½" : ""}
    </span>
  );
};

// ─── CARD SCENE ──────────────────────────────────────────────────────────────
const CardScene = ({ gradient, height = 150 }) => (
  <div style={{ background: gradient, width: "100%", height, position: "relative", overflow: "hidden" }}>
    <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: 16, height: "100%", background: "#252525" }} />
    <div style={{ position: "absolute", bottom: "14%", left: "50%", transform: "translateX(-50%)", width: 2, height: "26%", background: "#e8c830" }} />
  </div>
);

// ─── PLACE CARD ───────────────────────────────────────────────────────────────
const PlaceCard = ({ place, liked, onLike, onOpen }) => (
  <div
    onClick={() => onOpen(place.id)}
    style={{
      borderRadius: 14, overflow: "hidden", border: "1px solid #ebebeb",
      background: "#fff", cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s",
    }}
    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 10px 28px rgba(0,0,0,0.1)"; }}
    onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
  >
    <div style={{ position: "relative" }}>
      <CardScene gradient={place.sceneGradient} />
      <div style={{ position: "absolute", top: 10, left: 10, background: "rgba(255,255,255,0.88)", padding: "4px 10px", borderRadius: 20, fontSize: 10, fontWeight: 700, letterSpacing: "0.8px", color: "#1a1a1a" }}>
        {place.badge}
      </div>
      <div
        onClick={e => { e.stopPropagation(); onLike(place.id); }}
        style={{ position: "absolute", top: 10, right: 10, width: 28, height: 28, background: "rgba(255,255,255,0.85)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, cursor: "pointer", color: liked ? "#e74c3c" : "#888", transition: "background 0.2s" }}
      >
        {liked ? "♥" : "♡"}
      </div>
    </div>
    <div style={{ padding: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <StarRating rating={place.rating} />
        <span style={{ fontSize: 11, color: "#999" }}>{place.rating} ({place.reviews} reviews)</span>
      </div>
      <h3 style={{ fontSize: 15, fontWeight: 800, color: "#1a1a1a", margin: "6px 0 5px", lineHeight: 1.25 }}>{place.title}</h3>
      <p style={{ fontSize: 12, color: "#888", lineHeight: 1.5, marginBottom: 10, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{place.description}</p>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 10, borderTop: "1px solid #f0f0f0" }}>
        <div style={{ display: "flex" }}>
          {place.avatars.map((av, i) => (
            <div key={i} style={{ width: 22, height: 22, borderRadius: "50%", border: "2px solid #fff", marginLeft: i === 0 ? 0 : -5, background: av.color, fontSize: 8, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
              {av.initials}
            </div>
          ))}
        </div>
        <button
          onClick={e => { e.stopPropagation(); onOpen(place.id); }}
          style={{ fontSize: 11, fontWeight: 700, color: "#1a9be6", background: "none", border: "none", cursor: "pointer", letterSpacing: "0.4px" }}
        >
          VIEW DETAILS
        </button>
      </div>
    </div>
  </div>
);

// ─── REEL MODAL ───────────────────────────────────────────────────────────────
const ReelModal = ({ place, onClose }) => {
  const [reelIdx, setReelIdx] = useState(0);

  useEffect(() => { setReelIdx(0); }, [place]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" || e.key === "ArrowDown") setReelIdx(i => Math.min(i + 1, place.reels.length - 1));
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") setReelIdx(i => Math.max(i - 1, 0));
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [place, onClose]);

  if (!place) return null;
  const reel = place.reels[reelIdx];

  return (
    <div
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <div
        style={{ background: "#f5f4f2", borderRadius: 20, padding: "28px 24px", display: "flex", gap: 20, alignItems: "flex-start", maxWidth: 960, width: "95%", position: "relative", animation: "slideUp 0.25s ease" }}
        onClick={e => e.stopPropagation()}
      >
        <style>{`@keyframes slideUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } } @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.3;transform:scale(0.6)} }`}</style>

        {/* Close */}
        <button onClick={onClose} style={{ position: "absolute", top: 14, right: 14, background: "rgba(0,0,0,0.1)", border: "none", borderRadius: "50%", width: 30, height: 30, fontSize: 15, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#555" }}>✕</button>

        {/* Thumb strip */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "center", flexShrink: 0 }}>
          <span style={{ fontSize: 11, color: "#999", textAlign: "center", lineHeight: 1.3, marginBottom: 4 }}>Swipe /<br/>scroll</span>
          {place.reels.map((r, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div
                onClick={() => setReelIdx(i)}
                style={{ width: 58, height: 58, borderRadius: 10, overflow: "hidden", cursor: "pointer", border: `2.5px solid ${i === reelIdx ? "#1a9be6" : "transparent"}`, transition: "border-color 0.2s, transform 0.15s", flexShrink: 0 }}
              >
                <div style={{ background: r.thumbGradient, width: "100%", height: "100%" }} />
              </div>
              {i < place.reels.length - 1 && (
                <div style={{ width: 6, height: 6, background: i === reelIdx ? "#1a9be6" : "#ccc", borderRadius: "50%", transition: "background 0.2s" }} />
              )}
            </div>
          ))}
        </div>

        {/* Reel center */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ width: 260, borderRadius: 20, overflow: "hidden", position: "relative", background: "#222", flexShrink: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", position: "absolute", top: 0, left: 0, right: 0, zIndex: 2 }}>
              <span style={{ background: "rgba(255,255,255,0.88)", padding: "5px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, color: "#1a1a1a" }}>{place.city}, {place.country}</span>
              <span style={{ background: "rgba(30,30,30,0.75)", padding: "5px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, color: "#fff" }}>{reelIdx + 1} / {place.reels.length}</span>
            </div>
            <div style={{ background: reel.sceneGradient, width: "100%", height: 400, position: "relative", overflow: "hidden", transition: "background 0.4s" }}>
              <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: 22, height: "100%", background: "#252525" }} />
              <div style={{ position: "absolute", bottom: "10%", left: "50%", transform: "translateX(-50%)", width: 2.5, height: "30%", background: "#e8c830" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 14, background: "linear-gradient(transparent, rgba(0,0,0,0.7))" }}>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.75)", marginBottom: 3 }}>{reel.author}</div>
                <div style={{ fontSize: 12, color: "#fff", lineHeight: 1.45 }}>{reel.caption}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20, paddingTop: 40, flexShrink: 0 }}>
          {DATA.actions.map((a, i) => {
            const val = a.key === "likes" ? reel.likes : a.key === "saves" ? reel.saves : "";
            return (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, cursor: "pointer" }}>
                <div style={{ width: 38, height: 38, border: "1.5px solid #ddd", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, background: "#fff", transition: "background 0.15s, transform 0.15s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#f0f0f0"; e.currentTarget.style.transform = "scale(1.08)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.transform = ""; }}
                >{a.icon}</div>
                {val !== "" && <div style={{ fontSize: 11, color: "#888", textAlign: "center" }}>{val}</div>}
                {!a.key && a.label && <div style={{ fontSize: 11, color: "#888", textAlign: "center" }}>{a.label}</div>}
              </div>
            );
          })}
        </div>

        {/* Construction note */}
        <div style={{ background: "#fff", borderRadius: 14, padding: "18px 16px", border: "1.5px solid #f5c542", position: "relative", overflow: "hidden", width: 185, flexShrink: 0, alignSelf: "flex-start", marginTop: 6 }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 5, background: "repeating-linear-gradient(90deg,#f5c542 0,#f5c542 12px,#1a1a1a 12px,#1a1a1a 24px)" }} />
          <div style={{ fontSize: 24, margin: "8px 0 6px" }}>🚧</div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "#fff8df", border: "1px solid #f5c542", color: "#7a5e00", fontSize: 10, fontWeight: 700, padding: "4px 9px", borderRadius: 20, letterSpacing: "0.5px", marginBottom: 8 }}>
            <div style={{ width: 6, height: 6, background: "#d4a000", borderRadius: "50%", animation: "pulse 1.4s ease-in-out infinite" }} />
            Under Development
          </div>
          <h4 style={{ fontSize: 13, fontWeight: 700, color: "#1a1a1a", marginBottom: 6, lineHeight: 1.3 }}>Explore page is still under work</h4>
          <p style={{ fontSize: 11, color: "#888", lineHeight: 1.6, marginBottom: 10 }}>Proper access available after launch — with AI trip matching, curated gems & community reels.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 12 }}>
            {DATA.construction.features.map((f, i) => (
              <div key={i} style={{ fontSize: 11, color: "#666", display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 5, height: 5, background: "#f5c542", borderRadius: "50%", flexShrink: 0 }} />
                {f}
              </div>
            ))}
          </div>
          <button style={{ width: "100%", padding: 9, background: "#1a1a1a", color: "#fff", border: "none", borderRadius: 8, fontSize: 11, fontWeight: 600, cursor: "pointer" }}>Notify me at Launch →</button>
        </div>
      </div>
    </div>
  );
};

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function TravStoryExplore() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeMood, setActiveMood] = useState(null);
  const [activeTab, setActiveTab] = useState("discovery");
  const [search, setSearch] = useState("");
  const [refineOpen, setRefineOpen] = useState(false);
  const [refineRating, setRefineRating] = useState("0");
  const [refineCountry, setRefineCountry] = useState("");
  const [likedCards, setLikedCards] = useState(new Set());
  const [reelPlace, setReelPlace] = useState(null);

  const toggleLike = useCallback((id) => {
    setLikedCards(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const openReel = useCallback((id) => {
    setReelPlace(DATA.places.find(p => p.id === id));
  }, []);

  const filtered = DATA.places.filter(p => {
    if (activeCategory && p.category !== activeCategory) return false;
    if (activeMood && p.mood !== activeMood) return false;
    if (p.rating < parseFloat(refineRating)) return false;
    if (refineCountry && p.country !== refineCountry) return false;
    if (search) {
      const hay = `${p.city} ${p.country} ${p.title} ${p.description}`.toLowerCase();
      if (!hay.includes(search.toLowerCase())) return false;
    }
    return true;
  });

  const sidebarItemStyle = (active) => ({
    display: "flex", alignItems: "center", gap: 10, padding: "9px 10px",
    borderRadius: 9, fontSize: 14, cursor: "pointer", transition: "background 0.15s",
    background: active ? "#e8f4ff" : "transparent", color: active ? "#1a9be6" : "#444",
  });

  const tabStyle = (active) => ({
    flex: 1, padding: "10px 0", borderRadius: 10, border: `1.5px solid ${active ? "#1a1a1a" : "#e0e0e0"}`,
    background: active ? "#1a1a1a" : "transparent", fontSize: 11, fontWeight: 700, letterSpacing: "0.6px",
    color: active ? "#fff" : "#999", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
  });

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: "#f0eff0", minHeight: "100vh", color: "#1a1a1a" }}>
      {/* PAGE */}
      <div style={{ display: "flex", gap: 20, padding: 24, minHeight: "calc(100vh - 58px)", alignItems: "flex-start" }}>
        {/* SIDEBAR */}
        <aside style={{ background: "#fff", borderRadius: 16, padding: "24px 20px", width: 240, flexShrink: 0, display: "flex", flexDirection: "column", gap: 20, height: "fit-content" }}>
          <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: 1, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            EXPLORE
            <span style={{ opacity: 0.45, cursor: "pointer" }}><Icon name="grid" size={14} color="#888" /></span>
          </div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "1.4px", color: "#bbb", textTransform: "uppercase", marginBottom: 8 }}>Category</div>
            {DATA.sidebar.categories.map(c => (
              <div key={c.id} onClick={() => setActiveCategory(activeCategory === c.id ? null : c.id)} style={sidebarItemStyle(activeCategory === c.id)}>
                <Icon name={c.icon} color={activeCategory === c.id ? "#1a9be6" : "#888"} />
                {c.label}
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "1.4px", color: "#bbb", textTransform: "uppercase", marginBottom: 8 }}>Mood</div>
            {DATA.sidebar.moods.map(m => (
              <div key={m.id} onClick={() => setActiveMood(activeMood === m.id ? null : m.id)} style={sidebarItemStyle(activeMood === m.id)}>
                <Icon name={m.icon} color={activeMood === m.id ? "#1a9be6" : "#888"} />
                {m.label}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, paddingTop: 8 }}>
            <button onClick={() => setActiveTab("discovery")} style={tabStyle(activeTab === "discovery")}>
              <Icon name="map" size={12} color={activeTab === "discovery" ? "#fff" : "#999"} /> DISCOVERY
            </button>
            <button onClick={() => setActiveTab("reels")} style={tabStyle(activeTab === "reels")}>
              <Icon name="reels" size={12} color={activeTab === "reels" ? "#fff" : "#999"} /> REELS
            </button>
            <button onClick={() => setActiveTab("blogs")} style={tabStyle(activeTab === "blogs")}>
              <Icon name="art" size={12} color={activeTab === "blogs" ? "#fff" : "#999"} /> BLOGS
            </button>
          </div>
        </aside>
        {/* MAIN */}
        <main style={{ background: "#fff", borderRadius: 16, padding: "32px 28px", flex: 1, minWidth: 0 }}>
          <div style={{ marginBottom: 20 }}>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: "#1a1a1a", lineHeight: 1.1, marginBottom: 4 }}>
              Structured <span style={{ color: "#1a9be6" }}>Explore</span>
            </h1>
            <p style={{ fontSize: 14, color: "#888" }}>Browse top rated locations and hidden gems</p>
          </div>
          {/* Search row */}
          <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
            <div style={{ flex: 1, position: "relative" }}>
              <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }}>
                <Icon name="search" color="#999" />
              </span>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search romantic sunset spots, museum near Day 2…"
                style={{ width: "100%", padding: "11px 16px 11px 42px", border: "1.5px solid #e5e5e5", borderRadius: 12, fontSize: 14, color: "#444", outline: "none", fontFamily: "inherit", boxSizing: "border-box" }}
                onFocus={e => e.target.style.borderColor = "#1a9be6"}
                onBlur={e => e.target.style.borderColor = "#e5e5e5"}
              />
            </div>
            <button
              onClick={() => setRefineOpen(o => !o)}
              style={{ padding: "11px 20px", background: "#1a1a1a", color: "#fff", border: "none", borderRadius: 12, fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 7 }}
            >
              <Icon name="filter" color="white" size={14} /> Refine
            </button>
          </div>
          {/* Refine panel */}
          {refineOpen && (
            <div style={{ background: "#f9f9f9", border: "1px solid #e5e5e5", borderRadius: 10, padding: "14px 18px", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
                <label style={{ fontSize: 13, color: "#666", fontWeight: 500 }}>Rating</label>
                <select value={refineRating} onChange={e => setRefineRating(e.target.value)} style={{ padding: "6px 10px", border: "1.5px solid #e0e0e0", borderRadius: 8, fontSize: 13, fontFamily: "inherit", color: "#444", outline: "none" }}>
                  <option value="0">All</option>
                  <option value="4.5">4.5+</option>
                  <option value="4.8">4.8+</option>
                </select>
                <label style={{ fontSize: 13, color: "#666", fontWeight: 500 }}>Country</label>
                <select value={refineCountry} onChange={e => setRefineCountry(e.target.value)} style={{ padding: "6px 10px", border: "1.5px solid #e0e0e0", borderRadius: 8, fontSize: 13, fontFamily: "inherit", color: "#444", outline: "none" }}>
                  <option value="">All</option>
                  <option value="Japan">Japan</option>
                  <option value="Thailand">Thailand</option>
                  <option value="France">France</option>
                </select>
              </div>
            </div>
          )}
          {activeTab === "blogs" ? (
            <div className="space-y-8">
              <ParallaxHero isEmbedded={true} />
              <div className="px-2">
                <MoodGrid />
                <FeaturedNarrative />
                <TravelReels />
                <Newsletter />
                <Footer />
              </div>
            </div>
          ) : activeTab === "reels" ? (
            <div className="flex justify-center items-start gap-8 py-8 h-[700px]">
              {/* LEFT SIDEBAR: THUMBNAILS */}
              <div className="flex flex-col items-center gap-4 py-4">
                <span className="text-[10px] font-bold text-slate-400 italic mb-2 tracking-tighter">Swipe / scroll</span>
                {DATA.places.map((p, i) => (
                  <React.Fragment key={p.id}>
                    <div 
                      style={{ 
                        width: 48, height: 48, borderRadius: 12, overflow: "hidden", 
                        border: "2.5px solid #fff", boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        cursor: "pointer", transition: "transform 0.2s"
                      }}
                      className="hover:scale-110"
                    >
                      <div style={{ background: p.sceneGradient, width: '100%', height: '100%' }} />
                    </div>
                    {i < DATA.places.length - 1 && (
                      <div style={{ width: 1, height: 16, borderLeft: "2px dotted #e0e0e0" }} />
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* CENTER: MAIN REEL */}
              <div className="h-[650px] w-[380px] overflow-y-scroll snap-y snap-mandatory no-scrollbar rounded-[40px] shadow-2xl border border-slate-100 bg-white relative">
                {DATA.places.map((place, i) => (
                  <div key={place.id} className="h-full w-full snap-start relative flex-shrink-0 p-1.5">
                    <div className="w-full h-full rounded-[34px] overflow-hidden relative shadow-inner">
                      {/* Cinematic Background */}
                      <div style={{ background: place.sceneGradient, width: '100%', height: '100%' }} className="relative">
                         <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/70" />
                      </div>
                      
                      {/* Top Badges */}
                      <div className="absolute top-5 left-5 px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full border border-white/50 text-[11px] font-bold text-slate-800 shadow-sm">
                        {place.city}, {place.country}
                      </div>
                      <div className="absolute top-5 right-5 px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-full text-[10px] font-bold text-white tracking-widest">
                        {i + 1}/{DATA.places.length}
                      </div>

                      {/* Bottom Overlay Info */}
                      <div className="absolute bottom-8 left-6 right-6 text-white pointer-events-none">
                        <div className="flex items-center gap-2 mb-2">
                           <div className="w-6 h-6 rounded-full bg-sky-400 border border-white/30" />
                           <span className="text-xs font-bold">{place.reels[0]?.author || "@nomad_jess"}</span>
                        </div>
                        <p className="text-[13px] leading-relaxed font-medium">
                           {place.reels[0]?.caption || place.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* RIGHT SIDEBAR: ACTIONS */}
              <div className="flex flex-col gap-8 pt-20">
                 <div className="flex flex-col items-center gap-2 cursor-pointer group">
                    <div className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center border border-slate-50 group-hover:bg-slate-50 transition-all">
                       <span className="text-slate-900 text-xl">♡</span>
                    </div>
                    <span className="text-[11px] font-bold text-slate-500 uppercase">{DATA.places[0].reels[0]?.likes || "12.4k"}</span>
                 </div>
                 <div className="flex flex-col items-center gap-2 cursor-pointer group">
                    <div className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center border border-slate-50 group-hover:bg-slate-50 transition-all">
                       <span className="text-slate-900 text-lg">🔖</span>
                    </div>
                    <span className="text-[11px] font-bold text-slate-500 uppercase">{DATA.places[0].reels[0]?.saves || "84"}</span>
                 </div>
                 <div className="flex flex-col items-center gap-2 cursor-pointer group">
                    <div className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center border border-slate-50 group-hover:bg-slate-50 transition-all">
                       <span className="text-slate-900 text-lg">💬</span>
                    </div>
                    <span className="text-[11px] font-bold text-slate-500 uppercase leading-none text-center">Save to<br/>trip</span>
                 </div>
                 <div className="mt-4 flex items-center justify-center cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center border border-slate-50 hover:bg-slate-50 transition-all">
                       <span className="text-slate-900 text-lg">▦</span>
                    </div>
                 </div>
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: 40, color: "#aaa", fontSize: 14 }}>No places match your search.</div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
              {filtered.map(place => (
                <PlaceCard
                  key={place.id}
                  place={place}
                  liked={likedCards.has(place.id)}
                  onLike={toggleLike}
                  onOpen={openReel}
                />
              ))}
            </div>
          )}
        </main>
      </div>
      {/* Reel Modal */}
      {reelPlace && <ReelModal place={reelPlace} onClose={() => setReelPlace(null)} />}
    </div>
  );
}
