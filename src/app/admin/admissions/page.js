'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Calendar,
  Phone,
  Mail,
  MapPin,
  GraduationCap,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader2,
  FileText,
  Star,
  X,
  RefreshCw,
  User
} from 'lucide-react';

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

const STATUS_OPTIONS = [
  { id: 'pending', label: 'Pending Review', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  { id: 'approved', label: 'Approved', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  { id: 'rejected', label: 'Rejected', color: 'bg-red-100 text-red-800', icon: XCircle },
  { id: 'interview', label: 'Interview Scheduled', color: 'bg-blue-100 text-blue-800', icon: Calendar }
];

// Helper function to safely format Firebase Timestamp
const formatFirebaseDate = (timestamp) => {
  try {
    if (!timestamp) return null;
    
    // Handle Firestore Timestamp
    if (timestamp.toDate && typeof timestamp.toDate === 'function') {
      return timestamp.toDate();
    }
    // Handle regular Date object
    else if (timestamp instanceof Date) {
      return timestamp;
    }
    // Handle date string
    else if (typeof timestamp === 'string') {
      return new Date(timestamp);
    }
    // Handle timestamp number
    else if (typeof timestamp === 'number') {
      return new Date(timestamp);
    }
    
    return null;
  } catch (error) {
    console.error('Error formatting date:', error);
    return null;
  }
};

const AdmissionCard = React.memo(({ admission, onStatusChange, onViewDetails, isUpdating }) => {
  const getStatusInfo = (status) => {
    return STATUS_OPTIONS.find(s => s.id === status) || STATUS_OPTIONS[0];
  };

  const getClassLabel = (classId) => {
    const classInfo = CLASSES.find(c => c.id === classId);
    return classInfo ? classInfo.label : classId;
  };

  const formatDate = (timestamp) => {
    const date = formatFirebaseDate(timestamp);
    if (!date) return 'Invalid Date';
    
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDateOfBirth = (timestamp) => {
    const date = formatFirebaseDate(timestamp);
    if (!date) return 'Invalid Date';
    
    return date.toLocaleDateString('en-IN');
  };

  const statusInfo = getStatusInfo(admission.status);
  const StatusIcon = statusInfo.icon;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-bold text-lg text-gray-900 mb-1">{admission.studentName}</h3>
          <p className="text-sm text-gray-600">Applied for {getClassLabel(admission.classApplying)}</p>
          {admission.applicationNumber && (
            <p className="text-xs text-blue-600 font-mono mt-1">#{admission.applicationNumber}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
            <StatusIcon className="w-3 h-3" />
            {statusInfo.label}
          </span>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Users className="w-4 h-4" />
          <span>Father: {admission.fatherName}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Phone className="w-4 h-4" />
          <span>{admission.phone}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Mail className="w-4 h-4" />
          <span className="truncate">{admission.email}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>DOB: {formatDateOfBirth(admission.dateOfBirth)}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="w-4 h-4" />
          <span>Applied: {formatDate(admission.createdAt || admission.submittedAt)}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onViewDetails(admission)}
          className="flex-1 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors text-center font-medium text-sm flex items-center justify-center gap-2"
        >
          <Eye className="w-4 h-4" />
          View Details
        </button>
        <div className="relative">
          <select
            value={admission.status}
            onChange={(e) => onStatusChange(admission.id, e.target.value)}
            disabled={isUpdating}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {STATUS_OPTIONS.map((status) => (
              <option key={status.id} value={status.id}>
                {status.label}
              </option>
            ))}
          </select>
          {isUpdating && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

AdmissionCard.displayName = 'AdmissionCard';

export default function AdminAdmissions() {
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedAdmission, setSelectedAdmission] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(new Set());
  const [error, setError] = useState(null);
  const [firebase, setFirebase] = useState(null);

  // Initialize Firebase
  useEffect(() => {
    const initFirebase = async () => {
      try {
        const firebaseModule = await import('../../../lib/firebase');
        setFirebase(firebaseModule);
      } catch (error) {
        console.error('Error initializing Firebase:', error);
        setError('Failed to initialize Firebase. Please check your configuration.');
        setLoading(false);
      }
    };

    initFirebase();
  }, []);

  // Fetch admissions when Firebase is ready
  useEffect(() => {
    if (firebase) {
      fetchAdmissions();
    }
  }, [firebase]);

  const fetchAdmissions = async (isRefresh = false) => {
    if (!firebase) {
      setError('Firebase not initialized');
      setLoading(false);
      return;
    }

    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);

    try {
      const { collection, getDocs, orderBy, query } = await import('firebase/firestore');
      const { db } = firebase;
      
      // Create query to get admissions ordered by creation date (newest first)
      const admissionsQuery = query(
        collection(db, 'admissions'),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(admissionsQuery);
      const admissionsData = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        admissionsData.push({ 
          id: doc.id, 
          ...data
        });
      });
      
      setAdmissions(admissionsData);
      console.log(`Fetched ${admissionsData.length} admission applications`);
    } catch (error) {
      console.error('Error fetching admissions:', error);
      
      // Handle specific Firebase errors
      if (error.code === 'failed-precondition') {
        setError('Database index required. Please create the necessary indexes in Firebase Console.');
      } else if (error.code === 'permission-denied') {
        setError('Permission denied. Please check your Firebase security rules.');
      } else if (error.code === 'unavailable') {
        setError('Firebase service temporarily unavailable. Please try again later.');
      } else {
        setError(`Failed to load admission applications: ${error.message}`);
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleStatusChange = async (admissionId, newStatus) => {
    if (!firebase) {
      alert('Firebase not initialized');
      return;
    }

    // Add to updating set
    setUpdatingStatus(prev => new Set([...prev, admissionId]));
    
    try {
      const { doc, updateDoc, serverTimestamp } = await import('firebase/firestore');
      const { db } = firebase;
      
      // Update in Firebase
      await updateDoc(doc(db, 'admissions', admissionId), { 
        status: newStatus,
        updatedAt: serverTimestamp(),
        statusChangedAt: serverTimestamp()
      });
      
      // Update local state
      setAdmissions(prev => 
        prev.map(admission => 
          admission.id === admissionId 
            ? { ...admission, status: newStatus, updatedAt: new Date() }
            : admission
        )
      );
      
      // Update selected admission if it's the one being viewed
      if (selectedAdmission && selectedAdmission.id === admissionId) {
        setSelectedAdmission(prev => ({ ...prev, status: newStatus }));
      }
      
      console.log(`Updated status for admission ${admissionId} to ${newStatus}`);
    } catch (error) {
      console.error('Error updating status:', error);
      
      // Handle specific Firebase errors
      let errorMessage = 'Failed to update status';
      if (error.code === 'permission-denied') {
        errorMessage = 'Permission denied. You may not have rights to update this record.';
      } else if (error.code === 'not-found') {
        errorMessage = 'Admission record not found.';
      } else if (error.code === 'unavailable') {
        errorMessage = 'Service temporarily unavailable. Please try again.';
      } else {
        errorMessage = `Failed to update status: ${error.message}`;
      }
      
      alert(errorMessage);
    } finally {
      // Remove from updating set
      setUpdatingStatus(prev => {
        const newSet = new Set(prev);
        newSet.delete(admissionId);
        return newSet;
      });
    }
  };

  const handleViewDetails = (admission) => {
    setSelectedAdmission(admission);
    setShowDetailsModal(true);
  };

  const handleDownloadData = () => {
    if (filteredAdmissions.length === 0) {
      alert('No data to download');
      return;
    }

    try {
      const csvHeaders = [
        'Application Number',
        'Student Name',
        'Father Name',
        'Mother Name',
        'Email',
        'Phone',
        'Class',
        'DOB',
        'Status',
        'Applied Date',
        'Address',
        'City',
        'State',
        'Pincode',
        'Transport Required',
        'Medical Conditions',
        'Additional Info'
      ];

      const csvContent = [
        csvHeaders.join(','),
        ...filteredAdmissions.map(admission => {
          const row = [
            admission.applicationNumber || '',
            admission.studentName || '',
            admission.fatherName || '',
            admission.motherName || '',
            admission.email || '',
            admission.phone || '',
            CLASSES.find(c => c.id === admission.classApplying)?.label || admission.classApplying || '',
            formatFirebaseDate(admission.dateOfBirth)?.toLocaleDateString('en-IN') || '',
            STATUS_OPTIONS.find(s => s.id === admission.status)?.label || admission.status || '',
            formatFirebaseDate(admission.createdAt || admission.submittedAt)?.toLocaleDateString('en-IN') || '',
            admission.address || '',
            admission.city || '',
            admission.state || '',
            admission.pincode || '',
            admission.transportRequired ? 'Yes' : 'No',
            admission.medicalConditions || '',
            admission.additionalInfo || ''
          ];
          
          // Escape commas and quotes in CSV fields
          return row.map(field => {
            const stringField = String(field);
            if (stringField.includes(',') || stringField.includes('"') || stringField.includes('\n')) {
              return `"${stringField.replace(/"/g, '""')}"`;
            }
            return stringField;
          }).join(',');
        })
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `admissions_data_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading data:', error);
      alert('Failed to download data. Please try again.');
    }
  };

  const filteredAdmissions = useMemo(() => {
    return admissions.filter(admission => {
      const matchesSearch = !searchTerm || 
        admission.studentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        admission.fatherName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        admission.motherName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        admission.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        admission.phone?.includes(searchTerm) ||
        admission.applicationNumber?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesClass = !selectedClass || admission.classApplying === selectedClass;
      const matchesStatus = !selectedStatus || admission.status === selectedStatus;
      
      return matchesSearch && matchesClass && matchesStatus;
    });
  }, [admissions, searchTerm, selectedClass, selectedStatus]);

  const stats = useMemo(() => {
    return {
      total: admissions.length,
      pending: admissions.filter(a => a.status === 'pending').length,
      approved: admissions.filter(a => a.status === 'approved').length,
      rejected: admissions.filter(a => a.status === 'rejected').length,
      interview: admissions.filter(a => a.status === 'interview').length
    };
  }, [admissions]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <Loader2 className="animate-spin h-8 w-8 text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading admission applications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center max-w-md">
          <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Data</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => fetchAdmissions()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-6 text-white">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <GraduationCap className="w-8 h-8" />
              Admission Applications
            </h1>
            <p className="text-green-100 mt-2">Manage student admission inquiries and applications</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => fetchAdmissions(true)}
              disabled={refreshing}
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-4 py-2 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </button>
            <button
              onClick={handleDownloadData}
              disabled={filteredAdmissions.length === 0}
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="w-5 h-5" />
              Download Data
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Applications</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stats.total}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Review</p>
              <p className="text-3xl font-bold text-yellow-600 mt-1">{stats.pending}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Interview</p>
              <p className="text-3xl font-bold text-blue-600 mt-1">{stats.interview}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Approved</p>
              <p className="text-3xl font-bold text-green-600 mt-1">{stats.approved}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Rejected</p>
              <p className="text-3xl font-bold text-red-600 mt-1">{stats.rejected}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, phone, or application #..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Class Filter */}
            <div className="relative">
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="pl-4 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none bg-white min-w-40"
              >
                <option value="">All Classes</option>
                {CLASSES.map((cls) => (
                  <option key={cls.id} value={cls.id}>
                    {cls.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div className="relative">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="pl-4 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none bg-white min-w-40"
              >
                <option value="">All Status</option>
                {STATUS_OPTIONS.map((status) => (
                  <option key={status.id} value={status.id}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Filters */}
          {(searchTerm || selectedClass || selectedStatus) && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-gray-600">Filters:</span>
              {searchTerm && (
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium flex items-center gap-1">
                  Search: &quot;{searchTerm.length > 20 ? searchTerm.substring(0, 20) + '...' : searchTerm}&quot;
                  <button
                    onClick={() => setSearchTerm('')}
                    className="hover:bg-blue-200 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedClass && (
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium flex items-center gap-1">
                  {CLASSES.find(c => c.id === selectedClass)?.label}
                  <button
                    onClick={() => setSelectedClass('')}
                    className="hover:bg-green-200 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedStatus && (
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium flex items-center gap-1">
                  {STATUS_OPTIONS.find(s => s.id === selectedStatus)?.label}
                  <button
                    onClick={() => setSelectedStatus('')}
                    className="hover:bg-purple-200 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>
        
        {/* Results count */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-600">
            Showing {filteredAdmissions.length} of {admissions.length} applications
          </p>
        </div>
      </div>

      {/* Applications Grid */}
      {filteredAdmissions.length === 0 ? (
        <div className="bg-white rounded-xl p-12 shadow-lg border border-gray-100 text-center">
          <GraduationCap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No applications found</h3>
          <p className="text-gray-600">
            {admissions.length === 0 
              ? "No admission applications have been submitted yet" 
              : "Try adjusting your search or filter criteria"
            }
          </p>
          {(searchTerm || selectedClass || selectedStatus) && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedClass('');
                setSelectedStatus('');
              }}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAdmissions.map((admission) => (
            <AdmissionCard
              key={admission.id}
              admission={admission}
              onStatusChange={handleStatusChange}
              onViewDetails={handleViewDetails}
              isUpdating={updatingStatus.has(admission.id)}
            />
          ))}
        </div>
      )}

      {/* Details Modal */}
      {showDetailsModal && selectedAdmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Application Details</h3>
                {selectedAdmission.applicationNumber && (
                  <p className="text-sm text-blue-600 font-mono">#{selectedAdmission.applicationNumber}</p>
                )}
              </div>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Student Info */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  Student Information
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Name:</span>
                    <p className="text-gray-900">{selectedAdmission.studentName}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Class Applying:</span>
                    <p className="text-gray-900">{CLASSES.find(c => c.id === selectedAdmission.classApplying)?.label}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Date of Birth:</span>
                    <p className="text-gray-900">{formatFirebaseDate(selectedAdmission.dateOfBirth)?.toLocaleDateString('en-IN') || 'Not provided'}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Gender:</span>
                    <p className="text-gray-900">{selectedAdmission.gender || 'Not specified'}</p>
                  </div>
                  {selectedAdmission.bloodGroup && (
                    <div>
                      <span className="font-medium text-gray-700">Blood Group:</span>
                      <p className="text-gray-900">{selectedAdmission.bloodGroup}</p>
                    </div>
                  )}
                  {selectedAdmission.previousSchool && (
                    <div>
                      <span className="font-medium text-gray-700">Previous School:</span>
                      <p className="text-gray-900">{selectedAdmission.previousSchool}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Parent Info */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5 text-green-600" />
                  Parent Information
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Father&apos;s Name:</span>
                    <p className="text-gray-900">{selectedAdmission.fatherName}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Mother&apos;s Name:</span>
                    <p className="text-gray-900">{selectedAdmission.motherName}</p>
                  </div>
                 
                </div>
              </div>

              {/* Contact Info */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-purple-600" />
                  Contact Information
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Email:</span>
                    <p className="text-gray-900 break-all">{selectedAdmission.email}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Phone:</span>
                    <p className="text-gray-900">{selectedAdmission.phone}</p>
                  </div>
                  {selectedAdmission.alternatePhone && (
                    <div className="sm:col-span-2">
                      <span className="font-medium text-gray-700">Alternate Phone:</span>
                      <p className="text-gray-900">{selectedAdmission.alternatePhone}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Address */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-red-600" />
                  Address Information
                </h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Address:</span>
                    <p className="text-gray-900">{selectedAdmission.address}</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <span className="font-medium text-gray-700">City:</span>
                      <p className="text-gray-900">{selectedAdmission.city || 'Not provided'}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">State:</span>
                      <p className="text-gray-900">{selectedAdmission.state || 'Not provided'}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Pincode:</span>
                      <p className="text-gray-900">{selectedAdmission.pincode || 'Not provided'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              {(selectedAdmission.transportRequired || selectedAdmission.medicalConditions || selectedAdmission.additionalInfo) && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-orange-600" />
                    Additional Information
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Transport Required:</span>
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                        selectedAdmission.transportRequired 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {selectedAdmission.transportRequired ? 'Yes' : 'No'}
                      </span>
                    </div>
                    {selectedAdmission.medicalConditions && (
                      <div>
                        <span className="font-medium text-gray-700">Medical Conditions:</span>
                        <p className="text-gray-900 mt-1 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                          {selectedAdmission.medicalConditions}
                        </p>
                      </div>
                    )}
                    {selectedAdmission.additionalInfo && (
                      <div>
                        <span className="font-medium text-gray-700">Additional Information:</span>
                        <p className="text-gray-900 mt-1 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          {selectedAdmission.additionalInfo}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Application Status & Timeline */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                  Application Status & Timeline
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${
                      STATUS_OPTIONS.find(s => s.id === selectedAdmission.status)?.color
                    }`}>
                      {React.createElement(STATUS_OPTIONS.find(s => s.id === selectedAdmission.status)?.icon || Clock, { className: "w-4 h-4" })}
                      {STATUS_OPTIONS.find(s => s.id === selectedAdmission.status)?.label}
                    </span>
                    <select
                      value={selectedAdmission.status}
                      onChange={(e) => {
                        handleStatusChange(selectedAdmission.id, e.target.value);
                        setSelectedAdmission({...selectedAdmission, status: e.target.value});
                      }}
                      disabled={updatingStatus.has(selectedAdmission.id)}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                    >
                      {STATUS_OPTIONS.map((status) => (
                        <option key={status.id} value={status.id}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Applied on:</span>
                      <p className="text-gray-900">
                        {formatFirebaseDate(selectedAdmission.createdAt || selectedAdmission.submittedAt)?.toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        }) || 'Not available'}
                      </p>
                    </div>
                    {selectedAdmission.updatedAt && selectedAdmission.updatedAt !== selectedAdmission.createdAt && (
                      <div>
                        <span className="font-medium text-gray-700">Last updated:</span>
                        <p className="text-gray-900">
                          {formatFirebaseDate(selectedAdmission.updatedAt)?.toLocaleDateString('en-IN', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          }) || 'Not available'}
                        </p>
                      </div>
                    )}
                    {selectedAdmission.academicYear && (
                      <div>
                        <span className="font-medium text-gray-700">Academic Year:</span>
                        <p className="text-gray-900">{selectedAdmission.academicYear}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-gray-50 px-6 py-4 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const subject = `Regarding Admission Application - ${selectedAdmission.studentName}`;
                  const body = `Dear ${selectedAdmission.fatherName || 'Parent'},\n\nRegarding the admission application for ${selectedAdmission.studentName} (Application #${selectedAdmission.applicationNumber || selectedAdmission.id}).\n\nBest regards,\nSunrise Academy`;
                  window.open(`mailto:${selectedAdmission.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
                }}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Contact Parent
              </button>
              <button
                onClick={() => {
                  window.open(`tel:${selectedAdmission.phone}`, '_blank');
                }}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                Call
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}