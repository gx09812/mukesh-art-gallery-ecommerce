import { motion } from 'framer-motion';
import { Star, Quote, Clock, MapPin } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../utils/motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Coming Soon',
      role: 'Happy Client',
      content: 'Client testimonials will be displayed here once received',
      rating: 5,
      image: '👤'
    },
    {
      id: 2,
      name: 'Future Review',
      role: 'Commission Client',
      content: 'Amazing artwork testimonials from satisfied customers',
      rating: 5,
      image: '👥'
    },
    {
      id: 3,
      name: 'Upcoming Feedback',
      role: 'Workshop Attendee',
      content: 'Workshop and learning experience reviews will appear here',
      rating: 5,
      image: '🎨'
    }
  ];

  const [isClicked, setIsClicked] = useState(false);

  const handleBoxClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);
  };

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
            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              What People <span className="text-[#778259]">Say</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Testimonials from happy clients and workshop participants will be featured here as they come in
            </p>
          </motion.div>

          {/* Testimonials Grid */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
            variants={staggerContainer}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                variants={fadeInUp}
                custom={index}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 relative group"
              >
                {/* Quote Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="absolute -top-4 -left-4 w-12 h-12 bg-[#778259] rounded-full flex items-center justify-center"
                >
                  <Quote className="h-6 w-6 text-white" />
                </motion.div>

                {/* Rating */}
                <div className="flex space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    </motion.div>
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-700 mb-6 italic leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#778259] to-[#8c9d75] rounded-full flex items-center justify-center text-white text-xl">
                    {testimonial.image}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Placeholder Message */}
          <motion.div
            className={`text-center bg-white rounded-2xl p-12 shadow-lg border border-gray-100 cursor-pointer transition-transform duration-300 ${
              isClicked ? 'scale-105' : 'scale-100'
            }`}
            variants={fadeInUp}
            onClick={handleBoxClick}
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2
              }}
              className="text-6xl mb-6"
            >
              ⭐
            </motion.div>

            <h3 className="font-heading text-2xl font-bold text-gray-900 mb-4">
              Your Review Could Be Here!
            </h3>

            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              I'm building my portfolio and would love to hear from clients about their experience.
              If you've worked with me or attended a workshop, please share your feedback!
            </p>

            <Link to="/reviews">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#778259] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#8c9d75] transition-colors shadow-lg"
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