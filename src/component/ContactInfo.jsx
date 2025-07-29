import { Phone, Mail, Clock } from "lucide-react";

export default function ContactInfo() {
  return (
    <div className="max-w-full rounded-t-[50px] md:rounded-t-[100px]     bg-white">
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Phone Number Card */}
        <div className="bg-gray-50 rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-shadow duration-300 border">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-[#FF6464] rounded-full flex items-center justify-center">
              <Phone className="w-8 h-8 text-white" strokeWidth={2} />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-[#081646] mb-4">Phone Number</h3>
          <p className="text-lg text-gray-600 font-medium">96022 71765</p>
        </div>

        {/* Email Address Card */}
        <div className="bg-gray-50 rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-shadow duration-300 border">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-[#FF6464] rounded-full flex items-center justify-center">
              <Mail className="w-8 h-8 text-white" strokeWidth={2} />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-[#081646] mb-4">Email Address</h3>
          <p className="text-lg text-gray-600 font-medium break-all">brightmoonacademy09@gmail.com</p>
        </div>

        {/* Office Hours Card */}
        <div className="bg-gray-50 rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-shadow duration-300 border">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-[#FF6464] rounded-full flex items-center justify-center">
              <Clock className="w-8 h-8 text-white" strokeWidth={2} />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-[#081646] mb-4">Office Hour</h3>
          <p className="text-lg text-gray-600 font-medium">Monday to Saturday: 8.30am – 04.00pm</p>
        </div>
      </div>
    </div>
    </div>
  );
}