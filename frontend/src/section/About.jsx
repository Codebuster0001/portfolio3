import characterModel from "@/assets/Animation_Boxing_Practice_withSkin.fbx";
import { SparklesText } from "@/components/magicui/sparkles-text";
import ModelViewer from "@/components/ModelViewer";
import { Canvas } from "@react-three/fiber";
import axios from "axios";
import { Suspense, useEffect, useState } from "react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

const About = () => {
  const [user, setUser] = useState({});

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
      id="about"
      className="min-h-screen bg-black text-white flex items-center justify-center py-24 px-6"
    >
      <div className="max-w-7xl w-full flex flex-col-reverse md:flex-row items-center justify-between gap-16">
        {/* Text Section */}
        <div className="w-full md:w-1/2 space-y-8 text-center md:text-left">
          <SparklesText className="text-5xl md:text-6xl font-bold text-indigo-400 leading-tight">
            About Me
          </SparklesText>
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
            I'm Frontend Developer
            {user?.description ||
              "I'm a frontend developer passionate about building UI experiences."}{" "}
            <span className="text-indigo-400 font-medium">
              {user?.technologies?.slice(0, 3).join(", ") ||
                "React, TailwindCSS, Framer Motion"}
            </span>
            . I focus on{" "}
            <span className="text-white font-semibold">clean design</span> and{" "}
            <span className="text-white font-semibold">
              efficient performance
            </span>
            .
          </p>

          {/* Social Icons */}
          <div className="flex justify-center md:justify-start gap-6 pt-4">
            {user?.githubURL && (
              <a
                href={user.githubURL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-3xl hover:text-gray-400 transition-colors duration-300"
              >
                <FaGithub />
              </a>
            )}
            {user?.linkedInURL && (
              <a
                href={user.linkedInURL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-3xl hover:text-[#0077b5] transition-colors duration-300"
              >
                <FaLinkedin />
              </a>
            )}
            {user?.instagramURL && (
              <a
                href={user.instagramURL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-3xl hover:text-pink-500 transition-colors duration-300"
              >
                <FaInstagram />
              </a>
            )}
          </div>
        </div>

        {/* 3D Model Canvas */}
        <div className="w-full z-50 h-[600px] px-4">
          <Canvas camera={{ position: [0, 1.4, 3], fov: 30 }}>
            <Suspense fallback={null}>
              <ModelViewer modelPath={characterModel} />
            </Suspense>
          </Canvas>
        </div>
      </div>
    </section>
  );
};

export default About;
