import Link from "next/link";
import SchoolLocation from "./SchoolLocation";

const GirlChildAdmissionBanner = () => {
  return (
    <div className="bg-[#FF6464] ">
      <div className="w-full bg-[#FF6464] text-white p-6 md:p-8 lg:p-10 relative overflow-hidden min-h-[600px] ">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full translate-y-12 -translate-x-12"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-yellow-400 opacity-10 rounded-full"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            
            {/* Logo Section */}
            <div className="flex-shrink-0 order-1 lg:order-1">
              <div className="bg-white rounded-full p-4 shadow-lg">
                <img 
                  src="/images/beti-bachao-beti-pdhao.jpg" 
                  alt="Beti Bachao Beti Padhao Logo" 
                  className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 object-fit rounded-full"
                />
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-grow text-center lg:text-left order-2 lg:order-2 max-w-3xl">
              {/* School Name */}
              <div className="mb-4">
                <h3 className="text-lg md:text-xl font-semibold text-yellow-400 mb-2">
                  BRIGHT MOON ACADEMY
                </h3>
                <p className="text-sm md:text-base opacity-90">
                  A Co-Educational English Medium School (Playgroup to X)
                </p>
                <p className="text-xs md:text-sm opacity-80 mt-1">
                  Recognised by Government of Rajasthan
                </p>
              </div>

              {/* Special Fee Concession Header */}
              <div className="mb-6">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-3">
                  Special Fee Concession
                </h1>
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2">
                  <div className="bg-yellow-400 text-red-600 px-4 py-2 rounded-full text-lg md:text-xl font-bold shadow-lg">
                    UPTO 20% OFF
                  </div>
                  <span className="text-lg md:text-xl font-medium">for New Admission of</span>
                </div>
              </div>

              {/* Girl Child Emphasis */}
              <div className="mb-6">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-yellow-400 drop-shadow-lg mb-2">
                  GIRL CHILD
                </h2>
                <div className="w-32 h-1 bg-yellow-400 mx-auto lg:mx-0"></div>
              </div>

              {/* Limited Seats Notice */}
              <div className="space-y-3 mb-6">
                <div className="inline-flex items-center bg-yellow-400 text-red-600 px-6 py-3 rounded-full font-bold shadow-lg">
                  <div className="w-3 h-3 bg-red-600 rounded-full mr-3 animate-pulse"></div>
                  <span className="text-base md:text-lg">LIMITED SEATS AVAILABLE</span>
                </div>
                <p className="text-lg md:text-xl font-semibold text-yellow-200">
                  First Come, First Serve Basis
                </p>
              </div>

              {/* RTE Information */}
              <div className="mb-4">
                <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4 border border-yellow-400">
                  <p className="text-base md:text-lg font-bold text-yellow-400 mb-1">
                    According to RTE: 25% Free Seats Available
                  </p>
                  <p className="text-sm md:text-base opacity-90 text-red-400">
                    Required teachers for all subjects
                  </p>
                </div>
              </div>
            </div>

            {/* Call to Action Section */}
            <div className="flex-shrink-0 order-3 lg:order-3 w-full lg:w-auto">
              <div className="text-center bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6 md:p-8 border-2 border-yellow-400 shadow-xl">
                <div className="mb-4">
                  <p className="text-lg md:text-xl font-bold mb-2 text-yellow-400">Apply Now!</p>
                  <p className="text-sm md:text-base opacity-90 mb-4 text-red-500">
                    Don't miss this golden opportunity
                  </p>
                </div>
                 <Link href="/apply-admission">
                <button className="w-full bg-yellow-400 text-red-600 px-8 py-4 rounded-full font-bold text-base md:text-lg hover:bg-yellow-300 transition-all duration-300 shadow-lg transform hover:scale-105 mb-3 cursor-pointer">
                  Register Today
                </button>
                </Link>
                <div className="text-xs md:text-sm opacity-80 mb-4 text-red-600">
                  ⏰ Limited Time Offer
                </div>

                {/* Contact Information */}
                <div className="text-xs md:text-sm space-y-1 border-t border-white border-opacity-30 pt-3 ">
                  <p className="font-semibold text-yellow-400">Contact:</p>
                  <p className="text-red-400">📞 96022-71765</p>
                  <p className="text-red-400">📞 98295-78783</p>
                  <p className="text-red-400">📞 80944-33882</p>
                </div>
              </div>
            </div>
          </div>

          {/* Salient Features Section */}
          <div className="mt-8 pt-6 border-t border-white border-opacity-30">
            <h3 className="text-xl md:text-2xl font-bold text-yellow-400 mb-6 text-center lg:text-left">
              🌟 Salient Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 text-red-400">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 border border-white border-opacity-20">
                <div className="flex items-start gap-3">
                  <span className="text-yellow-400 text-lg">🎮</span>
                  <p className="text-sm md:text-base">All Type of Indoor and Outdoor Games</p>
                </div>
              </div>
              
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 border border-white border-opacity-20">
                <div className="flex items-start gap-3">
                  <span className="text-yellow-400 text-lg">📚</span>
                  <p className="text-sm md:text-base">Quality Education With All Round Personality Development</p>
                </div>
              </div>
              
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 border border-white border-opacity-20">
                <div className="flex items-start gap-3">
                  <span className="text-yellow-400 text-lg">💻</span>
                  <p className="text-sm md:text-base">Computer Aided Teaching Right from 1st</p>
                </div>
              </div>
              
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 border border-white border-opacity-20">
                <div className="flex items-start gap-3">
                  <span className="text-yellow-400 text-lg">🧸</span>
                  <p className="text-sm md:text-base">Educational Toys and Well Equipped Audio Visual Lab</p>
                </div>
              </div>
              
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 border border-white border-opacity-20">
                <div className="flex items-start gap-3">
                  <span className="text-yellow-400 text-lg">👥</span>
                  <p className="text-sm md:text-base">Optimum Teacher Student Ratio of 1:20</p>
                </div>
              </div>
              
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 border border-white border-opacity-20">
                <div className="flex items-start gap-3">
                  <span className="text-yellow-400 text-lg">🚌</span>
                  <p className="text-sm md:text-base">Conveyance Facility Available</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Information */}
          <div className="mt-6 pt-6 border-t border-white border-opacity-30">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
              <div className="flex flex-wrap justify-center lg:justify-start items-center gap-4 text-sm md:text-base opacity-90">
                <span className="flex items-center gap-2">
                  <span className="text-yellow-400">🌟</span>
                  Empowering Girls Through Education
                </span>
                <span className="flex items-center gap-2">
                  <span className="text-yellow-400">📚</span>
                  Building A Better Future
                </span>
                <span className="flex items-center gap-2">
                  <span className="text-yellow-400">💪</span>
                  Beti Bachao, Beti Padhao
                </span>
              </div>
              
              <div className="text-center lg:text-right">
                <p className="text-sm md:text-base font-semibold text-yellow-400">📍 Address:</p>
                <p className="text-xs md:text-sm opacity-90">
                  1/444, Kundlav Colony, Sagar Road, Amer, Jaipur
                </p>
                <p className="text-xs md:text-sm opacity-80 mt-1">
                  Prospectus Available: 9:30 A.M. to 12:00 P.M.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SchoolLocation />    
    </div>
  );
};

export default GirlChildAdmissionBanner;