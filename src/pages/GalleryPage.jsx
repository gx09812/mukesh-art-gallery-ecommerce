import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, Heart, ArrowLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { fadeInUp, staggerContainer } from '../utils/motion';

const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [showAllArtworks, setShowAllArtworks] = useState(false);
  const location = useLocation();

  // Auto-select category based on URL or default to 'all'
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const category = urlParams.get('category');
    if (category && ['all', 'portraits', 'creative', 'special'].includes(category)) {
      setActiveCategory(category);
    } else {
      setActiveCategory('all');
    }
  }, [location]);

  const categories = [
    { id: 'all', name: 'All Works' },
    { id: 'portraits', name: 'Portraits' },
    { id: 'creative', name: 'Creative Art' },
    { id: 'special', name: 'Special Commission' }
  ];

  const artworks = [
    {
      id: 1,
      title: 'Portrait Study #1',
      category: 'portraits',
      description: 'Detailed pencil portrait capturing emotion and character'
    },
    {
      id: 2,
      title: 'Creative Expression',
      category: 'creative',
      description: 'Abstract artistic interpretation with pencil techniques'
    },
    {
      id: 3,
      title: 'Special Commission Work #1',
      category: 'special',
      description: 'Custom artwork created for special occasion'
    },
    {
      id: 4,
      title: 'Portrait Study #2',
      category: 'portraits',
      description: 'Realistic portrait showcasing advanced shading techniques'
    },
    {
      id: 5,
      title: 'Artistic Vision',
      category: 'creative',
      description: 'Creative composition exploring light and shadow'
    },
    {
      id: 6,
      title: 'Special Commission Work #2',
      category: 'special',
      description: 'Heartfelt tribute artwork with emotional depth'
    },
    {
      id: 7,
      title: 'Family Portrait',
      category: 'portraits',
      description: 'Beautiful family composition with intricate details'
    },
    {
      id: 8,
      title: 'Nature Study',
      category: 'creative',
      description: 'Detailed study of natural forms and textures'
    },
    {
      id: 9,
      title: 'Special Commission Work #3',
      category: 'special',
      description: 'Romantic couple portrait for anniversary celebration'
    }
  ];

  const filteredArtworks = activeCategory === 'all'
    ? artworks
    : artworks.filter(artwork => artwork.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          {/* Back Button */}
          <motion.div className="mb-8" variants={fadeInUp}>
            <Link
              to="/"
              className="inline-flex items-center space-x-2 text-[#778259] hover:text-[#8c9d75] transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h1 className="font-heading text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Complete <span className="text-[#778259]">Gallery</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore my complete collection of pencil sketches, from detailed portraits to creative artistic expressions
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-12"
            variants={fadeInUp}
          >
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  activeCategory === category.id
                    ? 'bg-[#778259] text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-[#778259] hover:text-white border border-gray-200'
                }`}
                data-category={category.id}
              >
                {category.name}
              </motion.button>
            ))}
          </motion.div>

          {/* Special Commission Section */}
          {activeCategory === 'special' && (
            <motion.div
              className="mb-12 p-8 bg-gradient-to-br from-[#778259] to-[#8c9d75] rounded-2xl text-white"
              variants={fadeInUp}
            >
              <h3 className="font-heading text-2xl font-bold mb-4 text-center">
                Special Commission Works
              </h3>
              <p className="text-center text-lg opacity-90 mb-6">
                These are custom artworks created for special occasions, memorials, and personal commissions. Each piece is crafted with care and attention to detail.
              </p>
            </motion.div>
          )}

          {/* Gallery Grid */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
          >
            {filteredArtworks.map((artwork, index) => (
              <motion.div
                key={artwork.id}
                variants={fadeInUp}
                custom={index}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden group cursor-pointer"
              >
                <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
                  {/* Placeholder for artwork image */}
                  <div className="text-center text-gray-500 p-8">
                    <div className="w-24 h-24 mx-auto mb-4 bg-gray-300 rounded-lg flex items-center justify-center">
                      <span className="text-3xl">🎨</span>
                    </div>
                    <p className="font-medium">{artwork.title}</p>
                  </div>

                  {/* Hover Overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-black/50 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      className="p-3 bg-white rounded-full text-gray-800 hover:bg-[#778259] hover:text-white transition-colors"
                    >
                      <Eye className="h-5 w-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      className="p-3 bg-white rounded-full text-gray-800 hover:bg-[#8c9d75] hover:text-white transition-colors"
                    >
                      <Heart className="h-5 w-5" />
                    </motion.button>
                  </motion.div>
                </div>

                <div className="p-6">
                  <h3 className="font-heading text-xl font-semibold text-gray-900 mb-2">
                    {artwork.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {artwork.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Load More Button */}
          <motion.div
            className="text-center mt-16"
            variants={fadeInUp}
          >
            <motion.button
              onClick={() => {
                setShowAllArtworks(true);
                setActiveCategory('all');
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#778259] text-white px-8 py-4 rounded-full font-medium hover:bg-[#8c9d75] transition-colors shadow-lg"
            >
              Load More Artworks
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default GalleryPage;