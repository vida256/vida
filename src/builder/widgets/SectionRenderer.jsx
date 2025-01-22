
const SectionRenderer = ({ section }) => {
  // Image processing helper
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

  // Reusable image component with processing
  const ImageComponent = ({ src, alt = "", className = "" }) => (
    <img
      src={processImageUrl(src)}
      alt={alt}
      className={className}
      crossOrigin="anonymous"
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={(e) => {
        console.warn('Image failed to load:', src);
        e.target.src = '/api/placeholder/400/300';
      }}
    />
  );

  switch (section.type) {
    case 'hero':
      return (
        <section className="relative min-h-[200px] bg-gray-800 rounded-lg overflow-hidden">
          {section.content.backgroundImage && (
            <ImageComponent
              src={section.content.backgroundImage}
              alt="Hero background"
              className="absolute inset-0 w-full h-full object-cover opacity-50"
            />
          )}
          <div className="relative z-10 p-6 flex flex-col items-center justify-center min-h-[200px] text-center">
            <h2 className="text-2xl font-bold text-white mb-2">
              {section.content.title}
            </h2>
            <p className="text-base text-white/80 mb-4">
              {section.content.subtitle}
            </p>
            {section.content.buttonText && (
              <a
                href={section.content.buttonLink || '#'}
                className="px-4 py-2 bg-green-600 text-sm text-white rounded-lg hover:bg-green-500"
              >
                {section.content.buttonText}
              </a>
            )}
          </div>
        </section>
      );

    case 'imageText':
      return (
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center mb-6">
          <div
            className={`${
              section.content.layout === 'imageRight' ? 'order-2' : 'order-1'
            }`}
          >
            <ImageComponent
              src={section.content.image}
              alt=""
              className="w-full h-[200px] object-cover rounded-lg"
            />
          </div>
          <div
            className={`${
              section.content.layout === 'imageRight' ? 'order-1' : 'order-2'
            } p-4`}
          >
            <h3 className="text-xl font-bold mb-2">{section.content.title}</h3>
            <p className="text-base text-gray-700">{section.content.text}</p>
          </div>
        </section>
      );

    case 'imageGallery':
      return (
        <section className="mb-6">
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 ${
              section.content.layout === 'masonry'
                ? 'auto-rows-auto'
                : 'auto-rows-fr'
            }`}
          >
            {section.content.images?.map((img, index) => (
              <ImageComponent
                key={index}
                src={img}
                alt=""
                className="w-full h-40 object-cover rounded-lg"
              />
            ))}
          </div>
        </section>
      );

    case 'textContent':
      return (
        <section className="prose max-w-none mb-6">
          <p className="text-base text-gray-700">{section.content.content}</p>
        </section>
      );

    case 'twoColumns':
      return (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="prose">
            <p className="text-base text-gray-700">{section.content.leftContent}</p>
          </div>
          <div className="prose">
            <p className="text-base text-gray-700">{section.content.rightContent}</p>
          </div>
        </section>
      );

    default:
      return null;
  }
};

export default SectionRenderer;