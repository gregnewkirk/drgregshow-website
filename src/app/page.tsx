import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedClip from "@/components/FeaturedClip";
import FeaturedDebates from "@/components/FeaturedDebates";
import TopicsAngles from "@/components/TopicsAngles";
import CredibilityBlock from "@/components/CredibilityBlock";
import MediaKit from "@/components/MediaKit";
import BookingSection from "@/components/BookingSection";
import LatestContent from "@/components/LatestContent";
import Support from "@/components/Support";
import Mission from "@/components/Mission";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <Hero />
        <FeaturedClip />
        <FeaturedDebates />
        <TopicsAngles />
        <CredibilityBlock />
        <MediaKit />
        <BookingSection />
        <Mission />
        <Support />
        <LatestContent />
      </main>
      <Footer />
    </>
  );
}
