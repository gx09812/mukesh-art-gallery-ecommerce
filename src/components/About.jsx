// src/components/About.jsx

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Palette, Eye, Users, Award, Brush, Heart, User } from "lucide-react";
import { fadeInUp, staggerContainer, fadeInLeft, fadeInRight } from "../utils/motion";
import { Section } from "../utils/utils";

const About = () => {

    // Load Artist Image From Backend
    const [artistImage, setArtistImage] = useState("");

    useEffect(() => {
        fetch("http://localhost:5000/get/articles")
            .then(res => res.json())
            .then(data => {
                if (data.success && data.image_path) {
                    setArtistImage("http://localhost:5000" + data.image_path);
                }
            })
            .catch(err => console.error("About image load error", err));
    }, []);

    const skills = [
        {
            title: "Portrait Drawing",
            description: "Capturing emotions and personality in detailed portraits",
            icon: Users
        },
        {
            title: "Realistic Sketching",
            description: "Creating lifelike representations with precision",
            icon: Eye
        },
        {
            title: "Detail Work",
            description: "Intricate attention to textures and fine details",
            icon: Award
        },
        {
            title: "Custom Commissions",
            description: "Personalized artwork for special occasions",
            icon: Palette
        },
        {
            title: "Shading Techniques",
            description: "Advanced light and shadow manipulation",
            icon: Brush
        }
    ];

    return (
        <Section
            id="about"
            title="Meet the Artist"
            icon={User}
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
                <motion.div variants={fadeInLeft}>
                    <motion.h2
                        className="font-heading text-4xl lg:text-5xl font-bold text-gray-900 mb-8"
                        variants={fadeInUp}
                    >
                        About <span className="text-[#778259]">My Journey</span>
                    </motion.h2>

                    <motion.div className="space-y-6 text-gray-600 text-lg leading-relaxed" variants={fadeInUp}>
                        <p>Welcome to my artistic world! Hi, I’m Mukesh Pandian — a pencil realism artist who loves turning memories into meaningful art.</p>
                        <p>Art has been a part of my life since childhood. What started as simple doodles grew into a passion for light, shadow, and emotion. Today, I create artwork that tells stories and holds personal value.</p>
                        <p>I specialize in custom portraits, capturing cherished moments with emotion and detail.</p>

                        <h1 className="font-bold text-gray-800 text-2xl">What I Believe In</h1>
                    </motion.div>

                    <motion.div className="grid grid-cols-3 gap-6 mt-12" variants={fadeInUp}>
                        <div className="text-center">
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                className="w-16 h-16 bg-[#778259] rounded-full flex items-center justify-center mx-auto mb-3"
                            >
                                <Palette className="h-8 w-8 text-white" />
                            </motion.div>
                            <h3 className="font-semibold text-gray-900">Artistic Vision</h3>
                            <p className="text-sm text-gray-600 mt-1">Art should speak, even without words</p>
                        </div>

                        <div className="text-center">
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                className="w-16 h-16 bg-[#8c9d75] rounded-full flex items-center justify-center mx-auto mb-3"
                            >
                                <Heart className="h-8 w-8 text-white" />
                            </motion.div>
                            <h3 className="font-semibold text-gray-900">Passion</h3>
                            <p className="text-sm text-gray-600 mt-1">Every line and shade matters</p>
                        </div>

                        <div className="text-center">
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                className="w-16 h-16 bg-[#778259] rounded-full flex items-center justify-center mx-auto mb-3"
                            >
                                <Users className="h-8 w-8 text-white" />
                            </motion.div>
                            <h3 className="font-semibold text-gray-900">Community</h3>
                            <p className="text-sm text-gray-600 mt-1">Art grows when shared.</p>
                        </div>
                    </motion.div>

                    {/* Skills */}
                    <motion.div className="mt-16" variants={fadeInUp}>
                        <h3 className="font-heading text-3xl font-bold text-gray-900 mb-8 text-center">
                            Skills & <span className="text-[#778259]">Specialization</span>
                        </h3>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {skills.map((skill, index) => {
                                const Icon = skill.icon;

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
                                            <Icon className="h-7 w-7 text-white" />
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

                {/* Right Image */}
                <motion.div variants={fadeInRight} className="relative">
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                        className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-8 shadow-xl"
                    >
                        <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-xl bg-white flex items-center justify-center">

                            {artistImage ? (
                                <img
                                    src={artistImage}
                                    alt="Artist"
                                    className="w-full h-full object-cover rounded-xl"
                                />
                            ) : (
                                <div className="text-center text-gray-500">
                                    <div className="w-32 h-32 mx-auto mb-4 bg-gray-300 rounded-full flex items-center justify-center">
                                        <span className="text-5xl">👨‍🎨</span>
                                    </div>
                                    <p className="text-lg font-medium">Artist Photo</p>
                                    <p className="text-sm">Photo will be added soon</p>
                                </div>
                            )}

                        </div>
                    </motion.div>

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
