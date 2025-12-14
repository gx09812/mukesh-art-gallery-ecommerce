import { motion } from 'framer-motion';
import { Palette, Clock, Star, MessageCircle, CheckCircle } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../utils/motion';
import { Link } from 'react-router-dom';

const services = [
  {
    title: 'Custom Portraits',
    description: 'Detailed pencil portraits of your loved ones, pets, or special memories',
    features: ['High-quality graphite work', 'Multiple size options', 'Digital preview included'],
    price: '₹2,500+',
    duration: '7-10 days'
  },
  {
    title: 'Special Occasion Artworks',
    description: 'Commemorative pieces for weddings, anniversaries, graduations, and more',
    features: ['Custom composition', 'Personalized elements', 'Gift packaging available'],
    price: '₹3,500+',
    duration: '10-14 days'
  },
  {
    title: 'Memorial Portraits',
    description: 'Heartfelt tribute artworks to honor and remember loved ones',
    features: ['Sensitive approach', 'Multiple photo references', 'Complimentary consultation'],
    price: '₹3,000+',
    duration: '10-12 days'
  }
];

const steps = [
  { step: '1', title: 'Contact', desc: 'Reach out with your idea' },
  { step: '2', title: 'Discuss', desc: 'Share photos and preferences' },
  { step: '3', title: 'Create', desc: 'I craft your artwork' },
  { step: '4', title: 'Deliver', desc: 'Receive your masterpiece' }
];

const Commissions = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {/* Header */}
          <motion.div className="text-center mb-20" variants={fadeInUp}>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Commission <span className="text-[#778259]">Services</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Transform your memories into timeless pencil sketch artworks with attention to detail and care.
            </p>
          </motion.div>

          {/* Services Grid */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
            variants={staggerContainer}
          >
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                whileHover={{ y: -6 }}
                className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 group transition hover:shadow-2xl"
              >
                <div className="w-16 h-16 mb-6 rounded-xl bg-gradient-to-br from-[#778259] to-[#8c9d75] flex items-center justify-center transition-transform group-hover:scale-110">
                  <Palette className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>

                <ul className="space-y-2 mb-6">
                  {service.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-700 text-sm">
                      <CheckCircle className="w-5 h-5 text-[#778259]" />
                      {feat}
                    </li>
                  ))}
                </ul>

                <div className="flex justify-between items-center border-t border-gray-200 pt-4">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-[#8c9d75]" />
                    <span className="font-semibold text-gray-900">{service.price}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{service.duration}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Process Steps */}
          <motion.div
            className="bg-gradient-to-br from-[#778259] to-[#8c9d75] rounded-3xl p-12 text-white mb-20"
            variants={fadeInUp}
          >
            <h3 className="text-3xl font-bold text-center mb-12">How It Works</h3>
            <div className="grid md:grid-cols-4 gap-8">
              {steps.map((step, i) => (
                <motion.div key={i} variants={fadeInUp} className="text-center">
                  <div className="w-16 h-16 mb-4 rounded-full bg-white/20 flex items-center justify-center mx-auto font-bold text-2xl transition-transform hover:scale-110">
                    {step.step}
                  </div>
                  <h4 className="font-semibold text-lg mb-2">{step.title}</h4>
                  <p className="text-sm opacity-90">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

         {/* Call to Action */}
<motion.div className="text-center" variants={fadeInUp}>
  <h3 className="text-3xl font-bold mb-6">
    Ready to Commission Your Artwork?
  </h3>
  <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
    Let's discuss your vision and create something beautiful together.
  </p>

  <div className="flex flex-col sm:flex-row gap-4 justify-center">
    {/* WhatsApp */}
    <motion.a
      href="https://wa.me/919944991358"
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-3 px-8 py-4 rounded-full bg-[#778259] text-white shadow-lg border-2 border-transparent hover:border-white hover:bg-[#8c9d75] transition-all"
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
        alt="WhatsApp"
        className="w-5 h-5"
      />
      WhatsApp Me
    </motion.a>

    {/* Email */}
    <motion.a
      href="mailto:mukeshpandian005@gmail.com"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-3 px-8 py-4 rounded-full border-2 border-[#778259] text-[#778259] shadow-lg hover:bg-[#778259] hover:text-white transition-all"
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Mail_%28iOS%29.svg"
        alt="Email"
        className="w-5 h-5"
      />
      Send Email
    </motion.a>

    {/* Gallery */}
    <Link to="/gallery">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-3 px-8 py-4 rounded-full border-2 border-[#778259] text-[#778259] shadow-lg hover:bg-[#778259] hover:text-white transition-all"
      >
        <img
          src="https://thumbnail.imgbin.com/0/1/24/colored-pencil-decorative-yellow-pencil-with-colorful-splash-5GzsAL8U_t.jpg"
          alt="Gallery"
          className="w-5 h-5"
        />
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
