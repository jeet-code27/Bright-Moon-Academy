'use client';
import Link from 'next/link';
import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative lg:h-[600px] sm:h-[700px] bg-gradient-to-br from-[#FBF9F0] via-[#F8F6E8] to-[#F5F2E0] overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating particles with staggered animations */}
        <div className="absolute top-[20%] left-[25%] w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full animate-ping opacity-60"></div>
        <div className="absolute top-[70%] right-[20%] w-1 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-pulse opacity-70 animation-delay-1000"></div>
        <div className="absolute top-[50%] left-[15%] w-1.5 h-1.5 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-bounce opacity-50 animation-delay-500"></div>
        <div className="absolute top-[30%] right-[30%] w-1 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-ping opacity-40 animation-delay-1500"></div>
        <div className="absolute bottom-[30%] left-[70%] w-1.5 h-1.5 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full animate-pulse opacity-60 animation-delay-2000"></div>
      </div>
      
      {/* Enhanced floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large floating shapes */}
        <div className="absolute top-8 left-4 sm:top-12 sm:left-8 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-200/40 to-indigo-300/40 rounded-full animate-float shadow-lg backdrop-blur-sm"></div>
        <div className="absolute bottom-12 right-6 sm:bottom-20 sm:right-16 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-pink-200/40 to-rose-300/40 rounded-full animate-float-delayed shadow-lg backdrop-blur-sm"></div>
        <div className="absolute top-[35%] right-4 sm:right-12 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-yellow-200/40 to-orange-300/40 rounded-full animate-float-slow shadow-lg backdrop-blur-sm"></div>
        
        {/* Animated star elements with glow effects */}
        <div className="absolute top-12 right-8 sm:top-20 sm:right-20 w-6 h-6 sm:w-8 sm:h-8 animate-twinkle">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-md opacity-60"></div>
          <svg viewBox="0 0 24 24" fill="none" className="w-full h-full relative z-10">
            <path 
              d="M12 2L15.09 8.26L22 9L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9L8.91 8.26L12 2Z" 
              fill="url(#starGradient1)" 
            />
            <defs>
              <linearGradient id="starGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#EC4899" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        
        <div className="absolute bottom-24 left-6 sm:bottom-32 sm:left-16 w-5 h-5 sm:w-6 sm:h-6 animate-sparkle">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full blur-sm opacity-50"></div>
          <svg viewBox="0 0 24 24" fill="none" className="w-full h-full relative z-10">
            <path 
              d="M12 2L15.09 8.26L22 9L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9L8.91 8.26L12 2Z" 
              fill="url(#starGradient2)" 
            />
            <defs>
              <linearGradient id="starGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#06B6D4" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        
        {/* Additional decorative stars */}
        <div className="absolute top-[40%] left-8 w-4 h-4 animate-glow">
          <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
            <path 
              d="M12 2L15.09 8.26L22 9L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9L8.91 8.26L12 2Z" 
              fill="#F59E0B" 
              opacity="0.7"
            />
          </svg>
        </div>
        
        <div className="absolute top-16 left-1/3 w-3 h-3 animate-spin-slow">
          <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
            <path 
              d="M12 2L15.09 8.26L22 9L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9L8.91 8.26L12 2Z" 
              fill="#EF4444" 
              opacity="0.6"
            />
          </svg>
        </div>
        
        {/* Floating gradient lines */}
        <div className="hidden sm:block absolute top-36 left-1/4 w-20 h-0.5 bg-gradient-to-r from-transparent via-orange-300/60 to-transparent animate-pulse-slow"></div>
        <div className="hidden sm:block absolute bottom-36 right-1/4 w-28 h-0.5 bg-gradient-to-r from-transparent via-purple-300/60 to-transparent animate-pulse-slow animation-delay-1000"></div>
      </div>

      {/* Main content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="w-full">
          {/* Mobile: Text first, Image second | Desktop: Side by side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center h-full">
            
            {/* Text Content - Always first on mobile */}
            <div className="order-1 lg:order-1 space-y-4 lg:space-y-5 text-center lg:text-left pt-4 sm:pt-6 lg:pt-0 px-2 sm:px-4 lg:px-0">
              
              {/* Mobile text contrast improvements - darker background for better readability */}
              <div className="lg:hidden absolute inset-0 bg-white/20 backdrop-blur-sm rounded-2xl -mx-2"></div>
              
              {/* Animated heading with improved mobile contrast */}
              <div className="relative z-10 space-y-2 lg:space-y-1 px-2 sm:px-0">
                <h2 className="text-xl sm:text-xl md:text-2xl lg:text-2xl font-semibold text-gray-800 lg:text-transparent lg:bg-clip-text lg:bg-gradient-to-r lg:from-gray-600 lg:to-gray-800 leading-tight animate-fade-in-up opacity-0 animation-delay-300 drop-shadow-sm lg:drop-shadow-none">
                  Encouraging
                </h2>
                <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold text-gray-900 lg:text-transparent lg:bg-clip-text lg:bg-gradient-to-r lg:from-gray-900 lg:via-gray-800 lg:to-gray-900 leading-tight animate-fade-in-up opacity-0 animation-delay-500 drop-shadow-sm lg:drop-shadow-none">
                 Learning, One Step at a Time
                </h1>
              </div>
              
              {/* Enhanced subtitle with better mobile contrast */}
              <p className="relative z-10 text-base sm:text-base md:text-lg lg:text-lg text-gray-800 lg:text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0 font-medium lg:font-light px-4 sm:px-2 lg:px-0 animate-fade-in-up opacity-0 animation-delay-700 drop-shadow-sm lg:drop-shadow-none">
                We love to inspire children to explore and discover through play and learning, creating magical moments every day
              </p>
              
              {/* CTA buttons with improved mobile styling */}
              <div className="relative z-10 flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 px-4 sm:px-2 lg:px-0 animate-fade-in-up opacity-0 animation-delay-900">
                <Link href="/programs">
                <button className="group relative overflow-hidden bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold px-8 sm:px-7 py-4 sm:py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 active:scale-95 text-base sm:text-base cursor-pointer">
                  <span className="relative z-10 flex items-center">
                    Explore Programs
                    <svg 
                      className="ml-2 w-5 h-5 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-200" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </button>
                </Link>
                 <Link href="/apply-admission">
                <button className="group border-2 border-gray-400 lg:border-gray-300 hover:border-green-400 bg-white/90 lg:bg-transparent hover:bg-green-50 text-gray-800 lg:text-gray-700 hover:text-green-700 font-semibold px-8 sm:px-7 py-4 sm:py-3.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 hover:scale-105 active:scale-95 text-base sm:text-base cursor-pointer">
                  Apply for Admission
                </button>
                </Link>
              </div>
              
              {/* Enhanced stats section with mobile improvements */}
              <div className="relative z-10 flex justify-center lg:justify-start pt-4 px-4 sm:px-2 lg:px-0 animate-fade-in-up opacity-0 animation-delay-1100 pb-6 lg:pb-0">
                <div className="flex items-center gap-4 bg-white/90 lg:bg-white/70 backdrop-blur-sm rounded-2xl p-5 lg:p-4 shadow-xl lg:shadow-lg border border-white/60 lg:border-white/50 hover:bg-white/95 lg:hover:bg-white/80 transition-all duration-300">
                  <div className="relative">
                    <div className="w-14 h-14 sm:w-14 sm:h-14 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-lg">
                      <svg className="w-7 h-7 sm:w-7 sm:h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
                  </div>
                  <div className="text-left">
                    <div className="text-3xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
                      25+
                    </div>
                    <div className="text-gray-700 lg:text-gray-600 text-sm sm:text-sm font-semibold lg:font-medium">Years of Experience</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Image Content - Mobile optimized with better visibility */}
            <div className="order-2 lg:order-2 relative flex justify-center lg:justify-end px-4 sm:px-8 lg:px-0 pb-8 lg:pb-0">
              <div className="relative w-full max-w-sm sm:max-w-sm lg:max-w-md animate-fade-in opacity-0 animation-delay-1300">
                {/* Enhanced decorative background layers with better mobile visibility */}
                <div className="absolute -inset-4 sm:-inset-4 bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 rounded-3xl sm:rounded-3xl opacity-40 lg:opacity-30 blur-2xl animate-pulse-slow"></div>
                <div className="absolute -inset-2 bg-gradient-to-r from-orange-100 to-pink-100 rounded-2xl sm:rounded-2xl opacity-70 lg:opacity-50 backdrop-blur-sm"></div>
                
                {/* Main image container with mobile improvements */}
                <div className="relative group">
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl transform rotate-2 group-hover:rotate-0 transition-all duration-700 ease-out">
                    {/* Enhanced image with better mobile dimensions and visibility */}
                    <img 
                      src="/images/hero-child.webp" 
                      alt="Happy child with painted hands exploring and learning" 
                      className="w-full h-64 sm:h-60 lg:h-[490px] object-cover filter brightness-110 lg:brightness-105 contrast-110 lg:contrast-105 saturate-110 lg:saturate-100 group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                      decoding="async"
                    />
                    
                    {/* Adjusted overlay gradient for mobile */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 lg:from-black/10 via-transparent to-white/5 lg:to-white/10"></div>
                    <div className="absolute top-4 right-4 w-3 h-3 bg-white/80 lg:bg-white/60 rounded-full animate-ping"></div>
                    <div className="absolute bottom-6 left-6 w-2 h-2 bg-white/90 lg:bg-white/80 rounded-full animate-pulse"></div>
                  </div>
                  
                  {/* Enhanced floating elements for better mobile visibility */}
                  <div className="absolute -top-3 -right-3 w-10 lg:w-8 h-10 lg:h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-bounce opacity-90 lg:opacity-80 shadow-xl lg:shadow-lg"></div>
                  <div className="absolute -bottom-3 -left-3 w-8 lg:w-6 h-8 lg:h-6 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full animate-pulse opacity-90 lg:opacity-80 shadow-xl lg:shadow-lg"></div>
                  <div className="absolute top-1/2 -left-4 w-5 lg:w-4 h-5 lg:h-4 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-ping opacity-80 lg:opacity-60"></div>
                  <div className="absolute top-1/4 -right-2 w-4 lg:w-3 h-4 lg:h-3 bg-gradient-to-r from-purple-400 to-violet-400 rounded-full animate-bounce opacity-85 lg:opacity-70 animation-delay-500"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom styles for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(-5deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(3deg); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0.5; transform: scale(1) rotate(0deg); }
          50% { opacity: 0.8; transform: scale(1.1) rotate(180deg); }
        }
        @keyframes glow {
          0%, 100% { opacity: 0.7; filter: brightness(1); }
          50% { opacity: 1; filter: brightness(1.3); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 7s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        .animate-twinkle { animation: twinkle 3s ease-in-out infinite; }
        .animate-sparkle { animation: sparkle 4s ease-in-out infinite; }
        .animate-glow { animation: glow 2s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 10s linear infinite; }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
        .animate-fade-in { animation: fade-in 1s ease-out forwards; }
        
        .animation-delay-300 { animation-delay: 0.3s; }
        .animation-delay-500 { animation-delay: 0.5s; }
        .animation-delay-700 { animation-delay: 0.7s; }
        .animation-delay-900 { animation-delay: 0.9s; }
        .animation-delay-1000 { animation-delay: 1s; }
        .animation-delay-1100 { animation-delay: 1.1s; }
        .animation-delay-1300 { animation-delay: 1.3s; }
        .animation-delay-1500 { animation-delay: 1.5s; }
        .animation-delay-2000 { animation-delay: 2s; }
      `}</style>
    </section>
  );
};

export default HeroSection;