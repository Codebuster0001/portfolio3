import axios from "axios";
import { useEffect, useState } from "react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const [user, setUser] = useState({});

  const getMyFooter = async () => {
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
    getMyFooter();
  }, []);

  return (
    <footer className="w-full border-t border-white/10 py-8 bg-transparent text-center">
      <div className="max-w-7xl mx-auto px-4 space-y-4">
        {/* Social Icons */}
        <div className="flex justify-center gap-5 text-gray-500 dark:text-gray-400 text-xl">
          {user?.githubURL && (
            <a
              href={user.githubURL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              <FaGithub />
            </a>
          )}
          {user?.instagramURL && (
            <a
              href={user.instagramURL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              <FaInstagram />
            </a>
          )}
          {user?.linkedInURL && (
            <a
              href={user.linkedInURL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              <FaLinkedin />
            </a>
          )}
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
          <span className="font-semibold text-white">
            {user?.fullName || "Your Name"}
          </span>
          . All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
