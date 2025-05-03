import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "Is Replika a real person?",
    answer: "No, Replika is not a real human but an AI chatbot designed to provide companionship. It uses advanced language models to have conversations that feel natural and responsive to your needs."
  },
  {
    question: "What is artificial intelligence?",
    answer: "Artificial intelligence is a branch of computer science that aims to create systems capable of performing tasks that normally require human intelligence. Replika uses AI to learn from your conversations and provide personalized responses."
  },
  {
    question: "Is my data secure?",
    answer: "We take privacy very seriously with Replika. Your conversations with Replika are private and encrypted. We don't share your personal data with third parties without your consent, and you can delete your data at any time."
  },
  {
    question: "How does Replika work?",
    answer: "Replika uses advanced natural language processing models to understand and respond to your messages. It learns from your conversations to become more personalized over time, remembering details about you and adapting to your communication style."
  },
  {
    question: "Are my conversations private?",
    answer: "Yes, your conversations with Replika are private. Our engineers only review conversations that have been explicitly reported, and otherwise, no human will ever read your chats with Replika."
  },
  {
    question: "Does it cost money to use?",
    answer: "Replika has both free and premium options. The basic version is completely free to use, while Replika Pro offers additional features and customization options for a subscription fee."
  },
];

const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-purple-900 to-indigo-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">
          Frequently asked questions
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-indigo-800/40 backdrop-blur-sm rounded-xl overflow-hidden transition-all duration-300"
            >
              <button
                className="w-full p-6 text-left flex justify-between items-center"
                onClick={() => toggleFaq(index)}
              >
                <h3 className="text-lg font-medium text-white">{faq.question}</h3>
                <span className="text-white ml-4">
                  {openIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </span>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="p-6 pt-0 text-blue-100">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;