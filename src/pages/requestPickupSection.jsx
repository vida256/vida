import { useEffect, useRef, useState } from 'react';
import { inquiryFormContent } from '../data/inquiryFormContent';

const InquiryFormSection = () => {
  // Form state
  const [formData, setFormData] = useState({
    serviceType: '',
    businessType: '',
    subject: '',
    message: '',
    fullName: '',
    companyName: '',
    email: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Animation state
  const [isVisible, setIsVisible] = useState({
    stats: false,
    title: false,
    description: false,
    button: false,
    form: false
  });

  // Refs for intersection observer
  const statsRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonRef = useRef(null);
  const formRef = useRef(null);

  // Setup intersection observer
  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px'
    };

    const observers = [];

    const observerCallback = (entries, elementId) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(prev => ({ ...prev, [elementId]: true }));
        }
      });
    };

    const elements = [
      { ref: statsRef, id: 'stats' },
      { ref: titleRef, id: 'title' },
      { ref: descriptionRef, id: 'description' },
      { ref: buttonRef, id: 'button' },
      { ref: formRef, id: 'form' }
    ];

    elements.forEach(({ ref, id }) => {
      if (ref.current) {
        const observer = new IntersectionObserver(
          (entries) => observerCallback(entries, id),
          observerOptions
        );
        observer.observe(ref.current);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  const validateField = (name, value) => {
    switch (name) {
      case 'email':
        return !value ? 'Email is required' : 
               !/\S+@\S+\.\S+/.test(value) ? 'Invalid email format' : '';
      case 'phone':
        return !value ? 'Phone number is required' : 
               !/^\+?[\d\s-]{10,}$/.test(value) ? 'Invalid phone number' : '';
      case 'fullName':
        return !value ? 'Full name is required' : 
               value.length < 2 ? 'Name is too short' : '';
      case 'subject':
        return !value ? 'Subject is required' : 
               value.length < 5 ? 'Subject is too short' : '';
      case 'message':
        return !value ? 'Message is required' : 
               value.length < 10 ? 'Message is too short' : '';
      case 'serviceType':
      case 'businessType':
        return !value ? `${name === 'serviceType' ? 'Service' : 'Business'} type is required` : '';
      default:
        return !value ? 'This field is required' : '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: validateField(name, value)
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({
      ...prev,
      [name]: validateField(name, value)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);
    setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));

    if (Object.keys(newErrors).length === 0) {
      console.log('Form submitted:', formData);
    }
  };

  const { stats, form } = inquiryFormContent;

  // Animation classes
  const fadeInUp = 'transition-all duration-700 transform';
  const visible = 'opacity-100 translate-y-0';
  const hidden = 'opacity-0 translate-y-10';

  return (
    <section className="w-full bg-[#012920] py-12 flex items-center justify-center p-4">
      <div className="max-w-7xl w-full bg-white rounded-lg overflow-hidden flex flex-col md:flex-row">
        {/* Left Side - Stats with Background */}
        <div className="w-full md:w-2/5 relative">
          <div 
            className="absolute inset-0 z-0" 
            style={{
              backgroundImage: 'url("/img/waste-management-bg.jpg")',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-green-600/90"></div>
          </div>

          <div className="relative z-10 p-6 flex flex-col justify-between h-full text-white">
            <div>
              <div ref={statsRef} className={`${fadeInUp} ${isVisible.stats ? visible : hidden}`}>
                <h1 className="text-5xl font-bold mb-3">{stats.number}</h1>
                <h2 className="text-xl font-bold leading-tight mb-4">
                  {stats.title}<br />{stats.subtitle}
                </h2>
              </div>
              
              <div ref={descriptionRef} className={`${fadeInUp} ${isVisible.description ? visible : hidden} delay-200`}>
                <p className="mb-3 text-white/90 text-sm">{stats.description1}</p>
                <p className="mb-4 text-white/90 text-sm">{stats.description2}</p>
              </div>
            </div>

            <div ref={buttonRef} className={`${fadeInUp} ${isVisible.button ? visible : hidden} delay-300`}>
              <button className="w-fit px-4 py-1.5 border border-white text-white hover:bg-white/10 transition-colors duration-200 rounded text-sm flex items-center gap-1.5">
                {stats.ctaButton}
                <span>→</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div ref={formRef} className={`w-full md:w-3/5 p-6 ${fadeInUp} ${isVisible.form ? visible : hidden} delay-400`}>
          <h3 className="text-lg font-bold text-gray-900 mb-2">{form.title}</h3>
          
          <p className="text-gray-600 mb-4 text-xs">
            {form.subtitle}{' '}
            <a href={`tel:${form.phoneNumber}`} className="text-green-600 font-medium">
              {form.phoneNumber}
            </a>{' '}
            {form.phoneText}
          </p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              {/* Service Type */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  {form.fields.serviceType.label}
                </label>
                <select
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-2.5 py-1.5 border rounded text-xs focus:outline-none focus:ring-1 focus:ring-green-500 
                    ${errors.serviceType && touched.serviceType ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="">{form.fields.serviceType.placeholder}</option>
                  {form.fields.serviceType.options.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                {errors.serviceType && touched.serviceType && (
                  <p className="text-red-500 text-xs mt-1">{errors.serviceType}</p>
                )}
              </div>

              {/* Business Type */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  {form.fields.businessType.label}
                </label>
                <select
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-2.5 py-1.5 border rounded text-xs focus:outline-none focus:ring-1 focus:ring-green-500 
                    ${errors.businessType && touched.businessType ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="">{form.fields.businessType.placeholder}</option>
                  {form.fields.businessType.options.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                {errors.businessType && touched.businessType && (
                  <p className="text-red-500 text-xs mt-1">{errors.businessType}</p>
                )}
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                {form.fields.subject.label}
              </label>
              <input 
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={form.fields.subject.placeholder}
                className={`w-full px-2.5 py-1.5 border rounded text-xs focus:outline-none focus:ring-1 focus:ring-green-500 
                  ${errors.subject && touched.subject ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.subject && touched.subject && (
                <p className="text-red-500 text-xs mt-1">{errors.subject}</p>
              )}
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                {form.fields.message.label}
              </label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                rows={2}
                placeholder={form.fields.message.placeholder}
                className={`w-full px-2.5 py-1.5 border rounded text-xs focus:outline-none focus:ring-1 focus:ring-green-500 
                  ${errors.message && touched.message ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.message && touched.message && (
                <p className="text-red-500 text-xs mt-1">{errors.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  {form.fields.fullName.label}
                </label>
                <input 
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={form.fields.fullName.placeholder}
                  className={`w-full px-2.5 py-1.5 border rounded text-xs focus:outline-none focus:ring-1 focus:ring-green-500 
                    ${errors.fullName && touched.fullName ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.fullName && touched.fullName && (
                  <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
                )}
              </div>

              {/* Company Name */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  {form.fields.companyName.label}
                </label>
                <input 
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={form.fields.companyName.placeholder}
                  className={`w-full px-2.5 py-1.5 border rounded text-xs focus:outline-none focus:ring-1 focus:ring-green-500 
                    ${errors.companyName && touched.companyName ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.companyName && touched.companyName && (
                  <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Email */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  {form.fields.email.label}
                </label>
                <input 
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={form.fields.email.placeholder}
                  className={`w-full px-2.5 py-1.5 border rounded text-xs focus:outline-none focus:ring-1 focus:ring-green-500 
                    ${errors.email && touched.email ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.email && touched.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  {form.fields.phone.label}
                </label>
                <input 
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={form.fields.phone.placeholder}
                  className={`w-full px-2.5 py-1.5 border rounded text-xs focus:outline-none focus:ring-1 focus:ring-green-500 
                    ${errors.phone && touched.phone ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.phone && touched.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-[#012920] hover:bg-[#012920]/90 text-white py-2 rounded transition-colors duration-200 flex items-center justify-center gap-1.5 text-xs disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={Object.keys(errors).length > 0}
            >
              {form.submitButton}
              <span>→</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default InquiryFormSection;