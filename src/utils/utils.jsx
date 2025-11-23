// src/utils/utils.js
import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from './motion'; // Import motion utilities

// Function to handle smooth scrolling to sections, accounting for the fixed navbar
export const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    window.scrollTo({
      top: element.offsetTop - 80, // Offset for fixed navbar
      behavior: 'smooth',
    });
  }
};

// Reusable Section wrapper component for consistent structure and animation
export const Section = ({ id, children, title, icon: Icon, className = '' }) => (
  <section id={id} className={`py-20 lg:py-32 ${className}`}>
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {title && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mb-12 text-center"
        >
          {Icon && <Icon className="w-10 h-10 text-[#778259] mb-3" />}
          <h2 className="text-4xl font-extrabold text-gray-900 md:text-5xl">
            {title}
          </h2>
          <div className="w-20 h-1 bg-[#778259] mt-4 rounded-full"></div>
        </motion.div>
      )}
      {children}
    </div>
  </section>
);