import Image from 'next/image';
import React from 'react';

const LearningPathsSection = () => {
  const milestones = [
  {
    year: "2000",
    title: "School Started",
    milestone: "Milestone:",
    description: "Our school started in Amer, Jaipur, with classes from Play Group to 5th. It began with a small number of students and a goal to provide quality education in a caring environment.",
    iconUrl: "/images/icons/school.svg"
  },
  {
    year: "2008", 
    title: "Class & Building Expansion",
    milestone: "Milestone:",
    description: "With growing strength, we added one more floor to the building and extended classes up to 8th, making space for more students and better facilities.",
    iconUrl: "/images/icons/expansion.svg"
  },
  {
    year: "2015",
    title: "Senior Classes & More Space", 
    milestone: "Milestone:",
    description: "We introduced classes up to 10th under RBSE and built another floor to support senior students, offering a complete school journey under one roof.",
    iconUrl: "/images/icons/award.svg"
  },
  {
    year: "2024",
    title: "Sports & Growth",
    milestone: "Milestone:", 
    description: "We built a new badminton play area and now serve 400–500 students from Amer and nearby areas, with continued focus on all-round development.",
    iconUrl: "/images/icons/facility.svg"
  }
];


  return (
    <section className="w-full py-16 px-4 rounded-t-[50px] md:rounded-t-[100px]" style={{ backgroundColor: '#FFCF55' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-lg font-medium text-slate-700 mb-2">
            Our
          </h2>
          <h3 className="text-4xl lg:text-5xl font-bold text-slate-800">
            Learning Paths
          </h3>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {milestones.map((item, index) => (
            <div key={index} className="relative">
              {/* Year Badge */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-10">
                <div className="bg-red-400 text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-lg shadow-lg">
                  {item.year}
                </div>
              </div>

              {/* Card */}
              <div className="bg-white rounded-2xl p-4  shadow-sm border border-gray-100 h-full">
                {/* Icon */}
                <div className="mb-6 flex justify-start">
                  <div className="w-10 h-10 flex items-center justify-center">
                    <Image
                      src={item.iconUrl}
                      alt={`${item.title} icon`}
                      width={36}
                      height={36    }
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Title */}
                <h4 className="text-2xl font-bold text-slate-800 mb-4 text-left">
                  {item.title}
                </h4>

                {/* Milestone Label */}
                <p className="font-semibold text-slate-700 mb-2 text-left">
                  {item.milestone}
                </p>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed text-sm text-left">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LearningPathsSection;