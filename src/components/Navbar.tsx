import React from 'react';
import { Menu } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed w-full z-30 backdrop-blur-sm bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-white">Replika</h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-white hover:text-purple-200 transition"></a>
            <a href="#" className="text-white hover:text-purple-200 transition">Help</a>
            <a href="#" className="text-white hover:text-purple-200 transition">Community</a>
          </div>
          
          <div className="flex items-center space-x-4">
            <a href="#" className="text-white hover:text-purple-200 transition">Log in</a>
            <button className="md:hidden text-white">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;