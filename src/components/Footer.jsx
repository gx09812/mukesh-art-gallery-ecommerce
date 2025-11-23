import { motion } from 'framer-motion';
import { Heart, Palette, Instagram, Youtube, MessageCircle, Mail, Phone } from 'lucide-react';
import { href, Link } from 'react-router-dom';
import { fadeInUp, staggerContainer } from '../utils/motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: Instagram,
      href: 'https://instagram.com/mukesh_.arts',
      label: 'Instagram',
      color: 'hover:text-pink-500'
    },
    {
      icon: Youtube,
      href: 'https://youtube.com/@mukesh_arts_?feature=shared',
      label: 'YouTube',
      color: 'hover:text-red-500'
    },
    {
      icon: MessageCircle,
      href: 'https://whatsapp.com/channel/0029Vb6kVtK3mFY6Gdm0sF3S',
      label: 'WhatsApp Channel',
      color: 'hover:text-green-500'
    }
  ];

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Commissions', href: '/commissions' },
    { name: 'Contact', href: '/contact' },
    { name: 'Upload', href:'/admin/login'}
  ];

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-20 -right-20 w-40 h-40 border border-white/10 rounded-full"
        />
        <motion.div
          animate={{
            rotate: -360,
            scale: [1.1, 1, 1.1]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-20 -left-20 w-60 h-60 border border-white/10 rounded-full"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <motion.div className="lg:col-span-2" variants={fadeInUp}>
              <motion.div
                className="flex items-center space-x-3 mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="w-12 h-12 bg-gradient-to-br from-[#778259] to-[#8c9d75] rounded-xl flex items-center justify-center"
                >
                  <Palette className="h-6 w-6 text-white" />
                </motion.div>
                <div>
                  <h3 className="font-heading text-2xl font-bold">Mukesh Pandian</h3>
                  <Link to="/about" className="hover:text-[#778259] transition-colors">
                    Pencil Sketch Artist
                  </Link>
                </div> 
              </motion.div>

              <p className="text-gray-400 mb-6 leading-relaxed">
                Bringing your precious memories to life through detailed pencil artistry.
                Each stroke tells a story, each shade captures emotion.
              </p>

              <Link to="/commissions" className="hover:text-[#778259] transition-colors">
                Commission Work Available
              </Link>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={fadeInUp}>
              <h4 className="font-heading text-lg font-bold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.li key={index} whileHover={{ x: 5 }}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2"
                    >
                      <span className="w-1 h-1 bg-[#778259] rounded-full"></span>
                      <span>{link.name}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div variants={fadeInUp}>
              <h4 className="font-heading text-lg font-bold mb-6">Get in Touch</h4>
              <div className="space-y-4">
                <motion.a
                  href="mailto:mukeshpandian005@gmail.com"
                  whileHover={{ x: 5 }}
                  className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  <span className="text-sm">mukeshpandian005@gmail.com</span>
                </motion.a>
                <motion.a
                  href="tel:+919944991358"
                  whileHover={{ x: 5 }}
                  className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  <span className="text-sm">+91 9944991358</span>
                </motion.a>
              </div>

              {/* Social Links */}
              <div className="mt-6">
                <h5 className="font-semibold mb-4">Follow My Journey</h5>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon;
                    return (
                      <motion.a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.2, y: -2 }}
                        className={`w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 ${social.color} transition-all`}
                      >
                        <IconComponent className="h-5 w-5" />
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Section */}
          <motion.div
            className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
            variants={fadeInUp}
          >
            <motion.p
              className="text-gray-400 text-sm mb-4 md:mb-0 flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
            >
              <span>© {currentYear} Mukesh Pandian. Made with</span>
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
              >
                <Heart className="h-4 w-4 text-red-500 fill-current" />
              </motion.span>
              <span>for art lovers</span>
            </motion.p>

            <motion.p
              className="text-gray-500 text-xs"
              whileHover={{ scale: 1.05 }}
            >
              Crafted with passion • Designed for inspiration
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;