const Hero = ({ title = "About us" }) => {
  return (
    <section className="relative w-full py-20 px-4" style={{ backgroundColor: '#FBF9F0' }}>
      {/* Green circle - top left */}
      <div className="absolute top-16 left-8 w-4 h-4 bg-green-500 rounded-full"></div>
      
      {/* Orange diamond - top right */}
      <div className="absolute top-8 right-1/3 w-4 h-4 bg-orange-400 transform rotate-45"></div>
      
      {/* Pink/Red star - middle left */}
      <div className="absolute top-1/2 left-1/4 transform -translate-y-1/2">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L14.09 8.26L20 9L14.55 13.97L16.18 20L12 16.77L7.82 20L9.45 13.97L4 9L9.91 8.26L12 2Z" 
                fill="#EF4444" />
        </svg>
      </div>
      
      {/* Blue four-square pattern - bottom right */}
      <div className="absolute bottom-20 right-12">
            <div className="grid grid-cols-2 gap-1">
              <div className="w-3 h-3 bg-blue-600 transform rotate-45"></div>
              <div className="w-3 h-3 bg-blue-600 transform rotate-45"></div>
              <div className="w-3 h-3 bg-blue-600 transform rotate-45"></div>
              <div className="w-3 h-3 bg-blue-600 transform rotate-45"></div>
            </div>
      </div>
      
      {/* Main content */}
      <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#081646] mb-4">
          {title}
        </h2>
      </div>
    </section>
  );
};

export default Hero;