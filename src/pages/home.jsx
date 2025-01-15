import { Footer } from "@/widgets/layout";
import { ChevronRight } from 'lucide-react';
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

  return (
    <>
      {/* Hero Section */}
      <div className="relative flex h-[75vh] sm:h-[75vh] content-center items-center justify-center">
        {/* Background Images with Scrolling Effect */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-black/50" />
            <img
              src={slide.image}
              alt={slide.alt}
              className="h-full w-full object-cover"
            />
          </div>
        ))}

        {/* Content */}
        <div className="relative container mx-auto px-4">
          <div className="max-w-3xl">
            <p className="text-white/90 text-sm sm:text-base md:text-lg mb-2 sm:mb-3">
              Empowering Communities Through Financial Literacy
            </p>
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
              Tailored Microfinance & Enterprise Development Services
            </h1>
            <p className="text-white/80 text-sm sm:text-base md:text-lg mb-6 sm:mb-8">
              VIDA delivers customized consulting, training, and advisory services to promote financial inclusion, entrepreneurship, and community empowerment across Uganda.
            </p>
            <div className="flex">
              <button className="bg-[#007BFF] hover:bg-[#0056b3] text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-md font-medium flex items-center justify-center gap-2 text-base sm:text-lg">
                CONTACT US
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <WasteManagementSection />
      <PartnersSection/>
      <ServicesSection />
      {/* <InquiryFormSection /> */}
      <div className="bg-white">
        <Footer />
      </div>
    </>
  );
}

export default Home;
