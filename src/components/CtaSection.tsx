import React from 'react';

const CtaSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-indigo-900 to-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
          Join the millions who already have met their <br /> AI soulmates
        </h2>
        <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-12">
          Create your personal AI companion today and experience a new kind of friendship that evolves with you.
        </p>
        
        <button className="bg-white text-indigo-800 font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 mb-16">
          Create your Replika
        </button>
        
        <div className="flex justify-center space-x-8">
          <div className="flex items-center text-white">
            <span>4.8</span>
          </div>
          <div className="flex items-center text-white">
            <span>10 million+</span>
          </div>
          <div className="flex items-center text-white">
            <span>Free to use</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;