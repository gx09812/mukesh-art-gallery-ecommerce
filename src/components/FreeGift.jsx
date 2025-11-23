import { motion } from 'framer-motion';
import { Download, Gift, Star, Heart } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../utils/motion';

const FreeGift = () => {
  return (
    <section id="gift-section" className="py-20 bg-white relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#778259]/5 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            y: [20, -20, 20],
            x: [10, -10, 10]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-[#8c9d75]/5 rounded-full blur-xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {/* Header */}
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatDelay: 3
              }}
              className="text-6xl mb-6"
            >
              🎁
            </motion.div>
            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              A <span className="text-[#778259]">Gift</span> For You
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              As a thank you for visiting my portfolio, I'm offering a free PDF artwork download. 
              Take a piece of my art with you!
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div variants={fadeInUp}>
              <motion.div 
                className="bg-gradient-to-br from-[#778259] to-[#8c9d75] rounded-3xl p-8 text-white relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
              >
                {/* Decorative Elements */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-4 -right-4 w-16 h-16 border-2 border-white/30 rounded-full"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="absolute -bottom-4 -left-4 w-12 h-12 border-2 border-white/30 rounded-full"
                />

                <div className="relative z-10">
                  <div className="flex items-center space-x-3 mb-6">
                    <Gift className="h-8 w-8" />
                    <h3 className="font-heading text-2xl font-bold">Free Artwork PDF</h3>
                  </div>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center space-x-3">
                      <Star className="h-5 w-5 text-yellow-300" />
                      <span>High-quality digital artwork</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Star className="h-5 w-5 text-yellow-300" />
                      <span>Perfect for printing and framing</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Star className="h-5 w-5 text-yellow-300" />
                      <span>Exclusive artwork not available elsewhere</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Heart className="h-5 w-5 text-red-300" />
                      <span>Created with love and attention to detail</span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-white text-[#778259] py-4 rounded-xl font-bold flex items-center justify-center space-x-3 hover:bg-gray-100 transition-all shadow-lg"
                  >
                    <Download className="h-5 w-5" />
                    <span>Download Free PDF</span>
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Content - Preview */}
            <motion.div variants={fadeInUp}>
              <motion.div
                whileHover={{ scale: 1.02, rotateY: 5 }}
                className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-8 shadow-xl relative"
              >
                <div className="aspect-[3/4] bg-white rounded-xl flex items-center justify-center relative overflow-hidden">
                  {/* Placeholder for artwork preview */}
                  <div className="text-center text-gray-500">
                    <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-[#778259] to-[#8c9d75] rounded-2xl flex items-center justify-center">
                      <span className="text-5xl text-white">🎨</span>
                    </div>
                    <h4 className="text-xl font-heading font-bold text-gray-800 mb-2">Exclusive Artwork</h4>
                    <p className="text-gray-600">Preview of the free PDF artwork</p>
                  </div>
                  
                  {/* Floating Elements */}
                  <motion.div
                    animate={{ y: [-5, 5, -5] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-4 right-4 w-6 h-6 bg-[#778259]/20 rounded-full"
                  />
                  <motion.div
                    animate={{ y: [5, -5, 5] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-4 left-4 w-4 h-4 bg-[#8c9d75]/20 rounded-full"
                  />
                </div>
                
                {/* Badge */}
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-4 -left-4 bg-[#778259] text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center space-x-2"
                >
                  <Gift className="h-4 w-4" />
                  <span>FREE</span>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          {/* Additional Info */}
          <motion.div 
            className="text-center mt-16 bg-gray-50 rounded-2xl p-8"
            variants={fadeInUp}
          >
            <h4 className="font-heading text-2xl font-bold text-gray-900 mb-4">
              Why I'm Offering This Gift
            </h4>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Art should be accessible to everyone. This free artwork is my way of sharing the joy of pencil sketching 
              with you and saying thank you for supporting independent artists like me.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FreeGift;