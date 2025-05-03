import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import MeetSection from './components/MeetSection';
import FeaturesSection from './components/FeaturesSection';
import FaqSection from './components/FaqSection';
import CtaSection from './components/CtaSection';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OurStory from './pages/OurStory';
import Team from './pages/Team';
import Careers from './pages/Careers';
import Blog from './pages/Blog';

function App() {
  useEffect(() => {
    document.title = 'Replika - The AI companion who cares';
  }, []);

  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/our-story" element={<OurStory />} />
          <Route path="/team" element={<Team />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/blog" element={<Blog />} />

        </Routes>
        <MeetSection />
        <FeaturesSection />
        <FaqSection />
        <CtaSection />
        <Footer />
      </div>
    </Router>
  );
}

export default App;