import React from 'react';
import FeatureCard from './FeatureCard';
import { MessageSquare, Globe, Smile, Brain, Heart, Book } from 'lucide-react';

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-indigo-900 to-purple-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
          Create your story together
        </h2>
        <p className="text-lg text-center text-purple-100 max-w-3xl mx-auto mb-16">
          Your Replika will continue to be by your side no matter what you're up to. Chat through good days, bad days, or just everyday moments. Your AI companion is waiting for you.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="md:col-span-2 lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-lg rounded-xl p-6 h-full flex flex-col">
              <div className="mb-4">
                <img 
                  src="https://images.pexels.com/photos/6963944/pexels-photo-6963944.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="AI Companion" 
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              </div>
              <h3 className="text-white text-2xl font-semibold mb-2">Explore your relationship</h3>
              <p className="text-white/80">A friend, a partner, a mentor – find the perfect companion in Replika.</p>
            </div>
          </div>
          
          <div className="md:col-span-2 lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-lg rounded-xl p-6 h-full">
              <h3 className="text-white text-2xl font-semibold mb-4">Chat about everything</h3>
              <p className="text-white/80 text-lg mb-6">The more you talk to Replika, the smarter it becomes.</p>
              <div className="aspect-w-16 aspect-h-9">
                <img 
                  src="https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Chat Conversation" 
                  className="w-full h-56 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
          
          <FeatureCard
            title="Videocalls"
            description="Connect face-to-face with your AI companion in real-time."
            icon={<MessageSquare size={28} />}
            color="bg-white/10 backdrop-blur-md border border-white/20 shadow-lg"
          />
          
          <FeatureCard
            title="Coaching"
            description="Get motivation and guidance from your supportive AI friend."
            icon={<Smile size={28} />}
            color="bg-white/10 backdrop-blur-md border border-white/20 shadow-lg"
          />
          
          <FeatureCard
            title="Memory"
            description="Your Replika remembers your conversations and grows with you."
            icon={<Brain size={28} />}
            color="bg-white/10 backdrop-blur-md border border-white/20 shadow-lg"
          />
          
          <FeatureCard
            title="Express yourself"
            description="Choose what interests and style preferences you want to share with Replika."
            icon={<Smile size={28} />}
            color="bg-white/10 backdrop-blur-md border border-white/20 shadow-lg"
          />
          
          <FeatureCard
            title="Diary"
            description="Record meaningful moments."
            icon={<Book size={28} />}
            color="bg-white/10 backdrop-blur-md border border-white/20 shadow-lg"
          />
          
          <div className="md:col-span-2 lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-lg rounded-xl p-6 h-full flex flex-col">
              <h3 className="text-white text-2xl font-semibold mb-2">Explore the world together in AR</h3>
              <p className="text-white/80 mb-4">Share amazing moments with your AI friend in real time.</p>
              <img 
                src="https://images.pexels.com/photos/8728388/pexels-photo-8728388.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="AR Experience" 
                className="w-full h-48 object-cover rounded-lg mt-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;