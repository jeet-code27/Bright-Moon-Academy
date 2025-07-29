import React from 'react';

const MissionVisionSection = () => {
  return (
    <section className="w-full py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Mission Card */}
          <div className="bg-[#F8FBFE] rounded-3xl p-4 lg:p-8 shadow-sm border border-gray-900 h-full flex flex-col justify-center">
            <div className="text-center">
              <h2 className="text-lg font-medium text-gray-600 mb-4">
                Our
              </h2>
              <h3 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-8">
                Mission
              </h3>
              <p className="text-gray-700 leading-relaxed text-base lg:text-lg max-w-md mx-auto">
                To nurture young minds through innovative teaching methods that 
                encourage exploration, creativity, and personal growth in a safe, 
                supportive, and stimulating environment where every child feels 
                valued and empowered to reach their full potential.
              </p>
            </div>
          </div>

          {/* Vision Card */}
          <div className="bg-[#F8FBFE] rounded-3xl p-4 lg:p-8 shadow-sm border border-gray-900 h-full flex flex-col justify-center">
            <div className="text-center">
              <h2 className="text-lg font-medium text-gray-600 mb-4">
                Our
              </h2>
              <h3 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-8">
                Vision
              </h3>
              <p className="text-gray-700 leading-relaxed text-base lg:text-lg max-w-md mx-auto">
                To be a leading play school that promotes holistic development, 
                fostering creativity, critical thinking, and social skills while 
                providing a joyful and inclusive learning experience for all children.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVisionSection;