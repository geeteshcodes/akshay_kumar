import StoriesHeader from "../components/stories/StoriesHeader";
import ParallaxHero from "../components/stories/ParallaxHero";
import MoodGrid from "../components/stories/MoodGrid";
import FeaturedNarrative from "../components/stories/FeaturedNarrative";
import TravelReels from "../components/stories/TravelReels";
import Newsletter from "../components/stories/Newsletter";
import Footer from "../components/stories/Footer";
import SectionSpacer from "../components/stories/SectionSpacer";

export default function Stories() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-slate-50 to-sky-100 overflow-hidden font-sans">
      <StoriesHeader />
      
      <div className="relative">
        <ParallaxHero />

        <div className="relative isolate" style={{ zIndex: 3 }}>
          <MoodGrid />
          <SectionSpacer />

          <FeaturedNarrative />
          <SectionSpacer />

          <TravelReels />
          <SectionSpacer />

          <Newsletter />
          <Footer />
        </div>
      </div>
    </div>
  );
}
