import { ArrowUpRight, Building2, GraduationCap, Phone, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { wasteManagementContent } from '../data/wasteManagement';

const StatCard = ({ icon: Icon, number, text, subtext, isVisible }) => (
  <div className={`transform transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
    <div className="bg-white/50 backdrop-blur-sm rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-50 rounded-xl">
            <Icon className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-gray-800">{number}</h3>
            <p className="text-sm text-gray-600 mt-1">{text}</p>
            <p className="text-xs text-gray-500">{subtext}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const WasteManagementSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { stats, mainContent, contactCard, coverageCard } = wasteManagementContent;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('vida-section');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="vida-section" className="py-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              <StatCard
                icon={Users}
                number={stats.employees.number}
                text={stats.employees.text}
                subtext={stats.employees.subtext}
                isVisible={isVisible}
              />
              <StatCard
                icon={Building2}
                number={stats.coverage.number}
                text={stats.coverage.text}
                subtext={stats.coverage.subtext}
                isVisible={isVisible}
              />
            </div>

            {/* Main Content */}
            <div className={`transform transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                {mainContent.title}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {mainContent.description}
              </p>
            </div>

            {/* Contact Card */}
            <div className={`transform transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative">
                    <div className="p-3 bg-blue-50 rounded-xl">
                      <Phone className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">Get in Touch</h3>
                </div>
                <p className="text-gray-600 mb-6">
                  {contactCard.description}
                </p>
                <button className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium group">
                  {contactCard.buttonText}
                  <ArrowUpRight className="w-4 h-4 ml-2 transition-transform group-hover:-translate-y-1" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className={`transform transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-64">
                <img
                  src="/img/teaching.png"
                  alt="VIDA Consulting Services"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center text-white">
                  <GraduationCap className="w-5 h-5 mr-2" />
                  <span className="text-sm font-medium">Financial Education & Training</span>
                </div>
              </div>
              <div className="p-6">
                <span className="text-sm text-blue-600 font-medium">
                  {coverageCard.label}
                </span>
                <h3 className="text-xl font-semibold text-gray-800 mt-2 mb-2">
                  {coverageCard.title}
                </h3>
                <p className="text-gray-600">
                  {coverageCard.description}
                </p>
                <div className="mt-6 space-y-3">
                  {['Kampala', 'Arua', 'Hoima'].map((location, i) => (
                    <div key={location} className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      <span className="text-sm text-gray-600">{location} Branch</span>
                      <div className="flex-1 h-px bg-gray-200 mx-4"></div>
                      <span className="text-sm text-blue-600">Active</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WasteManagementSection;