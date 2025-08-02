'use client';
import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Clock, 
  ZoomIn, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Image as ImageLucide,
  Video,
  AlertCircle,
  Loader2
} from 'lucide-react';

export default function ActivityDetail({ params }) {
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoRef, setVideoRef] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (params.id) {
      fetchActivity();
    }
  }, [params.id]);

  const fetchActivity = async () => {
    try {
      setLoading(true);
      const docRef = doc(db, 'activities', params.id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const activityData = docSnap.data();
        setActivity({
          id: docSnap.id,
          ...activityData
        });
        setError(null);
      } else {
        setError('Activity not found');
      }
    } catch (error) {
      console.error('Error fetching activity:', error);
      setError('Failed to load activity. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const getAllImages = () => {
    const images = [];
    if (activity?.mainImage) {
      images.push(activity.mainImage);
    }
    if (activity?.additionalImages && activity.additionalImages.length > 0) {
      images.push(...activity.additionalImages);
    }
    return images;
  };

  const openImageModal = (index) => {
    setSelectedImageIndex(index);
    setShowImageModal(true);
  };

  const closeImageModal = () => {
    setShowImageModal(false);
  };

  const nextImage = () => {
    const allImages = getAllImages();
    setSelectedImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    const allImages = getAllImages();
    setSelectedImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const toggleVideo = () => {
    if (videoRef) {
      if (isVideoPlaying) {
        videoRef.pause();
      } else {
        videoRef.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Loading Activity</h2>
            <p className="text-gray-500">Please wait while we fetch the details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center max-w-md mx-auto px-6">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-10 h-10 text-red-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Oops! Something went wrong</h1>
            <p className="text-gray-600 mb-8">{error}</p>
            <Link 
              href="/"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Activities
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const allImages = getAllImages();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 pb-80">
      {/* Enhanced Navigation Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4">
          <button 
            onClick={() => router.back()}
            className="inline-flex items-center px-3 py-2 md:px-4 md:py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 mr-1.5 md:mr-2" />
            <span className="font-medium text-sm md:text-base">Back to Activities</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
        {/* Hero Section */}
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl overflow-hidden mb-6 md:mb-8">
          <div className="relative">
            {/* Main Image */}
            {activity.mainImage && (
              <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 xl:h-[28rem]">
                <Image
                  src={activity.mainImage}
                  alt={activity.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                
                {/* Floating Action Button */}
                <button
                  onClick={() => openImageModal(0)}
                  className="absolute top-4 right-4 md:top-6 md:right-6 p-2 md:p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-all duration-200"
                >
                  <ZoomIn className="w-4 h-4 md:w-5 md:h-5" />
                </button>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
                  <div className="max-w-4xl">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-2 md:mb-4 leading-tight">
                      {activity.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-2 md:mb-4">
                      <div className="flex items-center text-white/90 bg-black/20 backdrop-blur-sm rounded-full px-3 py-1.5 md:px-4 md:py-2">
                        <Calendar className="w-4 h-4 md:w-5 md:h-5 mr-1.5 md:mr-2" />
                        <span className="font-medium text-sm md:text-base">{formatDate(activity.date)}</span>
                      </div>
                      {activity.category && (
                        <span className="bg-blue-600 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium">
                          {activity.category}
                        </span>
                      )}
                    </div>
                    {activity.shortDescription && (
                      <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl line-clamp-3 md:line-clamp-none">
                        {activity.shortDescription}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Adaptive Content Layout */}
        <div className={`grid gap-8 ${
          activity.video || (allImages.length > 1) 
            ? 'grid-cols-1 lg:grid-cols-3' 
            : 'grid-cols-1'
        }`}>
          {/* Main Content */}
          <div className={`space-y-8 ${
            activity.video || (allImages.length > 1) 
              ? 'lg:col-span-2' 
              : 'max-w-4xl mx-auto'
          }`}>
            {/* Description */}
            {activity.longDescription && (
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <div className="w-1 h-6 md:h-8 bg-blue-600 rounded-full mr-3 md:mr-4"></div>
                  About This Activity
                </h2>
                <div className="prose prose-base md:prose-lg max-w-none text-gray-700 leading-relaxed">
                  <p className="whitespace-pre-wrap text-sm md:text-base">{activity.longDescription}</p>
                </div>
              </div>
            )}

            {/* Video Section - Only show if video exists */}
            {activity.video && (
              <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6 flex items-center">
                  <div className="w-1 h-6 md:h-8 bg-red-500 rounded-full mr-3 md:mr-4"></div>
                  <Video className="w-5 h-5 md:w-6 md:h-6 mr-2" />
                  Activity Video
                </h2>
                <div className="relative rounded-xl overflow-hidden bg-gray-900">
                  <video 
                    ref={setVideoRef}
                    src={activity.video} 
                    className="w-full h-auto max-h-64 md:max-h-96 rounded-xl"
                    poster={activity.mainImage}
                    onPlay={() => setIsVideoPlaying(true)}
                    onPause={() => setIsVideoPlaying(false)}
                    controls
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            )}

            {/* Full Width Gallery - Show when no video and multiple images */}
            {!activity.video && allImages.length > 1 && (
              <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6 flex items-center">
                  <div className="w-1 h-6 md:h-8 bg-purple-600 rounded-full mr-3 md:mr-4"></div>
                  <ImageLucide className="w-5 h-5 md:w-6 md:h-6 mr-2" />
                  Photo Gallery ({allImages.length} Photos)
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
                  {allImages.map((image, index) => (
                    <div 
                      key={index}
                      className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
                      onClick={() => openImageModal(index)}
                    >
                      <Image
                        src={image}
                        alt={`Gallery ${index + 1}`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                        <ZoomIn className="w-4 h-4 md:w-5 md:h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Conditional Sidebar - Only show if video exists or multiple images */}
          {(activity.video || allImages.length > 1) && (
            <div className="space-y-6 md:space-y-8">
              {/* Activity Info Card */}
              <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4">Activity Details</h3>
                <div className="space-y-4">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 md:w-5 md:h-5 mr-3 text-blue-600 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-800 text-sm md:text-base">Date</p>
                      <p className="text-xs md:text-sm">{formatDate(activity.date)}</p>
                    </div>
                  </div>
                  {activity.category && (
                    <div className="flex items-center text-gray-600">
                      <div className="w-4 h-4 md:w-5 md:h-5 mr-3 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full"></div>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 text-sm md:text-base">Category</p>
                        <p className="text-xs md:text-sm">{activity.category}</p>
                      </div>
                    </div>
                  )}
                  {activity.location && (
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 md:w-5 md:h-5 mr-3 text-green-600 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-800 text-sm md:text-base">Location</p>
                        <p className="text-xs md:text-sm">{activity.location}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Photo Gallery Preview - Only show if there are multiple images and video exists */}
              {activity.video && allImages.length > 1 && (
                <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <ImageLucide className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                    Photo Gallery ({allImages.length})
                  </h3>
                  <div className="grid grid-cols-2 gap-2 md:gap-3">
                    {allImages.slice(0, 4).map((image, index) => (
                      <div 
                        key={index}
                        className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
                        onClick={() => openImageModal(index)}
                      >
                        <Image
                          src={image}
                          alt={`Gallery ${index + 1}`}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                          <ZoomIn className="w-4 h-4 md:w-5 md:h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        {index === 3 && allImages.length > 4 && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <span className="text-white font-bold text-sm md:text-lg">+{allImages.length - 4}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  {allImages.length > 4 && (
                    <button
                      onClick={() => openImageModal(0)}
                      className="w-full mt-3 md:mt-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium transition-colors duration-200 text-sm md:text-base cursor-pointer"
                    >
                      View All {allImages.length} Photos
                    </button>
                  )}
                </div>
              )}

              {/* Stats Card - Optional additional info */}
              {(activity.duration || activity.participants) && (
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl shadow-lg p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4">Quick Info</h3>
                  <div className="space-y-3">
                    {activity.duration && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-gray-600">
                          <Clock className="w-4 h-4 md:w-5 md:h-5 mr-2 text-orange-600" />
                          <span className="text-sm md:text-base">Duration</span>
                        </div>
                        <span className="font-semibold text-gray-800 text-sm md:text-base">{activity.duration}</span>
                      </div>
                    )}
                    {activity.participants && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-gray-600">
                          <div className="w-4 h-4 md:w-5 md:h-5 mr-2 bg-purple-600 rounded-full flex items-center justify-center">
                            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full"></div>
                          </div>
                          <span className="text-sm md:text-base">Participants</span>
                        </div>
                        <span className="font-semibold text-gray-800 text-sm md:text-base">{activity.participants}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Image Modal */}
      {showImageModal && allImages.length > 0 && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-6xl max-h-full">
            {/* Header */}
            <div className="absolute -top-16 left-0 right-0 flex items-center justify-between text-white z-10">
              <div className="flex items-center space-x-4">
                <span className="text-lg font-medium">
                  {selectedImageIndex + 1} of {allImages.length}
                </span>
                <span className="text-gray-300">|</span>
                <span className="text-gray-300">Activity Gallery</span>
              </div>
              <button
                onClick={closeImageModal}
                className="p-2 hover:bg-white/10 rounded-full transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Main Image */}
            <div className="relative max-h-[85vh] flex items-center justify-center">
              <img
                src={allImages[selectedImageIndex]}
                alt={`Gallery ${selectedImageIndex + 1}`}
                className="max-h-[85vh] max-w-full object-contain rounded-lg shadow-2xl"
              />
            </div>

            {/* Navigation */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 rounded-full text-white transition-all duration-200"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 rounded-full text-white transition-all duration-200"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Thumbnail Strip */}
            {allImages.length > 1 && (
              <div className="absolute -bottom-20 left-0 right-0 flex justify-center">
                <div className="flex space-x-2 bg-black/50 backdrop-blur-sm rounded-full p-2 max-w-md overflow-x-auto">
                  {allImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 transition-all duration-200 ${
                        index === selectedImageIndex 
                          ? 'ring-2 ring-white' 
                          : 'opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}