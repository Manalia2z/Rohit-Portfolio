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

export default function Portfolio() {
  useEffect(() => {
    document.title = "Rohit Dhongade · Mechanical Engineer & Automotive Technician";
  }, []);

  return (
    <main className="relative bg-[#0A0A0A] text-white" data-testid="portfolio-root">
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Education />
      <Workshop />
      <Hobbies />
      <Contact />
    </main>
  );
}
