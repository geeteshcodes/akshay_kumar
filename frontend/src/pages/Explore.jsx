import React, { useState, useEffect, useCallback } from "react";
import { fetchPhoto } from "../utils/unsplash";
import ParallaxHero from "../components/stories/ParallaxHero";
import MoodGrid from "../components/stories/MoodGrid";
import FeaturedNarrative from "../components/stories/FeaturedNarrative";
import TravelReels from "../components/stories/TravelReels";
import Newsletter from "../components/stories/Newsletter";
import Footer from "../components/stories/Footer";
import { 
  Search, Grid, Music, BookOpen, Heart, 
  MapPin, Star, Filter, ChevronRight, X
} from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────
const DATA = {
  categories: [
    { id: "all", label: "All Categories", icon: "grid" },
    { id: "cafe", label: "Cafes & Social", icon: "cafe" },
    { id: "culture", label: "Culture & Art", icon: "museum" },
    { id: "nature", label: "Nature & Parks", icon: "nature" },
  ],
  moods: [
    { id: "romantic", label: "Romantic Spot" },
    { id: "scenic", label: "Scenic Views" },
    { id: "budget", label: "Budget Friendly" },
  ],
  places: [
    {
      id: 1,
      title: "Bamboo Forest Path",
      city: "Kyoto",
      country: "Japan",
      category: "nature",
      mood: "scenic",
      rating: 4.9,
      reviews: 240,
      description: "A serene walk through towering stalks of green bamboo that filter the sunlight into emerald hues.",
      badge: "MUST VISIT",
      sceneGradient: "linear-gradient(135deg, #a8e063 0%, #56ab2f 100%)",
      avatars: [{ color: "#ff6b6b", initials: "JS" }, { color: "#4ecdc4", initials: "MK" }],
      reels: [{ author: "@nomad_jess", likes: "12.4k", saves: "84", caption: "Found the hidden shrine behind the bamboo forest. Literally zen. #hiddenjapan #kyoto" }]
    },
    {
      id: 2,
      title: "Shibuya Crossing",
      city: "Tokyo",
      country: "Japan",
      category: "culture",
      mood: "scenic",
      rating: 4.8,
      reviews: 1850,
      description: "The world's busiest pedestrian crossing, a neon-lit symphony of movement and urban energy.",
      badge: "ICONIC",
      sceneGradient: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
      avatars: [{ color: "#f7d794", initials: "TW" }],
      reels: [{ author: "@city_lights", likes: "45k", saves: "1.2k", caption: "The heart of Tokyo never stops beating. 🌃 #shibuya #tokyo" }]
    },
    {
      id: 3,
      title: "Art District Loft",
      city: "Osaka",
      country: "Japan",
      category: "cafe",
      mood: "romantic",
      rating: 4.7,
      reviews: 95,
      description: "A hidden cafe in a converted warehouse serving artisanal coffee and local pastries.",
      badge: "LOCAL FAVORITE",
      sceneGradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
      avatars: [{ color: "#a29bfe", initials: "RL" }, { color: "#55efc4", initials: "DS" }],
      reels: [{ author: "@coffee_hunter", likes: "8.2k", saves: "450", caption: "The best latte art in Osaka, hidden in plain sight. ☕️ #osaka #cafeculture" }]
    },
    {
      id: 4,
      title: "Zen Garden Temple",
      city: "Kyoto",
      country: "Japan",
      category: "culture",
      mood: "scenic",
      rating: 4.9,
      reviews: 520,
      description: "Intricately raked gravel and perfectly placed stones designed for deep meditation.",
      badge: "TOP RATED",
      sceneGradient: "linear-gradient(135deg, #cfd9df 0%, #e2ebf0 100%)",
      avatars: [{ color: "#fab1a0", initials: "OM" }],
      reels: [{ author: "@zen_traveler", likes: "15k", saves: "900", caption: "Finding peace in the patterns of silence. 🙏 #zen #kyoto" }]
    },
    {
      id: 5,
      title: "Golden Pavilion",
      city: "Kyoto",
      country: "Japan",
      category: "culture",
      mood: "scenic",
      rating: 4.9,
      reviews: 3200,
      description: "A breathtaking Zen temple whose top two floors are completely covered in gold leaf.",
      badge: "LEGENDARY",
      sceneGradient: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
      avatars: [{ color: "#fd79a8", initials: "AP" }],
      reels: [{ author: "@gold_rush", likes: "32k", saves: "2.1k", caption: "Pure gold reflecting on the water. A dream. ✨ #kinkakuji #kyoto" }]
    },
    {
      id: 6,
      title: "Dotonbori Canal",
      city: "Osaka",
      country: "Japan",
      category: "culture",
      mood: "budget",
      rating: 4.6,
      reviews: 4100,
      description: "The street food capital of the world, alive with neon signs and giant crab sculptures.",
      badge: "FOODIE HEAVEN",
      sceneGradient: "linear-gradient(135deg, #ff0844 0%, #ffb199 100%)",
      avatars: [{ color: "#00cec9", initials: "TK" }],
      reels: [{ author: "@street_eats", likes: "19k", saves: "3k", caption: "Takoyaki at midnight is a spiritual experience. 🐙 #dotonbori #osaka" }]
    },
  ]
};

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const Icon = ({ name, size = 20, color = "currentColor" }) => {
  const s = { width: size, height: size };
  const icons = {
    grid: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
    cafe: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>,
    museum: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><path d="M4 19L4 10"/><path d="M9 19L9 10"/><path d="M15 19L15 10"/><path d="M20 19L20 10"/><path d="M2 22L22 22"/><path d="M12 2L2 7L2 10L22 10L22 7L12 2Z"/></svg>,
    nature: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><path d="M12 2L19 21H5L12 2Z"/></svg>,
    search: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    reels: <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><rect x="2" y="2" width="9" height="9"/><rect x="13" y="2" width="9" height="9"/><rect x="2" y="13" width="9" height="9"/><rect x="13" y="13" width="9" height="9"/></svg>,
  };
  return icons[name] || null;
};

const StarRating = ({ rating }) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span style={{ color: "#f5a623", fontSize: 12 }}>
      {"★".repeat(full)}{half ? "½" : ""}
    </span>
  );
};

// ─── UNSPLASH IMAGE ──────────────────────────────────────────────────────────
const UnsplashImage = ({ query, alt, style }) => {
  const [url, setUrl] = useState(null);
  useEffect(() => {
    if (query) {
      fetchPhoto(query).then(u => {
        console.log(`Unsplash [${query}]:`, u);
        setUrl(u);
      });
    }
  }, [query]);

  if (!url) return null;
  return <img src={url} alt={alt} style={{ ...style, objectFit: "cover" }} />;
};

// ─── CARD SCENE ──────────────────────────────────────────────────────────────
const CardScene = ({ gradient, height = 150, query, title }) => (
  <div style={{ background: gradient, width: "100%", height, position: "relative", overflow: "hidden" }}>
    <UnsplashImage query={query || title} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0, zIndex: 1 }} />
    <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: 16, height: "100%", background: "#252525", zIndex: 2 }} />
    <div style={{ position: "absolute", bottom: "14%", left: "50%", transform: "translateX(-50%)", width: 2, height: "26%", background: "#e8c830", zIndex: 3 }} />
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
      <CardScene gradient={place.sceneGradient} query={place.city + " " + place.country} title={place.title} />
      <div style={{ position: "absolute", top: 10, left: 10, background: "rgba(255,255,255,0.88)", padding: "4px 10px", borderRadius: 20, fontSize: 10, fontWeight: 700, letterSpacing: "0.8px", color: "#1a1a1a" }}>
        {place.badge}
      </div>
      <div
        onClick={e => { e.stopPropagation(); onLike(place.id); }}
        style={{ position: "absolute", top: 10, right: 10, width: 28, height: 28, background: "rgba(255,255,255,0.85)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, cursor: "pointer", color: liked ? "#e74c3c" : "#888", transition: "background 0.2s", zIndex: 5 }}
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

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function Explore() {
  const [activeTab, setActiveTab] = useState("discovery"); // discovery, reels, blogs
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [mood, setMood] = useState("all");
  const [likedCards, setLikedCards] = useState(new Set());
  const [activeReel, setActiveReel] = useState(null);

  const toggleLike = (id) => {
    setLikedCards(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filtered = DATA.places.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.city.toLowerCase().includes(search.toLowerCase());
    const matchesCat = category === "all" || p.category === category;
    const matchesMood = mood === "all" || p.mood === mood;
    return matchesSearch && matchesCat && matchesMood;
  });

  const openReel = (id) => {
    setActiveReel(DATA.places.find(p => p.id === id));
    setActiveTab("reels");
  };

  const railItemStyle = (active) => ({
    display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", width: "100%", textAlign: "left",
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
      <div style={{ display: "flex", gap: 32, padding: "32px 5%", minHeight: "calc(100vh - 58px)", alignItems: "flex-start", maxWidth: "1800px", margin: "0 auto" }}>
        {/* SIDEBAR */}
        <aside style={{ background: "#fff", borderRadius: 16, padding: "24px 20px", width: 240, flexShrink: 0, display: "flex", flexDirection: "column", gap: 20, height: "fit-content", position: "sticky", top: 20 }}>
          <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: 1, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            EXPLORE
            <span style={{ opacity: 0.45, cursor: "pointer" }}><Icon name="grid" size={14} color="#888" /></span>
          </div>
          
          <div>
            <div style={{ fontSize: 10, fontWeight: 800, color: "#bbb", letterSpacing: "1px", marginBottom: 12 }}>CATEGORY</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {DATA.categories.map(c => (
                <div key={c.id} onClick={() => setCategory(c.id)} style={railItemStyle(category === c.id)}>
                  <Icon name={c.icon} size={16} color={category === c.id ? "#1a9be6" : "#888"} />
                  <span style={{ fontWeight: category === c.id ? 700 : 500 }}>{c.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontSize: 10, fontWeight: 800, color: "#bbb", letterSpacing: "1px", marginBottom: 12 }}>MOOD</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <div onClick={() => setMood("all")} style={railItemStyle(mood === "all")}>
                <span style={{ fontWeight: mood === "all" ? 700 : 500 }}>All Moods</span>
              </div>
              {DATA.moods.map(m => (
                <div key={m.id} onClick={() => setMood(m.id)} style={railItemStyle(mood === m.id)}>
                  <span style={{ fontWeight: mood === m.id ? 700 : 500 }}>{m.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 8 }}>
            <div onClick={() => setActiveTab("discovery")} style={tabStyle(activeTab === "discovery")}>
              <MapPin size={14} /> DISCOVERY
            </div>
            <div onClick={() => setActiveTab("reels")} style={tabStyle(activeTab === "reels")}>
               <Icon name="reels" size={14} color={activeTab === "reels" ? "#fff" : "#999"} /> REELS
            </div>
            <div onClick={() => setActiveTab("blogs")} style={tabStyle(activeTab === "blogs")}>
              <BookOpen size={14} /> BLOGS
            </div>
          </div>
        </aside>

        {/* MAIN SECTION */}
        <main style={{ flex: 1 }}>
          {activeTab === "discovery" ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div style={{ background: "#fff", padding: "16px 20px", borderRadius: 16, display: "flex", alignItems: "center", gap: 12, boxShadow: "0 2px 10px rgba(0,0,0,0.03)" }}>
                <Icon name="search" size={18} color="#888" />
                <input
                  type="text"
                  placeholder="Search romantic sunset spots, museum near Day 2..."
                  style={{ border: "none", outline: "none", flex: 1, fontSize: 14, fontWeight: 500 }}
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
                <button style={{ background: "#1a1a1a", color: "#fff", padding: "8px 20px", borderRadius: 10, fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}>
                  <Filter size={14} /> Refine
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
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
            </div>
          ) : activeTab === "blogs" ? (
            <div className="bg-white rounded-[32px] overflow-hidden shadow-xl">
              <div className="max-h-[85vh] overflow-y-auto no-scrollbar">
                <ParallaxHero isEmbedded={true} />
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
                        cursor: "pointer", transition: "transform 0.2s", position: "relative"
                      }}
                      className="hover:scale-110"
                    >
                      <div style={{ background: p.sceneGradient, width: '100%', height: '100%' }} />
                      <UnsplashImage query={p.city} alt={p.city} style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }} />
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
                         <UnsplashImage query={place.city + " travel"} alt={place.city} style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }} />
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
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
    </div>
  );
}
