import { motion, useScroll, useTransform } from "framer-motion";

export default function ParallaxHero() {
  const { scrollY } = useScroll();

  const textY = useTransform(scrollY, [0, 500], [0, -50]);
  const HIDE_START = 1400; 
  const HIDE_END = 1500;   
  const textOpacity = useTransform(scrollY, [HIDE_START, HIDE_END], [1, 0]);
  const textVisibility = useTransform(scrollY, (value) => value > HIDE_END ? "hidden" : "visible");

  return (
    <>
      <motion.div
        style={{ y: textY, opacity: textOpacity, visibility: textVisibility }}
        className="fixed inset-0 flex items-center justify-center z-30 pointer-events-none"
      >
        <div className="text-center max-w-7xl px-6">
          <div className="text-[11px] lg:text-xs font-bold tracking-[0.25em] uppercase text-sky-500 mb-4">
            The New Standard
          </div>

          <div className="relative px-6 py-3 lg:px-16 lg:py-6 inline-block">
            <div className="text-5xl sm:text-7xl lg:text-[12rem] leading-none tracking-tighter font-black text-slate-900">
              TRAVSTORY
            </div>
          </div>

          <div className="mt-4 flex justify-center">
            <span className="px-5 py-2 bg-sky-500/10 border border-sky-500/30 text-sky-600 rounded-full text-[10px] font-bold tracking-[0.25em] uppercase shadow-sm">
              2026 EDITION
            </span>
          </div>
        </div>
      </motion.div>

      <div>
        <div className="h-screen" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 py-12 -translate-y-60 translate-x-30">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 items-start">
            <div className="max-w-[420px] lg:max-w-[460px] group bg-transparent overflow-visible transition-all duration-500 hover:scale-105 hover:-translate-y-1 hover:shadow-[0_40px_90px_-30px_rgba(15,23,42,0.6)] hover:z-30">
              <div className="w-full rounded-[24px] lg:rounded-[32px] border border-white/60 bg-white/85 backdrop-blur-sm overflow-hidden shadow-xl shadow-slate-200/60 rotate-[-2deg] p-3">
                <img src="/dubai_tourism.jpg" alt="Dubai" className="w-full h-auto object-cover rounded-[16px] lg:rounded-[20px]" loading="lazy" />
              </div>
            </div>
            <div className="max-w-[420px] lg:max-w-[460px] group bg-transparent overflow-visible transition-all duration-500 hover:scale-105 hover:-translate-y-1 hover:shadow-[0_40px_90px_-30px_rgba(15,23,42,0.6)] hover:z-30">
              <div className="w-full rounded-[24px] lg:rounded-[32px] border border-white/60 bg-white/85 backdrop-blur-sm overflow-hidden shadow-xl shadow-slate-200/60 rotate-[2deg] p-3">
                <img src="/disney_cruise.jpg" alt="Cruise" className="w-full h-auto object-cover rounded-[16px] lg:rounded-[20px]" loading="lazy" />
              </div>
            </div>
          </div>
        </div>

        <div className="relative w-full h-[120vh] overflow-hidden">
          <img src="/india-monument.png" alt="India Monument" className="w-full h-full object-cover" style={{ zIndex: 40 }} />
        </div>
      </div>
    </>
  );
}
