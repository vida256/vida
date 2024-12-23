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
                    }, index * 300); // 200ms delay between each card
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
                wrapper: "bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-500 group",
                imageWrap: "h-40 rounded-t-lg overflow-hidden",
                content: "p-4"
            },
            {
                wrapper: "bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-all duration-500 group",
                imageWrap: "h-40 rounded-t-lg overflow-hidden",
                content: "p-4"
            },
            {
                wrapper: "bg-amber-50 rounded-lg shadow-sm hover:shadow-md transition-all duration-500 group",
                imageWrap: "h-40 rounded-t-lg overflow-hidden",
                content: "p-4"
            },
            {
                wrapper: "bg-blue-50 rounded-lg shadow-sm hover:shadow-md transition-all duration-500 group",
                imageWrap: "h-40 rounded-t-lg overflow-hidden",
                content: "p-4"
            },
            {
                wrapper: "bg-green-50 rounded-lg shadow-sm hover:shadow-md transition-all duration-500 group",
                imageWrap: "h-40 rounded-t-lg overflow-hidden",
                content: "p-4"
            },
            {
                wrapper: "bg-purple-50 rounded-lg shadow-sm hover:shadow-md transition-all duration-500 group",
                imageWrap: "h-40 rounded-t-lg overflow-hidden",
                content: "p-4"
            }
        ];
        return styles[index];
    };

    const handleExploreClick = (service, e) => {
        e.stopPropagation();
        setSelectedService(service);
        setIsModalOpen(true);
    };

    return (
        <>
            <section className="w-full max-w-7xl mx-auto p-4 sm:p-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4 sm:mb-0">
                        {servicesContent.title}
                    </h2>
                    <div className="flex gap-2">
                        {servicesContent.icons.map(({ id, Icon }) => (
                            <div
                                key={id}
                                className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center"
                            >
                                <Icon className="w-4 h-4 text-gray-600" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {servicesContent.services.map((service, index) => {
                        const style = getCardStyle(index);
                        return (
                            <div
                                key={index}
                                ref={el => cardsRef.current[index] = el}
                                className={`${style.wrapper} cursor-pointer transform transition-all duration-500 
                                    ${visibleCards.includes(index) 
                                        ? 'opacity-100 translate-y-0' 
                                        : 'opacity-0 translate-y-10'}`}
                                onClick={(e) => handleExploreClick(service, e)}
                            >
                                <div className={style.imageWrap}>
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <div className={style.content}>
                                    <h3 className="font-medium text-gray-900 mb-2 line-clamp-1">
                                        {service.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                        {service.description}
                                    </p>
                                    <button
                                        onClick={(e) => handleExploreClick(service, e)}
                                        className="text-sm text-gray-700 hover:text-gray-900 flex items-center gap-1"
                                    >
                                        Explore More
                                        <ArrowUpRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Modal remains unchanged */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
                        aria-hidden="true"
                        onClick={() => setIsModalOpen(false)}
                    />
                    <div className="relative bg-white rounded-xl shadow-xl w-full max-w-3xl mx-auto my-8" style={{ maxHeight: 'calc(100vh - 100px)' }}>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute right-4 top-4 z-10 text-red-400 hover:text-red-500 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                        {selectedService && (
                            <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 100px)' }}>
                                <div className="rounded-t-md overflow-hidden">
                                    <img
                                        src={selectedService.image}
                                        alt={selectedService.title}
                                        className="w-full object-cover"
                                        style={{ height: '200px' }}
                                    />
                                </div>
                                <div className="p-6 py-3 border-b border-gray-100">
                                    <h3 className="text-xl font-bold text-gray-900">
                                        {selectedService.title}
                                    </h3>
                                </div>
                                <div className="p-6 pt-0 pb-6 space-y-6">
                                    <div className="prose max-w-none">
                                        <p className="text-gray-600">
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