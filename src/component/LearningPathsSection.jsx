import Image from 'next/image';
import React from 'react';

const LearningPathsSection = () => {
  const milestones = [
    {
      year: "2010",
      title: "Our Beginning",
      milestone: "Milestone:",
      description: "The kindergarten opened its doors, starting with a small group of 30 children. The mission was to create a creative learning space for young minds.",
      iconUrl: "/images/icons/school.svg"
    },
    {
      year: "2014", 
      title: "First Expansion",
      milestone: "Milestone:",
      description: "Expanded to two new location, growing our community to serve over 150 children across the region, introducing a specialized creative curriculum.",
      iconUrl: "/images/icons/expansion.svg"
    },
    {
      year: "2018",
      title: "New Recognition", 
      milestone: "Milestone:",
      description: "Achieved national accreditation for our commitment to innovative early childhood education and outstanding learning environments.",
      iconUrl: "/images/icons/award.svg"
    },
    {
      year: "2024",
      title: "New Facilities",
      milestone: "Milestone:", 
      description: "Launched our state-of-the-art learning facilities, incorporating cutting-edge technology to enhance interactive learning for over 300 children.",
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