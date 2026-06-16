import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Schedule from "@/components/Schedule";
import WorkshopTracks from "@/components/WorkshopTracks";
import CompetitionHighlight from "@/components/CompetitionHighlight";
import WorkshopRegistrationSection from "@/components/WorkshopRegistrationSection";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Schedule />
        <WorkshopTracks />
        <CompetitionHighlight />
        <WorkshopRegistrationSection />
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
