import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SizzleReel from "@/components/SizzleReel";
import FeaturedClip from "@/components/FeaturedClip";
import FeaturedDebates from "@/components/FeaturedDebates";
import TopicsAngles from "@/components/TopicsAngles";
import CredibilityBlock from "@/components/CredibilityBlock";
import MediaKit from "@/components/MediaKit";
import BookingSection from "@/components/BookingSection";
import LatestContent from "@/components/LatestContent";
import Support from "@/components/Support";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <Hero />
        <FeaturedClip />
        <SizzleReel />
        <FeaturedDebates />
        <TopicsAngles />
        <CredibilityBlock />
        <MediaKit />
        <BookingSection />
        <Support />
        <LatestContent />
      </main>
      <Footer />
    </>
  );
}
