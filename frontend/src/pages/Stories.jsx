import ParallaxHero from "../components/stories/ParallaxHero";
import MoodGrid from "../components/stories/MoodGrid";
import FeaturedNarrative from "../components/stories/FeaturedNarrative";
import TravelReels from "../components/stories/TravelReels";
import Newsletter from "../components/stories/Newsletter";
import Footer from "../components/stories/Footer";
import SectionSpacer from "../components/stories/SectionSpacer";

export default function Stories() {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-fixed bg-no-repeat overflow-hidden"
      style={{ backgroundImage: "url('/cloud.jpg')" }}
    >
      {/* Soft white overlay for readability */}
      <div className="absolute inset-0 bg-white/50 pointer-events-none" />

      <div className="relative">
        <ParallaxHero />

        <div className="relative isolate" style={{ zIndex: 3 }}>
          <MoodGrid />
          <SectionSpacer />

          <div className="h-24 lg:h-40" />

          <FeaturedNarrative />
          <SectionSpacer />

          <div className="h-24 lg:h-40" />

          <TravelReels />
          <SectionSpacer />

          <div className="h-24 lg:h-40" />

          <Newsletter />
          <SectionSpacer />

          <div className="h-24 lg:h-40" />

          <Footer />
        </div>
      </div>
    </div>
  );
}
