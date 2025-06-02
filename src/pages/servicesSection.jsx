import { ArrowUpRight, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { servicesContent } from '../data/servicesContent';

const ServicesSection = () => {
    const [selectedService, setSelectedService] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [visibleCards, setVisibleCards] = useState([]);
    const cardsRef = useRef([]);

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const handleIntersection = (entries, index) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add a slight delay based on the card's index
                    setTimeout(() => {
                        setVisibleCards(prev => [...prev, index]);
                    }, index * 150); // Reduced delay for smoother feel
                }
            });
        };

        const observers = cardsRef.current.map((card, index) => {
            const observer = new IntersectionObserver(
                (entries) => handleIntersection(entries, index),
                observerOptions
            );
            if (card) observer.observe(card);
            return observer;
        });

        return () => {
            observers.forEach(observer => observer.disconnect());
        };
    }, []);

    const getCardStyle = (index) => {
        const styles = [
            {
                wrapper: "bg-white rounded-2xl shadow-soft hover:shadow-large transition-all duration-500 group border border-gray-100/50 overflow-hidden",
                imageWrap: "h-48 overflow-hidden relative",
                content: "p-6",
                accent: "from-primary-500 to-primary-600"
            },
            {
                wrapper: "bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-soft hover:shadow-large transition-all duration-500 group border border-gray-100/50 overflow-hidden",
                imageWrap: "h-48 overflow-hidden relative",
                content: "p-6",
                accent: "from-gray-500 to-gray-600"
            },
            {
                wrapper: "bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-soft hover:shadow-large transition-all duration-500 group border border-amber-100/50 overflow-hidden",
                imageWrap: "h-48 overflow-hidden relative",
                content: "p-6",
                accent: "from-amber-500 to-orange-500"
            },
            {
                wrapper: "bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-soft hover:shadow-large transition-all duration-500 group border border-blue-100/50 overflow-hidden",
                imageWrap: "h-48 overflow-hidden relative",
                content: "p-6",
                accent: "from-blue-500 to-indigo-500"
            },
            {
                wrapper: "bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl shadow-soft hover:shadow-large transition-all duration-500 group border border-emerald-100/50 overflow-hidden",
                imageWrap: "h-48 overflow-hidden relative",
                content: "p-6",
                accent: "from-emerald-500 to-teal-500"
            },
            {
                wrapper: "bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-soft hover:shadow-large transition-all duration-500 group border border-purple-100/50 overflow-hidden",
                imageWrap: "h-48 overflow-hidden relative",
                content: "p-6",
                accent: "from-purple-500 to-pink-500"
            }
        ];
        return styles[index % styles.length];
    };

    const handleExploreClick = (service, e) => {
        e.stopPropagation();
        setSelectedService(service);
        setIsModalOpen(true);
    };

    return (
        <>
            <section className="w-full max-w-7xl mx-auto px-6 py-20">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center bg-primary-50 text-primary-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
                        Our Services
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                        {servicesContent.title}
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                        Comprehensive solutions designed to empower your financial journey and business growth
                    </p>
                    
                    {/* Service Icons */}
                    <div className="flex justify-center gap-3 mt-8">
                        {servicesContent.icons.map(({ id, Icon }) => (
                            <div
                                key={id}
                                className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-soft"
                            >
                                <Icon className="w-6 h-6 text-primary-600" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {servicesContent.services.map((service, index) => {
                        const style = getCardStyle(index);
                        return (
                            <div
                                key={index}
                                ref={el => cardsRef.current[index] = el}
                                className={`${style.wrapper} cursor-pointer transform transition-all duration-500 hover:scale-105 hover:-rotate-1
                                    ${visibleCards.includes(index) 
                                        ? 'opacity-100 translate-y-0' 
                                        : 'opacity-0 translate-y-10'}`}
                                onClick={(e) => handleExploreClick(service, e)}
                            >
                                <div className={style.imageWrap}>
                                    <div className={`absolute inset-0 bg-gradient-to-t ${style.accent} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 right-4 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                                        <ArrowUpRight className="w-4 h-4 text-gray-700" />
                                    </div>
                                </div>
                                <div className={style.content}>
                                    <h3 className="font-semibold text-gray-900 mb-3 text-lg group-hover:text-primary-600 transition-colors duration-300">
                                        {service.title}
                                    </h3>
                                    <p className="text-gray-600 mb-4 leading-relaxed text-sm line-clamp-2">
                                        {service.description}
                                    </p>
                                    <button
                                        onClick={(e) => handleExploreClick(service, e)}
                                        className={`inline-flex items-center gap-2 text-sm font-medium bg-gradient-to-r ${style.accent} bg-clip-text text-transparent hover:gap-3 transition-all duration-300`}
                                    >
                                        Explore More
                                        <ArrowUpRight className="w-4 h-4 text-current" />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Enhanced Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div
                        className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm"
                        aria-hidden="true"
                        onClick={() => setIsModalOpen(false)}
                    />
                    <div className="relative bg-white rounded-3xl shadow-xl w-full max-w-3xl mx-auto my-8 animate-scale-in overflow-hidden" style={{ maxHeight: 'calc(100vh - 100px)' }}>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute right-6 top-6 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-white transition-all duration-200 shadow-soft"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        {selectedService && (
                            <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 100px)' }}>
                                <div className="relative h-64 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent"></div>
                                    <img
                                        src={selectedService.image}
                                        alt={selectedService.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-8 pb-6">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                        {selectedService.title}
                                    </h3>
                                    <div className="prose max-w-none">
                                        <p className="text-gray-600 leading-relaxed text-lg">
                                            {selectedService.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default ServicesSection;