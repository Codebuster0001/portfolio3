import { SparklesText } from "@/components/magicui/sparkles-text";
import { cn } from "@/lib/utils";
import axios from "axios";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Animation Variants
const dotVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },
};

const lineVariants = {
  hidden: { height: 0, opacity: 0 },
  visible: {
    height: "80px",
    opacity: 1,
    transition: { duration: 1, ease: "easeInOut", delay: 0.2 },
  },
};

const getCardVariants = (direction = "left") => {
  // Helper to clamp blur to >= 0
  const clampBlur = (value) => Math.max(0, value);
  return {
    hidden: {
      opacity: 0,
      x: direction === "left" ? -120 : 120,
      y: 40,
      filter: `blur(${clampBlur(6)}px)`,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: `blur(${clampBlur(0)}px)`,
      transition: {
        duration: 1.3,
        ease: "easeOut",
        type: "spring",
        bounce: 0.3,
      },
    },
  };
};

// Timeline Item Component
const TimelineItem = ({ item, index }) => {
  const isLeft = index % 2 === 0;
  const direction = isLeft ? "left" : "right";
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-100px", amount: 0.5 });
  const cardVariants = getCardVariants(direction);

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex flex-col md:flex-row items-start md:items-center",
        isLeft ? "md:flex-row-reverse" : ""
      )}
    >
      {/* Dot and Line */}
      <div
        className={cn(
          "absolute flex flex-col items-center z-10",
          "left-[0.31rem] md:left-1/2 md:-translate-x-1/2"
        )}
      >
        <motion.div
          variants={dotVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="relative w-6 h-6"
        >
          <motion.span
            animate={{ scale: [1, 1.6, 1], opacity: [0.3, 0.7, 0.3] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute inset-0 rounded-full bg-indigo-500 opacity-30"
          />
          <span className="absolute inset-[4px] rounded-full bg-white dark:bg-zinc-950 border-2 border-indigo-600 z-10" />
        </motion.div>

        <motion.div
          variants={lineVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="w-[2px] bg-indigo-400 dark:bg-indigo-500"
        />
      </div>

      {/* Card */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className={cn(
          "w-full md:w-1/2 z-10 px-8 md:px-0",
          isLeft ? "md:pr-16 md:-mr-10" : "md:pl-16 md:-ml-10"
        )}
      >
        <article
          className={cn(
            "group px-5 py-6 rounded-xl border-l-[6px] backdrop-blur-md transition-all duration-300",
            "bg-white/80 dark:bg-zinc-900/70 shadow-lg ring-1 ring-black/5 dark:ring-white/10",
            "hover:scale-[1.02] hover:shadow-2xl"
          )}
          style={{ borderColor: isLeft ? "#6366F1" : "#A855F7" }}
        >
          <header>
            <time className="block text-xl font-extrabold text-indigo-700 dark:text-indigo-400">
              {item?.year}
            </time>
            <h3 className="text-lg font-semibold mt-1 text-slate-800 dark:text-slate-200">
              {item?.title}
            </h3>
          </header>
          <p className="text-sm text-muted-foreground mt-3 leading-relaxed tracking-wide">
            {item?.description}
          </p>
        </article>
      </motion.div>
    </div>
  );
};

// Main Timeline Section
const Timeline = () => {
  const [timelineData, setTimelineData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTimeline = async () => {
      try {
        const { data } = await axios.get(
          "https://portfolio-1dkv.onrender.com/api/v1/timeline/getall",
          { withCredentials: true }
        );
        // ✅ Fix here:
        setTimelineData(data.timeline || []);
      } catch (error) {
        console.error("Timeline fetch failed", error);
      } finally {
        setLoading(false);
      }
    };
    getTimeline();
  }, []);

  return (
    <section
      id="timeline"
      aria-label="Career Timeline"
      className="relative w-full py-20 px-4 sm:px-6 lg:px-8 scroll-mt-20"
    >
      <SparklesText className="text-3xl text-white text-center pb-20 sm:text-4xl md:text-5xl font-bold">
        My Journey
      </SparklesText>

      <div className="relative max-w-6xl mx-auto">
        {/* Timeline background line */}
        <div className="absolute top-0 h-full w-full pointer-events-none z-0">
          <div className="absolute left-4 w-[2px] h-full bg-gray-300 dark:bg-gray-600 md:hidden" />
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-[2px] h-full bg-gradient-to-b from-transparent via-gray-300 to-transparent dark:via-gray-600">
            <div className="absolute top-0 w-[2px] h-full bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 opacity-20 rounded-full" />
          </div>
        </div>

        {/* Timeline items */}
        {loading ? (
          <p className="text-center text-gray-400">Loading timeline...</p>
        ) : (
          <div className="space-y-24 sm:space-y-28 md:space-y-32">
            {timelineData.map((item, index) => (
              <TimelineItem key={item._id || index} item={item} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Timeline;
