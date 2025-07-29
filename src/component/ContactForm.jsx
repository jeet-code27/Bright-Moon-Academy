export default function ContactForm() {
  return (
    <div className="w-full bg-white rounded-t-[50px] md:rounded-t-[100px]  mb-60">
    <div className="w-full max-w-4xl mx-auto px-4 py-8  rounded-t-[50px] md:rounded-t-[100px] ">
      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg mt-10 ">
        {/* Header Section */}
        <div className="text-center mb-8 ">
          <div className="flex justify-start mb-6">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center transform rotate-45">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
          </div>
          
          <h2 className="text-lg md:text-xl text-gray-700 font-medium mb-2">Contact</h2>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-8">Our Team</h1>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Contact Person Field */}
          <div>
            <div className="block text-gray-700 font-medium mb-3 text-sm md:text-base">
              Contact Person
            </div>
            <input
              type="text"
              name="contactPerson"
              placeholder="Jane Smith"
              className="w-full px-4 py-4 md:py-5 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200 text-gray-700 placeholder-gray-400 text-sm md:text-base"
            />
          </div>

          {/* Email and Phone Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Email Field */}
            <div>
              <div className="block text-gray-700 font-medium mb-3 text-sm md:text-base">
                Email Address
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="w-full px-4 py-4 md:py-5 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200 text-gray-700 placeholder-gray-400 text-sm md:text-base"
              />
            </div>

            {/* Phone Field */}
            <div>
              <div className="block text-gray-700 font-medium mb-3 text-sm md:text-base">
                Phone
              </div>
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                className="w-full px-4 py-4 md:py-5 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200 text-gray-700 placeholder-gray-400 text-sm md:text-base"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="button"
              className="w-full bg-[#FF6464] hover:bg-[#FF5252] text-white font-semibold py-4 md:py-5 px-6 rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-transform text-sm md:text-base cursor-pointer"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}