import { useEffect } from "react";
import Nav from "@/components/portfolio/Nav";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Skills from "@/components/portfolio/Skills";
import Experience from "@/components/portfolio/Experience";
import Education from "@/components/portfolio/Education";
import Workshop from "@/components/portfolio/Workshop";
import Hobbies from "@/components/portfolio/Hobbies";
import Contact from "@/components/portfolio/Contact";
import AnimatedBackdrop from "@/components/portfolio/AnimatedBackdrop";

export default function Portfolio() {
  useEffect(() => {
    document.title = "Rohit Dhongade · Mechanical Technician & Service Advisor";
  }, []);

  return (
    <main className="relative bg-[#0A0A0A] text-white overflow-x-hidden" data-testid="portfolio-root">
      <AnimatedBackdrop />
      <div className="relative z-10">
        <Nav />
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Education />
        <Workshop />
        <Hobbies />
        <Contact />
      </div>
    </main>
  );
}
