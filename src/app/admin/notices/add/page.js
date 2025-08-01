'use client';
import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../../../lib/firebase';
import { useRouter } from 'next/navigation';
import NoticeForm from '../../../../component/NoticeForm';

export default function AddNotice() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      // Prepare the data for Firestore
      const noticeData = {
        title: formData.title,
        content: formData.content,
        type: formData.type,
        priority: formData.priority,
        isActive: formData.isActive,
        targetAudience: formData.targetAudience,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      // Only include expiryDate if it's provided
      if (formData.expiryDate) {
        noticeData.expiryDate = formData.expiryDate;
      }

      await addDoc(collection(db, 'notices'), noticeData);
      
      // Show success message and redirect
      alert('Notice created successfully!');
      router.push('/admin/notices');
    } catch (error) {
      console.error('Error adding notice:', error);
      alert('Error creating notice: ' + error.message);
    }
    setLoading(false);
  };

  return (
    <div>
      <NoticeForm onSubmit={handleSubmit} isLoading={loading} />
    </div>
  );
}