import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturedSection from "@/components/FeaturedSection";
import BoutiquesSection from "@/components/BoutiquesSection";
import ExperienceSection from "@/components/ExperienceSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <FeaturedSection />
        <BoutiquesSection />
        <ExperienceSection />
      </main>
      <Footer />
    </>
  );
}
