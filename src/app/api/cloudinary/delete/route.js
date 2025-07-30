// src/app/api/cloudinary/delete/route.js
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  try {
    const { publicId, resourceType = 'image' } = await request.json();

    if (!publicId) {
      return Response.json({ error: 'Public ID is required' }, { status: 400 });
    }

    console.log(`Attempting to delete ${resourceType}: ${publicId}`);

    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
      invalidate: true // Clear CDN cache
    });

    console.log('Cloudinary delete result:', result);

    if (result.result === 'ok' || result.result === 'not found') {
      return Response.json({ 
        success: true, 
        result: result.result,
        message: result.result === 'not found' ? 'File was already deleted' : 'File deleted successfully'
      });
    } else {
      return Response.json({ 
        success: false, 
        error: 'Delete operation failed',
        result 
      }, { status: 400 });
    }

  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    return Response.json({ 
      success: false, 
      error: 'Delete failed', 
      details: error.message 
    }, { status: 500 });
  }
}