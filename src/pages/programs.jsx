import { Footer } from '@/widgets/layout';
import { collection, getDocs } from 'firebase/firestore';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase-config';

const PageCard = ({ page }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState({});
  const [isPaused, setIsPaused] = useState(false);  // Add state for pausing rotation

  const heroSection = page.sections?.find(section => section.type === 'hero');
  const gallerySection = page.sections?.find(section => section.type === 'imageGallery');
  const textSection = page.sections?.find(section => section.type === 'textContent');
  const imageTextSection = page.sections?.find(section => section.type === 'imageText');

  const processImageUrl = (url) => {
    if (!url) return null;
    try {
      const encodedUrl = new URL(url);
      encodedUrl.searchParams.append('t', Date.now());
      return encodedUrl.toString();
    } catch (e) {
      console.warn('Invalid image URL:', url);
      return null;
    }
  };

  const images = [
    ...(heroSection?.content?.backgroundImage ? [processImageUrl(heroSection.content.backgroundImage)] : []),
    ...(gallerySection?.content?.images || []).map(processImageUrl),
    ...(imageTextSection?.content?.image ? [processImageUrl(imageTextSection.content.image)] : [])
  ].filter(url => url && !imageErrors[url]).slice(0, 3);

  // Auto-rotate images every 2 seconds
  useEffect(() => {
    if (images.length <= 1 || isPaused) return; // Don't rotate if only one image or paused

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [images.length, isPaused]);

  const nextImage = () => {
    if (images.length <= 1) return;
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
    setIsPaused(true); // Pause auto-rotation when manually navigating
  };

  const prevImage = () => {
    if (images.length <= 1) return;
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    setIsPaused(true); // Pause auto-rotation when manually navigating
  };

  const handleImageError = (imgSrc) => {
    console.warn('Image failed to load:', imgSrc);
    setImageErrors(prev => ({
      ...prev,
      [imgSrc]: true
    }));
  };

  const getPageDescription = () => {
    if (textSection?.content?.content) return textSection.content.content;
    if (heroSection?.content?.subtitle) return heroSection.content.subtitle;
    if (imageTextSection?.content?.text) return imageTextSection.content.text;
    return '';
  };

  // Handle mouse enter/leave for pausing/resuming rotation
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden w-full">
      <div 
        className="relative h-32 bg-gray-100"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {images.length > 0 ? (
          <>
            <img
              src={images[currentImageIndex]}
              alt={page.title}
              className="w-full h-full object-cover transition-opacity duration-300"
              loading="lazy"
              crossOrigin="anonymous"
              referrerPolicy="no-referrer"
              onError={() => handleImageError(images[currentImageIndex])}
            />
            <div className="absolute inset-0 bg-black/30"></div>
            <div className="absolute top-0 left-0 p-3">
              <h3 className="text-white font-semibold text-lg drop-shadow-md">
                {page.title || heroSection?.content?.title || 'Untitled Page'}
              </h3>
            </div>
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 bg-white/80 rounded-full shadow hover:bg-white transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-white/80 rounded-full shadow hover:bg-white transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No images available
          </div>
        )}
      </div>
      <div className="p-4">
        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
          {getPageDescription()}
        </p>
        <Link
  to={`/programs${page.slug?.startsWith('/') ? page.slug : `/${page.slug || page.id}`}`}
  className="text-sm text-blue-600 hover:text-blue-800 font-medium inline-flex items-center transition-colors"
>
  View Project <ChevronRight className="w-4 h-4 ml-1" />
</Link>
      </div>
    </div>
  );
};

const VidaProjects = () => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        console.log('Fetching pages from vida-pages collection...');
        const querySnapshot = await getDocs(collection(db, 'vida-pages'));
        const pagesData = querySnapshot.docs.map(doc => {
          const data = doc.data();
          console.log('Document data:', { id: doc.id, data });
          return {
            id: doc.id,
            ...data
          };
        });
        console.log('Processed pages data:', pagesData);
        setPages(pagesData);
        setError(null);
      } catch (error) {
        console.error('Error fetching pages:', error);
        setError('Failed to load pages. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPages();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-[200px] bg-gradient-to-r from-blue-900 to-blue-800">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative max-w-6xl mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-white mb-2">
            Our Projects
          </h1>
          <p className="text-white/90 text-sm max-w-xl mx-auto">
            Explore our diverse portfolio of projects making positive impacts across Uganda
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center py-12">Loading projects...</div>
        ) : error ? (
          <div className="text-center py-12 text-red-600">{error}</div>
        ) : pages.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No projects found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pages.map((page) => (
              <PageCard key={page.id} page={page} />
            ))}
          </div>
        )}
        <div className="mt-16 text-center bg-gradient-to-r from-blue-900 to-blue-800 py-8 rounded-lg">
          <p className="text-gray-50 mb-3 text-sm">Interested in partnering with us?</p>
          <Link
            to="/contact"
            className="inline-block px-6 py-2 bg-white text-blue-900 rounded-lg text-sm hover:bg-blue-50 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VidaProjects;
