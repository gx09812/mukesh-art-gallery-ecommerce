import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ArrowLeft, Send, Heart, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fadeInUp, staggerContainer } from '../utils/motion';

const ReviewsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    review: '',
    rating: 0
  });
  const [hoveredStar, setHoveredStar] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Review submitted:', formData);
    setSubmitted(true);
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({ name: '', review: '', rating: 0 });
      setSubmitted(false);
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleStarClick = (rating) => {
    setFormData({ ...formData, rating });
  };

  const existingReviews = [
    {
      id: 1,
      name: 'Sarah Johnson',
      rating: 5,
      review: 'Absolutely stunning work! Mukesh captured every detail perfectly in my family portrait. The attention to detail and emotional depth is incredible.',
      date: '2 weeks ago',
      verified: true
    },
    {
      id: 2,
      name: 'Raj Patel',
      rating: 5,
      review: 'Amazing artist! The memorial portrait he created of my grandfather brought tears to my eyes. Highly recommend his work.',
      date: '1 month ago',
      verified: true
    },
    {
      id: 3,
      name: 'Emily Chen',
      rating: 4,
      review: 'Beautiful artwork and great communication throughout the process. Very professional and delivered on time.',
      date: '3 weeks ago',
      verified: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
            <h1 className="font-heading text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Share Your <span className="text-[#778259]">Experience</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your feedback helps me improve and helps others discover my artwork. Thank you for taking the time to share!
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Review Form */}
            <motion.div variants={fadeInUp}>
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="font-heading text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
                  <MessageCircle className="h-6 w-6 text-[#778259]" />
                  <span>Write a Review</span>
                </h2>

                {submitted ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.5 }}
                      className="text-6xl mb-4"
                    >
                      🎉
                    </motion.div>
                    <h3 className="font-heading text-2xl font-bold text-gray-900 mb-2">
                      Thank You!
                    </h3>
                    <p className="text-gray-600">
                      Your review has been submitted successfully.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Field */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#778259] focus:border-transparent transition-all"
                        placeholder="Enter your name"
                      />
                    </div>

                    {/* Star Rating */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Your Rating *
                      </label>
                      <div className="flex space-x-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <motion.button
                            key={star}
                            type="button"
                            onClick={() => handleStarClick(star)}
                            onMouseEnter={() => setHoveredStar(star)}
                            onMouseLeave={() => setHoveredStar(0)}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            className="focus:outline-none"
                          >
                            <Star
                              className={`h-8 w-8 transition-colors ${
                                star <= (hoveredStar || formData.rating)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          </motion.button>
                        ))}
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        {formData.rating === 0 && 'Please select a rating'}
                        {formData.rating === 1 && 'Poor'}
                        {formData.rating === 2 && 'Fair'}
                        {formData.rating === 3 && 'Good'}
                        {formData.rating === 4 && 'Very Good'}
                        {formData.rating === 5 && 'Excellent'}
                      </p>
                    </div>

                    {/* Review Field */}
                    <div>
                      <label htmlFor="review" className="block text-sm font-semibold text-gray-700 mb-2">
                        Your Review *
                      </label>
                      <textarea
                        id="review"
                        name="review"
                        value={formData.review}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#778259] focus:border-transparent transition-all resize-none"
                        placeholder="Share your experience with my artwork or service..."
                      />
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={!formData.name || !formData.review || formData.rating === 0}
                      className="w-full bg-gradient-to-r from-[#778259] to-[#8c9d75] text-white py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="h-5 w-5" />
                      <span>Submit Review</span>
                    </motion.button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Existing Reviews */}
            <motion.div variants={fadeInUp}>
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
                <Heart className="h-6 w-6 text-red-500" />
                <span>Recent Reviews</span>
              </h2>

              <div className="space-y-6">
                {existingReviews.map((review, index) => (
                  <motion.div
                    key={review.id}
                    variants={fadeInUp}
                    custom={index}
                    className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#778259] to-[#8c9d75] rounded-full flex items-center justify-center text-white font-bold">
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 flex items-center space-x-2">
                            <span>{review.name}</span>
                            {review.verified && (
                              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                                ✓ Verified
                              </span>
                            )}
                          </h4>
                          <p className="text-sm text-gray-500">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{review.review}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ReviewsPage;