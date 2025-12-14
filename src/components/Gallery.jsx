import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Eye, Heart, X } from "lucide-react";
import { fadeInUp, staggerContainer } from "../utils/motion";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:5000";

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [artworks, setArtworks] = useState([]);
  const [fullView, setFullView] = useState(null); // selected image for full view

  const categories = [
    { id: "all", name: "All Works" },
    { id: "gallery_portrait", name: "Portraits" },
    { id: "gallery_creative", name: "Creative Art" },
    { id: "gallery_spiritual", name: "Spiritual" }
  ];

  useEffect(() => {
    const url =
      activeCategory === "all"
        ? `${API_URL}/gallery`
        : `${API_URL}/gallery?category=${activeCategory}`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setArtworks(data.artworks);
        }
      })
      .catch(err => console.error("Gallery fetch error:", err));
  }, [activeCategory]);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header and Categories */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.div className="text-center mb-14" variants={fadeInUp}>
            <h2 className="text-4xl font-bold text-gray-900">
              My <span className="text-[#778259]">Artwork Gallery</span>
            </h2>
            <p className="text-gray-600 mt-3">
              Explore my pencil sketches and creative artworks
            </p>
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-12"
            variants={fadeInUp}
          >
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-3 rounded-full transition ${
                  activeCategory === cat.id
                    ? "bg-[#778259] text-white"
                    : "bg-white border hover:bg-[#778259] hover:text-white"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </motion.div>

          {/* Gallery Grid */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
          >
            {artworks.slice(0, 6).map((art, i) => (
              <motion.div
                key={art.id}
                variants={fadeInUp}
                custom={i}
                whileHover={{ y: -6 }}
                className="bg-white rounded-xl shadow overflow-hidden group cursor-pointer"
                onClick={() => setFullView(art)} // open full view modal
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={
                      art.image_path
                        ? `${API_URL}${art.image_path}`
                        : "/no-image.png"
                    }
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition"
                  />

                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-4 transition">
                    <span className="p-3 bg-white rounded-full">
                      <Eye size={18} />
                    </span>
                    <span className="p-3 bg-white rounded-full">
                      <Heart size={18} />
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-semibold">{art.title}</h3>
                  <p className="text-sm text-gray-500 capitalize">
                    {art.category.replace("gallery_", "")}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* View More Button */}
          <motion.div className="text-center mt-12" variants={fadeInUp}>
            <Link to="/gallery">
              <button className="bg-[#778259] text-white px-8 py-4 rounded-full hover:bg-[#8c9d75]">
                View Complete Gallery
              </button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Full View Modal */}
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
      </div>
    </section>
  );
};

export default Gallery;
