import {
    ArrowRight,
    Building,
    CheckCircle2,
    Flame,
    GraduationCap,
    Heart,
    PiggyBank,
    Sprout,
    Target,
    Trees,
    Users,
    X
} from 'lucide-react';
import { useState } from 'react';

// Modal Component
const ServiceModal = ({ isOpen, onClose, service }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                {/* Modal Header */}
                <div className="flex justify-between items-center p-6 border-b">
                    <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full ${service.bgColor} flex items-center justify-center`}>
                            <service.icon className="w-6 h-6 text-gray-700" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">{service.title}</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Modal Content */}
                <div className="p-6 space-y-6">
                    {/* Overview Section */}
                    <div>
                        <h3 className="text-xl font-semibold mb-3 text-gray-900">Overview</h3>
                        <p className="text-gray-600">{service.fullDescription}</p>
                    </div>

                    {/* Key Features */}
                    <div>
                        <h3 className="text-xl font-semibold mb-3 text-gray-900">Key Features</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {service.features.map((feature, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                                    <p className="text-gray-600">{feature}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Impact & Outcomes */}
                    <div>
                        <h3 className="text-xl font-semibold mb-3 text-gray-900">Impact & Outcomes</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {service.impacts.map((impact, index) => (
                                <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                                    <div className="text-3xl font-bold text-blue-900 mb-2">{impact.value}</div>
                                    <p className="text-gray-600">{impact.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Partners Section */}
                    <div>
                        <h3 className="text-xl font-semibold mb-3 text-gray-900">Our Partners</h3>
                        <p className="text-gray-600 mb-4">{service.partners}</p>
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="border-t p-6">
                    <button
                        onClick={onClose}
                        className="w-full bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

// Service Card Component
const ServiceCard = ({ icon: Icon, title, description, bgColor, onClick }) => (
    <div
        className="bg-white rounded-xl p-4 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer w-96"
        onClick={onClick}
    >
        <div className="flex items-start gap-4">
            <div className={`w-10 h-10 rounded-full ${bgColor} flex items-center justify-center flex-shrink-0`}>
                <Icon className="w-5 h-5 text-gray-700" strokeWidth={1.5} />
            </div>
            <div>
                <h3 className="text-lg font-semibold mb-1 text-gray-900">{title}</h3>
                <p className="text-gray-600 leading-relaxed mb-2">{description}</p>
                <button className="flex items-center text-blue-900 font-medium hover:gap-2 transition-all">
                    Learn More <ArrowRight className="w-4 h-4 ml-2" />
                </button>
            </div>
        </div>
    </div>
);

const VidaServicesFullScreen = () => {
    const [selectedService, setSelectedService] = useState(null);

    const services = [
        {
            icon: GraduationCap,
            title: "Youth Skilling & Employability",
            description: "Comprehensive vocational and entrepreneurial training programs preparing youth for opportunities in modern industries.",
            fullDescription: "Our youth skilling program provides comprehensive training in vocational skills, entrepreneurship, and market-relevant competencies. We focus on creating pathways to employment and self-employment through practical, hands-on training and mentorship.",
            bgColor: "bg-blue-100",
            features: [
                "Vocational skills training in high-demand sectors",
                "Entrepreneurship development programs",
                "Career guidance and job placement support",
                "Business startup mentoring",
                "Industry partnerships for apprenticeships",
                "Soft skills development"
            ],
            impacts: [
                { value: "5,000+", label: "Youth Trained" },
                { value: "70%", label: "Employment Rate" },
                { value: "1,200+", label: "Businesses Started" }
            ],
            partners: "Technical institutions, industry leaders, and government agencies."
        },
        {
            icon: Flame,
            title: "Oil & Gas Sector Support",
            description: "Strategic consulting and training services for communities and businesses in Uganda's growing oil and gas sector.",
            fullDescription: "Comprehensive support focusing on local content development, capacity building, and sustainable community development.",
            bgColor: "bg-orange-100",
            features: [
                "Local content development programs",
                "Technical skills training",
                "Community engagement initiatives",
                "Environmental impact awareness",
                "Supply chain integration support",
                "Business readiness assessment"
            ],
            impacts: [
                { value: "2,000+", label: "People Trained" },
                { value: "150+", label: "Businesses Supported" },
                { value: "12", label: "Districts Covered" }
            ],
            partners: "Oil companies, government agencies, and local communities."
        },
        {
            icon: Sprout,
            title: "Agronomic Practices & Agribusiness Skills",
            description: "Supporting farmers with modern agricultural techniques and value chain development to enhance productivity.",
            fullDescription: "Providing tailored training for farmers in agronomic practices, value chain optimization, and market linkages to boost agricultural outputs.",
            bgColor: "bg-green-100",
            features: [
                "Modern farming techniques",
                "Value chain development",
                "Market linkage facilitation",
                "Post-harvest handling practices",
                "Capacity building in agribusiness planning"
            ],
            impacts: [
                { value: "20,000+", label: "Farmers Supported" },
                { value: "80%", label: "Productivity Increase" },
                { value: "15", label: "Districts Covered" }
            ],
            partners: "Farmer groups, government agricultural agencies, and NGOs."
        },
        {
            icon: PiggyBank,
            title: "Financial Inclusion Programs",
            description: "Promoting access to financial services through tailored training in savings, credit management, and financial literacy.",
            fullDescription: "Vida’s financial inclusion programs build the capacity of individuals and community groups, enabling them to manage savings and access credit effectively. We provide financial literacy training and create linkages with financial institutions.",
            bgColor: "bg-yellow-100",
            features: [
                "Savings and credit management training",
                "Financial literacy workshops",
                "Community group capacity building",
                "Linkages with financial institutions",
                "Tailored financial planning support"
            ],
            impacts: [
                { value: "7,000+", label: "Groups Trained" },
                { value: "5B+ UGX", label: "Resources Mobilized" },
                { value: "50+", label: "Districts Reached" }
            ],
            partners: "Community groups, SACCOs, VSLAs, and financial institutions."
        },
        {
            icon: Building,
            title: "Capacity Building for VSLAs & SACCOs",
            description: "Training, mentorship, and support to strengthen financial management and sustainability practices.",
            fullDescription: "We provide targeted capacity-building programs for Village Savings and Loan Associations (VSLAs) and Savings and Credit Cooperatives (SACCOs). Our training covers financial management best practices, governance, and operational efficiency to ensure long-term sustainability.",
            bgColor: "bg-purple-100",
            features: [
                "Governance and leadership training",
                "Financial management support",
                "Mentorship for operational excellence",
                "Adoption of digital tools",
                "Best practice sharing"
            ],
            impacts: [
                { value: "5,000+", label: "Groups Supported" },
                { value: "200,000+", label: "Community Members Benefiting" },
                { value: "30+", label: "Districts Covered" }
            ],
            partners: "Community groups, SACCO leaders, and regional cooperatives."
        },
        {
            icon: Target,
            title: "Research, Evaluation & Project Design",
            description: "Conducting research and evaluations to support evidence-based decision-making and effective project design.",
            fullDescription: "Our research and evaluation services provide organizations with critical insights to enhance their programs and achieve greater impact. We offer tailored project design services to align with community needs and organizational goals.",
            bgColor: "bg-teal-100",
            features: [
                "Impact assessment studies",
                "Baseline and end-line surveys",
                "Program monitoring and evaluation",
                "Data analysis and reporting",
                "Tailored project design frameworks"
            ],
            impacts: [
                { value: "50+", label: "Projects Evaluated" },
                { value: "100+", label: "Organizations Supported" },
                { value: "20+", label: "Community Assessments Conducted" }
            ],
            partners: "Development organizations, NGOs, and research institutions."
        },
        {
            icon: Heart,
            title: "Community Empowerment & Market Assessments",
            description: "Empowering communities through skills development, market linkage, and sustainable livelihood creation.",
            fullDescription: "We work with communities to identify market opportunities, develop skills, and create sustainable livelihoods. Our assessments provide actionable insights to improve economic participation and social inclusion.",
            bgColor: "bg-pink-100",
            features: [
                "Market opportunity assessments",
                "Community skill development",
                "Livelihood creation programs",
                "Social inclusion initiatives"
            ],
            impacts: [
                { value: "10,000+", label: "Community Members Empowered" },
                { value: "50+", label: "Market Assessments Conducted" },
                { value: "100+", label: "Economic Opportunities Created" }
            ],
            partners: "Community leaders, NGOs, and market facilitators."
        },
        {
            icon: Users,
            title: "Microfinance Training & Advisory Services",
            description: "Tailored microfinance training and advisory services to help individuals and organizations effectively access and manage financial services.",
            fullDescription: "We provide tailored microfinance training and advisory services to help individuals and organizations effectively access and manage financial services. Our programs enhance financial literacy and empower communities to achieve financial stability.",
            bgColor: "bg-blue-100",
            features: [
                "Customized financial literacy training",
                "Advisory on credit management",
                "Support for financial service linkages",
                "Training in savings mobilization"
            ],
            impacts: [
                { value: "8,000+", label: "People Trained" },
                { value: "70+", label: "Microfinance Organizations Supported" }
            ],
            partners: "Microfinance institutions, NGOs, and financial service providers."
        },
        {
            icon: Trees,
            title: "Enterprise Development & Entrepreneurship Skilling",
            description: "Equipping rural communities and entrepreneurs with the skills needed to start, grow, and manage successful businesses.",
            fullDescription: "We equip rural communities and entrepreneurs with the skills needed to start, grow, and manage successful businesses. Our training focuses on business planning, financial management, and market linkage strategies.",
            bgColor: "bg-green-100",
            features: [
                "Business planning workshops",
                "Entrepreneurial skills training",
                "Market linkage support",
                "Capacity building for startups"
            ],
            impacts: [
                { value: "12,000+", label: "Entrepreneurs Trained" },
                { value: "500+", label: "Businesses Supported" }
            ],
            partners: "Entrepreneurial networks, NGOs, and government agencies."
        }
    ];

    return (
        <div className="min-h-screen bg-blue-gray-50">
        <div className="relative h-[250px] bg-gradient-to-r from-blue-900 to-blue-800">
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative max-w-7xl mx-auto px-4 py-16 text-center">
            <h1 className="text-3xl font-bold text-white mb-3">
              Our services
            </h1>
            <p className="text-white/90 text-sm max-w-2xl mx-auto">
            Delivering transformative solutions in youth skilling, financial inclusion, agricultural development, and enterprise growth programs.
            </p>
          </div>
        </div>

            {/* Services Section */}
            <div className="max-w-7xl mx-auto px-4 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <ServiceCard
                            key={index}
                            icon={service.icon}
                            title={service.title}
                            description={service.description}
                            bgColor={service.bgColor}
                            onClick={() => setSelectedService(service)}
                        />
                    ))}
                </div>

                {/* Contact Section */}
                <div className="mt-20 text-center bg-gradient-to-r from-blue-900 to-blue-800 py-12 rounded-lg">
                    <p className="text-gray-50 mb-4">Need more information about our services?</p>
                    <button className="px-8 py-3 bg-white text-blue-900 rounded-lg hover:bg-blue-100 transition-colors">
                        Contact Us
                    </button>
                </div>
            </div>

            {/* Service Detail Modal */}
            <ServiceModal
                isOpen={selectedService !== null}
                onClose={() => setSelectedService(null)}
                service={selectedService}
            />
        </div>
    );
};

export default VidaServicesFullScreen;
