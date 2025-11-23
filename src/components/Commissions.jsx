import { motion } from 'framer-motion';
import { Palette, Clock, Star, MessageCircle, CheckCircle } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../utils/motion';
import { Link } from 'react-router-dom';

const Commissions = () => {
  const services = [
    {
      title: 'Custom Portraits',
      description: 'Detailed pencil portraits of your loved ones, pets, or special memories',
      features: ['High-quality graphite work', 'Multiple size options', 'Digital preview included'],
      price: 'Starting from ₹2,500',
      duration: '7-10 days'
    },
    {
      title: 'Special Occasion Artworks',
      description: 'Commemorative pieces for weddings, anniversaries, graduations, and more',
      features: ['Custom composition', 'Personalized elements', 'Gift packaging available'],
      price: 'Starting from ₹3,500',
      duration: '10-14 days'
    },
    {
      title: 'Memorial Portraits',
      description: 'Heartfelt tribute artworks to honor and remember loved ones',
      features: ['Sensitive approach', 'Multiple photo references', 'Complimentary consultation'],
      price: 'Starting from ₹3,000',
      duration: '10-12 days'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {/* Header */}
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Commission <span className="text-[#778259]">Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transform your precious memories into timeless pencil sketch artworks. Each piece is crafted with care and attention to detail.
            </p>
          </motion.div>

          {/* Services Grid */}
          <motion.div
            className="grid lg:grid-cols-3 gap-8 mb-16"
            variants={staggerContainer}
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg border border-gray-100 group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 bg-gradient-to-br from-[#778259] to-[#8c9d75] rounded-2xl flex items-center justify-center mb-6"
                >
                  <Palette className="h-8 w-8 text-white" />
                </motion.div>

                <h3 className="font-heading text-2xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h3>

                <p className="text-gray-600 mb-6">
                  {service.description}
                </p>

                <div className="space-y-3 mb-6">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-[#778259] flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-[#8c9d75]" />
                      <span className="text-lg font-semibold text-gray-900">{service.price}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{service.duration}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Process Section */}
          <motion.div
            className="bg-gradient-to-br from-[#778259] to-[#8c9d75] rounded-3xl p-12 text-white mb-16"
            variants={fadeInUp}
          >
            <div className="text-center mb-12">
              <h3 className="font-heading text-3xl font-bold mb-4">
                How It Works
              </h3>
              <p className="text-xl opacity-90">
                Simple steps to get your custom artwork
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: '1', title: 'Contact', desc: 'Reach out with your idea' },
                { step: '2', title: 'Discuss', desc: 'Share photos and preferences' },
                { step: '3', title: 'Create', desc: 'I craft your artwork' },
                { step: '4', title: 'Deliver', desc: 'Receive your masterpiece' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="text-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold"
                  >
                    {item.step}
                  </motion.div>
                  <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
                  <p className="text-sm opacity-80">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            className="text-center"
            variants={fadeInUp}
          >
            <h3 className="font-heading text-3xl font-bold text-gray-900 mb-6">
              Ready to Commission Your Artwork?
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Let's discuss your vision and create something beautiful together. I'm here to bring your ideas to life.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="https://wa.me/919944991358"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#778259] text-white px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-3 hover:bg-[#8c9d75] transition-colors shadow-lg"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp Me
              </motion.a>

              <motion.a
                href="mailto:mukeshpandian005@gmail.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-[#778259] text-[#778259] px-8 py-4 rounded-full font-semibold hover:bg-[#778259] hover:text-white transition-all shadow-lg"
              >
                Send Email
              </motion.a>

              <Link to="/gallery">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-[#778259] text-[#778259] px-8 py-4 rounded-full font-semibold hover:bg-[#778259] hover:text-white transition-all shadow-lg"
                  onClick={() => {
                    // This will navigate to gallery and auto-select 'special' category
                    setTimeout(() => {
                      const specialButton = document.querySelector('[data-category="special"]');
                      if (specialButton) specialButton.click();
                    }, 100);
                  }}
                >
                  See Commission Work
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Commissions;