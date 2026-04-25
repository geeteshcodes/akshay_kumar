import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function StoriesHeader() {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between"
    >
      <div className="absolute inset-0 bg-white/40 backdrop-blur-md border-b border-white/20 shadow-sm pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-[1440px] mx-auto flex items-center justify-between">
        <Link
          to="/"
          className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 hover:bg-white border border-slate-200/50 shadow-sm text-sm font-bold text-slate-700 hover:text-slate-900 transition-all"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to App
        </Link>

        <div className="text-xl font-black text-slate-900 tracking-tighter">
          TRAVSTORY
        </div>

        <div className="w-[120px] hidden md:block" /> {/* Spacer for centering */}
      </div>
    </motion.header>
  );
}
