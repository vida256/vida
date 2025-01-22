import SectionRenderer from '@/builder/widgets/SectionRenderer';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase-config';

const DynamicProjectPage = () => {
  const { slug } = useParams();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        console.log('Original slug:', slug);
        
        // Try all possible slug formats
        const slugVariations = [
          slug,                    // Original slug
          `/${slug}`,             // With leading slash
          slug.startsWith('/') ? slug.substring(1) : slug  // Without leading slash
        ];
        
        let pageData = null;
        
        // Try to find the page by any of the slug variations
        const pagesRef = collection(db, 'vida-pages');
        
        for (const slugVariation of slugVariations) {
          console.log('Trying slug variation:', slugVariation);
          
          const q = query(pagesRef, where('slug', '==', slugVariation));
          const querySnapshot = await getDocs(q);
          
          if (!querySnapshot.empty) {
            console.log('Found page with slug:', slugVariation);
            pageData = { 
              id: querySnapshot.docs[0].id, 
              ...querySnapshot.docs[0].data() 
            };
            break;
          }
        }
        
        // If still not found, try by ID
        if (!pageData) {
          console.log('No page found by slug, trying ID:', slug);
          const docRef = doc(db, 'vida-pages', slug);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            console.log('Found page by ID');
            pageData = { id: docSnap.id, ...docSnap.data() };
          }
        }

        if (pageData) {
          console.log('Final page data:', pageData);
          setPage(pageData);
        } else {
          setError('Page not found');
        }
      } catch (err) {
        console.error('Error fetching page:', err);
        setError('Failed to load page');
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Project not found</div>
      </div>
    );
  }

  return (
    <div className="pt-5 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="space-y-8">
          {page.sections?.map((section) => (
            <SectionRenderer key={section.id} section={section} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DynamicProjectPage;