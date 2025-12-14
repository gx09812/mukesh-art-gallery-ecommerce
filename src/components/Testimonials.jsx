import { motion } from 'framer-motion';
import { Star, Quote, Clock, MapPin } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../utils/motion';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const API_URL = "http://localhost:5000/reviews";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

  const handleBoxClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);
  };

  // 🔹 Fetch reviews from server
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setTestimonials(data.reviews);
        }
      })
      .catch(err => console.error("Review fetch error:", err));
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >

          {/* Info Boxes */}
          <motion.div
            className="grid md:grid-cols-2 gap-8 mb-16"
            variants={staggerContainer}
          >
           
            {/* Business Hours Box */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
            >
              <div className="flex items-center space-x-4 mb-6">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 bg-gradient-to-br from-[#778259] to-[#8c9d75] rounded-2xl flex items-center justify-center"
                >
                  <Clock className="h-8 w-8 text-white" />
                </motion.div>
                <h3 className="font-heading text-2xl font-bold text-gray-900">Business Hours</h3>
              </div>
              <div className="space-y-3 text-gray-700">
                <div className="flex justify-between">
                  <span className="font-medium">Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Saturday</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Sunday</span>
                  <span>By Appointment</span>
                </div>
                <div className="mt-4 p-3 bg-[#778259]/10 rounded-lg">
                  <p className="text-sm text-[#778259] font-medium">
                    💬 Available on WhatsApp for urgent inquiries
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Service Area Box */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
            >
              <div className="flex items-center space-x-4 mb-6">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 bg-gradient-to-br from-[#8c9d75] to-[#778259] rounded-2xl flex items-center justify-center"
                >
                  <MapPin className="h-8 w-8 text-white" />
                </motion.div>
                <h3 className="font-heading text-2xl font-bold text-gray-900">Service Area</h3>
              </div>
              <div className="space-y-4 text-gray-700">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Local Services</h4>
                  <p className="text-sm">In-person consultations and delivery within 25km radius</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Nationwide Shipping</h4>
                  <p className="text-sm">Secure packaging and delivery across India</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Digital Services</h4>
                  <p className="text-sm">Online consultations and digital artwork delivery worldwide</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Header */}
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              What People <span className="text-[#778259]">Say</span>
            </h2>
            <p className="text-xl text-gray-600">
              Real feedback from clients
            </p>
          </motion.div>

          {/* Testimonials Grid */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
            variants={staggerContainer}
          >
            {testimonials.length > 0 ? (
              testimonials.map((t, index) => (
                <motion.div
                  key={t.id}
                  variants={fadeInUp}
                  custom={index}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 relative"
                >
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#778259] rounded-full flex items-center justify-center">
                    <Quote className="h-6 w-6 text-white" />
                  </div>

                  <div className="flex space-x-1 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  <p className="text-gray-700 mb-6 italic">
                    "{t.review}"
                  </p>

                  <h4 className="font-semibold text-gray-900">{t.name}</h4>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-500 text-center col-span-full">
                No reviews yet. Be the first to leave one!
              </p>
            )}
          </motion.div>

          {/* CTA */}
          <motion.div
            className={`text-center bg-white rounded-2xl p-12 shadow-lg border cursor-pointer ${
              isClicked ? 'scale-105' : ''
            }`}
            variants={fadeInUp}
            onClick={handleBoxClick}
          >
            <h3 className="text-2xl font-bold mb-4">
              Your Review Could Be Here!
            </h3>

            <Link to="/reviews">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#778259] text-white px-8 py-4 rounded-full font-semibold"
              >
                Share Your Experience
              </motion.button>
            </Link>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;

