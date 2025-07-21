'use client';
import React, { useState } from 'react';
import { ChevronDown, Plus, Minus } from 'lucide-react';

const FAQSection = () => {
  const [openItems, setOpenItems] = useState({});

 const faqData = [
  {
    id: 1,
    question: "How does Bright Moon Academy update parents about student progress?",
    answer: "We use: (1) Monthly report cards, (2) Parent-teacher meetings every term, (3) School app for daily updates, and (4) WhatsApp groups for class-wise announcements."
  },
  {
    id: 2,
    question: "What is the fee structure at Bright Moon Academy?",
    answer: "Fees include: (1) Tuition (CBSE curriculum), (2) Smart class charges, (3) Sports/Yoga activities, and (4) Annual events. Discounts available for siblings and early payments."
  },
  {
    id: 3,
    question: "What safety measures does your Jaipur campus have?",
    answer: "Our campus features: (1) CCTV surveillance, (2) Female attendants for junior classes, (3) First-aid trained staff, and (4) Secure pick-up/drop systems with ID checks."
  },
  {
    id: 4,
    question: "What makes Bright Moon Academy's teaching method special?",
    answer: "We combine: (1) CBSE syllabus with practical learning, (2) Focus on Hindi/English fluency, (3) Regular STEM activities, and (4) Values education through Indian traditions."
  },
  {
    id: 5,
    question: "Do you provide transport facilities?",
    answer: "Yes! Air-conditioned buses cover all Jaipur areas (Mansarovar, Vaishali Nagar, etc.) with GPS tracking and female attendants."
  }
];

  const toggleItem = (id) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8 pb-[260px]">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-red-200 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-blue-300 rounded-full opacity-40 animate-bounce"></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-green-200 rounded-full opacity-50 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-8 bg-yellow-300 transform rotate-45 opacity-30 animate-pulse"></div>
        <div className="absolute top-1/3 left-1/4 w-6 h-24 bg-orange-300 transform rotate-12 opacity-40 animate-bounce"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-sm font-semibold text-gray-500 tracking-wide uppercase mb-2">
            Frequently
          </h2>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Asked Questions
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqData.map((item) => (
            <div
              key={item.id}
              className="relative overflow-hidden border rounded-2xl bg-white shadow-md hover:shadow-lg transition-all duration-300"
            >
              {/* Question Header */}
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full px-6 py-6 text-left rounded-2xl transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 pr-8 leading-relaxed">
                    {item.question}
                  </h3>
                  <div className="flex-shrink-0 ml-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      openItems[item.id] 
                        ? 'bg-blue-500 text-white transform rotate-180' 
                        : 'bg-gray-100 text-gray-600 hover:bg-blue-100'
                    }`}>
                      {openItems[item.id] ? (
                        <Minus className="w-4 h-4" />
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                    </div>
                  </div>
                </div>
              </button>

              {/* Answer Content */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openItems[item.id] 
                    ? 'max-h-96 opacity-100' 
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6">
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      
      </div>
    </div>
  );
};

export default FAQSection;