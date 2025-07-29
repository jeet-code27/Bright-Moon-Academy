import { MapPin, Phone, Navigation } from 'lucide-react';

const ContactSchoolLocation = () => {
  return (
    <div className="min-h-screen bg-[#FFCF55] p-2 rounded-t-[50px] md:rounded-t-[100px] mt-14 pb-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 mt-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-500 rounded-lg mb-4">
            <Navigation className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-semibold text-[#081646] mb-2">School</h1>
          <h2 className="text-4xl font-bold text-[#081646]">Location</h2>
        </div>

        {/* Location Card */}
        <div className="bg-white rounded-3xl shadow-2xl border overflow-hidden">
          {/* Map Container */}
          <div className="relative p-10">
            <div className="aspect-video w-full ">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3555.2434895699566!2d75.85207967522724!3d26.990846376600665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db10709fc5817%3A0x1f7aefbf4a8af04c!2sBRIGHT%20MOON%20ACADEMY!5e0!3m2!1sen!2sin!4v1753698136400!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-4xl"
              />
            </div>
           
          </div>

          {/* School Information */}
          <div className="p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Jaipur, Rajasthan</h3>
            
            <div className="space-y-4">
              {/* School Name */}
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Bright Moon Academy</h4>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-700">1/444, KUNDLAV COLONY, SARAG ROAD, AMER, JAIPUR, RAJASTHAN -302028</p>
                </div>
              </div>

              {/* Contact */}
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-500 flex-shrink-0" />
                <div>
                  <a 
                    href="tel:+919602271765" 
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    96022 71765
                  </a>
                </div>
              </div>
            </div>

            {/* Get Direction Button */}
            <div className="mt-6">
              <a
                href="https://www.google.com/maps/dir//BRIGHT+MOON+ACADEMY,+1%2F444,+KUNDLAV+COLONY,+SARAG+ROAD,+AMER,+Jaipur,+Rajasthan+302028/@26.9908464,75.8520797,17z"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                <Navigation className="w-4 h-4" />
                Get Direction
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSchoolLocation;