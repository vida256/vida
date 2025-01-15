import { Footer } from '@/widgets/layout';
import { Building2, Globe2, Users } from 'lucide-react';
import { useState } from 'react';
import { partnersData } from '../data/partnersData';

const PartnersScreen = () => {
  const [filter, setFilter] = useState('all');

  // Enhanced partner data with categories and descriptions
  const enhancedPartners = partnersData.map(partner => {
    let type = 'international';
    let description = '';

    // Categorize partners
    if (['MAAI', 'MAAIF', 'MWE'].includes(partner.shortName)) {
      type = 'government';
      description = 'Implementing national development programs and policies across Uganda.';
    } else if (['CARE', 'GOAL', 'ACTIONAID', 'COMVIS', 'RESTLESS'].includes(partner.shortName)) {
      type = 'civil-society';
      description = 'Supporting community development and social transformation initiatives.';
    } else if (['CNOOC'].includes(partner.shortName)) {
      type = 'private-sector';
      description = 'Partnering for sustainable development and economic growth.';
    } else {
      description = 'Supporting international development and cooperation initiatives.';
    }

    return {
      ...partner,
      type,
      description
    };
  });

  const filteredPartners = filter === 'all' 
    ? enhancedPartners 
    : enhancedPartners.filter(partner => partner.type === filter);

  return (
    <section className="relative">
      {/* Hero Section with Background */}
      <div className="relative h-[250px] bg-gradient-to-r from-blue-900 to-blue-800">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-white mb-3">
            Our Trusted Partners
          </h1>
          <p className="text-white/90 text-sm max-w-2xl mx-auto">
            Since 2015, VIDA has collaborated with government bodies, international organizations, 
            and civil society partners to deliver financial inclusion and enterprise development 
            solutions across Uganda, impacting thousands of lives and communities.
          </p>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="w-full mx-auto px-4 mt-6">
        <div className="bg-white rounded-md shadow-lg p-2 flex flex-wrap gap-3 justify-center">
          <button 
            onClick={() => setFilter('all')}
            className={`px-4 py-1.5 rounded-md flex items-center gap-2 text-sm transition-colors
              ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
          >
            <Users size={16} />
            All
          </button>
          <button 
            onClick={() => setFilter('government')}
            className={`px-4 py-1.5 rounded-md flex items-center gap-2 text-sm transition-colors
              ${filter === 'government' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
          >
            <Building2 size={16} />
            Government
          </button>
          <button 
            onClick={() => setFilter('international')}
            className={`px-4 py-1.5 rounded-md flex items-center gap-2 text-sm transition-colors
              ${filter === 'international' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
          >
            <Globe2 size={16} />
            International
          </button>
          <button 
            onClick={() => setFilter('civil-society')}
            className={`px-4 py-1.5 rounded-md flex items-center gap-2 text-sm transition-colors
              ${filter === 'civil-society' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
          >
            <Users size={16} />
            Civil Society
          </button>
        </div>
      </div>

      {/* Partners Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPartners.map((partner) => (
            <div key={partner.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-4 flex items-center justify-center border-b h-40">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-w-[250px] max-h-[100px] object-contain"
                />
              </div>
              <div className="p-4">
                <span className="inline-block px-2 py-0.5 rounded-md text-xs font-medium bg-blue-100 text-blue-800 mb-2">
                  {partner.type.split('-').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ')}
                </span>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {partner.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {partner.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </section>
  );
};

export default PartnersScreen;
