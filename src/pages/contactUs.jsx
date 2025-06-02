import { Footer } from '@/widgets/layout';
import {
    ArrowRight,
    Award,
    Building2,
    Calendar,
    CheckCircle,
    Clock,
    Globe,
    HeadphonesIcon,
    Mail,
    MapPin,
    MessageSquare,
    Phone,
    Send,
    Target,
    Users
} from 'lucide-react';
import { useEffect, useState } from 'react';

// Enhanced Map component with better styling
const InteractiveMap = () => (
  <div className="relative w-full h-full bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl overflow-hidden group">
    <div className="absolute inset-0 bg-gradient-to-br from-primary-600/10 to-primary-800/20"></div>
    <div className="relative h-full flex flex-col items-center justify-center p-8 text-center">
      <div className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-large">
        <MapPin className="w-10 h-10 text-white" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">Visit Our Office</h3>
      <p className="text-gray-600 mb-2">VIDA Management Consult Limited</p>
      <p className="text-gray-600 mb-6">Kampala, Uganda</p>
      <a 
        href="https://maps.google.com/?q=0.3176,32.5826" 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 active:scale-95 shadow-medium"
      >
        <MapPin className="w-4 h-4" />
        Get Directions
      </a>
    </div>
  </div>
);

// Contact Info Card Component
const ContactInfoCard = ({ icon: Icon, title, details, action, delay }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className={`bg-white rounded-2xl p-6 shadow-soft hover:shadow-large transition-all duration-500 border border-gray-100/50 hover:border-primary-200 group transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-medium">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">{title}</h3>
          <div className="space-y-2 mb-4">
            {details.map((detail, index) => (
              <p key={index} className="text-gray-600 text-sm">{detail}</p>
            ))}
          </div>
          {action && (
            <a
              href={action.href}
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium text-sm group/btn transition-colors duration-200"
            >
              {action.text}
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

// Form Input Component
const FormInput = ({ label, name, type = 'text', placeholder, value, onChange, error, required = false, rows }) => (
  <div className="space-y-2">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {type === 'textarea' ? (
      <textarea
        id={name}
        name={name}
        rows={rows || 4}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-xl border ${
          error ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-primary-500 focus:ring-primary-200'
        } focus:ring-2 focus:ring-opacity-50 transition-all duration-300 resize-none bg-white`}
      />
    ) : (
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-xl border ${
          error ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-primary-500 focus:ring-primary-200'
        } focus:ring-2 focus:ring-opacity-50 transition-all duration-300 bg-white`}
      />
    )}
    {error && (
      <p className="text-red-500 text-sm flex items-center gap-1">
        <span className="w-1 h-1 bg-red-500 rounded-full"></span>
        {error}
      </p>
    )}
  </div>
);

// Success Message Component
const SuccessMessage = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
      <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm" />
      <div className="relative bg-white rounded-2xl p-8 max-w-md mx-auto shadow-xl animate-scale-in">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
          <p className="text-gray-600 mb-6">Thank you for contacting us. We'll get back to you within 24 hours.</p>
          <button
            onClick={onClose}
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

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
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        projectType: '',
        message: ''
      });
      setShowSuccess(true);
    } catch (error) {
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: ["vida@teams.com", "Send us an email anytime"],
      action: { href: "mailto:vida@teams.com", text: "Send Email" },
      delay: 200
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+256 759 542772", "Mon-Fri from 8am to 5pm"],
      action: { href: "tel:+256759542772", text: "Call Now" },
      delay: 400
    },
    {
      icon: Clock,
      title: "Office Hours",
      details: ["Monday - Friday: 8:00 AM - 5:00 PM", "Saturday: 9:00 AM - 2:00 PM", "Sunday: Closed"],
      delay: 600
    },
    {
      icon: HeadphonesIcon,
      title: "24/7 Support",
      details: ["Emergency consultations", "Available for urgent projects"],
      action: { href: "mailto:vida@teams.com", text: "Emergency Contact" },
      delay: 800
    }
  ];

  const companyStats = [
    { icon: Users, value: "500+", label: "Clients Served" },
    { icon: Target, value: "11", label: "Projects Completed" },
    { icon: Award, value: "5+", label: "Years Experience" },
    { icon: Globe, value: "19+", label: "Regions Covered" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-primary-900 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary-600/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-accent-600/20 to-transparent rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className={`text-center transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
              <MessageSquare className="w-4 h-4 mr-2 text-white" />
              <span className="text-white/90 text-sm font-medium">Get In Touch</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Let's Start a
              <span className="block text-primary-400">Conversation</span>
            </h1>
            
            <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed mb-8">
              Ready to transform your project ideas into reality? Our expert team is here to guide you 
              through every step of your development and consultation journey.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {companyStats.map((stat, index) => (
                <div 
                  key={index}
                  className={`text-center transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl mb-3 hover:scale-110 transition-transform duration-300">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-white/70 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Contact Information Cards */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How to Reach Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Multiple ways to connect with our team. Choose what works best for you.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <ContactInfoCard key={index} {...info} />
            ))}
          </div>
        </div>

        {/* Main Contact Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <div className="bg-white rounded-3xl p-8 shadow-soft border border-gray-100/50">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Send us a Message</h2>
              <p className="text-gray-600">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormInput
                  label="First Name"
                  name="firstName"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleChange}
                  error={errors.firstName}
                  required
                />
                <FormInput
                  label="Last Name"
                  name="lastName"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleChange}
                  error={errors.lastName}
                  required
                />
              </div>

              <FormInput
                label="Email Address"
                name="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                required
              />

              <FormInput
                label="Phone Number"
                name="phone"
                type="tel"
                placeholder="+256 759 542772"
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
                required
              />

              <FormInput
                label="Company/Organization"
                name="company"
                placeholder="Your Company Name (Optional)"
                value={formData.company}
                onChange={handleChange}
                error={errors.company}
              />

              <div className="space-y-2">
                <label htmlFor="projectType" className="block text-sm font-medium text-gray-700">
                  Project Type
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:ring-opacity-50 transition-all duration-300 bg-white"
                >
                  <option value="">Select a project type</option>
                  <option value="financial-inclusion">Financial Inclusion</option>
                  <option value="agricultural-development">Agricultural Development</option>
                  <option value="women-empowerment">Women Empowerment</option>
                  <option value="youth-development">Youth Development</option>
                  <option value="education-infrastructure">Education Infrastructure</option>
                  <option value="environmental-sustainability">Environmental Sustainability</option>
                  <option value="csr">Corporate Social Responsibility</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <FormInput
                label="Message"
                name="message"
                type="textarea"
                placeholder="Tell us about your project or how we can help you..."
                value={formData.message}
                onChange={handleChange}
                error={errors.message}
                rows={5}
                required
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white py-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105 active:scale-95 shadow-medium hover:shadow-large'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Sending Message...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>

              <p className="text-center text-sm text-gray-600">
                By submitting this form, you agree to our{' '}
                <a href="#" className="text-primary-600 hover:text-primary-700 transition-colors duration-300">
                  Privacy Policy
                </a>{' '}
                and{' '}
                <a href="#" className="text-primary-600 hover:text-primary-700 transition-colors duration-300">
                  Terms of Service
                </a>
              </p>
            </form>
          </div>

          {/* Map and Office Info */}
          <div className="space-y-6">
            {/* Map */}
            <div className="bg-white rounded-3xl p-8 shadow-soft border border-gray-100/50">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Our Location</h3>
              <div className="h-80">
                <InteractiveMap />
              </div>
            </div>

            {/* Office Details */}
            <div className="bg-gradient-to-br from-primary-600 to-primary-500 rounded-3xl p-8 text-white">
              <div className="flex items-center gap-3 mb-6">
                <Building2 className="w-6 h-6" />
                <h3 className="text-xl font-bold">Office Information</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 mt-1 text-primary-200" />
                  <div>
                    <p className="font-medium">VIDA Management Consult Limited</p>
                    <p className="text-primary-100">Kampala, Uganda</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 mt-1 text-primary-200" />
                  <div>
                    <p className="font-medium">Business Hours</p>
                    <p className="text-primary-100">Monday - Friday: 8:00 AM - 5:00 PM</p>
                    <p className="text-primary-100">Saturday: 9:00 AM - 2:00 PM</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 mt-1 text-primary-200" />
                  <div>
                    <p className="font-medium">Schedule a Meeting</p>
                    <p className="text-primary-100">Book a consultation to discuss your project in detail</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-white/20">
                <p className="text-sm text-primary-100 mb-4">Follow us on social media for updates</p>
                <div className="flex gap-3">
                  {['Facebook', 'Twitter', 'LinkedIn'].map((social) => (
                    <a
                      key={social}
                      href="#"
                      className="w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
                    >
                      <span className="text-sm font-medium">{social[0]}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join hundreds of satisfied clients who have transformed their communities with our expert consultation services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+256759542772"
              className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-xl font-medium transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Call Us Now
            </a>
            <a
              href="mailto:vida@teams.com"
              className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-medium hover:bg-white/20 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              <Mail className="w-5 h-5" />
              Send Email
            </a>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <SuccessMessage show={showSuccess} onClose={() => setShowSuccess(false)} />

      <Footer />
    </div>
  );
};

export default ContactPage;