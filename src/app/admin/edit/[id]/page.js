'use client';
import { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../../lib/firebase';
import { useRouter } from 'next/navigation';
import ActivityForm from '../../../../component/ActivityForm';

export default function EditActivity({ params }) {
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchActivity();
  }, []);

  const fetchActivity = async () => {
    try {
      const docRef = doc(db, 'activities', params.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const activityData = docSnap.data();
        setActivity(activityData);
      } else {
        alert('Activity not found');
        router.push('/admin');
      }
    } catch (error) {
      console.error('Error fetching activity:', error);
      alert('Error loading activity. Please try again.');
      router.push('/admin');
    }
    setFetchLoading(false);
  };

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      const docRef = doc(db, 'activities', params.id);
      await updateDoc(docRef, {
        ...formData,
        updatedAt: new Date()
      });
      
      // Show success message and redirect
      alert('Activity updated successfully!');
      router.push('/admin');
    } catch (error) {
      console.error('Error updating activity:', error);
      alert('Error updating activity: ' + error.message);
    }
    setLoading(false);
  };

  if (fetchLoading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading activity...</p>
        </div>
      </div>
    );
  }

  if (!activity) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Activity not found.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Edit Activity</h1>
        <p className="text-gray-600 mt-2">
          Make changes to the activity. Images removed here will also be deleted from Cloudinary.
        </p>
      </div>
      
      <ActivityForm 
        initialData={activity} 
        onSubmit={handleSubmit} 
        isLoading={loading} 
      />
    </div>
  );
}