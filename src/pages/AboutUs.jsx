import { companyInfo } from '@/data/about';
import EssayServiceFeatures from '@/widgets/cards/FeatureCard';
import VidaCompanySection from '@/widgets/layout/VidaCompanySection';
import VidaServices from '@/widgets/layout/VidaServices';
import { Mail, MapPin, Phone } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section
      className="relative bg-blue-900 bg-cover bg-center"
      style={{ backgroundImage: `url('/img/teaching.png')` }} // Update the path as needed
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-800 to-blue-900 opacity-90"></div>

      {/* Content Container */}
      <div className="container mx-auto px-4 relative">
        <div className="py-5 md:py-10">
          {/* Header */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
              ABOUT US
            </h1>
            <p className="text-sm md:text-base text-blue-50 mb-4 md:mb-8">
              {companyInfo.background.description}
            </p>
            <div className="inline-flex items-center space-x-2 text-blue-200">
              <span className="text-2xl font-bold">Est. {companyInfo.background.established}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
              <span className="text-2xl font-bold">{companyInfo.stats.yearsExperience}+ Years</span>
            </div>
          </div>

          {/* Highlights */}
          <div className="grid md:grid-cols-3 gap-8">
            {companyInfo.background.highlights.map((highlight, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white">
                <h3 className="text-xl font-semibold mb-3 text-blue-200">{highlight.title}</h3>
                <p className="text-blue-100">{highlight.description}</p>
              </div>
            ))}
          </div>

          {/* Key Impact Areas and Focus Sectors */}
          <div className="mt-16 grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white mb-4">Key Impact Areas</h3>
              <div className="flex flex-wrap gap-3">
                {companyInfo.background.impactAreas.map((area, index) => (
                  <span key={index} className="bg-blue-800/50 text-blue-100 px-4 py-2 rounded-full text-sm">
                    {area}
                  </span>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white mb-4">Focus Sectors</h3>
              <div className="flex flex-wrap gap-3">
                {companyInfo.background.keyFocus.map((focus, index) => (
                  <span key={index} className="bg-blue-800/50 text-blue-100 px-4 py-2 rounded-full text-sm">
                    {focus}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

      {/* Vision & Mission */}
      <section className="py-5 bg-white">
      <VidaCompanySection />
      </section>
      

      {/* Core Values */}
      <section className="py-5 bg-blue-gray-50">
      <EssayServiceFeatures />
      </section>

      {/* Key Projects */}
      <section className="py-5 bg-white">
      <VidaServices />
      </section>

      {/* Regional Presence */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Regional Presence</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {companyInfo.branches.map((branch, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center space-x-3 mb-4">
                  <MapPin className="w-6 h-6 text-blue-600" />
                  <div>
                    <h3 className="text-xl font-bold">{branch.location}</h3>
                    <p className="text-sm text-gray-600">{branch.type}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-2">{branch.description}</p>
                <p className="text-sm text-blue-600">{branch.region}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-center space-x-3">
                    <Phone className="w-5 h-5 text-blue-300" />
                    <a href={`tel:${companyInfo.contact.phones[0]}`} className="text-blue-100 hover:text-white transition-colors">
                      {companyInfo.contact.phones[0]}
                    </a>
                  </div>
                  <div className="flex items-center justify-center space-x-3">
                    <Mail className="w-5 h-5 text-blue-300" />
                    <a href={`mailto:${companyInfo.contact.emails[0]}`} className="text-blue-100 hover:text-white transition-colors">
                      {companyInfo.contact.emails[0]}
                    </a>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Office Location</h3>
                <div className="space-y-2">
                  <p className="text-blue-100">{companyInfo.location.address}</p>
                  <p className="text-blue-100">{companyInfo.location.poBox}</p>
                  <p className="text-blue-100">{companyInfo.location.city}, {companyInfo.location.country}</p>
                </div>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-blue-800">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-4">Focal Point Contact</h3>
                <p className="text-lg font-medium text-blue-100">{companyInfo.contact.focalPoint.name}</p>
                <p className="text-blue-200">{companyInfo.contact.focalPoint.position}</p>
                <div className="mt-4 space-y-2">
                  <p className="text-blue-100">{companyInfo.contact.focalPoint.phone}</p>
                  <p className="text-blue-100">{companyInfo.contact.focalPoint.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-blue-950 text-center py-6">
        <div className="container mx-auto px-4">
          <p className="text-blue-200 text-sm">
            © {new Date().getFullYear()} {companyInfo.name}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;