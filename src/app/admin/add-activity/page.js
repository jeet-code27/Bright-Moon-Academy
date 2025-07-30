'use client';
import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { useRouter } from 'next/navigation';
import ActivityForm from '../../../component/ActivityForm';

export default function AddActivity() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      await addDoc(collection(db, 'activities'), {
        ...formData,
        createdAt: new Date()
      });
      router.push('/admin');
    } catch (error) {
      alert('Error adding activity: ' + error.message);
    }
    setLoading(false);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Add New Activity</h1>
      <ActivityForm onSubmit={handleSubmit} isLoading={loading} />
    </div>
  );
}