'use client';
import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Save, 
  ArrowLeft, 
  AlertCircle, 
  Info, 
  Calendar,
  CheckCircle,
  Clock,
  Type,
  FileText,
  Tag,
  Eye,
  EyeOff,
  Users
} from 'lucide-react';

// Notice types with colors and icons
const NOTICE_TYPES = [
  { id: 'general', label: 'General', color: 'bg-blue-100 text-blue-800 border-blue-200', icon: Info },
  { id: 'urgent', label: 'Urgent', color: 'bg-red-100 text-red-800 border-red-200', icon: AlertCircle },
  { id: 'event', label: 'Event', color: 'bg-green-100 text-green-800 border-green-200', icon: Calendar },
  { id: 'holiday', label: 'Holiday', color: 'bg-purple-100 text-purple-800 border-purple-200', icon: CheckCircle },
  { id: 'exam', label: 'Exam', color: 'bg-orange-100 text-orange-800 border-orange-200', icon: Clock }
];

// Priority levels
const PRIORITY_LEVELS = [
  { id: 1, label: 'Low', color: 'bg-gray-100 text-gray-800' },
  { id: 2, label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
  { id: 3, label: 'High', color: 'bg-red-100 text-red-800' }
];

// Helper function to safely format dates for form inputs
const formatDateForInput = (dateValue) => {
  try {
    let date;
    
    if (!dateValue) return '';
    
    // Handle Firestore Timestamp
    if (dateValue.toDate && typeof dateValue.toDate === 'function') {
      date = dateValue.toDate();
    }
    // Handle regular Date object
    else if (dateValue instanceof Date) {
      date = dateValue;
    }
    // Handle date string
    else if (typeof dateValue === 'string') {
      date = new Date(dateValue);
    }
    // Handle timestamp number
    else if (typeof dateValue === 'number') {
      date = new Date(dateValue);
    }
    else {
      return '';
    }

    // Check if date is valid
    if (isNaN(date.getTime())) {
      return '';
    }

    // Return in YYYY-MM-DD format for date input
    return date.toISOString().split('T')[0];
  } catch (error) {
    console.error('Error formatting date for input:', error);
    return '';
  }
};

// Helper function to format dates for display
const formatDateForDisplay = (dateValue) => {
  try {
    let date;
    
    if (!dateValue) return null;
    
    // Handle Firestore Timestamp
    if (dateValue.toDate && typeof dateValue.toDate === 'function') {
      date = dateValue.toDate();
    }
    // Handle regular Date object
    else if (dateValue instanceof Date) {
      date = dateValue;
    }
    // Handle date string
    else if (typeof dateValue === 'string') {
      date = new Date(dateValue);
    }
    // Handle timestamp number
    else if (typeof dateValue === 'number') {
      date = new Date(dateValue);
    }
    else {
      return null;
    }

    // Check if date is valid
    if (isNaN(date.getTime())) {
      return null;
    }

    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    console.error('Error formatting date for display:', error);
    return null;
  }
};

export default function NoticeForm({ initialData = null, onSubmit, isLoading = false }) {
 const [formData, setFormData] = useState({
  title: '',
  content: '',
  type: 'general',
  priority: 2, 
  isActive: true,
  expiryDate: '',
  targetAudience: 'all'
});

  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(false);

  useEffect(() => {
  if (initialData) {
    setFormData({
      title: initialData.title || '',
      content: initialData.content || '',
      type: initialData.type || 'general',
      priority: initialData.priority ? Number(initialData.priority) : 2, // Ensure number
      isActive: initialData.isActive !== undefined ? initialData.isActive : true,
      expiryDate: formatDateForInput(initialData.expiryDate),
      targetAudience: initialData.targetAudience || 'all'
    });
  }
}, [initialData]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.trim().length < 5) {
      newErrors.title = 'Title must be at least 5 characters long';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    } else if (formData.content.trim().length < 10) {
      newErrors.content = 'Content must be at least 10 characters long';
    }

    if (formData.expiryDate) {
      const expiryDate = new Date(formData.expiryDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (expiryDate < today) {
        newErrors.expiryDate = 'Expiry date cannot be in the past';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Scroll to first error
      const firstErrorElement = document.querySelector('.border-red-300');
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Prepare data for submission
    const submitData = {
      ...formData,
      title: formData.title.trim(),
      content: formData.content.trim(),
      priority: parseInt(formData.priority),
      expiryDate: formData.expiryDate ? new Date(formData.expiryDate) : null
    };

    onSubmit(submitData);
  };

  const getNoticeTypeInfo = (typeId) => {
    return NOTICE_TYPES.find(type => type.id === typeId) || NOTICE_TYPES[0];
  };

  const getPriorityInfo = (priorityId) => {
  return PRIORITY_LEVELS.find(p => p.id === Number(priorityId)) || PRIORITY_LEVELS[1]; 
};

  const typeInfo = getNoticeTypeInfo(formData.type);
  const priorityInfo = getPriorityInfo(formData.priority);
  const TypeIcon = typeInfo.icon;

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Header */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Bell className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                {initialData ? 'Edit Notice' : 'Create New Notice'}
              </h2>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setPreview(!preview)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  preview 
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                    : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                }`}
              >
                {preview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {preview ? 'Edit Mode' : 'Preview'}
              </button>
            </div>
          </div>

          {/* Preview Mode */}
          {preview ? (
            <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className={`p-2 rounded-lg ${typeInfo.color} flex-shrink-0`}>
                      <TypeIcon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-lg text-gray-900 break-words">{formData.title || 'Notice Title'}</h3>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeInfo.color}`}>
                          {typeInfo.label}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityInfo.color}`}>
                          {priorityInfo.label} Priority
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          formData.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {formData.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="prose prose-sm max-w-none mb-4">
                  <p className="text-gray-600 whitespace-pre-wrap break-words">
                    {formData.content || 'Notice content will appear here...'}
                  </p>
                </div>
                
                {formData.expiryDate && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4 flex-shrink-0" />
                      <span>Expires on: {formatDateForDisplay(formData.expiryDate)}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Form Fields */
            <div className="space-y-6">
              {/* Title */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Type className="w-4 h-4" />
                  Notice Title
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter notice title..."
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.title ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  maxLength={100}
                />
                {errors.title && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.title}
                  </p>
                )}
                <p className="mt-1 text-xs text-gray-500">{formData.title.length}/100 characters</p>
              </div>

              {/* Content */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <FileText className="w-4 h-4" />
                  Notice Content
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  placeholder="Enter the detailed notice content..."
                  rows={8}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-vertical ${
                    errors.content ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  maxLength={2000}
                />
                {errors.content && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.content}
                  </p>
                )}
                <p className="mt-1 text-xs text-gray-500">{formData.content.length}/2000 characters</p>
              </div>

              {/* Type and Priority Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Notice Type */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Tag className="w-4 h-4" />
                    Notice Type
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none bg-white"
                  >
                    {NOTICE_TYPES.map((type) => {
                      return (
                        <option key={type.id} value={type.id}>
                          {type.label}
                        </option>
                      );
                    })}
                  </select>
                  <div className="mt-2 flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeInfo.color}`}>
                      <TypeIcon className="w-3 h-3 inline mr-1" />
                      {typeInfo.label}
                    </span>
                  </div>
                </div>

                {/* Priority */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <AlertCircle className="w-4 h-4" />
                    Priority Level
                  </label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none bg-white"
                  >
                    {PRIORITY_LEVELS.map((priority) => (
                      <option key={priority.id} value={priority.id}>
                        {priority.label}
                      </option>
                    ))}
                  </select>
                  <div className="mt-2 flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityInfo.color}`}>
                      {priorityInfo.label} Priority
                    </span>
                  </div>
                </div>
              </div>

              {/* Target Audience and Expiry Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Target Audience */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Users className="w-4 h-4" />
                    Target Audience
                  </label>
                  <select
                    name="targetAudience"
                    value={formData.targetAudience}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none bg-white"
                  >
                    <option value="all">All</option>
                    <option value="students">Students</option>
                    <option value="teachers">Teachers</option>
                    <option value="parents">Parents</option>
                    <option value="staff">Staff</option>
                  </select>
                </div>

                {/* Expiry Date */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4" />
                    Expiry Date (Optional)
                  </label>
                  <input
                    type="date"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      errors.expiryDate ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  {errors.expiryDate && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.expiryDate}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">
                    Leave empty if the notice doesn&apos;t expire
                  </p>
                </div>
              </div>

              {/* Status Toggle */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <Eye className="w-4 h-4" />
                      Notice Status
                    </label>
                    <p className="text-xs text-gray-500 mt-1">
                      {formData.isActive 
                        ? 'This notice will be visible to users immediately after saving' 
                        : 'This notice will be hidden from users'
                      }
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={formData.isActive}
                      onChange={handleInputChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    <span className="ml-3 text-sm font-medium text-gray-700">
                      {formData.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Cancel
            </button>
            
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  {initialData ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  {initialData ? 'Update Notice' : 'Create Notice'}
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}