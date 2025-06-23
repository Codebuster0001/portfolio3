import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import logo from "@/assets/dk-initials-monogram-concept-logo-design-of-letters-d-and-k-vector.jpg";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Header() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleNavClick = (href) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.replaceState(null, "", href);
      }
    } else {
      window.location.href = href;
    }
    setIsSheetOpen(false); // Close the mobile menu
  };

  // Auto-close the sheet on screen resize to md and up
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSheetOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Button
          variant="ghost"
          className="px-2"
          onClick={() => handleNavClick("/")}
        >
          <img src={logo} alt="Deepak.dev" className="h-10 w-10 rounded-full" />
        </Button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6">
          {navLinks.map(({ name, href }) => (
            <button
              key={name}
              onClick={() => handleNavClick(href)}
              className="relative text-lg text-white hover:text-blue-400 transition duration-300
                         after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0
                         after:bg-blue-400 hover:after:w-full after:transition-all after:duration-300
                         px-3 py-2"
            >
              {name}
            </button>
          ))}
        </nav>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button size="icon" variant="ghost" className="text-white">
                <Menu className="h-8 w-8" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-black text-white p-6 mt-5 flex flex-col"
            >
              <nav className="flex flex-col h-full justify-evenly">
                {navLinks.map(({ name, href }) => (
                  <button
                    key={name}
                    onClick={() => handleNavClick(href)}
                    className="text-2xl text-center hover:text-blue-400 transition"
                  >
                    {name}
                  </button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
