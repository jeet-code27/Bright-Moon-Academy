'use client';
import React, { useState } from 'react';
import Image from 'next/image';

const ActivitiesSection = () => {
  const [activeFilter, setActiveFilter] = useState('All Activities');

 const activities = [
  {
    id: 1,
    title: "Annual Science Fair",
    date: "15th August 2025",
    time: "10:00 AM - 2:00 PM",
    description: "Students showcase 50+ innovative science projects on Independence Day",
    image: "/images/science-fair.jpg",
    category: "STEM"
  },
  {
    id: 2,
    title: "Inter-School Cricket Tournament",
    date: "23rd January 2025",
    time: "8:00 AM - 5:00 PM",
    description: "Our team won the Jaipur District Championship trophy",
    image: "/images/cricket-tournament.jpg",
    category: "Sports"
  },
  {
    id: 3,
    title: "Yoga & Meditation Session",
    date: "21st June 2025",
    time: "7:00 AM - 8:00 AM",
    description: "Celebrating International Yoga Day with 500+ participants",
    image: "/images/yoga-session.jpg",
    category: "Health"
  },
  {
    id: 4,
    title: "Diwali Rangoli Competition",
    date: "1st November 2025",
    time: "10:00 AM - 12:00 PM",
    description: "Students created beautiful traditional patterns for Festival of Lights",
    image: "/images/diwali-rangoli.jpg",
    category: "Cultural"
  },
  {
    id: 5,
    title: "Math Olympiad",
    date: "12th February 2025",
    time: "9:00 AM - 11:00 AM",
    description: "100+ students participated in problem-solving competition",
    image: "/images/math-olympiad.jpg",
    category: "Academic"
  },
  {
    id: 6,
    title: "Drawing and Painting Exhibition",
    date: "26th January 2025",
    time: "8:00 AM - 10:00 AM",
    description: "Students displayed their artistic talents with 200+ artworks",
    image: "/images/drawing-student.webp",
    category: "National"
  }
];

const categories = [
  'All Activities',
  'Academic',
  'Sports',
  'Cultural',
  'STEM',
  'National',
  'Health'
];

  const filteredActivities = activeFilter === 'All Activities' 
    ? activities 
    : activities.filter(activity => activity.category === activeFilter);

  return (
    <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8 relative">
      {/* Top border decoration */}
      
      
      <div className="max-w-7xl mx-auto">
        {/* Header with decorative elements */}
        <div className="text-center mb-12 relative">
          {/* Green cross decoration - top left */}
          <div className="absolute -top-8 left-8 w-8 h-8 hidden lg:block">
            <div className="absolute inset-0 bg-green-500 transform rotate-45"></div>
            <div className="absolute inset-0 bg-green-500"></div>
          </div>

          {/* Blue diamond pattern - top right */}
          <div className="absolute -top-8 right-8 hidden lg:block">
            <div className="grid grid-cols-2 gap-1">
              <div className="w-3 h-3 bg-blue-600 transform rotate-45"></div>
              <div className="w-3 h-3 bg-blue-600 transform rotate-45"></div>
              <div className="w-3 h-3 bg-blue-600 transform rotate-45"></div>
              <div className="w-3 h-3 bg-blue-600 transform rotate-45"></div>
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-gray-600">Annual Highlights </span>
            <br />
            <span className="text-navy-900" style={{color: '#1e3a8a'}}>Gallery</span>
          </h2>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-3 rounded-full text-sm font-medium cursor-pointer transition-all duration-300 ${
                activeFilter === category
                  ? 'bg-red-500 text-white shadow-lg'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-red-500 hover:text-red-500'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Activities grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredActivities.map((activity) => (
            <div
              key={activity.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-900 h-[550px] flex flex-col"
            >
              {/* Image Container */}
              <div className="h-64 p-4 overflow-hidden flex-shrink-0">
                <div className="w-full h-full rounded-2xl overflow-hidden relative hover:scale-105 transition-transform duration-300">
                  <Image
                    src={activity.image}
                    alt={activity.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover"
                    priority={activity.id <= 3} // Priority loading for first 3 images
                  />
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                {/* Day and Time */}
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-semibold text-navy-900" style={{color: '#1e3a8a'}}>
                    {activity.date}
                  </span>
                  <span className="text-sm text-gray-500">
                    {activity.time}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-navy-900 mb-3" style={{color: '#1e3a8a'}}>
                  {activity.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1">
                  {activity.description}
                </p>

                {/* Learn More Button */}
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-300 cursor-pointer mt-auto">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state when no activities match filter */}
        {filteredActivities.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No activities found for this category.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ActivitiesSection;