'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Bell, 
  Search,
  Filter,
  Calendar,
  AlertCircle,
  Info,
  CheckCircle,
  Clock,
  X,
  Loader2,
  ChevronDown,
  Pin,
  Users,
  Eye
} from 'lucide-react';

// Notice types with colors and icons (matching admin panel)
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

// Target audience options
const AUDIENCE_OPTIONS = [
  { id: 'all', label: 'All' },
  { id: 'students', label: 'Students' },
  { id: 'teachers', label: 'Teachers' },
  { id: 'parents', label: 'Parents' },
  { id: 'staff', label: 'Staff' }
];

// Helper function to safely format dates
const formatDate = (dateValue) => {
  try {
    let date;
    
    if (!dateValue) return null;
    
    if (dateValue.toDate && typeof dateValue.toDate === 'function') {
      date = dateValue.toDate();
    } else if (dateValue instanceof Date) {
      date = dateValue;
    } else if (typeof dateValue === 'string') {
      date = new Date(dateValue);
    } else if (typeof dateValue === 'number') {
      date = new Date(dateValue);
    } else {
      return null;
    }

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

// Calculate days until expiry
const getDaysUntilExpiry = (expiryDate) => {
  if (!expiryDate) return null;
  
  let date;
  if (expiryDate.toDate && typeof expiryDate.toDate === 'function') {
    date = expiryDate.toDate();
  } else if (expiryDate instanceof Date) {
    date = expiryDate;
  } else {
    date = new Date(expiryDate);
  }
  
  const today = new Date();
  const diffTime = date - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
};

// Notice Card Component
const NoticeCard = React.memo(({ notice, isExpanded, onToggleExpand }) => {
  const getNoticeTypeInfo = (typeId) => {
    return NOTICE_TYPES.find(type => type.id === typeId) || NOTICE_TYPES[0];
  };

  const getPriorityInfo = (priorityId) => {
    return PRIORITY_LEVELS.find(p => p.id === priorityId) || PRIORITY_LEVELS[0];
  };

  const getAudienceInfo = (audienceId) => {
    return AUDIENCE_OPTIONS.find(a => a.id === audienceId) || AUDIENCE_OPTIONS[0];
  };

  const typeInfo = getNoticeTypeInfo(notice.type);
  const priorityInfo = getPriorityInfo(notice.priority);
  const audienceInfo = getAudienceInfo(notice.targetAudience);
  const TypeIcon = typeInfo.icon;

  const createdDate = formatDate(notice.createdAt);
  const expiryDate = formatDate(notice.expiryDate);
  const daysUntilExpiry = getDaysUntilExpiry(notice.expiryDate);

  const isUrgent = notice.type === 'urgent' || notice.priority === 3;
  const isExpiringSoon = daysUntilExpiry !== null && daysUntilExpiry <= 7 && daysUntilExpiry > 0;
  const isExpired = daysUntilExpiry !== null && daysUntilExpiry < 0;

  if (isExpired) return null; 

  return (
    <div className={`bg-white rounded-2xl shadow-lg border-2 overflow-hidden transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1 ${
      isUrgent ? 'border-red-200 bg-gradient-to-br from-red-50 to-white' : 
      isExpiringSoon ? 'border-orange-200 bg-gradient-to-br from-orange-50 to-white' : 
      'border-gray-100 hover:border-blue-200'
    }`}>
      {/* Priority Banner for Urgent notices */}
      {isUrgent && (
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 text-sm font-semibold flex items-center gap-2">
          <Pin className="w-4 h-4" />
          {notice.type === 'urgent' ? 'URGENT NOTICE' : 'HIGH PRIORITY'}
        </div>
      )}

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className={`p-3 rounded-xl ${typeInfo.color} flex-shrink-0 shadow-sm`}>
              <TypeIcon className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-bold text-xl text-gray-900 break-words leading-tight">{notice.title}</h3>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${typeInfo.color} shadow-sm`}>
                  {typeInfo.label}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${priorityInfo.color} shadow-sm`}>
                  {priorityInfo.label}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 shadow-sm flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {audienceInfo.label}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Preview/Full */}
        <div className="mb-4">
          <div className={`text-gray-700 leading-relaxed ${isExpanded ? '' : 'line-clamp-3'}`}>
            <p className="whitespace-pre-wrap break-words">
              {notice.content}
            </p>
          </div>
          
          {notice.content && notice.content.length > 200 && (
            <button
              onClick={() => onToggleExpand(notice.id)}
              className="mt-3 text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center gap-1 transition-colors"
            >
              {isExpanded ? 'Show Less' : 'Read More'}
              <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
            </button>
          )}
        </div>

        {/* Metadata Footer */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100">
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            {createdDate && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 flex-shrink-0" />
                <span>Published {createdDate}</span>
              </div>
            )}
            
            {expiryDate && !isExpired && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 flex-shrink-0" />
                <span className={isExpiringSoon ? 'text-orange-600 font-medium' : ''}>
                  {isExpiringSoon ? `Expires in ${daysUntilExpiry} day${daysUntilExpiry === 1 ? '' : 's'}` : `Expires ${expiryDate}`}
                </span>
              </div>
            )}
          </div>

        
          
        </div>
      </div>
    </div>
  );
});

NoticeCard.displayName = 'NoticeCard';

export default function UserNoticesDisplay() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedAudience, setSelectedAudience] = useState('');
  const [expandedNotices, setExpandedNotices] = useState(new Set());
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchNotices();
  }, []);
  
  const fetchNotices = async () => {
    try {
      const { collection, getDocs, orderBy, query, where } = await import('firebase/firestore');
      const { db } = await import('../lib/firebase');
      
      // First get all notices, then filter and sort in memory to avoid composite index requirement
      const q = query(collection(db, 'notices'));
      const querySnapshot = await getDocs(q);
      const noticesData = [];
      querySnapshot.forEach((doc) => {
        const data = { id: doc.id, ...doc.data() };
        // Only include active notices
        if (data.isActive === true) {
          noticesData.push(data);
        }
      });
      
      // Sort by createdAt in descending order (newest first)
      noticesData.sort((a, b) => {
        const aDate = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt);
        const bDate = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt);
        return bDate - aDate;
      });
      
      setNotices(noticesData);
    } catch (error) {
      console.error('Error fetching notices:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleToggleExpand = (noticeId) => {
    setExpandedNotices(prev => {
      const newSet = new Set(prev);
      if (newSet.has(noticeId)) {
        newSet.delete(noticeId);
      } else {
        newSet.add(noticeId);
      }
      return newSet;
    });
  };

  // Memoized filtered notices - now only includes active notices from fetch
  const filteredNotices = useMemo(() => {
    return notices.filter(notice => {
      const matchesSearch = !searchTerm || 
        notice.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notice.content?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = !selectedType || notice.type === selectedType;
      const matchesAudience = !selectedAudience || notice.targetAudience === selectedAudience || notice.targetAudience === 'all';
      
      return matchesSearch && matchesType && matchesAudience;
    });
  }, [notices, searchTerm, selectedType, selectedAudience]);

  // Separate urgent and regular notices
  const urgentNotices = filteredNotices.filter(notice => notice.type === 'urgent' || notice.priority === 3);
  const regularNotices = filteredNotices.filter(notice => notice.type !== 'urgent' && notice.priority !== 3);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center min-h-64">
            <div className="text-center">
              <Loader2 className="animate-spin h-12 w-12 text-blue-500 mx-auto mb-6" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded-full w-48 mx-auto animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded-full w-32 mx-auto animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-14 h-14 bg-[#FBF9F0] rounded-2xl flex items-center justify-center shadow-lg">
              <Bell className="w-7 h-7 text-[#081646]" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900">School Notices</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay informed with the latest announcements, events, and important updates from our school
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search notices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors font-medium"
            >
              <Filter className="w-5 h-5" />
              Filters
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Expandable Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Type Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notice Type</label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">All Types</option>
                    {NOTICE_TYPES.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Audience Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
                  <select
                    value={selectedAudience}
                    onChange={(e) => setSelectedAudience(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">All Audiences</option>
                    {AUDIENCE_OPTIONS.slice(1).map((audience) => (
                      <option key={audience.id} value={audience.id}>
                        {audience.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Active Filters */}
              {(searchTerm || selectedType || selectedAudience) && (
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                  <span className="text-sm text-gray-600 font-medium">Active filters:</span>
                  {searchTerm && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium flex items-center gap-1">
                      "{searchTerm}"
                      <button
                        onClick={() => setSearchTerm('')}
                        className="hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {selectedType && (
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium flex items-center gap-1">
                      {NOTICE_TYPES.find(t => t.id === selectedType)?.label}
                      <button
                        onClick={() => setSelectedType('')}
                        className="hover:bg-purple-200 rounded-full p-0.5 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {selectedAudience && (
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium flex items-center gap-1">
                      {AUDIENCE_OPTIONS.find(a => a.id === selectedAudience)?.label}
                      <button
                        onClick={() => setSelectedAudience('')}
                        className="hover:bg-green-200 rounded-full p-0.5 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Results Summary */}
        {filteredNotices.length > 0 && (
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>
              Showing {filteredNotices.length} notice{filteredNotices.length !== 1 ? 's' : ''}
              {(searchTerm || selectedType || selectedAudience) && (
                <span className="ml-1">matching your criteria</span>
              )}
            </span>
            {urgentNotices.length > 0 && (
              <span className="flex items-center gap-1 text-red-600 font-medium">
                <AlertCircle className="w-4 h-4" />
                {urgentNotices.length} urgent notice{urgentNotices.length !== 1 ? 's' : ''}
              </span>
            )}
          </div>
        )}

        {/* Urgent Notices Section */}
        {urgentNotices.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-red-600" />
              <h2 className="text-2xl font-bold text-red-600">Urgent Notices</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {urgentNotices.map((notice) => (
                <NoticeCard
                  key={notice.id}
                  notice={notice}
                  isExpanded={expandedNotices.has(notice.id)}
                  onToggleExpand={handleToggleExpand}
                />
              ))}
            </div>
          </div>
        )}

        {/* Regular Notices Section */}
        {regularNotices.length > 0 && (
          <div className="space-y-6">
            {urgentNotices.length > 0 && (
              <div className="flex items-center gap-2">
                <Info className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-800">Other Notices</h2>
              </div>
            )}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {regularNotices.map((notice) => (
                <NoticeCard
                  key={notice.id}
                  notice={notice}
                  isExpanded={expandedNotices.has(notice.id)}
                  onToggleExpand={handleToggleExpand}
                />
              ))}
            </div>
          </div>
        )}

        {/* No Notices Found */}
        {filteredNotices.length === 0 && (
          <div className="bg-white rounded-2xl p-12 shadow-lg border border-gray-100 text-center">
            <Bell className="w-20 h-20 text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No notices found</h3>
            <p className="text-gray-600 text-lg mb-6 max-w-md mx-auto">
              {searchTerm || selectedType || selectedAudience
                ? "Try adjusting your search criteria or filters to find what you're looking for" 
                : "There are currently no active notices to display"
              }
            </p>
            {(searchTerm || selectedType || selectedAudience) && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedType('');
                  setSelectedAudience('');
                }}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Clear All Filters
              </button>
            )}
          </div>
        )}

        {/* Footer Info */}
        <div className="text-center text-sm text-gray-500 py-8">
          <p>Notices are updated regularly. Check back often for the latest information.</p>
        </div>
      </div>
    </div>
  );
}