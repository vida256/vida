import { Footer } from '@/widgets/layout';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapComponent = () => {
  const position = [0.3176, 32.5826]; // Kampala coordinates
  const zoom = 14;

  return (
    <MapContainer 
      center={position} 
      zoom={zoom} 
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%", borderRadius: "0.5rem" }}
      className="z-0"
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        crossOrigin="anonymous"
      />
      <Marker position={position}>
        <Popup>
          <div className="text-sm">
            <strong>VIDA Management Consult Limited</strong><br />
            Kampala, Uganda<br />
            <a 
              href="https://maps.google.com/?q=0.3176,32.5826" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              Get Directions
            </a>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    const phoneRegex = /^\d{9,15}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
      });
      alert('Form submitted successfully!');
    } catch (error) {
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Hero Section */}
      <div className="relative h-[200px] bg-green-900 overflow-hidden">
  <div className="absolute inset-0">
    <img 
      src="/img/waste-4.jpg" 
      alt="Waste Management"
      className="w-full h-full object-cover opacity-30"
    />
    {/* Dark overlay */}
    <div className="absolute inset-0 bg-black opacity-40"></div>
  </div>
  <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
    <h1 className="text-3xl font-bold text-white mb-2">
      Contact Us
    </h1>
    <p className="text-lg text-gray-100 max-w-3xl">
      Email, call, or complete the form to learn how VIDA Management Consult Limited can solve your messaging problem
    </p>
  </div>
</div>

    
      <div className="max-w-7xl mx-auto flex flex-col px-4 py-8 md:flex-row gap-6">
        {/* Left Section with Contact Info */}
        <div className="flex-1 space-y-6 md:pr-6">
          <div className="space-y-1">
            <p className="text-gray-500 flex items-center gap-2 text-sm">
              <span className="text-blue-800">📧</span>
              vida@teams.com
            </p>
            <p className="text-gray-500 flex items-center gap-2 text-sm">
              <span className="text-blue-800">📞</span>
              +256 759 542772
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h2 className="text-sm font-semibold mb-1">Customer Support</h2>
              <p className="text-gray-500 text-xs">
                Our support team is available around the clock to address any concerns or queries you may have.
              </p>
            </div>
            
            <div>
              <h2 className="text-sm font-semibold mb-1">Feedback and Suggestions</h2>
              <p className="text-gray-500 text-xs">
                We value your feedback and are continuously working to improve Snappy. Your input is crucial in shaping the future of Snappy.
              </p>
            </div>
            
            <div>
              <h2 className="text-sm font-semibold mb-1">Media Inquiries</h2>
              <p className="text-gray-500 text-xs">
                For media-related questions or press inquiries, please contact us at vida@teams.com
              </p>
            </div>
          </div>

          {/* Map Section */}
          <div className="w-full rounded-lg overflow-hidden shadow-lg h-64 bg-gray-100">
            <MapComponent />
          </div>
        </div>

        {/* Right Section - Contact Form */}
        <div className="flex-1 md:mt-0">
          <div className="bg-blue-gray-50 rounded-md p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="mb-4">
              <h2 className="text-lg font-semibold">Get in Touch</h2>
              <p className="text-gray-600 text-xs">You can reach us anytime</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First name"
                    className={`w-full px-3 py-2 rounded-lg border ${errors.firstName ? 'border-red-500' : 'border-gray-200'} focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all duration-300`}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last name"
                    className={`w-full px-3 py-2 rounded-lg border ${errors.lastName ? 'border-red-500' : 'border-gray-200'} focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all duration-300`}
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>
                  )}
                </div>
              </div>
              
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email"
                className={`w-full px-3 py-2 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-200'} focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all duration-300`}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
              )}
              
              <div className="flex gap-2">
                <select className="px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all duration-300 w-24">
                  <option>+256</option>
                </select>
                <div className="flex-1">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone number"
                    className={`w-full px-3 py-2 rounded-lg border ${errors.phone ? 'border-red-500' : 'border-gray-200'} focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all duration-300`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
                  )}
                </div>
              </div>
              
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="How can we help?"
                rows={3}
                className={`w-full px-3 py-2 rounded-lg border ${errors.message ? 'border-red-500' : 'border-gray-200'} focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all duration-300 resize-none`}
              />
              {errors.message && (
                <p className="mt-1 text-xs text-red-500">{errors.message}</p>
              )}
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
              
              <p className="text-center text-xs text-gray-600">
                By contacting us, you agree to our{' '}
                <a href="#" className="text-blue-600 hover:text-blue-700 transition-colors duration-300">
                  Terms of service
                </a>
                {' '}and{' '}
                <a href="#" className="text-blue-600 hover:text-blue-700 transition-colors duration-300">
                  Privacy Policy
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default ContactPage;