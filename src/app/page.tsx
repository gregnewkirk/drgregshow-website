import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedClip from "@/components/FeaturedClip";
import FeaturedDebates from "@/components/FeaturedDebates";
import CredibilityBlock from "@/components/CredibilityBlock";
import TopicsAngles from "@/components/TopicsAngles";

import Support from "@/components/Support";
import JoinMovement from "@/components/JoinMovement";
import Mission from "@/components/Mission";
import BookingCTA from "@/components/BookingCTA";
import LatestContent from "@/components/LatestContent";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <Hero />
        <FeaturedClip />
        <FeaturedDebates />
        <CredibilityBlock />
        <TopicsAngles />

        <Support />
        <JoinMovement />
        <Mission />
        <BookingCTA />
        <LatestContent />
      </main>
      <Footer />
    </>
  );
}
