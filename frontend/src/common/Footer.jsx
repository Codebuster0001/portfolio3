import React from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaArrowUp } from "react-icons/fa";

const Footer = () => {
  // Scroll to top function

  return (
    <footer className="w-full border-t border-white/10  py-8 bg-transparent text-center">
      <div className="max-w-7xl mx-auto px-4 space-y-4">
        {/* Social Icons */}
        <div className="flex justify-center gap-5 text-gray-500 dark:text-gray-400 text-xl">
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://twitter.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            <FaTwitter />
          </a>
        </div>

        {/* Footer Links */}
        <div className="flex justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
          <a href="#" className="hover:text-white transition">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-white transition">
            Terms of Service
          </a>
        </div>

        {/* Copyright */}
        <p className="text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-white">Deepak Kushwaha</span>. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
