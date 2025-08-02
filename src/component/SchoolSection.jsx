'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const SchoolSection = () => {
  return (
    <div className="w-full bg-[#F5F2E0]">
      {/* Scrolling Red Banner */}
      <div className="bg-[#FF6464] text-white py-4 md:py-8 overflow-hidden rounded-t-full">
        <div className="animate-marquee whitespace-nowrap">
          <span className="text-xs sm:text-sm md:text-lg lg:text-[24px] font-semibold mx-4 md:mx-8">
            🌟 Admissions Open for 2025-2026
          </span>
          <span className="text-xs sm:text-sm md:text-lg lg:text-[24px] font-semibold mx-4 md:mx-8">
            🌟 LIMITED SEAT AVAILABLE
          </span>
          <span className="text-xs sm:text-sm md:text-lg lg:text-[24px] font-semibold mx-4 md:mx-8">
            🌟 ADMISSION OPEN FOR 2025-2026
          </span>
          <span className="text-xs sm:text-sm md:text-lg lg:text-[24px] font-semibold mx-4 md:mx-8">
            🌟 INTER SCHOOL COMPETITION FOR ALL THE STUDENTS
          </span>
          <span className="text-xs sm:text-sm md:text-lg lg:text-[24px] font-semibold mx-4 md:mx-8">
            🌟 LIMITED SEAT AVAILABLE
          </span>
          <span className="text-xs sm:text-sm md:text-lg lg:text-[24px] font-semibold mx-4 md:mx-8">
            🌟 ADMISSION OPEN FOR 2025-2026
          </span>
        </div>
      </div>

      {/* Hero Section */}
      <div className='bg-[#FF6464]'>
        <div className="bg-[#FFCF55] py-8 md:py-12 lg:py-16 relative rounded-t-[50px] md:rounded-t-[100px]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-6 md:gap-8 lg:gap-16">
              {/* Girl Image */}
              <div className="flex-shrink-0 order-2 lg:order-1 lg:ml-8">
                <div className="w-48 h-60 sm:w-56 sm:h-72 md:w-64 md:h-80 lg:w-72 lg:h-96 rounded-2xl md:rounded-3xl overflow-hidden shadow-xl bg-gray-200">
                  <Image
                    src="/images/girl-teacher.jpg"
                    alt="Bright Moon Academy School Teacher"
                    width={288}
                    height={384}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 text-center lg:text-left lg:pl-8 order-1 lg:order-2 w-full">
                <div className="bg-[#FAB70E] rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 shadow-xl relative">
                  <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1 md:mb-2">
                    Welcome to
                  </h1>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
                    Bright Moon Academy
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg text-gray-800 mb-6 md:mb-8 leading-relaxed">
                    Where we believe in nurturing young minds and fostering a love for learning 
                    from an early age. At <b>Bright Moon Academy</b>, we are dedicated to providing a safe, 
                    supportive, and stimulating environment where children can grow.
                  </p>
                  <Link href="/about-us">
                  <button className="inline-flex items-center px-4 md:px-6 py-2 md:py-3 bg-gray-800/10 backdrop-blur-sm text-gray-800 font-semibold rounded-lg hover:bg-gray-800/20 transition-all duration-300 border border-gray-800/20 cursor-pointer text-sm md:text-base">
                    Learn more 
                    <svg className="w-3 h-3 md:w-4 md:h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Learning Paths Section */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12">
            <div className="text-center mb-8 md:mb-12">
              <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">Our</h3>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">Learning Paths</h2>
            </div>

            {/* Cards Grid - Improved Mobile Responsiveness */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-8 md:mb-12 max-w-7xl mx-auto">
              {/* Toddler Card */}
              <div className="bg-white rounded-2xl p-4 md:p-5 lg:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-10 h-10 md:w-12 md:h-12 mb-3 md:mb-4">
                  <Image
                    src="/images/icons/smiley.svg"
                    alt="Toddler icon"
                    width={48}
                    height={48}
                    className="w-full h-full"
                  />
                </div>
                <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Early Years (Play Group to UKG)</h4>
                <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4">(Age 2-5 years)</p>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                 We provide a joyful, nurturing environment where children begin their learning journey through play-based activities that build language, motor skills, and social-emotional development.
                </p>
              </div>

              {/* Pre-School Card */}
              <div className="bg-white rounded-2xl p-4 md:p-5 lg:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-10 h-10 md:w-12 md:h-12 mb-3 md:mb-4">
                  <Image
                    src="/images/icons/preschool-icon.svg"
                    alt="Pre-school icon"
                    width={48}
                    height={48}
                    className="w-full h-full"
                  />
                </div>
                <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Primary (Class 1-5)</h4>
                <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4">(Age 6-10 years)</p>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  Strong academic foundation in English, Hindi, Math, and Environmental Studies through engaging lessons, hands-on activities, and personalized attention to develop curiosity and confidence.
                </p>
              </div>

              {/* Kindergarten Card */}
              <div className="bg-white rounded-2xl p-4 md:p-5 lg:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-10 h-10 md:w-12 md:h-12 mb-3 md:mb-4">
                  <Image
                    src="/images/icons/kindergarten-icon.svg"
                    alt="Kindergarten icon"
                    width={48}
                    height={48}
                    className="w-full h-full"
                  />
                </div>
                <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Middle (Class 6-8)</h4>
                <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4">(Age 11-13 years)</p>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                 Conceptual learning through subject integration, science experiments, creative expression, and collaborative projects. Emphasis on analytical thinking and communication.
                </p>
              </div>

              {/* Pre-K Program Card */}
              <div className="bg-white rounded-2xl p-4 md:p-5 lg:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-10 h-10 md:w-12 md:h-12 mb-3 md:mb-4">
                  <Image
                    src="/images/icons/prek-icon.svg"
                    alt="Pre-K Program icon"
                    width={48}
                    height={48}
                    className="w-full h-full"
                  />
                </div>
                <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Secondary (Class 9-10)</h4>
                <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4">(Age 14-16 years)</p>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  Focused academic excellence with board exam readiness, subject mastery, and career-oriented guidance. Includes regular assessments and development of leadership and study skills.
                </p>
              </div>
            </div>

            {/* View More Button */}
            {/* <div className="text-center">
              <button className="inline-flex items-center px-6 md:px-8 py-2 md:py-3 bg-white/20 backdrop-blur-sm text-gray-800 font-semibold rounded-lg hover:bg-white/30 transition-all duration-300 border border-white/30 cursor-pointer text-sm md:text-base">
                View More
                <svg className="w-3 h-3 md:w-4 md:h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div> */}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default SchoolSection;