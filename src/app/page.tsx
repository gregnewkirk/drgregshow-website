import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LatestContent from "@/components/LatestContent";
import About from "@/components/About";
import Platforms from "@/components/Platforms";
import Support from "@/components/Support";
import Resources from "@/components/Resources";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <Hero />
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
