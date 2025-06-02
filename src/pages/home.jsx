import { Footer } from "@/widgets/layout";
import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from "react";
import WasteManagementSection from "./financial";
import PartnersSection from "./PartnersSection";
import ServicesSection from "./servicesSection";

export function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { image: "/img/financial-empowerment.jpg", alt: "Financial Empowerment" },
    { image: "/img/community-development.jpg", alt: "Community Development" },
    { image: "/img/entrepreneurship-training.jpg", alt: "Entrepreneurship Training" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const scrollToNextSection = () => {
    const nextSection = document.getElementById('vida-section');
    if (nextSection) {
      nextSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <>
      {/* Hero Section */}
      <div className="relative flex h-screen content-center items-center justify-center overflow-hidden">
        {/* Background Images with Scrolling Effect */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              currentSlide === index ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/60 via-gray-900/40 to-primary-900/30 backdrop-blur-xs" />
            <img
              src={slide.image}
              alt={slide.alt}
              className="h-full w-full object-cover transition-transform duration-1000"
            />
          </div>
        ))}

        {/* Floating Elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-primary-400/20 to-accent-400/20 rounded-full blur-xl animate-pulse hidden lg:block"></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-gradient-to-br from-accent-400/20 to-primary-400/20 rounded-full blur-xl animate-pulse hidden lg:block"></div>

        {/* Content */}
        <div className="relative container mx-auto px-6 z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6 animate-fade-in">
              <span className="text-white/90 text-sm font-medium tracking-wide">Empowering Communities Through Financial Literacy</span>
            </div>
            
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-slide-up">
              Tailored 
              <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent"> Microfinance</span> & Enterprise Development Services
            </h1>
            
            <p className="text-white/80 text-lg md:text-xl mb-10 max-w-3xl mx-auto leading-relaxed font-light animate-slide-up">
              VIDA delivers customized consulting, training, and advisory services to promote financial inclusion, entrepreneurship, and community empowerment across Uganda.
            </p>
            
            <div className="flex justify-center items-center animate-slide-up">
              <button 
                onClick={scrollToNextSection}
                className="group bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-medium transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
              >
                Explore Our Services
                <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index 
                  ? 'bg-white shadow-medium scale-125' 
                  : 'bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 right-8 hidden lg:flex flex-col items-center text-white/60 animate-bounce">
          <span className="text-xs font-medium mb-2 tracking-wider">SCROLL</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/60 to-transparent"></div>
        </div>
      </div>

      {/* Sections with improved spacing */}
      <div className="bg-gradient-to-b from-gray-50 to-white">
        <WasteManagementSection />
      </div>
      
      <div className="bg-white">
        <PartnersSection/>
      </div>
      
      <div className="bg-gradient-to-b from-white to-gray-50">
        <ServicesSection />
      </div>
      
      <div className="bg-gradient-to-b from-gray-900 to-gray-800">
        <Footer />
      </div>
    </>
  );
}

export default Home;
