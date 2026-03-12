import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SizzleReel from "@/components/SizzleReel";
import FeaturedDebates from "@/components/FeaturedDebates";
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
        <Hero />
        <SizzleReel />
        <FeaturedDebates />
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
