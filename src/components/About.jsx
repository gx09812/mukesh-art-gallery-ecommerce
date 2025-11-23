// src/components/About.jsx

import { motion } from 'framer-motion';
import { Palette, Eye, Users, Award, Brush, Heart, User } from 'lucide-react'; // Added User icon for the Section title
import { fadeInUp, staggerContainer, fadeInLeft, fadeInRight } from '../utils/motion'; // Ensure all motion variants are imported
import { Section } from '../utils/utils'; // Reusable Section component

const About = () => {
    const skills = [
        {
            title: 'Portrait Drawing',
            description: 'Capturing emotions and personality in detailed portraits',
            icon: Users
        },
        {
            title: 'Realistic Sketching',
            description: 'Creating lifelike representations with precision',
            icon: Eye
        },
        {
            title: 'Detail Work',
            description: 'Intricate attention to textures and fine details',
            icon: Award
        },
        {
            title: 'Custom Commissions',
            description: 'Personalized artwork for special occasions',
            icon: Palette
        },
        {
            title: 'Shading Techniques',
            description: 'Advanced light and shadow manipulation',
            icon: Brush
        }
    ];

    return (
        // Use the reusable Section component for consistent padding, title, and anchor ID
        <Section 
            id="about" 
            title="Meet the Artist" // This title is now redundant if you define H2 inside, so you can remove it OR update the H2 below. I'll keep the H2 and remove the Section title.
            icon={User} // The main User icon
            className="bg-white"
        >
            <motion.div
                className="grid lg:grid-cols-2 gap-16 items-center"
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
            >
                {/* Left Content */}
                <motion.div variants={fadeInLeft}> {/* Changed from fadeInUp to fadeInLeft as you used it */}
                    {/* The Section component already provides a centered title, 
                        so this inner H2 might be redundant or needs adjustment: */}
                    <motion.h2
                        className="font-heading text-4xl lg:text-5xl font-bold text-gray-900 mb-8"
                        variants={fadeInUp} // Changed to fadeInUp for internal animation
                    >
                        About <span className="text-[#778259]">My Journey</span>
                    </motion.h2>

                    <motion.div className="space-y-6 text-gray-600 text-lg leading-relaxed" variants={fadeInUp}>
                        <p>
                            Welcome to my artistic world! I'm Mukesh Pandian, a passionate pencil sketch artist who believes in capturing the essence of life through detailed graphite artistry.
                        </p>

                        <p>
                            My journey began with a simple fascination for the interplay of light and shadow. What started as childhood doodles has evolved into a deep commitment to creating meaningful art that resonates with people's hearts.
                        </p>

                        <p>
                            I specialize in <span className="text-[#8c9d75] font-semibold">custom commission work</span>, bringing your cherished memories and loved ones to life on paper. Each piece is crafted with meticulous attention to detail and genuine care.
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-3 gap-6 mt-12"
                        variants={fadeInUp}
                    >
                        {/* 3 Callout Boxes */}
                        {/* ... (Content for 3 Callout Boxes) ... */}
                        <div className="text-center">
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                className="w-16 h-16 bg-[#778259] rounded-full flex items-center justify-center mx-auto mb-3"
                            >
                                <Palette className="h-8 w-8 text-white" />
                            </motion.div>
                            <h3 className="font-semibold text-gray-900">Artistic Vision</h3>
                            <p className="text-sm text-gray-600 mt-1">Bringing stories to life</p>
                        </div>
                        <div className="text-center">
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                className="w-16 h-16 bg-[#8c9d75] rounded-full flex items-center justify-center mx-auto mb-3"
                            >
                                <Heart className="h-8 w-8 text-white" />
                            </motion.div>
                            <h3 className="font-semibold text-gray-900">Passion</h3>
                            <p className="text-sm text-gray-600 mt-1">Every stroke matters</p>
                        </div>
                        <div className="text-center">
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                className="w-16 h-16 bg-[#778259] rounded-full flex items-center justify-center mx-auto mb-3"
                            >
                                <Users className="h-8 w-8 text-white" />
                            </motion.div>
                            <h3 className="font-semibold text-gray-900">Community</h3>
                            <p className="text-sm text-gray-600 mt-1">Building connections</p>
                        </div>
                    </motion.div>

                    {/* Skills & Specialization Section */}
                    <motion.div
                        className="mt-16"
                        variants={fadeInUp}
                    >
                        <h3 className="font-heading text-3xl font-bold text-gray-900 mb-8 text-center">
                            Skills & <span className="text-[#778259]">Specialization</span>
                        </h3>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {skills.map((skill, index) => {
                                const IconComponent = skill.icon;
                                return (
                                    <motion.div
                                        key={index}
                                        variants={fadeInUp}
                                        custom={index}
                                        whileHover={{ y: -5, scale: 1.02 }}
                                        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 group"
                                    >
                                        <motion.div
                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                            className="w-14 h-14 bg-gradient-to-br from-[#778259] to-[#8c9d75] rounded-xl flex items-center justify-center mb-4"
                                        >
                                            <IconComponent className="h-7 w-7 text-white" />
                                        </motion.div>

                                        <h4 className="font-heading text-xl font-semibold text-gray-900 mb-3 group-hover:text-[#778259] transition-colors">
                                            {skill.title}
                                        </h4>

                                        <p className="text-gray-600 text-sm leading-relaxed">
                                            {skill.description}
                                        </p>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                </motion.div>

                {/* Right Content - Artist Photo Placeholder */}
                <motion.div
                    variants={fadeInRight} // Changed from fadeInUp to fadeInRight
                    className="relative"
                >
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                        className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-8 shadow-xl"
                    >
                        <div className="aspect-[4/5] bg-white rounded-xl flex items-center justify-center">
                            <div className="text-center text-gray-500">
                                <div className="w-32 h-32 mx-auto mb-4 bg-gray-300 rounded-full flex items-center justify-center">
                                    <span className="text-5xl">👨‍🎨</span>
                                </div>
                                <p className="text-lg font-medium">Artist Photo</p>
                                <p className="text-sm">Photo of me drawing will be added here</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Decorative Elements */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute -top-6 -right-6 w-20 h-20 border-4 border-[#778259] rounded-full opacity-20"
                    />
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="absolute -bottom-4 -left-4 w-16 h-16 border-4 border-[#8c9d75] rounded-full opacity-30"
                    />
                </motion.div>
            </motion.div>
        </Section>
    );
};

export default About;