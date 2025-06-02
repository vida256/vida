import { ArrowUpRight, Building2, CheckCircle, GraduationCap, Mail, MapPin, Users, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { wasteManagementContent } from '../data/wasteManagement';

const AnimatedCounter = ({ number, isVisible }) => {
  const [count, setCount] = useState(0);
  const target = parseInt(number);

  useEffect(() => {
    if (isVisible && count < target) {
      const timer = setTimeout(() => {
        setCount(prev => Math.min(prev + Math.ceil(target / 30), target));
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [count, target, isVisible]);

  return <span>{count}</span>;
};

const ModernStatCard = ({ icon: Icon, number, text, subtext, isVisible, delay = 0, gradient }) => (
  <div 
    className={`transform transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    style={{ transitionDelay: `${delay}ms` }}
  >
    <div className={`relative group cursor-pointer p-8 rounded-3xl ${gradient} hover:scale-105 transition-all duration-500 shadow-large hover:shadow-xl overflow-hidden`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 right-4 w-20 h-20 rounded-full border-2 border-white/30"></div>
        <div className="absolute bottom-4 left-4 w-12 h-12 rounded-full border border-white/20"></div>
      </div>
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl group-hover:scale-110 transition-transform duration-300">
            <Icon className="w-8 h-8 text-white" />
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-white mb-1">
              <AnimatedCounter number={number} isVisible={isVisible} />
              {number.includes('+') && '+'}
            </div>
            <div className="text-white/80 text-sm font-medium">{text}</div>
          </div>
        </div>
        <p className="text-white/70 text-sm leading-relaxed">{subtext}</p>
      </div>
    </div>
  </div>
);

const FeatureCard = ({ icon: Icon, title, description, isVisible, delay = 0 }) => (
  <div 
    className={`transform transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    style={{ transitionDelay: `${delay}ms` }}
  >
    <div className="group bg-white rounded-2xl p-6 shadow-soft hover:shadow-large transition-all duration-300 border border-gray-100/50 hover:border-primary-200">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-6 h-6 text-primary-600" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-300">{title}</h4>
          <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  </div>
);

const WasteManagementSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
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

  const features = [
    {
      icon: GraduationCap,
      title: "Expert Training Programs",
      description: "Comprehensive financial literacy and entrepreneurship training designed for maximum impact"
    },
    {
      icon: Users,
      title: "Community Empowerment",
      description: "Building stronger communities through targeted capacity building and skill development"
    },
    {
      icon: Zap,
      title: "Innovation-Driven Solutions",
      description: "Cutting-edge approaches to financial inclusion and enterprise development"
    }
  ];

  const branches = [
    { name: 'Kampala', region: 'Central Uganda', status: 'Headquarters' },
    { name: 'Arua', region: 'Northern Uganda', status: 'Regional Office' },
    { name: 'Hoima', region: 'Western Uganda', status: 'Regional Office' }
  ];

  return (
    <section id="vida-section" className="relative py-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-primary-50/30"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary-100/40 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-accent-100/40 to-transparent rounded-full blur-3xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className={`text-center mb-16 transform transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center bg-primary-50 text-primary-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <CheckCircle className="w-4 h-4 mr-2" />
            Trusted Since 2015
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {mainContent.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {mainContent.description}
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <ModernStatCard
            icon={Users}
            number={stats.employees.number}
            text={stats.employees.text}
            subtext={stats.employees.subtext}
            isVisible={isVisible}
            delay={200}
            gradient="bg-gradient-to-br from-primary-600 to-primary-500"
          />
          <ModernStatCard
            icon={Building2}
            number={stats.coverage.number}
            text={stats.coverage.text}
            subtext={stats.coverage.subtext}
            isVisible={isVisible}
            delay={400}
            gradient="bg-gradient-to-br from-accent-600 to-accent-500"
          />
        </div>

        {/* Main Content Area */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Features & Contact */}
          <div className="space-y-8">
            {/* Features Grid */}
            <div className="space-y-6">
              <h3 className={`text-2xl font-bold text-gray-900 mb-6 transform transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                Why Choose VIDA?
              </h3>
              {features.map((feature, index) => (
                <FeatureCard
                  key={feature.title}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  isVisible={isVisible}
                  delay={600 + index * 200}
                />
              ))}
            </div>

            {/* Enhanced Contact Card */}
            <div className={`transform transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '1200ms' }}>
              <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary-500/20 to-transparent rounded-full"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-accent-500/20 to-transparent rounded-full"></div>
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-white/10 backdrop-blur-sm rounded-xl">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">Ready to Get Started?</h3>
                  </div>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {contactCard.description}
                  </p>
                  <NavLink 
                    to="/contact"
                    className="group w-full bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    Email Us
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </NavLink>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Coverage & Image */}
          <div className={`transform transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`} style={{ transitionDelay: '800ms' }}>
            <div className="bg-white rounded-3xl shadow-large overflow-hidden border border-gray-100/50">
              {/* Image Section */}
              <div className="relative h-80 overflow-hidden">
                <img
                  src="/img/teaching.png"
                  alt="VIDA Consulting Services"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent" />
                
                {/* Floating Badge */}
                <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-medium">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary-100 rounded-lg">
                      <GraduationCap className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">Financial Education</div>
                      <div className="text-xs text-gray-600">& Training Programs</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Coverage Content */}
              <div className="p-8">
                <div className="mb-6">
                  <span className="inline-flex items-center bg-primary-50 text-primary-600 px-3 py-1 rounded-full text-sm font-medium mb-3">
                    <MapPin className="w-4 h-4 mr-2" />
                    {coverageCard.label}
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {coverageCard.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {coverageCard.description}
                  </p>
                </div>

                {/* Branches List */}
                <div className="space-y-4">
                  {branches.map((branch, index) => (
                    <div key={branch.name} className="group flex items-center justify-between p-4 bg-gray-50 hover:bg-primary-50 rounded-xl transition-all duration-300">
                      <div className="flex items-center gap-4">
                        <div className="w-3 h-3 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full shadow-soft"></div>
                        <div>
                          <div className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-300">
                            {branch.name} Branch
                          </div>
                          <div className="text-sm text-gray-600">{branch.region}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-primary-600">{branch.status}</div>
                        <div className="text-xs text-gray-500">Active</div>
                      </div>
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