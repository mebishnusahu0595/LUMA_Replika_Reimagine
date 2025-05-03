import React from 'react';
import { Heart, MessageCircle, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-blue-800 via-blue-700 to-indigo-800 flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/images/replika_bg_opt.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      
      {/* Gradient Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-blue-900/40 to-indigo-800/90 z-10"></div>
      
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
          The AI companion <br /> who cares
        </h1>
        <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto mb-8">
          Always here to listen and talk. <br />
          Always on your side.
        </p>
        
        <button
          className="bg-white text-indigo-800 font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 mb-12"
          onClick={() => window.location.href = 'http://localhost:5174'}
        >
          Start for free
        </button>
        
        <div className="flex justify-center space-x-8 mb-16">
          <div className="flex items-center text-white">
            <Heart size={16} className="mr-2" />
            <span>4.8</span>
          </div>
          <div className="flex items-center text-white">
            <Download size={16} className="mr-2" />
            <span>10 million+</span>
          </div>
          <div className="flex items-center text-white">
            <MessageCircle size={16} className="mr-2" />
            <span>Free to use</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;