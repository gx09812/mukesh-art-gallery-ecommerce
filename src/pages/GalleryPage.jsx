// src/pages/GalleryPage.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Eye, Heart, ArrowLeft, X } from "lucide-react";
import { Link } from "react-router-dom";
import { fadeInUp, staggerContainer } from "../utils/motion";

const API_URL = "http://localhost:5000";

const categories = [
  { id: "all", name: "All Works" },
  { id: "gallery_portrait", name: "Portraits" },
  { id: "gallery_creative", name: "Creative Art" },
  { id: "gallery_spiritual", name: "Spiritual Works" }
];

const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [artworks, setArtworks] = useState([]);
  const [fullView, setFullView] = useState(null); // holds clicked artwork

  // 🔹 Fetch from backend
  useEffect(() => {
    const url =
      activeCategory === "all"
        ? `${API_URL}/gallery`
        : `${API_URL}/gallery?category=${activeCategory}`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setArtworks(
          data.success
            ? data.artworks.map(a => ({ ...a, liked: false })) // add liked state
            : []
        );
      })
      .catch(() => setArtworks([]));
  }, [activeCategory]);

  // Toggle heart like
  const toggleLike = id => {
    setArtworks(prev =>
      prev.map(a =>
        a.id === id ? { ...a, liked: !a.liked } : a
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div variants={staggerContainer} initial="hidden" animate="show">

  

          {/* 🖼 Header */}
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-4">
              Complete <span className="text-[#778259]">Gallery</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore my complete collection of pencil sketches and artworks
            </p>
          </motion.div>

          {/* 🧭 Categories */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap justify-center gap-4 mb-14"
          >
            {categories.map(cat => (
              <motion.button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === cat.id
                    ? "bg-[#778259] text-white shadow-lg"
                    : "bg-white border text-gray-700 hover:bg-[#778259] hover:text-white"
                }`}
              >
                {cat.name}
              </motion.button>
            ))}
          </motion.div>

          {/* 🖼 Gallery Grid */}
          <motion.div
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {artworks.map((art, index) => (
              <motion.div
                key={`${art.id}-${art.image_path}`}
                variants={fadeInUp}
                custom={index}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden group cursor-pointer"
                onClick={() => setFullView(art)}
              >
                {/* Image with blur placeholder */}
                <div className="relative aspect-square overflow-hidden bg-gray-200">
                  {/* Placeholder */}
                  <img
                    src={`${API_URL}${art.placeholder_path || art.image_path}`}
                    alt={art.title}
                    className="absolute inset-0 w-full h-full object-cover filter blur-sm scale-105 transition duration-500"
                  />

                  {/* Main Image */}
                  <img
                    src={`${API_URL}${art.image_path}`}
                    alt={art.title}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-700"
                    onLoad={e => (e.currentTarget.style.opacity = 1)}
                  />

                  {/* Hover Overlay */}
                  <div className="
                    absolute inset-0 bg-black/50
                    opacity-0 group-hover:opacity-100
                    flex items-center justify-center gap-4
                    transition
                  ">
                    <button className="p-3 bg-white rounded-full hover:bg-[#778259] hover:text-white">
                      <Eye size={18} />
                    </button>
                    <button
                      className={`p-3 rounded-full transition ${
                        art.liked
                          ? "bg-[#af3412] text-white"
                          : "bg-white hover:bg-[#8c9d75] hover:text-white"
                      }`}
                      onClick={e => {
                        e.stopPropagation();
                        toggleLike(art.id);
                      }}
                    >
                      <Heart size={18} />
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900">{art.title}</h3>
                  <p className="text-sm text-gray-500 capitalize">
                    {art.category?.replace("gallery_", "")}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* ❌ Empty */}
          {artworks.length === 0 && (
            <p className="text-center text-gray-500 mt-16">
              No artworks found in this category.
            </p>
          )}

          {/* 🔹 Full View Modal */}
          {fullView && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
              <button
                className="absolute top-4 right-4 text-white p-2 rounded-full hover:bg-white/20 transition"
                onClick={() => setFullView(null)}
              >
                <X size={24} />
              </button>
              <img
                src={`${API_URL}${fullView.image_path}`}
                alt={fullView.title}
                className="max-h-full max-w-full object-contain rounded-lg shadow-lg"
              />
            </div>
          )}

        </motion.div>
      </div>
    </div>
  );
};

export default GalleryPage;
