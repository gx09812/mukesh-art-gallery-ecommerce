import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ArrowLeft, Send, MessageCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { fadeInUp, staggerContainer } from '../utils/motion';

const API = "http://localhost:5000/reviews";

const ReviewsPage = () => {
  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    name: '',
    review: '',
    rating: 0,
  });

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchReviews = async () => {
    const res = await fetch(API);
    const data = await res.json();
    if (data.success) setReviews(data.reviews);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.rating === 0) return;

    setLoading(true);

    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    const data = await res.json();

    if (data.success) {
      setFormData({ name: '', review: '', rating: 0 });
      navigate('/');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div variants={staggerContainer} initial="hidden" animate="show">

          <motion.div variants={fadeInUp} className="mb-8">
            <Link to="/" className="flex items-center gap-2 text-[#778259]">
              <ArrowLeft size={18} /> Back to Home
            </Link>
          </motion.div>

          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              Share Your <span className="text-[#778259]">Review</span>
            </h1>
            <p className="text-gray-600">
              Your feedback helps others discover my artwork.
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="bg-white p-8 rounded-2xl shadow-lg mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <MessageCircle className="text-[#778259]" /> Write a Review
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full border px-4 py-3 rounded-xl"
              />

              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.button
                    key={star}
                    type="button"
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setFormData({ ...formData, rating: star })}
                  >
                    <Star
                      className={`w-7 h-7 ${
                        star <= formData.rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  </motion.button>
                ))}
              </div>

              <textarea
                rows={5}
                placeholder="Write your experience..."
                value={formData.review}
                onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                required
                className="w-full border px-4 py-3 rounded-xl resize-none"
              />

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={loading || !formData.name || !formData.review || formData.rating === 0}
                className="w-full bg-[#778259] text-white py-4 rounded-xl font-semibold disabled:opacity-50"
              >
                <Send className="inline mr-2" size={18} />
                {loading ? "Posting..." : "Post Review"}
              </motion.button>
            </form>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
};

export default ReviewsPage;
