import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Hero from "@/section/Hero";
import About from "@/section/About";
import Skills from "@/section/Skills";
import Timeline from "@/section/Timeline";
import Projects from "@/section/Projects";
import Testimonials from "@/section/Testimonials";
import Contact from "@/section/Contact";

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const id = location.state.scrollTo;
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          // ✅ Update the hash in the URL
          window.history.pushState(null, "", `#${id}`);
        }, 100);
      }
    }
  }, [location]);

  return (
    <>
      <section id="hero">
        <Hero />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="skills">
        <Skills />
      </section>
      <section id="timeline">
        <Timeline />
      </section>
      <section id="projects">
        <Projects />
      </section>
      <section id="testimonials">
        <Testimonials />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </>
  );
};

export default Home;
