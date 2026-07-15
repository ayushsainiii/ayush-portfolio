import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Journey from "./components/Journey";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import PrintResume from "./components/PrintResume";

export default function App() {
  const [activeSection, setActiveSection] = useState<string>("home");

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        return savedTheme === "dark";
      }
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Dynamic SEO Settings
  useEffect(() => {
    // Page Title Setup
    document.title = "Ayush Saini | Frontend & MERN Stack Developer";

    // Dynamic Meta Description Setup
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute(
      "content",
      "Portfolio of Ayush Saini, an MCA graduate and frontend developer skilled in React.js, JavaScript, responsive web development, Node.js, Express.js, MongoDB, and modern web technologies."
    );

    // Open Graph Title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement("meta");
      ogTitle.setAttribute("property", "og:title");
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute("content", "Ayush Saini | Frontend & MERN Stack Developer");

    // Open Graph Description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement("meta");
      ogDesc.setAttribute("property", "og:description");
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute(
      "content",
      "Explore the creative personal developer portfolio of Ayush Saini, MERN Stack developer and MCA 2026 graduate. Focused on modular components, pixel-perfect layouts, and accessible interfaces."
    );
  }, []);

  // Section Observer to Track Active Link in Sticky Header
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px", // Trigger when element takes up critical space
      threshold: 0
    };

    const sectionIds = ["home", "about", "projects", "skills", "journey", "contact"];
    
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <>
      <div id="portfolio-app-root" className="bg-cream selection:bg-charcoal selection:text-cream min-h-screen flex flex-col justify-between">
        {/* 1. Sticky Navigation Bar */}
        <Navbar activeSection={activeSection} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

        {/* Main Content Layout */}
        <main id="portfolio-main-content" className="flex-grow w-full">
          
          {/* 2. Hero Section */}
          <Hero />

          {/* 3. About Me Section */}
          <About />

          {/* 4. Featured Projects Section */}
          <Projects />

          {/* 5. Technical Skills Section */}
          <Skills />

          {/* 7. Education and Experience Section */}
          <Journey />

          {/* 8. Contact Call-to-Action Section */}
          <Contact />

        </main>

        {/* 9 & 10. Social Links & Footer Section */}
        <Footer />
      </div>

      <PrintResume />
    </>
  );
}
