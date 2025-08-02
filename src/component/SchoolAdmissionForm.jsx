'use client';
import React, { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  BookOpen, 
  FileText, 
  Send,
  Loader2,
  CheckCircle,
  AlertCircle,
  GraduationCap,
  Users,
  Star,
  Award,
  Heart,
  Sparkles
} from 'lucide-react';
import Image from 'next/image';

const CLASSES = [
  { id: 'playgroup', label: 'Play Group' },
  { id: 'nursery', label: 'Nursery' },
  { id: 'lkg', label: 'LKG' },
  { id: 'ukg', label: 'UKG' },
  { id: 'class1', label: 'Class 1st' },
  { id: 'class2', label: 'Class 2nd' },
  { id: 'class3', label: 'Class 3rd' },
  { id: 'class4', label: 'Class 4th' },
  { id: 'class5', label: 'Class 5th' },
  { id: 'class6', label: 'Class 6th' },
  { id: 'class7', label: 'Class 7th' },
  { id: 'class8', label: 'Class 8th' },
  { id: 'class9', label: 'Class 9th' },
  { id: 'class10', label: 'Class 10th' }
];

export default function SchoolAdmissionForm() {
  const [formData, setFormData] = useState({
    studentName: '',
    fatherName: '',
    motherName: '',
    email: '',
    phone: '',
    alternatePhone: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    city: 'Jaipur',
    state: 'Rajasthan',
    pincode: '',
    classApplying: '',
    previousSchool: '',
    bloodGroup: '',
    medicalConditions: '',
    transportRequired: false,
    additionalInfo: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [submissionId, setSubmissionId] = useState('');

  // Scroll to top when submission state changes
  useEffect(() => {
    if (submitted) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [submitted]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.studentName.trim()) newErrors.studentName = 'Student name is required';
    if (!formData.fatherName.trim()) newErrors.fatherName = 'Father name is required';
    if (!formData.motherName.trim()) newErrors.motherName = 'Mother name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';
    if (!formData.classApplying) newErrors.classApplying = 'Class selection is required';

    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    // Phone validation
    if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    // Alternate phone validation (only if provided)
    if (formData.alternatePhone && !/^\d{10}$/.test(formData.alternatePhone)) {
      newErrors.alternatePhone = 'Please enter a valid 10-digit alternate phone number';
    }

    // Pincode validation
    if (formData.pincode && !/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Please enter a valid 6-digit pincode';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitToFirebase = async (admissionData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      return {
        success: true,
        id: `doc_${Date.now()}`,
        applicationNumber: `ADM${Date.now()}`
      };
    } catch (error) {
      console.error('Submission error:', error);
      throw new Error(`Failed to submit application: ${error.message}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Scroll to first error
      const firstErrorElement = document.querySelector('.border-red-500');
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setLoading(true);

    try {
      // Prepare submission data
      const submissionData = {
        ...formData,
        studentName: formData.studentName.trim(),
        fatherName: formData.fatherName.trim(),
        motherName: formData.motherName.trim(),
        email: formData.email.trim().toLowerCase(),
        address: formData.address.trim(),
        city: formData.city.trim(),
        state: formData.state.trim(),
        previousSchool: formData.previousSchool.trim(),
        medicalConditions: formData.medicalConditions.trim(),
        additionalInfo: formData.additionalInfo.trim(),
        dateOfBirth: new Date(formData.dateOfBirth),
      };

      // Submit to Firebase
      const result = await submitToFirebase(submissionData);
      
      if (result.success) {
        setSubmissionId(result.applicationNumber);
        setSubmitted(true);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(`Error submitting application: ${error.message}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setSubmissionId('');
    setFormData({
      studentName: '',
      fatherName: '',
      motherName: '',
      email: '',
      phone: '',
      alternatePhone: '',
      dateOfBirth: '',
      gender: '',
      address: '',
      city: 'Jaipur',
      state: 'Rajasthan',
      pincode: '',
      classApplying: '',
      previousSchool: '',
      bloodGroup: '',
      medicalConditions: '',
      transportRequired: false,
      additionalInfo: ''
    });
    setErrors({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-pink-300 to-purple-400 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-300 to-cyan-400 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-yellow-200 to-orange-300 rounded-full opacity-10 animate-pulse"></div>
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <div className="max-w-lg w-full bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 text-center border border-white/20">
            <div className="relative">
              {/* Success animation */}
              <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <CheckCircle className="w-12 h-12 text-white animate-bounce" />
              </div>
              
              {/* Sparkle effects */}
              <div className="absolute -top-2 -right-2">
                <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
              </div>
              <div className="absolute -bottom-2 -left-2">
                <Star className="w-5 h-5 text-pink-400 animate-pulse" />
              </div>
            </div>

            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Application Submitted!
            </h2>
            
            <div className="flex items-center justify-center gap-2 mb-6">
              <Heart className="w-5 h-5 text-red-500 animate-pulse" />
              <p className="text-gray-600 font-medium">
                Thank you for choosing Bright Moon Academy
              </p>
              <Heart className="w-5 h-5 text-red-500 animate-pulse" />
            </div>
            
            {submissionId && (
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-6 mb-6 shadow-inner">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Award className="w-5 h-5 text-blue-600" />
                  <p className="text-sm font-semibold text-blue-800">Your Application Number</p>
                </div>
                <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {submissionId}
                </p>
                <p className="text-xs text-blue-600 mt-2 font-medium">
                  🔖 Please save this number for future reference
                </p>
              </div>
            )}
            
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 mb-6 text-left shadow-inner border border-gray-200">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-5 h-5 text-gray-600" />
                <p className="text-sm text-gray-800 font-semibold">What happens next?</p>
              </div>
              <ul className="text-sm text-gray-700 space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Application review within 2-3 working days
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  Our team will contact you soon
                </li>
              </ul>
            </div>
            
            <button
              onClick={resetForm}
              className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white py-4 rounded-xl hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              ✨ Submit Another Application
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-pink-300 to-purple-400 rounded-full opacity-20 animate-pulse"></div>
        
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-br from-yellow-200 to-orange-300 rounded-full opacity-10 animate-pulse"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 ">
        <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
          <div className="text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              <div className="w-20 h-20 relative cursor-pointer">
               <Image 
  src="/images/school-logo.png" 
  alt="Bright Moon Academy Logo"
  fill
  style={{
    objectFit: "contain"
  }}
  className="hover:scale-105 transition-transform duration-300"
/>
              </div>
              <div>
                <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                  Bright Moon Academy
                </h1>
                <p className="text-[12px] sm:text-sm text-purple-600 font-semibold flex items-center justify-center gap-2 mt-1">
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                 1/444, KUNDLAV COLONY,SARAG ROAD,  <br/>  AMER, JAIPUR 302028, RAJASTHAN 

                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm">
              <div className="flex items-center gap-1 sm:gap-2 bg-yellow-100 px-3 sm:px-4 py-1 sm:py-2 rounded-full shadow-sm cursor-pointer hover:bg-yellow-200 transition-colors">
                <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-600" />
                <span className="font-semibold text-yellow-800">Excellence in Education</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2 bg-blue-100 px-3 sm:px-4 py-1 sm:py-2 rounded-full shadow-sm cursor-pointer hover:bg-blue-200 transition-colors">
                <Users className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                <span className="font-semibold text-blue-800">Play Group to 10th</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2 bg-green-100 px-3 sm:px-4 py-1 sm:py-2 rounded-full shadow-sm cursor-pointer hover:bg-green-200 transition-colors">
                <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                <span className="font-semibold text-green-800">Nurturing Environment</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-6 sm:py-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/20">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 px-6 sm:px-8 py-6 sm:py-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20"></div>
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-2 sm:gap-3 mb-2">
                <FileText className="w-6 h-6 sm:w-8 sm:h-8" />
                Admission Application Form
              </h2>
              <p className="text-purple-100 text-sm sm:text-lg flex items-center gap-1 sm:gap-2">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                Join our family of learners and achievers
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8 sm:space-y-10">
            {/* Student Information */}
            <div className="space-y-6">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2 sm:gap-3 pb-2 border-b-2 border-purple-200">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <User className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
                Student Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                    Student Full Name *
                  </label>
                  <input
                    type="text"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleChange}
                    className={`w-full px-4 sm:px-5 py-3 sm:py-4 border-2 rounded-xl focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200 bg-white/50 ${
                      errors.studentName ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-purple-300'
                    }`}
                    placeholder="Enter student's full name"
                  />
                  {errors.studentName && (
                    <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600 flex items-center gap-1 sm:gap-2 font-medium">
                      <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                      {errors.studentName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                    Class Applying For *
                  </label>
                  <select
                    name="classApplying"
                    value={formData.classApplying}
                    onChange={handleChange}
                    className={`w-full px-4 sm:px-5 py-3 sm:py-4 border-2 rounded-xl focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200 bg-white/50 ${
                      errors.classApplying ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-purple-300'
                    } cursor-pointer`}
                  >
                    <option value="">Select Class</option>
                    {CLASSES.map((cls) => (
                      <option key={cls.id} value={cls.id}>
                        {cls.label}
                      </option>
                    ))}
                  </select>
                  {errors.classApplying && (
                    <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600 flex items-center gap-1 sm:gap-2 font-medium">
                      <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                      {errors.classApplying}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className={`w-full px-4 sm:px-5 py-3 sm:py-4 border-2 rounded-xl focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200 bg-white/50 ${
                      errors.dateOfBirth ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-purple-300'
                    } cursor-pointer`}
                  />
                  {errors.dateOfBirth && (
                    <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600 flex items-center gap-1 sm:gap-2 font-medium">
                      <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                      {errors.dateOfBirth}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                    Gender *
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className={`w-full px-4 sm:px-5 py-3 sm:py-4 border-2 rounded-xl focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200 bg-white/50 ${
                      errors.gender ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-purple-300'
                    } cursor-pointer`}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.gender && (
                    <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600 flex items-center gap-1 sm:gap-2 font-medium">
                      <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                      {errors.gender}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                    Blood Group
                  </label>
                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    className="w-full px-4 sm:px-5 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200 bg-white/50 hover:border-purple-300 cursor-pointer"
                  >
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                    Previous School (if any)
                  </label>
                  <input
                    type="text"
                    name="previousSchool"
                    value={formData.previousSchool}
                    onChange={handleChange}
                    className="w-full px-4 sm:px-5 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200 bg-white/50 hover:border-purple-300"
                    placeholder="Previous school name"
                  />
                </div>
              </div>
            </div>

            {/* Parent Information */}
            <div className="space-y-6">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2 sm:gap-3 pb-2 border-b-2 border-blue-200">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <Users className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
                Parent Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                    Father's Name *
                  </label>
                  <input
                    type="text"
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleChange}
                    className={`w-full px-4 sm:px-5 py-3 sm:py-4 border-2 rounded-xl focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200 bg-white/50 ${
                      errors.fatherName ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-purple-300'
                    }`}
                    placeholder="Father's full name"
                  />
                  {errors.fatherName && (
                    <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600 flex items-center gap-1 sm:gap-2 font-medium">
                      <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                      {errors.fatherName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                    Mother's Name *
                  </label>
                  <input
                    type="text"
                    name="motherName"
                    value={formData.motherName}
                    onChange={handleChange}
                    className={`w-full px-4 sm:px-5 py-3 sm:py-4 border-2 rounded-xl focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200 bg-white/50 ${
                      errors.motherName ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-purple-300'
                    }`}
                    placeholder="Mother's full name"
                  />
                  {errors.motherName && (
                    <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600 flex items-center gap-1 sm:gap-2 font-medium">
                      <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                      {errors.motherName}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2 sm:gap-3 pb-2 border-b-2 border-green-200">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                  <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
                Contact Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 sm:px-5 py-3 sm:py-4 border-2 rounded-xl focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200 bg-white/50 ${
                      errors.email ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-purple-300'
                    }`}
                    placeholder="parent@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600 flex items-center gap-1 sm:gap-2 font-medium">
                      <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                    Primary Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 sm:px-5 py-3 sm:py-4 border-2 rounded-xl focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200 bg-white/50 ${
                      errors.phone ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-purple-300'
                    }`}
                    placeholder="10-digit mobile number"
                  />
                  {errors.phone && (
                    <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600 flex items-center gap-1 sm:gap-2 font-medium">
                      <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                    Alternate Phone Number
                  </label>
                  <input
                    type="tel"
                    name="alternatePhone"
                    value={formData.alternatePhone}
                    onChange={handleChange}
                    className={`w-full px-4 sm:px-5 py-3 sm:py-4 border-2 rounded-xl focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200 bg-white/50 ${
                      errors.alternatePhone ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-purple-300'
                    }`}
                    placeholder="Alternate contact number (optional)"
                  />
                  {errors.alternatePhone && (
                    <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600 flex items-center gap-1 sm:gap-2 font-medium">
                      <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                      {errors.alternatePhone}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="space-y-6">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2 sm:gap-3 pb-2 border-b-2 border-orange-200">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
                Address Information
              </h3>
              
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                    Complete Address *
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows={4}
                    className={`w-full px-4 sm:px-5 py-3 sm:py-4 border-2 rounded-xl focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200 bg-white/50 resize-none ${
                      errors.address ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-purple-300'
                    }`}
                    placeholder="Enter complete residential address"
                  />
                  {errors.address && (
                    <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600 flex items-center gap-1 sm:gap-2 font-medium">
                      <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                      {errors.address}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 sm:px-5 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200 bg-white/50 hover:border-purple-300"
                      placeholder="City"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full px-4 sm:px-5 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200 bg-white/50 hover:border-purple-300"
                      placeholder="State"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      className={`w-full px-4 sm:px-5 py-3 sm:py-4 border-2 rounded-xl focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200 bg-white/50 ${
                        errors.pincode ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-purple-300'
                      }`}
                      placeholder="6-digit pincode"
                    />
                    {errors.pincode && (
                      <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600 flex items-center gap-1 sm:gap-2 font-medium">
                        <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                        {errors.pincode}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-6">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2 sm:gap-3 pb-2 border-b-2 border-pink-200">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
                  <FileText className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
                Additional Information
              </h3>
              
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                    Medical Conditions (if any)
                  </label>
                  <textarea
                    name="medicalConditions"
                    value={formData.medicalConditions}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 sm:px-5 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200 bg-white/50 hover:border-purple-300 resize-none"
                    placeholder="Any allergies, medical conditions, or special requirements"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="transportRequired"
                    checked={formData.transportRequired}
                    onChange={handleChange}
                    className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 border-2 border-gray-300 rounded-lg focus:ring-purple-500 focus:ring-4 transition-all cursor-pointer"
                  />
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 cursor-pointer">
                    🚌 School Transport Required
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                    Additional Information
                  </label>
                  <textarea
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 sm:px-5 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200 bg-white/50 hover:border-purple-300 resize-none"
                    placeholder="Any other information you'd like to share"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 sm:pt-8 border-t-2 border-gray-200">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white py-4 sm:py-6 px-6 sm:px-8 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 focus:ring-4 focus:ring-purple-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 sm:gap-4 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin" />
                    Submitting Application...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 sm:w-6 sm:h-6" />
                    <span>✨ Submit Admission Application</span>
                  </>
                )}
              </button>
              
              <div className="text-center mt-4 sm:mt-6 p-3 sm:p-4 bg-gray-50 rounded-xl border border-gray-200">
                <p className="text-xs sm:text-sm text-gray-600 font-medium">
                  🔒 By submitting this form, you agree to our terms and conditions.
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  All information provided will be kept confidential and secure.
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}