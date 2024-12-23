import { partnersData } from '../data/partnersData';

const PartnersSection = () => {
  // Adjust base width for mobile responsiveness
  const logoBaseWidth = 280; // Reduced from 400
  const logoMargin = 32; // Reduced from 64
  const totalWidth = partnersData.length * (logoBaseWidth + logoMargin);

  return (
    <section className="py-8 md:py-5 bg-gray-50">
      <div className="w-full px-4">
        <div className="mb-8 md:mb-16 text-center max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">
            OUR TRUSTED PARTNERS
          </h2>
          <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-8">
            Since 2015, VIDA Management Consult has partnered with leading organizations 
            to transform communities through financial inclusion and enterprise development. 
            Our partnerships span government bodies, international development agencies, 
            and nonprofit organizations.
          </p>
          <p className="text-sm md:text-base text-gray-600">
            Together with our partners, we've impacted over 3,000 farmers, trained 
            275 refugee and host communities, and implemented projects across Uganda 
            worth over UGX 1 billion, focusing on financial literacy, entrepreneurship, 
            and sustainable development.
          </p>
        </div>
        
        <div className="relative overflow-hidden">
          <div className="flex">
            {/* First set of logos */}
            <div className="flex animate-marquee whitespace-nowrap">
              {partnersData.map((partner) => (
                <div 
                  key={partner.id}
                  className="mx-4 md:mx-8 flex items-center justify-center"
                  style={{ 
                    width: 'clamp(200px, 30vw, 280px)',
                    flexShrink: 0 
                  }}
                >
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="w-full h-24 md:h-32 object-contain transition-transform duration-300 hover:scale-105"
                  />
                </div>
              ))}
            </div>
            {/* Second set of logos - exact duplicate */}
            <div className="flex animate-marquee2 whitespace-nowrap">
              {partnersData.map((partner) => (
                <div 
                  key={`${partner.id}-duplicate`}
                  className="mx-4 md:mx-8 flex items-center justify-center"
                  style={{ 
                    width: 'clamp(200px, 30vw, 280px)',
                    flexShrink: 0 
                  }}
                >
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="w-full h-24 md:h-32 object-contain transition-transform duration-300 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-${totalWidth}px); }
        }
        @keyframes marquee2 {
          0% { transform: translateX(0); }
          100% { transform: translateX(-${totalWidth}px); }
        }
        .animate-marquee {
          animation: marquee ${partnersData.length * 5}s linear infinite;
        }
        .animate-marquee2 {
          animation: marquee2 ${partnersData.length * 5}s linear infinite;
        }
        .animate-marquee:hover,
        .animate-marquee2:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default PartnersSection;