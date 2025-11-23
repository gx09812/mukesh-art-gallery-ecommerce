// src/components/Hero.jsx
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Palette, MessageCircle, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { scrollToSection } from "../utils/utils";
import { fadeInRight } from "../utils/motion";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section
      id="hero"
      className="relative flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-20 py-16 bg-gradient-to-b from-white to-gray-50 min-h-screen pt-32"
    >
      {/* LEFT CONTENT */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full md:w-1/2 text-center md:text-left"
      >
        {/* Tag */}
        <span className="inline-flex items-center gap-2 px-4 py-1 mb-4 text-sm font-medium text-gray-700 bg-gray-100 rounded-full shadow-sm">
          <Palette size={16} className="text-[#778259]" />
          Professional Pencil Sketch Artist
        </span>

        {/* Headings */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-snug">
          I’m Mukesh Pandian
        </h1>

        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mt-3">
          a pencil sketch <span className="text-[#778259]">artist</span>
        </h2>

        {/* Paragraph */}
        <div className="w-full flex justify-center">
            <p className="text-gray-600 mt-4 leading-relaxed text-center max-w-lg md:max-w-2xl">
                Bringing your precious memories to life through detailed pencil artistry.
                Each stroke tells a story, and every shade captures emotion.
                 </p>
                 </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 mt-8 justify-center md:justify-start">
          <button
            onClick={() => navigate("/gallery")}
            className="flex items-center gap-2 px-6 py-3 bg-[#778259] text-white rounded-full shadow-lg hover:bg-[#66734d] transition transform hover:scale-105"
          >
            View Gallery <ArrowRight size={18} />
          </button>

          <button
            onClick={() => navigate("/contact")}
            className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-full hover:bg-gray-100 transition"
          >
            <MessageCircle size={18} /> Request Commission
          </button>
        </div>

        {/* Social Links */}
        <div className="flex flex-wrap gap-4 mt-10 justify-center md:justify-start">
          <a
            href="#"
            className="bg-gradient-to-r from-pink-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm shadow"
          >
            📷 Instagram
          </a>

          <a
            href="#"
            className="bg-gradient-to-r from-red-500 to-red-700 text-white px-4 py-2 rounded-full text-sm shadow"
          >
            📹 YouTube
          </a>

          <a
            href="#"
            className="bg-green-500 text-white px-4 py-2 rounded-full text-sm shadow"
          >
            💬 WhatsApp Channel
          </a>
        </div>

        {/* Scroll Down */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="mt-10 flex justify-center md:justify-start cursor-pointer"
          onClick={() => scrollToSection("about")}
        >
          <ChevronDown className="text-gray-500" size={28} />
        </motion.div>
      </motion.div>

      {/* RIGHT IMAGE SECTION */}
      <motion.div
        variants={fadeInRight}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="w-full md:w-auto md:absolute md:top-24 md:right-8 flex justify-center md:justify-end mb-8 md:mb-0"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative w-72 sm:w-80 md:w-96"
        >
          {/* Decorative Frames */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#778259] to-[#8c9d75] rounded-2xl transform rotate-3 scale-105 opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-tl from-[#778259] to-[#8c9d75] rounded-2xl transform -rotate-3 scale-105 opacity-20" />

          {/* Main Image */}
          <div className="relative bg-white p-4 rounded-2xl shadow-2xl">
            <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80"
                alt="Pencil sketch artwork"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="absolute -bottom-3 -right-3 bg-white px-4 py-2 rounded-full shadow-xl border-2 border-[#778259]"
            >
              <p className="text-xs font-semibold text-[#778259]">
                ✨ Custom Commissions Available
              </p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
