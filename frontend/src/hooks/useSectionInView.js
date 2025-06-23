// src/hooks/useSectionInView.js
import { useInView } from "framer-motion";
import { useRef } from "react";

const useSectionInView = () => {
  const ref = useRef(null);
  const inView = useInView(ref, {
    margin: "-30% 0px -60% 0px",
    once: false, // Trigger on scroll down & back up
  });

  return { ref, inView };
};

export default useSectionInView;
