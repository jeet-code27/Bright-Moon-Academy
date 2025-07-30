'use client';
import React, { useState, useEffect } from 'react';
import { 
  Upload, 
  X, 
  Calendar, 
  FileText, 
  ImageIcon, 
  Video, 
  Tag,
  Save,
  ArrowLeft,
  Loader2
} from 'lucide-react';

// Category options with icons and colors
const CATEGORIES = [
  { id: 'academic', label: 'Academic', color: 'bg-blue-100 text-blue-800', icon: '📚' },
  { id: 'sports', label: 'Sports', color: 'bg-green-100 text-green-800', icon: '⚽' },
  { id: 'cultural', label: 'Cultural', color: 'bg-purple-100 text-purple-800', icon: '🎭' },
  { id: 'technology', label: 'Technology', color: 'bg-gray-100 text-gray-800', icon: '💻' },
  { id: 'science', label: 'Science', color: 'bg-cyan-100 text-cyan-800', icon: '🔬' },
  { id: 'arts', label: 'Arts', color: 'bg-pink-100 text-pink-800', icon: '🎨' },
  { id: 'community', label: 'Community Service', color: 'bg-orange-100 text-orange-800', icon: '🤝' },
  { id: 'workshop', label: 'Workshop', color: 'bg-yellow-100 text-yellow-800', icon: '🛠️' },
  { id: 'competition', label: 'Competition', color: 'bg-red-100 text-red-800', icon: '🏆' },
  { id: 'other', label: 'Other', color: 'bg-indigo-100 text-indigo-800', icon: '📌' }
];

export default function ActivityForm({ initialData = {}, onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    category: initialData.category || '',
    date: initialData.date || '',
    shortDescription: initialData.shortDescription || '',
    longDescription: initialData.longDescription || '',
    mainImage: initialData.mainImage || '',
    additionalImages: initialData.additionalImages || [],
    video: initialData.video || ''
  });

  // Track original images for cleanup
  const [originalImages, setOriginalImages] = useState({
    mainImage: '',
    additionalImages: [],
    video: ''
  });

  // Initialize original images when initialData changes
  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setOriginalImages({
        mainImage: initialData.mainImage || '',
        additionalImages: initialData.additionalImages || [],
        video: initialData.video || ''
      });
    }
  }, [initialData]);

  const [uploadingStates, setUploadingStates] = useState({
    mainImage: false,
    additionalImages: false,
    video: false
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleImageUpload = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size should be less than 10MB');
      return;
    }

    setUploadingStates(prev => ({ ...prev, [field]: true }));

    try {
      // Replace with your actual uploadToCloudinary function
      const uploadToCloudinary = (await import('../lib/cloudinary')).uploadToCloudinary;
      const result = await uploadToCloudinary(file, field === 'video' ? 'video' : 'image');
      setFormData(prev => ({ ...prev, [field]: result.url }));
    } catch (error) {
      alert('Upload failed: ' + error.message);
    } finally {
      setUploadingStates(prev => ({ ...prev, [field]: false }));
    }
  };

  const handleMultipleImages = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    // Validate total files (max 5 additional images)
    if (formData.additionalImages.length + files.length > 5) {
      alert('Maximum 5 additional images allowed');
      return;
    }

    setUploadingStates(prev => ({ ...prev, additionalImages: true }));

    try {
      const uploadToCloudinary = (await import('../lib/cloudinary')).uploadToCloudinary;
      const uploadPromises = files.map(file => {
        // Validate file size
        if (file.size > 10 * 1024 * 1024) {
          throw new Error(`File ${file.name} is too large`);
        }
        return uploadToCloudinary(file, 'image');
      });

      const results = await Promise.all(uploadPromises);
      const urls = results.map(result => result.url);
      
      setFormData(prev => ({ 
        ...prev, 
        additionalImages: [...prev.additionalImages, ...urls] 
      }));
    } catch (error) {
      alert('Upload failed: ' + error.message);
    } finally {
      setUploadingStates(prev => ({ ...prev, additionalImages: false }));
    }
  };

  const removeAdditionalImage = async (indexToRemove) => {
    const imageToRemove = formData.additionalImages[indexToRemove];
    
    // Only delete from Cloudinary if it was in the original data (not newly uploaded)
    if (originalImages.additionalImages.includes(imageToRemove)) {
      try {
        const { deleteImageByUrl } = await import('../lib/cloudinary');
        await deleteImageByUrl(imageToRemove);
      } catch (error) {
        console.error('Failed to delete image from Cloudinary:', error);
        // Continue with removal from form even if Cloudinary deletion fails
      }
    }
    
    setFormData(prev => ({
      ...prev,
      additionalImages: prev.additionalImages.filter((_, index) => index !== indexToRemove)
    }));
  };

  const removeMainImage = async () => {
    const imageToRemove = formData.mainImage;
    
    // Only delete from Cloudinary if it was in the original data
    if (originalImages.mainImage === imageToRemove && imageToRemove) {
      try {
        const { deleteImageByUrl } = await import('../lib/cloudinary');
        await deleteImageByUrl(imageToRemove);
      } catch (error) {
        console.error('Failed to delete main image from Cloudinary:', error);
      }
    }
    
    setFormData(prev => ({ ...prev, mainImage: '' }));
  };

  const removeVideo = async () => {
    const videoToRemove = formData.video;
    
    // Only delete from Cloudinary if it was in the original data
    if (originalImages.video === videoToRemove && videoToRemove) {
      try {
        const { deleteImageByUrl } = await import('../lib/cloudinary');
        await deleteImageByUrl(videoToRemove); // This handles both images and videos
      } catch (error) {
        console.error('Failed to delete video from Cloudinary:', error);
      }
    }
    
    setFormData(prev => ({ ...prev, video: '' }));
  };

  const getSelectedCategory = () => {
    return CATEGORIES.find(cat => cat.id === formData.category);
  };

  return (
    <div className="max-w-4xl mx-auto pb-80 px-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <FileText className="w-7 h-7" />
            {initialData.title ? 'Edit Activity' : 'Create New Activity'}
          </h2>
          <p className="text-blue-100 mt-2">
            Fill in the details below to {initialData.title ? 'update' : 'create'} your activity
          </p>
        </div>

        <div className="p-8 space-y-8">
          {/* Title & Category Row */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <FileText className="w-4 h-4" />
                Activity Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                required
                placeholder="Enter a compelling activity title"
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Tag className="w-4 h-4" />
                Category *
              </label>
              <div className="relative">
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white appearance-none"
                  required
                >
                  <option value="">Select a category</option>
                  {CATEGORIES.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.icon} {category.label}
                    </option>
                  ))}
                </select>
                <Tag className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
              {formData.category && (
                <div className="mt-2">
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getSelectedCategory()?.color}`}>
                    {getSelectedCategory()?.icon} {getSelectedCategory()?.label}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Date */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Calendar className="w-4 h-4" />
              Activity Date *
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full md:w-1/2 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
              required
            />
          </div>

          {/* Descriptions */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Short Description */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <FileText className="w-4 h-4" />
                Short Description *
              </label>
              <textarea
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl h-28 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
                required
                placeholder="Brief description for preview (max 200 characters)"
                maxLength="200"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>For activity previews and cards</span>
                <span className={formData.shortDescription.length > 180 ? 'text-orange-500' : ''}>
                  {formData.shortDescription.length}/200
                </span>
              </div>
            </div>

            {/* Long Description */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <FileText className="w-4 h-4" />
                Detailed Description *
              </label>
              <textarea
                name="longDescription"
                value={formData.longDescription}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl h-28 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
                required
                placeholder="Comprehensive description of the activity, its objectives, and outcomes"
              />
              <p className="text-xs text-gray-500">Detailed information shown on activity page</p>
            </div>
          </div>

          {/* Media Upload Section */}
          <div className="space-y-8">
            <div className="border-t pt-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <ImageIcon className="w-5 h-5" />
                Media Assets
              </h3>

              {/* Main Image */}
              <div className="space-y-4 mb-8">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <ImageIcon className="w-4 h-4" />
                  Main Image * <span className="text-xs font-normal text-gray-500">(Primary display image)</span>
                </label>
                
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 transition-colors hover:border-gray-400">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'mainImage')}
                    className="hidden"
                    id="mainImage"
                    disabled={uploadingStates.mainImage}
                  />
                  
                  {!formData.mainImage ? (
                    <label htmlFor="mainImage" className="cursor-pointer flex flex-col items-center gap-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Upload className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-700">Click to upload main image</p>
                        <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                      </div>
                    </label>
                  ) : (
                    <div className="relative inline-block">
                      <img 
                        src={formData.mainImage} 
                        alt="Main preview" 
                        className="w-48 h-32 object-cover rounded-lg border shadow-sm" 
                      />
                      <button
                        type="button"
                        onClick={removeMainImage}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors cursor-pointer shadow-lg"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                  
                  {uploadingStates.mainImage && (
                    <div className="flex items-center gap-2 text-blue-600 mt-3">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-sm">Uploading image...</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Additional Images */}
              <div className="space-y-4 mb-8">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <ImageIcon className="w-4 h-4" />
                  Additional Images <span className="text-xs font-normal text-gray-500">(Max 5 images)</span>
                </label>
                
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 transition-colors hover:border-gray-400">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleMultipleImages}
                    className="hidden"
                    id="additionalImages"
                    disabled={uploadingStates.additionalImages || formData.additionalImages.length >= 5}
                  />
                  
                  <label htmlFor="additionalImages" className="cursor-pointer flex flex-col items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Upload className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-700">Upload additional images</p>
                      <p className="text-xs text-gray-500">Multiple selection allowed</p>
                    </div>
                  </label>
                  
                  {uploadingStates.additionalImages && (
                    <div className="flex items-center gap-2 text-green-600 mt-3">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-sm">Uploading images...</span>
                    </div>
                  )}
                </div>
                
                {formData.additionalImages.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-4">
                    {formData.additionalImages.map((url, index) => (
                      <div key={index} className="relative group">
                        <img 
                          src={url} 
                          alt={`Additional ${index + 1}`} 
                          className="w-full h-24 object-cover rounded-lg border shadow-sm" 
                        />
                        <button
                          type="button"
                          onClick={() => removeAdditionalImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 transition-colors shadow-lg opacity-0 cursor-pointer group-hover:opacity-100"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Gallery images for detailed view</span>
                  <span className={formData.additionalImages.length >= 5 ? 'text-orange-500' : ''}>
                    {formData.additionalImages.length}/5 images
                  </span>
                </div>
              </div>

              {/* Video */}
              <div className="space-y-4">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Video className="w-4 h-4" />
                  Video <span className="text-xs font-normal text-gray-500">(Optional)</span>
                </label>
                
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 transition-colors hover:border-gray-400">
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => handleImageUpload(e, 'video')}
                    className="hidden"
                    id="video"
                    disabled={uploadingStates.video}
                  />
                  
                  {!formData.video ? (
                    <label htmlFor="video" className="cursor-pointer flex flex-col items-center gap-3">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Video className="w-6 h-6 text-purple-600" />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-700">Upload activity video</p>
                        <p className="text-xs text-gray-500">MP4, MOV up to 10MB</p>
                      </div>
                    </label>
                  ) : (
                    <div className="relative inline-block">
                      <video 
                        src={formData.video} 
                        controls 
                        className="w-80 h-48 rounded-lg border shadow-sm" 
                      />
                      <button
                        type="button"
                        onClick={removeVideo}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors shadow-lg cursor-pointer"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                  
                  {uploadingStates.video && (
                    <div className="flex items-center gap-2 text-purple-600 mt-3">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-sm">Uploading video...</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t">
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading || Object.values(uploadingStates).some(state => state)}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving Activity...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  {initialData.title ? 'Update Activity' : 'Create Activity'}
                </>
              )}
            </button>
            
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-8 py-3 border-2 cursor-pointer border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-semibold transition-all duration-200 flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}