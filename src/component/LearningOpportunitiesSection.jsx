import Image from 'next/image';

const LearningOpportunitiesSection = () => {
  return (
    <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-8 mb-12 lg:mb-16">
          <div className="flex-1 w-full">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-4 sm:mb-6">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight order-2 sm:order-1">
                Why our school <br className="hidden sm:block"/> 
                <span className="sm:hidden">provides exceptional </span>
                <span className="hidden sm:inline">provides exceptional </span>
                <br className="hidden sm:block"/>
                <span className="sm:hidden">learning opportunities.</span>
                <span className="hidden sm:inline">learning opportunities.</span>
              </h2>
              <div className="flex-shrink-0 order-1 sm:order-2">
                <Image
                  src="/images/icons/earth.svg"
                  alt="Globe icon"
                  width={48}
                  height={48}
                  className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 object-contain"
                />
              </div>
            </div>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-full lg:max-w-xl">
              As Jaipur's trusted RBSE school since 2000, we combine modern teaching methods with Indian values to prepare students for board exams and beyond
            </p>
          </div>
          
          {/* Innovative Curriculum Card */}
          <div className="w-full lg:w-auto lg:flex-shrink-0 mt-6 lg:mt-0">
            <div className="relative bg-gradient-to-br from-pink-100 to-red-100 rounded-2xl lg:rounded-4xl p-4 sm:p-6 border-2 sm:border-4 border-red-400 shadow-lg hover:shadow-xl transition-shadow duration-300 max-w-sm mx-auto lg:max-w-none">
              <div className="relative h-40 sm:h-48 w-full lg:w-80 mb-3 sm:mb-4 rounded-xl sm:rounded-2xl overflow-hidden">
                <Image
                  src="/images/innovative-curriculum.jpg"
                  alt="Students collaborating on innovative curriculum"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 text-center">
                Innovative Curriculum
              </h3>
            </div>
          </div>
        </div>

        {/* Bottom Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Dedicated Educators */}
          <div className="relative bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-2xl lg:rounded-4xl p-4 sm:p-6 border-2 sm:border-4 border-yellow-400 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="relative h-40 sm:h-48 mb-3 sm:mb-4 rounded-xl sm:rounded-2xl overflow-hidden">
              <Image
                src="/images/girl-teacher.jpg"
                alt="Teacher working with students"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 text-center">
              Dedicated Educators
            </h3>
          </div>

          {/* Strong Community */}
          <div className="relative bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl lg:rounded-4xl p-4 sm:p-6 border-2 sm:border-4 border-blue-400 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="relative h-40 sm:h-48 mb-3 sm:mb-4 rounded-xl sm:rounded-2xl overflow-hidden">
              <Image
                src="/images/strong-community.jpg"
                alt="Students and teacher in community setting"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 text-center">
              Strong Community
            </h3>
          </div>

          {/* Personalized Learning */}
          <div className="relative bg-gradient-to-br from-pink-100 to-purple-200 rounded-2xl lg:rounded-4xl p-4 sm:p-6 border-2 sm:border-4 border-pink-400 shadow-lg hover:shadow-xl transition-shadow duration-300 sm:col-span-2 lg:col-span-1">
            <div className="relative h-40 sm:h-48 mb-3 sm:mb-4 rounded-xl sm:rounded-2xl overflow-hidden">
              <Image
                src="/images/personalized-learning.jpg"
                alt="Students engaged in personalized learning"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 text-center">
              Personalized Learning
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearningOpportunitiesSection;