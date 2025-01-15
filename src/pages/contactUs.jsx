import React, { useState } from 'react';
// Import Footer dynamically to avoid MIME type issues
const Footer = React.lazy(() => import('@/widgets/layout/Footer'));

// Map placeholder component since we can't use external libraries
const MapPlaceholder = () => (
  <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
    <div className="text-center p-4">
      <div className="text-gray-600 mb-2">📍 VIDA Management Consult Limited</div>
      <div className="text-sm text-gray-500">Kampala, Uganda</div>
      <a 
        href="https://maps.google.com/?q=0.3176,32.5826" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 text-sm mt-2 inline-block"
      >
        Get Directions
      </a>
    </div>
  </div>
);

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
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{9,15}$/;

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
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
      // Simulated API call
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

  const InputField = ({ name, type = 'text', placeholder, value }) => (
    <div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={`w-full px-3 py-2 rounded-lg border ${
          errors[name] ? 'border-red-500' : 'border-gray-200'
        } focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all duration-300`}
      />
      {errors[name] && (
        <p className="mt-1 text-xs text-red-500">{errors[name]}</p>
      )}
    </div>
  );

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Hero Section */}
      <div className="relative h-48 bg-green-900 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/img/waste-4.jpg" 
            alt="Waste Management"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-black opacity-40" />
        </div>
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-white mb-2">Contact Us</h1>
          <p className="text-lg text-gray-100 max-w-3xl">
            Email, call, or complete the form to learn how VIDA Management Consult Limited can solve your messaging problem
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col px-4 py-8 md:flex-row gap-6">
        {/* Left Section */}
        <div className="flex-1 space-y-6 md:pr-6">
          <div className="space-y-1">
            <p className="text-gray-500 flex items-center gap-2 text-sm">
              <span className="text-blue-800">📧</span> vida@teams.com
            </p>
            <p className="text-gray-500 flex items-center gap-2 text-sm">
              <span className="text-blue-800">📞</span> +256 759 542772
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: 'Customer Support',
                desc: 'Our support team is available around the clock to address any concerns or queries you may have.'
              },
              {
                title: 'Feedback and Suggestions',
                desc: 'We value your feedback and are continuously working to improve our services. Your input is crucial in shaping our future.'
              },
              {
                title: 'Media Inquiries',
                desc: 'For media-related questions or press inquiries, please contact us at vida@teams.com'
              }
            ].map(({ title, desc }) => (
              <div key={title}>
                <h2 className="text-sm font-semibold mb-1">{title}</h2>
                <p className="text-gray-500 text-xs">{desc}</p>
              </div>
            ))}
          </div>

          {/* Map Section */}
          <div className="w-full rounded-lg overflow-hidden shadow-lg h-64">
            <MapPlaceholder />
          </div>
        </div>

        {/* Right Section - Contact Form */}
        <div className="flex-1 md:mt-0">
          <div className="bg-gray-50 rounded-md p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="mb-4">
              <h2 className="text-lg font-semibold">Get in Touch</h2>
              <p className="text-gray-600 text-xs">You can reach us anytime</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <InputField name="firstName" placeholder="First name" value={formData.firstName} />
                <InputField name="lastName" placeholder="Last name" value={formData.lastName} />
              </div>

              <InputField name="email" type="email" placeholder="Your email" value={formData.email} />

              <div className="flex gap-2">
                <select className="px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all duration-300 w-24">
                  <option>+256</option>
                </select>
                <div className="flex-1">
                  <InputField name="phone" type="tel" placeholder="Phone number" value={formData.phone} />
                </div>
              </div>

              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  rows={3}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    errors.message ? 'border-red-500' : 'border-gray-200'
                  } focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all duration-300 resize-none`}
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-red-500">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>

              <p className="text-center text-xs text-gray-600">
                By contacting us, you agree to our{' '}
                <a href="#" className="text-blue-600 hover:text-blue-700 transition-colors duration-300">
                  Terms of service
                </a>{' '}
                and{' '}
                <a href="#" className="text-blue-600 hover:text-blue-700 transition-colors duration-300">
                  Privacy Policy
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Footer />
      </React.Suspense>
    </div>
  );
};

export default ContactPage;