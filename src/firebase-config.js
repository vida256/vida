// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCu7wJtNnI8yzf4H_VdBycdSPNNc4gWDaA",
  authDomain: "apsedec-blogs.firebaseapp.com",
  projectId: "apsedec-blogs",
  storageBucket: "apsedec-blogs.appspot.com",
  messagingSenderId: "639402172988",
  appId: "1:639402172988:web:c5acee568bf929bbf25939",
  measurementId: "G-JP9QTHL0Y5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
export const storage = getStorage(app);

const uploadBlogPost = async (userId, title, caption, captionImageFile, galleryImageFiles, galleryCaptions, projectDetails) => {
    const storage = getStorage();
    
    // Upload caption image
    const captionImageRef = ref(storage, `blogs/${userId}/${Date.now()}_captionImage`);
    await uploadBytes(captionImageRef, captionImageFile);
    const captionImageUrl = await getDownloadURL(captionImageRef);
    
    // Upload gallery images and get URLs
    const galleryImageUrls = await Promise.all(
        galleryImageFiles.map(async (file, index) => {
            if (file) {
                const galleryImageRef = ref(storage, `blogs/${userId}/${Date.now()}_galleryImage_${index}`);
                await uploadBytes(galleryImageRef, file);
                return await getDownloadURL(galleryImageRef);
            }
            return null;
        })
    );
    
    // Prepare blog post data
    const blogPostData = {
        userId,
        title,
        caption,
        captionImageUrl,
        galleryImages: galleryImageUrls,
        galleryCaptions,
        projectDetails,
        createdAt: new Date()
    };
    
    // Save blog post to Firestore with new collection name
    const docRef = await addDoc(collection(db, "vida-blogs"), blogPostData);
    return docRef.id;
}

export { auth, db, uploadBlogPost };
