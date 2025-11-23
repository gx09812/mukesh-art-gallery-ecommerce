import { motion } from 'framer-motion';
import { Users, Calendar, Bell, Gift } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../utils/motion';

const Community = () => {
  const features = [
    {
      icon: Users,
      title: 'Community',
      description: 'Join fellow art enthusiasts',
      link: 'https://whatsapp.com/channel/0029Vb6kVtK3mFY6Gdm0sF3S'
    },
    {
      icon: Calendar,
      title: 'Workshop Information',
      description: 'Learn pencil sketching techniques',
      link: 'https://whatsapp.com/channel/0029Vb6kVtK3mFY6Gdm0sF3S'
    },
    {
      icon: Bell,
      title: 'Updates',
      description: 'Get notified about new artworks',
      link: 'https://whatsapp.com/channel/0029Vb6kVtK3mFY6Gdm0sF3S'
    },
    {
      icon: Gift,
      title: 'Free Access',
      description: 'Exclusive content and resources',
      link: '#gift-section'
    }
  ];

  const scrollToGiftSection = () => {
    const giftSection = document.getElementById('gift-section');
    if (giftSection) {
      giftSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-[#778259] to-[#8c9d75] text-white relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-20 -right-20 w-40 h-40 border-2 border-white/20 rounded-full"
        />
        <motion.div
          animate={{
            rotate: -360,
            scale: [1.2, 1, 1.2]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-20 -left-20 w-60 h-60 border-2 border-white/20 rounded-full"
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
              🎉
            </motion.div>
            <h2 className="font-heading text-4xl lg:text-5xl font-bold mb-6">
              Free Workshop <span className="text-yellow-300">Coming Soon!</span>
            </h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Join my WhatsApp channel to get updates and free access to exclusive content, tutorials, and workshop announcements!
            </p>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
          >
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              const isGiftSection = feature.title === 'Free Access';

              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  custom={index}
                  whileHover={{ y: -10, scale: 1.05 }}
                  className="text-center group cursor-pointer"
                  onClick={isGiftSection ? scrollToGiftSection : undefined}
                >
                  {isGiftSection ? (
                    <div>
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-white/30 transition-all"
                      >
                        <IconComponent className="h-10 w-10" />
                      </motion.div>
                      <h3 className="font-heading text-xl font-bold mb-3">{feature.title}</h3>
                      <p className="opacity-80 group-hover:opacity-100 transition-opacity">
                        {feature.description}
                      </p>
                    </div>
                  ) : (
                    <motion.a
                      href={feature.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-white/30 transition-all"
                      >
                        <IconComponent className="h-10 w-10" />
                      </motion.div>
                      <h3 className="font-heading text-xl font-bold mb-3">{feature.title}</h3>
                      <p className="opacity-80 group-hover:opacity-100 transition-opacity">
                        {feature.description}
                      </p>
                    </motion.a>
                  )}
                </motion.div>
              );
            })}
          </motion.div>

          {/* Call to Action */}
          <motion.div className="text-center mt-16" variants={fadeInUp}>
            <motion.a
              href="https://whatsapp.com/channel/0029Vb6kVtK3mFY6Gdm0sF3S"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-3 bg-white text-[#778259] px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all shadow-lg"
            >
              <span>💬</span>
              <span>Join WhatsApp Channel</span>
            </motion.a>
            <motion.p
              className="mt-4 text-sm opacity-80"
              variants={fadeInUp}
            >
              Get instant updates about workshops, new artworks, and exclusive content!
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Community;