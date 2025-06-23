import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import ModelViewer from "@/components/ModelViewer";
import characterModel from "@/assets/Animation_Boxing_Practice_withSkin.fbx";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

const About = () => {
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
            I'm{" "}
            <span className="text-white font-semibold">Deepak Kushwaha</span>, a
            passionate{" "}
            <span className="text-indigo-400 font-semibold">
              Frontend Developer
            </span>{" "}
            crafting immersive web experiences using modern technologies like{" "}
            <span className="text-indigo-400 font-medium">React</span>,{" "}
            <span className="text-indigo-400 font-medium">TailwindCSS</span>,{" "}
            <span className="text-indigo-400 font-medium">Framer Motion</span>.
            I focus on clean design and efficient performance.
          </p>

          {/* Social Icons */}
          <div className="flex justify-center md:justify-start gap-6 pt-4">
            <a
              href="https://github.com/deepakkushwahadev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-3xl hover:text-gray-400 transition-colors duration-300"
            >
              <FaGithub />
            </a>
            <a
              href="https://linkedin.com/in/deepakkushwahadev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-3xl hover:text-[#0077b5] transition-colors duration-300"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://instagram.com/deepakkushwahadev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-3xl hover:text-pink-500 transition-colors duration-300"
            >
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* 3D Model Canvas */}
        <div className="w-full z-50  h-[600px]  px-4">
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
