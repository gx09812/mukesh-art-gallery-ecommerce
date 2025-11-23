import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Instagram, Youtube, MessageCircle, Send, MapPin, Clock, HelpCircle } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../utils/motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'mukeshpandian005@gmail.com',
      href: 'mailto:mukeshpandian005@gmail.com',
      color: 'from-[#778259] to-[#8c9d75]'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 9944991358',
      href: 'tel:+919944991358',
      color: 'from-[#8c9d75] to-[#778259]'
    },
    {
      icon: Instagram,
      label: 'Instagram',
      value: '@mukesh_.arts',
      href: 'https://instagram.com/mukesh_.arts',
      color: 'from-[#778259] to-[#8c9d75]'
    },
    {
      icon: Youtube,
      label: 'YouTube',
      value: 'Mukesh_.Arts',
      href: 'https://youtube.com/@mukesh_arts_?feature=shared',
      color: 'from-[#8c9d75] to-[#778259]'
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp Channel',
      value: 'Mukesh_.Arts',
      href: 'https://whatsapp.com/channel/0029Vb6kVtK3mFY6Gdm0sF3S',
      color: 'from-[#778259] to-[#8c9d75]'
    }
  ];

  const quickAnswers = [
    {
      question: 'How long does a commission take?',
      answer: 'Typically 7-14 days depending on complexity and size.'
    },
    {
      question: 'What sizes do you offer?',
      answer: 'A4, A3, and custom sizes available. Pricing varies by size.'
    },
    {
      question: 'Do you work from photos?',
      answer: 'Yes! High-quality photos work best for detailed portraits.'
    },
    {
      question: 'What is your pricing?',
      answer: 'Starting from ₹2,500 for portraits. Contact for custom quotes.'
    },
    {
      question: 'Do you ship nationwide?',
      answer: 'Yes, secure packaging and delivery across India available.'
    },
    {
      question: 'Can I see progress updates?',
      answer: 'Absolutely! I share progress photos during the creation process.'
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
              Let's <span className="text-[#778259]">Connect</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have a question, want to commission artwork, or just want to say hello? I'd love to hear from you!
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <motion.div variants={fadeInUp}>
              <h3 className="font-heading text-2xl font-bold text-gray-900 mb-8">
                Get in Touch
              </h3>

              <div className="space-y-6 mb-12">
                {contactInfo.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <motion.a
                      key={index}
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      variants={fadeInUp}
                      whileHover={{ x: 10 }}
                      className="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all group"
                    >
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center`}
                      >
                        <IconComponent className="h-7 w-7 text-white" />
                      </motion.div>
                      <div>
                        <h4 className="font-semibold text-gray-900 group-hover:text-[#778259] transition-colors">
                          {item.label}
                        </h4>
                        <p className="text-gray-600">{item.value}</p>
                      </div>
                    </motion.a>
                  );
                })}
              </div>

              {/* Quick Actions */}
              <motion.div
                className="bg-gradient-to-br from-[#778259] to-[#8c9d75] rounded-2xl p-8 text-white"
                variants={fadeInUp}
              >
                <h4 className="font-heading text-xl font-bold mb-4">
                  Quick Actions
                </h4>
                <div className="space-y-4">
                  <motion.a
                    href="https://wa.me/919944991358"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center space-x-3 bg-white/20 rounded-lg p-3 hover:bg-white/30 transition-colors"
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span>Commission Inquiry</span>
                  </motion.a>
                  <motion.a
                    href="https://whatsapp.com/channel/0029Vb6kVtK3mFY6Gdm0sF3S"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center space-x-3 bg-white/20 rounded-lg p-3 hover:bg-white/30 transition-colors"
                  >
                    <MapPin className="h-5 w-5" />
                    <span>Workshop Information</span>
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={fadeInUp}>
              <h3 className="font-heading text-2xl font-bold text-gray-900 mb-8">
                Send a Message
              </h3>

              <motion.form
                onSubmit={handleSubmit}
                className="space-y-6 mb-12"
                variants={staggerContainer}
              >
                <motion.div variants={fadeInUp}>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Name
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#778259] focus:border-transparent transition-all"
                    placeholder="Enter your name"
                  />
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Message
                  </label>
                  <motion.textarea
                    whileFocus={{ scale: 1.02 }}
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#778259] focus:border-transparent transition-all resize-none"
                    placeholder="Tell me about your project or ask any questions..."
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-[#778259] to-[#8c9d75] text-white py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:shadow-lg transition-all"
                >
                  <Send className="h-5 w-5" />
                  <span>Send Message</span>
                </motion.button>
              </motion.form>

              {/* Quick Answers Section */}
              <motion.div
                className="bg-gray-50 rounded-2xl p-8"
                variants={fadeInUp}
              >
                <div className="flex items-center space-x-3 mb-6">
                  <HelpCircle className="h-6 w-6 text-[#778259]" />
                  <h4 className="font-heading text-xl font-bold text-gray-900">
                    Quick Answers
                  </h4>
                </div>
                <div className="space-y-4">
                  {quickAnswers.map((qa, index) => (
                    <motion.div
                      key={index}
                      variants={fadeInUp}
                      className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0"
                    >
                      <h5 className="font-semibold text-gray-900 mb-2">
                        {qa.question}
                      </h5>
                      <p className="text-gray-600 text-sm">
                        {qa.answer}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.p
                className="text-sm text-gray-500 mt-4 text-center"
                variants={fadeInUp}
              >
                I typically respond within 24 hours. For urgent inquiries, please use WhatsApp.
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;