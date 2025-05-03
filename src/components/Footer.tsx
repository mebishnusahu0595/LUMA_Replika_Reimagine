import React from 'react';
import { Instagram, Twitter, Facebook, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-indigo-950 text-blue-200 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 lg:col-span-1">
            <h3 className="text-white font-semibold text-lg mb-4">About Replika</h3>
            <ul className="space-y-2">
              <li><Link to="/our-story" className="hover:text-white transition">Our story</Link></li>
              <li><Link to="/team" className="hover:text-white transition">Team</Link></li>
              <li><Link to="/careers" className="hover:text-white transition">Careers</Link></li>
              <li><Link to="/blog" className="hover:text-white transition">Blog</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Help & support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition">Contact us</a></li>
              <li><a href="#" className="hover:text-white transition">Report a bug</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Join our community</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition">Discord</a></li>
              <li><a href="#" className="hover:text-white transition">Reddit</a></li>
              <li><a href="#" className="hover:text-white transition">Instagram</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Get the app</h3>
            <div className="space-y-2">
              <button className="bg-indigo-800 hover:bg-indigo-700 transition rounded-md px-4 py-2 w-full text-left">
                iOS
              </button>
              <button className="bg-indigo-800 hover:bg-indigo-700 transition rounded-md px-4 py-2 w-full text-left">
                Android
              </button>
              <button className="bg-indigo-800 hover:bg-indigo-700 transition rounded-md px-4 py-2 w-full text-left">
                Desktop
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-indigo-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p>© Copyright © 2023 Luka, Inc.</p>
            <p className="text-sm text-indigo-400">Replika is made with love by Luka in San Francisco.</p>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="text-indigo-400 hover:text-white transition">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-indigo-400 hover:text-white transition">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-indigo-400 hover:text-white transition">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-indigo-400 hover:text-white transition">
              <Youtube size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;