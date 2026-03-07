import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LatestContent from "@/components/LatestContent";
import About from "@/components/About";
import Platforms from "@/components/Platforms";
import Support from "@/components/Support";
import Resources from "@/components/Resources";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { getChannelStats } from "@/lib/youtube";

export default async function Home() {
  const stats = await getChannelStats();

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <Hero stats={stats} />
        <LatestContent />
        <About />
        <Platforms />
        <Support />
        <Resources />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
