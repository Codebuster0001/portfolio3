// components/Testimonials.jsx
import React, { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BoxReveal } from "@/components/magicui/box-reveal";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    name: "Deepak Kushwaha",
    role: "Full Stack Developer",
    image: "https://i.pravatar.cc/150?img=32",
    quote:
      "Working with Deepak has been a game-changer. His attention to detail and ability to deliver on time is exceptional!",
  },
  {
    name: "Priya Sharma",
    role: "Product Designer",
    image: "https://i.pravatar.cc/150?img=12",
    quote:
      "Creative, efficient, and always thinking ahead — Deepak brings immense value to every project he touches.",
  },
  {
    name: "Arjun Mehta",
    role: "Tech Lead, AI Solutions",
    image: "https://i.pravatar.cc/150?img=5",
    quote:
      "Deepak’s code quality and clean architecture make him a standout engineer. Highly recommend working with him.",
  },
];

const Testimonials = () => {
  const cardVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 50 },
      visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
          delay: i * 0.2,
          duration: 0.6,
          ease: "easeOut",
        },
      }),
    }),
    []
  );

  return (
    <section className="py-16 mb-16 text-white w-full px-4 md:px-8">
      <div className="text-center mb-12">
        <SparklesText className="text-4xl md:text-5xl font-bold">
          What People Say
        </SparklesText>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto ">
        {testimonials.map((testimonial, index) => {
          const { name, role, image, quote } = testimonial;

          return (
            <motion.div
              key={name}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={index}
              className="py-8"
            >
              <BoxReveal>
                <Card className="bg-neutral-900 border border-neutral-700 text-white shadow-xl hover:shadow-2xl transition-transform duration-300">
                  <CardContent className="p-6 flex flex-col justify-between h-full">
                    <div className="flex-grow">
                      <FaQuoteLeft className="text-pink-500 text-2xl mb-4" />
                      <p className="text-base mb-6 leading-relaxed">{quote}</p>
                    </div>
                    <div className="flex items-center gap-4 mt-4">
                      <Avatar>
                        <AvatarImage src={image} alt={name} />
                        <AvatarFallback>{name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{name}</p>
                        <p className="text-sm text-gray-400">{role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </BoxReveal>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Testimonials;
