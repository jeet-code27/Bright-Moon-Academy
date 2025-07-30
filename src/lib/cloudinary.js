// lib/cloudinary.js
export const uploadToCloudinary = async (file, type = 'image') => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
  
  // Optional: Add folder organization
  if (type === 'image') {
    formData.append('folder', 'school-activities/images');
  } else if (type === 'video') {
    formData.append('folder', 'school-activities/videos');
  }
  
  const endpoint = type === 'video' 
    ? `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload`
    : `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;
  
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }
    
    const data = await response.json();
    return {
      url: data.secure_url,
      publicId: data.public_id,
      width: data.width,
      height: data.height,
      format: data.format
    };
  } catch (error) {
    console.error('Cloudinary upload failed:', error);
    throw error;
  }
};

// Function to extract public ID from Cloudinary URL
export const extractPublicId = (cloudinaryUrl) => {
  if (!cloudinaryUrl) return null;
  
  try {
    // Handle both image and video URLs
    // Example: https://res.cloudinary.com/cloud_name/image/upload/v1234567890/folder/image_name.jpg
    // or: https://res.cloudinary.com/cloud_name/video/upload/v1234567890/folder/video_name.mp4
    const urlParts = cloudinaryUrl.split('/');
    const uploadIndex = urlParts.findIndex(part => part === 'upload');
    
    if (uploadIndex === -1) return null;
    
    // Get everything after 'upload/v{version}/' or 'upload/'
    let pathAfterUpload = urlParts.slice(uploadIndex + 1).join('/');
    
    // Remove version if present (starts with 'v' followed by numbers)
    if (pathAfterUpload.match(/^v\d+\//)) {
      pathAfterUpload = pathAfterUpload.replace(/^v\d+\//, '');
    }
    
    // Remove file extension
    const publicId = pathAfterUpload.replace(/\.[^/.]+$/, '');
    
    return publicId;
  } catch (error) {
    console.error('Error extracting public ID:', error);
    return null;
  }
};

// Function to delete from Cloudinary
export const deleteFromCloudinary = async (publicId, resourceType = 'image') => {
  try {
    const response = await fetch('/api/cloudinary/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ publicId, resourceType }),
    });
    
    if (!response.ok) {
      throw new Error('Delete failed');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Delete from Cloudinary failed:', error);
    throw error;
  }
};

// Function to delete image by URL
export const deleteImageByUrl = async (imageUrl) => {
  const publicId = extractPublicId(imageUrl);
  if (!publicId) {
    console.warn('Could not extract public ID from URL:', imageUrl);
    return;
  }
  
  // Determine resource type based on URL
  const resourceType = imageUrl.includes('/video/upload/') ? 'video' : 'image';
  
  try {
    await deleteFromCloudinary(publicId, resourceType);
    console.log('Successfully deleted from Cloudinary:', publicId);
  } catch (error) {
    console.error('Failed to delete from Cloudinary:', error);
  }
};