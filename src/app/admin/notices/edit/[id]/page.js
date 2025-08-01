'use client';
import { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../../../lib/firebase';
import { useRouter } from 'next/navigation';
import NoticeForm from '../../../../../component/NoticeForm';
import { Loader2 } from 'lucide-react';

export default function EditNotice({ params }) {
  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchNotice();
  }, []);

  const fetchNotice = async () => {
    try {
      const docRef = doc(db, 'notices', params.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const noticeData = docSnap.data();
        setNotice(noticeData);
      } else {
        alert('Notice not found');
        router.push('/admin/notices');
      }
    } catch (error) {
      console.error('Error fetching notice:', error);
      alert('Error loading notice. Please try again.');
      router.push('/admin/notices');
    }
    setFetchLoading(false);
  };

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      const docRef = doc(db, 'notices', params.id);
      
      // Prepare the update data
      const updateData = {
        title: formData.title,
        content: formData.content,
        type: formData.type,
        priority: formData.priority,
        isActive: formData.isActive,
        targetAudience: formData.targetAudience,
        updatedAt: new Date()
      };

      // Only include expiryDate if it's provided
      if (formData.expiryDate) {
        updateData.expiryDate = formData.expiryDate;
      } else {
        // Remove expiryDate if it was cleared
        updateData.expiryDate = null;
      }

      await updateDoc(docRef, updateData);
      
      // Show success message and redirect
      alert('Notice updated successfully!');
      router.push('/admin/notices');
    } catch (error) {
      console.error('Error updating notice:', error);
      alert('Error updating notice: ' + error.message);
    }
    setLoading(false);
  };

  if (fetchLoading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <Loader2 className="animate-spin h-8 w-8 text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading notice...</p>
        </div>
      </div>
    );
  }

  if (!notice) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Notice not found.</p>
      </div>
    );
  }

  return (
    <div>
      <NoticeForm 
        initialData={notice} 
        onSubmit={handleSubmit} 
        isLoading={loading} 
      />
    </div>
  );
}