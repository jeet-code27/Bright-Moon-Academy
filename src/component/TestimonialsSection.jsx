'use client';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    program: "Pre-Primary Program (Age 2.5-5 yrs)",
    text: "My daughter became more confident after joining Bright Moon Academy. The teachers make learning so fun with games and activities. She now sings ABC rhymes and counts numbers happily!",
    image: "/images/review2.jpg"
  },
  {
    id: 2,
    name: "Rahul Patel",
    program: "Primary School (Class 1-3)",
    text: "The Hindi and English reading program helped my daighter improve so much. Teachers give personal attention to every child. His maths skills are now the best in class!",
    image: "/images/review1.avif"
  },
  {
    id: 3,
    name: "Ananya Gupta",
    program: "Middle School (Class 4-6)",
    text: "My child loves the science experiments and computer classes. The project-based learning method makes studies interesting. She always looks forward to school!",
    image: "/images/review3.webp"
  },
//   {
//     id: 4,
//     name: "Vikram Singh",
//     program: "Senior School (Class 7-8)",
//     text: "Excellent preparation for board exams. The extra classes for maths and science helped my son score 95% in finals. Teachers are very supportive and knowledgeable.",
//     image: "/api/placeholder/400/400"
//   }
];

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const nextTestimonial = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="relative bg-[#ff6464] py-16 px-4 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
      
      {/* Quote marks decoration */}
      <div className="absolute top-8 left-8 opacity-20">
        <Quote className="w-24 h-24 text-white transform rotate-180" />
      </div>
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Parents
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white">
            Testimonials
          </h3>
        </div>

        {/* Main testimonial content - Equal height boxes */}
        <div className="grid lg:grid-cols-2 gap-8 items-stretch max-w-6xl mx-auto">
          {/* Testimonial card - Left Box */}
          <div className="flex">
            <div className="bg-white rounded-3xl p-8 shadow-2xl transform transition-all duration-500 hover:scale-105 w-full h-96 flex flex-col justify-between">
              {/* User info */}
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-400 to-pink-500 overflow-hidden mr-4 shadow-lg">
                  <img 
                    src={currentTestimonial.image}
                    alt={currentTestimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900">
                    {currentTestimonial.name}
                  </h4>
                  <p className="text-gray-600 font-medium">
                    {currentTestimonial.program}
                  </p>
                </div>
                <div className="ml-auto">
                  <Quote className="w-12 h-12 text-gray-800 transform rotate-180" />
                </div>
              </div>
              
              {/* Testimonial text */}
              <div className="flex-1 flex items-center">
                <p className="text-gray-700 text-lg leading-relaxed">
                  {currentTestimonial.text}
                </p>
              </div>
            </div>
          </div>

          {/* Image - Right Box */}
          <div className="flex">
            <div className="relative w-full h-96">
              <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src={currentTestimonial.image}
                  alt={currentTestimonial.name}
                  className="w-full h-full object-cover transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation controls */}
        <div className="flex justify-center items-center mt-12 space-x-4">
          <button 
            onClick={prevTestimonial}
            className="bg-white hover:bg-gray-100 text-gray-700 p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
          >
            <ChevronLeft className="w-6 h-6 cursor-pointer" />
          </button>
          
          {/* Dots indicator */}
          <div className="flex space-x-2 mx-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-white scale-125 shadow-lg' 
                    : 'bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
          
          <button 
            onClick={nextTestimonial}
            className="bg-white hover:bg-gray-100 text-gray-700 p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
          >
            <ChevronRight className="w-6 h-6 cursor-pointer" />
          </button>
        </div>

        {/* View more button */}
        {/* <div className="text-center mt-12">
          <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-white hover:text-red-500 transition-all duration-300 hover:scale-105 hover:shadow-lg">
            View more
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default TestimonialsSection;