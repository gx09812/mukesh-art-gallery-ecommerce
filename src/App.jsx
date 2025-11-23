import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Gallery from './components/Gallery';
import Community from './components/Community';
import FreeGift from './components/FreeGift';
import Commissions from './components/Commissions';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import GalleryPage from './pages/GalleryPage';
import ReviewsPage from './pages/ReviewsPage';
import { LoginScreen, AddPicPage } from './pic/addpic';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white text-gray-800 font-body">
        <Navbar />

        <Routes>
          <Route path="/" element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Hero />
              <About />
              <Gallery />
              <Community />
              <FreeGift />
              <Commissions />
              <Testimonials />
              <Contact />
            </motion.div>
          } />

          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/commissions" element={<Commissions />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/free-gift" element={<FreeGift />} />

          <Route path="/admin/login" element={<LoginScreen />} />
		  <Route path="/admin/addpic" element={<AddPicPage />} />

        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
