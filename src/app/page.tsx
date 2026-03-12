import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedClip from "@/components/FeaturedClip";
import FeaturedDebates from "@/components/FeaturedDebates";
import Support from "@/components/Support";
import Mission from "@/components/Mission";
import TopicsAngles from "@/components/TopicsAngles";
import CredibilityBlock from "@/components/CredibilityBlock";
import MediaKit from "@/components/MediaKit";
import BookingSection from "@/components/BookingSection";
import LatestContent from "@/components/LatestContent";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Fan journey: who is this → see him fight → back him → understand the mission */}
        <Hero />
        <FeaturedClip />
        <FeaturedDebates />
        <Support />
        <Mission />
        {/* Booker journey: topics → credentials → media kit → book */}
        <TopicsAngles />
        <CredibilityBlock />
        <MediaKit />
        <BookingSection />
        <LatestContent />
      </main>
      <Footer />
    </>
  );
}
