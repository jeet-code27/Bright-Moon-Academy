'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

const ActivitiesSection = () => {
  const [activeFilter, setActiveFilter] = useState('All Activities');
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch activities from Firebase - using same approach as admin panel
  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'activities'));
      const activitiesData = [];
      querySnapshot.forEach((doc) => {
        activitiesData.push({ id: doc.id, ...doc.data() });
      });
      setActivities(activitiesData);
      console.log('Fetched activities:', activitiesData); // Debug log
    } catch (error) {
      console.error('Error fetching activities:', error);
    }
    setLoading(false);
  };

  // Extract unique categories from activities data
  const getCategories = () => {
    const uniqueCategories = [...new Set(activities.map(activity => activity.category).filter(Boolean))];
    return ['All Activities', ...uniqueCategories];
  };

  const categories = getCategories();

  const filteredActivities = activeFilter === 'All Activities' 
    ? activities 
    : activities.filter(activity => activity.category === activeFilter);

  // Format date for display
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  // Loading state
  if (loading) {
    return (
      <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="text-gray-600">School Events & Activities </span>
              <br />
              <span className="text-navy-900" style={{color: '#1e3a8a'}}>Gallery</span>
            </h2>
          </div>
          
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-600 text-lg">Loading activities...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8 relative">
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
            <span className="text-gray-600">School Events & Activities </span>
            <br />
            <span className="text-navy-900" style={{color: '#1e3a8a'}}>Gallery</span>
          </h2>
        </div>

        {/* Filter buttons - only show if there are categories */}
        {categories.length > 1 && (
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
        )}

        {/* Debug info - remove this after testing */}
        <div className="mb-4 text-sm text-gray-500 text-center">
          Total activities: {activities.length}, Filtered: {filteredActivities.length}
        </div>

        {/* Activities grid */}
        {filteredActivities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredActivities.map((activity) => (
              <div
                key={activity.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-900 h-[550px] flex flex-col"
              >
                {/* Image Container */}
                <div className="h-64 p-4 overflow-hidden flex-shrink-0">
                  <div className="w-full h-full rounded-2xl overflow-hidden relative hover:scale-105 transition-transform duration-300">
                    {activity.mainImage ? (
                      <Image
                        src={activity.mainImage}
                        alt={activity.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-cover"
                        priority={false}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <svg className="w-20 h-20 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-semibold text-navy-900" style={{color: '#1e3a8a'}}>
                      {formatDate(activity.date)}
                    </span>
                    {activity.category && (
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {activity.category}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-navy-900 mb-3" style={{color: '#1e3a8a'}}>
                    {activity.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1">
                    {activity.shortDescription || activity.longDescription?.substring(0, 150) + '...' || 'No description available'}
                  </p>

                  {/* View Details Button */}
                  <Link 
                    href={`/activities/${activity.id}`}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-300 cursor-pointer mt-auto text-center inline-block"
                  >
                    See Event Photos
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <p className="text-gray-500 text-lg mb-2">
              {activeFilter === 'All Activities' 
                ? 'No activities found.' 
                : `No activities found for "${activeFilter}" category.`
              }
            </p>
            <p className="text-gray-400 text-sm">
              Check back later for updates or try a different category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ActivitiesSection;