import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    
    <section className="bg-gradient-to-r from-green-400 via-green-500 to-green-600  min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Hero CTA Section */}
        <div className="bg-[#FFCF55] rounded-3xl shadow-2xl pb-0 mb-12 mt-[-150px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center min-h-[400px] lg:min-h-[400px]">
            
            {/* Content Section */}
            <div className="px-6 py-12 sm:px-8 sm:py-16 lg:px-16 lg:py-0 order-1 lg:order-1">
              <div className="space-y-4 lg:space-y-6">
                <div className="space-y-2">
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-medium text-blue-950 leading-relaxed">
                    Ready to Begin
                  </h2>
                  <h1 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-blue-950  leading-tight">
                    Your Child's New Journey?
                  </h1>
                </div>
                
                <p className="text-base sm:text-lg lg:text-xl text-blue-950 leading-relaxed max-w-lg">
                  Every moment in your child's early years is crucial. Our programs are designed to inspire 
                  curiosity, and build essential skills that will last a lifetime.
                </p>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 lg:pt-4">
                  <Link href="/apply-admission" className="w-full sm:w-auto">
                    <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-950  font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 text-sm sm:text-base cursor-pointer">
                      Apply for Admission
                    </button>
                  </Link>
                  <Link href="/programs" className="w-full sm:w-auto">
                    <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-gray-800 text-gray-800 font-semibold rounded-full hover:bg-gray-800 hover:text-yellow-400 transition-all duration-300 text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer">
                      Explore Programs
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Image Section - Hidden on mobile, visible on desktop */}
            <div className="hidden lg:flex relative items-center justify-center px-8 pt-2 order-2">
              <div className="relative w-full max-w-sm lg:max-w-md">
                {/* Boy Image Container */}
                <div className="relative z-10 aspect-[3/4] w-full mt-[-140px]">
                  <Image
                    src="/images/footer-boy.webp"
                    alt="Happy child pointing and smiling in red striped shirt"
                    fill
                    className="object-center object-center"
                    sizes="(max-width: 1200px) 50vw, 33vw"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer Links Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 text-white">
          
          {/* Brand Section */}
          <div className="space-y-6 text-center sm:text-left">
            <div className="flex flex-col items-center sm:items-start space-y-4">
              {/* Logo */}
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                <Image
                  src="/images/school-logo.png"
                  alt="Bright Moon Academy Logo"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              
              <Link href="/" className="inline-block">
                <h3 className="text-2xl sm:text-3xl font-bold text-white hover:text-yellow-200 transition-colors duration-200">
                  Bright Moon Academy
                </h3>
              </Link>
            </div>
            
            <p className="text-green-100 leading-relaxed text-sm sm:text-base max-w-sm mx-auto sm:mx-0">
              Every moment in your child's early years are crucial for their growth and development.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex justify-center sm:justify-start space-x-3">
              <a 
                href="#" 
                aria-label="Follow us on Facebook"
                className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-green-600 hover:bg-yellow-200 hover:scale-110 transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              
              <a 
                href="#" 
                aria-label="Follow us on Twitter"
                className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-green-600 hover:bg-yellow-200 hover:scale-110 transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              
              <a 
                href="#" 
                aria-label="Follow us on LinkedIn"
                className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-green-600 hover:bg-yellow-200 hover:scale-110 transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" clipRule="evenodd" />
                </svg>
              </a>
              
              <a 
                href="#" 
                aria-label="Subscribe to our YouTube channel"
                className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-green-600 hover:bg-yellow-200 hover:scale-110 transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          
          {/* Navigation Section */}
          <div className="space-y-4 text-center sm:text-left">
            <Link href="/">
              <h4 className="font-semibold text-white text-lg hover:text-yellow-200 transition-colors duration-200 cursor-pointer">
                Home
              </h4>
            </Link>
            <nav className="flex flex-col space-y-3">
              <Link href="/about" className="text-green-100 hover:text-white hover:translate-x-1 transition-all duration-200 text-sm sm:text-base">
                About Us
              </Link>
              <Link href="/programs" className="text-green-100 hover:text-white hover:translate-x-1 transition-all duration-200 text-sm sm:text-base">
                Programs
              </Link>
              <Link href="/announcement" className="text-green-100 hover:text-white hover:translate-x-1 transition-all duration-200 text-sm sm:text-base">
                Announcements
              </Link>
              <Link href="/contact" className="text-green-100 hover:text-white hover:translate-x-1 transition-all duration-200 text-sm sm:text-base">
                Contact Us
              </Link>
              <Link href="/apply-admission" className="text-green-100 hover:text-white hover:translate-x-1 transition-all duration-200 text-sm sm:text-base">
                Apply for Admission
              </Link>
            </nav>
          </div>
          
          {/* Contact Information Section */}
          <div className="space-y-4 text-center sm:text-left">
            <h4 className="font-semibold text-white text-lg">Contact Info</h4>
            <div className="space-y-3">
              {/* Address */}
              <div className="flex flex-col sm:flex-row sm:items-start gap-2">
                <svg className="w-5 h-5 text-yellow-200 mx-auto sm:mx-0 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-green-100 text-sm sm:text-base leading-relaxed">
                  1/444, KUNDLAV COLONY,<br />
                  SARAG ROAD, AMER,<br />
                  JAIPUR 302028, RAJASTHAN
                </p>
              </div>
              
              {/* Phone */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <svg className="w-5 h-5 text-yellow-200 mx-auto sm:mx-0 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:9602271765" className="text-green-100 hover:text-white transition-colors duration-200 text-sm sm:text-base">
                  96022 71765
                </a>
              </div>
              
              {/* Email */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <svg className="w-5 h-5 text-yellow-200 mx-auto sm:mx-0 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:brightmoonacademy09@gmail.com" className="text-green-100 hover:text-white transition-colors duration-200 text-sm sm:text-base break-all">
                  brightmoonacademy09@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Copyright Section */}
        <div className="mt-12 pt-8 border-t border-green-400/30 text-center">
          <p className="text-green-100 text-xs sm:text-sm leading-relaxed">
            © 2025 Bright Moon Academy. All rights reserved.
            <br className="sm:hidden" />
          </p>
        </div>
      </div>
    </section>
    
  );
};

export default Footer;