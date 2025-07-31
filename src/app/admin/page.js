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
  Eye,
  MoreVertical,
  Tag,
  Users,
  TrendingUp,
  Activity,
  Grid3X3,
  List,
  Loader2,
  X
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

// Activity Card Component for better performance
const ActivityCard = React.memo(({ activity, viewMode, onEdit, onDelete }) => {
  const getCategoryInfo = (categoryId) => {
    return CATEGORIES.find(cat => cat.id === categoryId) || CATEGORIES.find(cat => cat.id === 'other');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-200 ${
      viewMode === 'list' ? 'flex' : ''
    }`}>
      {/* Image */}
      <div className={`${viewMode === 'list' ? 'w-48 flex-shrink-0' : 'w-full h-48'} relative`}>
        {activity.mainImage ? (
          <img 
            src={activity.mainImage} 
            alt={activity.title} 
            className="w-full h-full object-cover" 
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <Activity className="w-12 h-12 text-gray-400" />
          </div>
        )}
        
        {/* Category Badge */}
        {activity.category && (
          <div className="absolute top-3 left-3">
            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getCategoryInfo(activity.category)?.color} backdrop-blur-sm`}>
              {getCategoryInfo(activity.category)?.icon} {getCategoryInfo(activity.category)?.label}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex-1">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="font-bold text-lg text-gray-900 line-clamp-2">{activity.title}</h3>
          <div className="flex items-center gap-1">
            <button
              onClick={() => onEdit(activity.id)}
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 cursor-pointer"
              title="Edit Activity"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(activity)}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 cursor-pointer"
              title="Delete Activity"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(activity.date)}</span>
        </div>

        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
          {activity.shortDescription}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(activity.id)}
            className="flex-1 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 cursor-pointer transition-colors text-center font-medium text-sm"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(activity)}
            className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer transition-colors cursor-pointer font-medium text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
});

ActivityCard.displayName = 'ActivityCard';

export default function AdminDashboard() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [deletingActivity, setDeletingActivity] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      // Replace with your actual Firebase imports and logic
      const { collection, getDocs } = await import('firebase/firestore');
      const { db } = await import('../../lib/firebase');
      
      const querySnapshot = await getDocs(collection(db, 'activities'));
      const activitiesData = [];
      querySnapshot.forEach((doc) => {
        activitiesData.push({ id: doc.id, ...doc.data() });
      });
      setActivities(activitiesData);
    } catch (error) {
      console.error('Error fetching activities:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    router.push(`/admin/edit/${id}`);
  };

  // Helper function to delete media from Cloudinary
  const deleteMediaFromCloudinary = async (activity) => {
    try {
      const { deleteImageByUrl } = await import('../../lib/cloudinary');
      
      // Delete main image
      if (activity.mainImage) {
        console.log('Deleting main image:', activity.mainImage);
        await deleteImageByUrl(activity.mainImage);
      }
      
      // Delete additional images
      if (activity.additionalImages && Array.isArray(activity.additionalImages)) {
        for (const imageUrl of activity.additionalImages) {
          console.log('Deleting additional image:', imageUrl);
          await deleteImageByUrl(imageUrl);
        }
      }
      
      // Delete video
      if (activity.video) {
        console.log('Deleting video:', activity.video);
        await deleteImageByUrl(activity.video); // deleteImageByUrl handles both images and videos
      }
      
      console.log('All media files deleted successfully from Cloudinary');
    } catch (error) {
      console.error('Error deleting media from Cloudinary:', error);
      // Don't throw error here, we still want to delete the document even if media cleanup fails
    }
  };

  const deleteActivity = async (activity) => {
    if (!confirm('Are you sure you want to delete this activity? This action cannot be undone and will also delete all associated images and videos.')) {
      return;
    }

    setDeletingActivity(activity.id);

    try {
      // First, delete all media files from Cloudinary
      await deleteMediaFromCloudinary(activity);

      // Then delete the document from Firestore
      const { deleteDoc, doc } = await import('firebase/firestore');
      const { db } = await import('../../lib/firebase');
      
      await deleteDoc(doc(db, 'activities', activity.id));
      
      // Update local state
      setActivities(prev => prev.filter(act => act.id !== activity.id));
      
      console.log('Activity and all associated media deleted successfully');
    } catch (error) {
      console.error('Error deleting activity:', error);
      alert('Error deleting activity: ' + error.message);
    } finally {
      setDeletingActivity(null);
    }
  };

  const getCategoryInfo = (categoryId) => {
    return CATEGORIES.find(cat => cat.id === categoryId) || CATEGORIES.find(cat => cat.id === 'other');
  };

  // Memoized filtered activities for better performance
  const filteredActivities = useMemo(() => {
    return activities.filter(activity => {
      const matchesSearch = !searchTerm || 
        activity.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.shortDescription?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || activity.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [activities, searchTerm, selectedCategory]);

  // Memoized statistics for better performance
  const stats = useMemo(() => {
    const now = new Date();
    return {
      total: activities.length,
      upcoming: activities.filter(a => new Date(a.date) > now).length,
      thisMonth: activities.filter(a => {
        const activityDate = new Date(a.date);
        return activityDate.getMonth() === now.getMonth() && activityDate.getFullYear() === now.getFullYear();
      }).length
    };
  }, [activities]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <Loader2 className="animate-spin h-8 w-8 text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading activities...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Activity className="w-8 h-8" />
              Activities Dashboard
            </h1>
            <p className="text-blue-100 mt-2">Manage and organize all your activities</p>
          </div>
          <Link
            href="/admin/add-activity"
            className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl border border-white/20 w-fit"
          >
            <Plus className="w-5 h-5" />
            Add New Activity
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Activities</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stats.total}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Upcoming</p>
              <p className="text-3xl font-bold text-green-600 mt-1">{stats.upcoming}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-3xl font-bold text-purple-600 mt-1">{stats.thisMonth}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-purple-600" />
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
                placeholder="Search activities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none bg-white min-w-48"
              >
                <option value="">All Categories</option>
                {CATEGORIES.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.icon} {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 cursor-pointer rounded-md transition-all duration-200 ${
                viewMode === 'grid' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md cursor-pointer transition-all duration-200 ${
                viewMode === 'list' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Active Filters */}
        {(searchTerm || selectedCategory) && (
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-200">
            <span className="text-sm text-gray-600">Active filters:</span>
            {searchTerm && (
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium flex items-center gap-1">
                Search: &quot;{searchTerm}&quot;
                <button
                  onClick={() => setSearchTerm('')}
                  className="hover:bg-blue-200 cursor-pointer rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedCategory && (
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium flex items-center gap-1">
                {getCategoryInfo(selectedCategory)?.icon} {getCategoryInfo(selectedCategory)?.label}
                <button
                  onClick={() => setSelectedCategory('')}
                  className="hover:bg-purple-200 cursor-pointer rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Activities Grid/List */}
      {filteredActivities.length === 0 ? (
        <div className="bg-white rounded-xl p-12 shadow-lg border border-gray-100 text-center">
          <Activity className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No activities found</h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || selectedCategory 
              ? "Try adjusting your search or filter criteria" 
              : "Get started by creating your first activity"
            }
          </p>
          {!searchTerm && !selectedCategory && (
            <Link
              href="/admin/add-activity"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Plus className="w-4 h-4" />
              Add Your First Activity
            </Link>
          )}
        </div>
      ) : (
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
          : "space-y-4"
        }>
          {filteredActivities.map((activity) => (
            <div key={activity.id} className="relative">
              <ActivityCard
                activity={activity}
                viewMode={viewMode}
                onEdit={handleEdit}
                onDelete={deleteActivity}
              />
              {deletingActivity === activity.id && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <Loader2 className="animate-spin h-8 w-8 text-red-500 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Deleting activity and media...</p>
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