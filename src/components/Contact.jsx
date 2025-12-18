import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, Phone, Instagram, Youtube, 
  MessageCircle, Send, MapPin, 
  HelpCircle, Upload, CheckCircle2, X
} from 'lucide-react';
import { fadeInUp, staggerContainer } from '../utils/motion';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    message: '',
    attachment: null
  });
  
  const [status, setStatus] = useState({ loading: false, success: false, error: null });
  const [showPopup, setShowPopup] = useState(false); // State for the success popup

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'attachment') {
      setFormData({ ...formData, attachment: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Final check for mandatory fields
    if (!formData.name || !formData.message) {
      setStatus({ ...status, error: "Please fill in all mandatory fields." });
      return;
    }

    setStatus({ loading: true, success: false, error: null });

    const data = new FormData();
    data.append('name', formData.name);
    data.append('message', formData.message);
    
    // Only append image if it exists (Optional)
    if (formData.attachment) {
      data.append('attachment', formData.attachment);
    }

    try {
      const response = await axios.post("http://localhost:5000/contact-telegram", data);

      if (response.data.success) {
        setStatus({ loading: false, success: true, error: null });
        setFormData({ name: '', message: '', attachment: null });
        if (document.getElementById('attachment')) document.getElementById('attachment').value = '';
        
        // Trigger the popup
        setShowPopup(true);
      }
    } catch (err) {
      console.error("Submission Error:", err);
      setStatus({ loading: false, success: false, error: "Failed to send message. Please try again." });
    }
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'mukeshpandian005@gmail.com', href: 'mailto:mukeshpandian005@gmail.com', color: 'from-[#778259] to-[#8c9d75]' },
    { icon: Phone, label: 'Phone', value: '+91 9944991358', href: 'tel:+919944991358', color: 'from-[#8c9d75] to-[#778259]' },
    { icon: Instagram, label: 'Instagram', value: '@mukesh_.arts', href: 'https://instagram.com/mukesh_.arts', color: 'from-[#778259] to-[#8c9d75]' },
  ];

  return (
    <section className="py-20 bg-white relative">
      {/* --- Success Popup Modal --- */}
      <AnimatePresence>
        {showPopup && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
              <p className="text-gray-600 mb-8">
                Your message has been delivered to Telegram. I will get back to you shortly!
              </p>
              <button 
                onClick={() => setShowPopup(false)}
                className="w-full bg-[#778259] text-white py-3 rounded-xl font-bold hover:bg-[#5f6947] transition-colors"
              >
                Awesome!
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}>
          
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Let's <span className="text-[#778259]">Connect</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Left Side: Contact Info */}
            <motion.div variants={fadeInUp} className="space-y-8">
              <h3 className="font-heading text-2xl font-bold text-gray-900">Get in Touch</h3>
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <a key={index} href={item.href} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all group">
                    <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center text-white`}>
                      <item.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{item.label}</h4>
                      <p className="text-gray-600">{item.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Right Side: Contact Form */}
            <motion.div variants={fadeInUp}>
              <div className="bg-white p-2">
                <h3 className="font-heading text-2xl font-bold text-gray-900 mb-8">Send a Message</h3>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name Input - MANDATORY */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required // HTML5 validation
                      placeholder="Jane Doe"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#778259] outline-none transition-all"
                    />
                  </div>

                  {/* Message Input - MANDATORY */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Your Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required // HTML5 validation
                      rows={4}
                      placeholder="Describe the artwork you're interested in..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#778259] outline-none transition-all"
                    />
                  </div>

                  {/* Attachment Upload - OPTIONAL */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Reference Image (Optional)
                    </label>
                    <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-[#778259] transition-colors">
                      <input
                        type="file"
                        id="attachment"
                        name="attachment"
                        onChange={handleChange}
                        accept="image/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="flex items-center justify-center space-x-2 text-gray-500">
                        <Upload className="h-5 w-5" />
                        <span className="truncate max-w-[200px]">
                          {formData.attachment ? formData.attachment.name : "Click to upload image"}
                        </span>
                      </div>
                    </div>
                    {formData.attachment && (
                      <button 
                        type="button" 
                        onClick={() => setFormData({...formData, attachment: null})}
                        className="text-xs text-red-500 mt-2 hover:underline"
                      >
                        Remove image
                      </button>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={status.loading}
                    className={`w-full py-4 rounded-xl font-bold text-white transition-all flex items-center justify-center space-x-2 ${
                      status.loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-[#778259] to-[#8c9d75] hover:shadow-lg'
                    }`}
                  >
                    {status.loading ? (
                      <span className="animate-pulse text-sm">Processing...</span>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        <span>Send via Telegram</span>
                      </>
                    )}
                  </button>

                  {status.error && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-sm bg-red-50 p-3 rounded-lg text-center">
                      {status.error}
                    </motion.div>
                  )}
                </form>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;