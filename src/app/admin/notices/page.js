'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Search,
  Filter,
  Calendar,
  Bell,
  AlertCircle,
  Info,
  CheckCircle,
  X,
  Loader2,
  Eye,
  Clock
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

// Helper function to safely format dates
const formatDate = (dateValue) => {
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
      month: 'short',
      day: 'numeric'
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return null;
  }
};

// Notice Card Component
const NoticeCard = React.memo(({ notice, onEdit, onDelete, onToggleStatus }) => {
  const getNoticeTypeInfo = (typeId) => {
    return NOTICE_TYPES.find(type => type.id === typeId) || NOTICE_TYPES[0];
  };

  const getPriorityInfo = (priorityId) => {
    return PRIORITY_LEVELS.find(p => p.id === priorityId) || PRIORITY_LEVELS[0];
  };

  const typeInfo = getNoticeTypeInfo(notice.type);
  const priorityInfo = getPriorityInfo(notice.priority);
  const TypeIcon = typeInfo.icon;

  const createdDate = formatDate(notice.createdAt);
  const expiryDate = formatDate(notice.expiryDate);

  return (
    <div className={`bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-200 ${
      !notice.isActive ? 'opacity-60' : ''
    }`}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className={`p-2 rounded-lg ${typeInfo.color} flex-shrink-0`}>
              <TypeIcon className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-bold text-lg text-gray-900 break-words">{notice.title}</h3>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeInfo.color}`}>
                  {typeInfo.label}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityInfo.color}`}>
                  {priorityInfo.label} Priority
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  notice.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {notice.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              onClick={() => onToggleStatus(notice)}
              className={`p-2 rounded-lg transition-all duration-200 ${
                notice.isActive 
                  ? 'text-gray-400 hover:text-orange-600 hover:bg-orange-50' 
                  : 'text-gray-400 hover:text-green-600 hover:bg-green-50'
              }`}
              title={notice.isActive ? 'Deactivate Notice' : 'Activate Notice'}
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={() => onEdit(notice.id)}
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
              title="Edit Notice"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(notice)}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
              title="Delete Notice"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="mb-4">
          <p className="text-gray-600 text-sm break-words whitespace-pre-wrap overflow-hidden">
            {notice.content && notice.content.length > 150 
              ? `${notice.content.substring(0, 150)}...` 
              : notice.content}
          </p>
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-2 text-xs text-gray-500">
          {createdDate && (
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3 flex-shrink-0" />
              <span>Created: {createdDate}</span>
            </div>
          )}
          {expiryDate && (
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3 flex-shrink-0" />
              <span>Expires: {expiryDate}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
          <button
            onClick={() => onEdit(notice.id)}
            className="flex-1 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors text-center font-medium text-sm"
          >
            Edit
          </button>
          <button
            onClick={() => onToggleStatus(notice)}
            className={`px-4 py-2 rounded-lg transition-colors font-medium text-sm ${
              notice.isActive
                ? 'text-orange-600 hover:bg-orange-50'
                : 'text-green-600 hover:bg-green-50'
            }`}
          >
            {notice.isActive ? 'Deactivate' : 'Activate'}
          </button>
          <button
            onClick={() => onDelete(notice)}
            className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
});

NoticeCard.displayName = 'NoticeCard';

export default function NoticesPage() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  const [showActiveOnly, setShowActiveOnly] = useState(false);
  const [deletingNotice, setDeletingNotice] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const { collection, getDocs, orderBy, query } = await import('firebase/firestore');
      const { db } = await import('../../../lib/firebase');
      
      const q = query(collection(db, 'notices'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const noticesData = [];
      querySnapshot.forEach((doc) => {
        noticesData.push({ id: doc.id, ...doc.data() });
      });
      setNotices(noticesData);
    } catch (error) {
      console.error('Error fetching notices:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    router.push(`/admin/notices/edit/${id}`);
  };

  const deleteNotice = async (notice) => {
    if (!confirm('Are you sure you want to delete this notice? This action cannot be undone.')) {
      return;
    }

    setDeletingNotice(notice.id);

    try {
      const { deleteDoc, doc } = await import('firebase/firestore');
      const { db } = await import('../../../lib/firebase');
      
      await deleteDoc(doc(db, 'notices', notice.id));
      setNotices(prev => prev.filter(n => n.id !== notice.id));
      
      console.log('Notice deleted successfully');
    } catch (error) {
      console.error('Error deleting notice:', error);
      alert('Error deleting notice: ' + error.message);
    } finally {
      setDeletingNotice(null);
    }
  };

  const toggleNoticeStatus = async (notice) => {
    try {
      const { updateDoc, doc } = await import('firebase/firestore');
      const { db } = await import('../../../lib/firebase');
      
      await updateDoc(doc(db, 'notices', notice.id), {
        isActive: !notice.isActive,
        updatedAt: new Date()
      });
      
      setNotices(prev => prev.map(n => 
        n.id === notice.id ? { ...n, isActive: !n.isActive } : n
      ));
    } catch (error) {
      console.error('Error updating notice status:', error);
      alert('Error updating notice status: ' + error.message);
    }
  };

  // Memoized filtered notices
  const filteredNotices = useMemo(() => {
    return notices.filter(notice => {
      const matchesSearch = !searchTerm || 
        notice.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notice.content?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = !selectedType || notice.type === selectedType;
      const matchesPriority = !selectedPriority || notice.priority === parseInt(selectedPriority);
      const matchesStatus = !showActiveOnly || notice.isActive;
      
      return matchesSearch && matchesType && matchesPriority && matchesStatus;
    });
  }, [notices, searchTerm, selectedType, selectedPriority, showActiveOnly]);

  // Memoized statistics
  const stats = useMemo(() => {
    return {
      total: notices.length,
      active: notices.filter(n => n.isActive).length,
      urgent: notices.filter(n => n.type === 'urgent' && n.isActive).length
    };
  }, [notices]);

  const getNoticeTypeInfo = (typeId) => {
    return NOTICE_TYPES.find(type => type.id === typeId) || NOTICE_TYPES[0];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <Loader2 className="animate-spin h-8 w-8 text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading notices...</p>
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
              <Bell className="w-8 h-8" />
              Notice Management
            </h1>
            <p className="text-green-100 mt-2">Create and manage school notices and announcements</p>
          </div>
          <Link
            href="/admin/notices/add"
            className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl border border-white/20 w-fit"
          >
            <Plus className="w-5 h-5" />
            Add New Notice
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Notices</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stats.total}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Bell className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Notices</p>
              <p className="text-3xl font-bold text-green-600 mt-1">{stats.active}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Urgent Notices</p>
              <p className="text-3xl font-bold text-red-600 mt-1">{stats.urgent}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search notices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Type Filter */}
            <div className="relative">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="pl-4 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none bg-white min-w-36"
              >
                <option value="">All Types</option>
                {NOTICE_TYPES.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Priority Filter */}
            <div className="relative">
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="pl-4 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none bg-white min-w-36"
              >
                <option value="">All Priorities</option>
                {PRIORITY_LEVELS.map((priority) => (
                  <option key={priority.id} value={priority.id}>
                    {priority.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Active Only Toggle */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showActiveOnly}
                onChange={(e) => setShowActiveOnly(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Active only</span>
            </label>
          </div>
        </div>

        {/* Active Filters */}
        {(searchTerm || selectedType || selectedPriority || showActiveOnly) && (
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-200">
            <span className="text-sm text-gray-600">Active filters:</span>
            {searchTerm && (
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium flex items-center gap-1">
                Search: &quot;{searchTerm}&quot;
                <button
                  onClick={() => setSearchTerm('')}
                  className="hover:bg-blue-200 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedType && (
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium flex items-center gap-1">
                {getNoticeTypeInfo(selectedType)?.label}
                <button
                  onClick={() => setSelectedType('')}
                  className="hover:bg-purple-200 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedPriority && (
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium flex items-center gap-1">
                {PRIORITY_LEVELS.find(p => p.id === parseInt(selectedPriority))?.label} Priority
                <button
                  onClick={() => setSelectedPriority('')}
                  className="hover:bg-yellow-200 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {showActiveOnly && (
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium flex items-center gap-1">
                Active Only
                <button
                  onClick={() => setShowActiveOnly(false)}
                  className="hover:bg-green-200 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Notices Grid */}
      {filteredNotices.length === 0 ? (
        <div className="bg-white rounded-xl p-12 shadow-lg border border-gray-100 text-center">
          <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No notices found</h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || selectedType || selectedPriority || showActiveOnly
              ? "Try adjusting your search or filter criteria" 
              : "Get started by creating your first notice"
            }
          </p>
          {!searchTerm && !selectedType && !selectedPriority && !showActiveOnly && (
            <Link
              href="/admin/notices/add"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Plus className="w-4 h-4" />
              Add Your First Notice
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotices.map((notice) => (
            <div key={notice.id} className="relative">
              <NoticeCard
                notice={notice}
                onEdit={handleEdit}
                onDelete={deleteNotice}
                onToggleStatus={toggleNoticeStatus}
              />
              {deletingNotice === notice.id && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <Loader2 className="animate-spin h-8 w-8 text-red-500 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Deleting notice...</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}