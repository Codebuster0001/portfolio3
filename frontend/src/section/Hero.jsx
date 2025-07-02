import { BoxReveal } from "@/components/magicui/box-reveal";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import { useTypewriter } from "react-simple-typewriter";

const Hero = () => {
  const [user, setUser] = useState({}); // ✅ ensures no null errors

  const [text] = useTypewriter({
    words: user?.fullName ? [user.fullName] : ["Your Name"], // ✅ safe access
    loop: true,
    delaySpeed: 2000,
  });

  const getMyProfile = async () => {
    try {
      const { data } = await axios.get(
        "https://portfolio-1dkv.onrender.com/api/v1/user/portfolio/me",
        { withCredentials: true }
      );
      setUser(data.user);
    } catch (error) {
      console.error("Failed to load profile:", error);
    }
  };

  useEffect(() => {
    getMyProfile();
  }, []);
  return (
    <section
      id="hero"
      className="relative overflow-hidden min-h-screen flex items-center justify-center bg-black text-white px-6 md:px-12"
    >
      {/* Floating Blobs */}
      <div className="absolute top-[-15%] left-[-15%] w-96 h-96 bg-gradient-to-br from-blue-600 to-purple-600 opacity-30 rounded-full animate-blob" />
      <div className="absolute bottom-[-15%] right-[-15%] w-[40rem] h-[40rem] bg-gradient-to-tr from-pink-600 to-red-500 opacity-30 rounded-full animate-blob-s" />

      {/* Twinkling Stars */}
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          className="absolute bg-white rounded-full animate-twinkle"
          style={{
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: 0.2,
          }}
        />
      ))}

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto flex flex-col items-center text-center gap-5">
        <BoxReveal>
          <h1 className="text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight text-indigo-400">
            Hi, I'm
          </h1>
        </BoxReveal>

        <div className="flex items-center h-[9rem] md:h-[10rem] md:pb-10 md:pt-5 lg:h-[8rem] justify-center gap-3 text-7xl md:text-8xl lg:text-9xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
          {text}
        </div>

        <p className="text-gray-300 text-lg sm:text-xl md:text-2xl max-w-2xl">
          I build stunning web experiences using modern JavaScript frameworks.
          Let's build something amazing together!
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          <Button
            asChild
            className="text-lg px-8 py-4 shadow-xl transform hover:-translate-y-1 transition"
          >
            <a href="#contact">Contact</a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="text-lg px-8 py-4 text-black shadow-xl transform hover:scale-105 transition"
          >
            <a
              href={user.resume?.url || "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
