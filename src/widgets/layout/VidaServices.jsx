import { BarChart2, PieChart, Settings, Target, TrendingUp, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ServiceCard = ({ icon: Icon, title, description, bgColor }) => {
  const navigate = useNavigate();
  
  return (
    <div 
      className="bg-white rounded-xl p-6 hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => navigate('/services')}
    >
      <div className={`w-12 h-12 rounded-full ${bgColor} flex items-center justify-center mb-4`}>
        <Icon className="w-6 h-6 text-gray-700" />
      </div>
      <h3 className="text-gray-900 font-medium mb-2">{title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};

const VidaServices = () => {
  const navigate = useNavigate();
  
  const services = [
    {
      icon: TrendingUp,
      title: "Financial Inclusion Programs",
      description: "Promoting access to financial services through training in savings, credit management, and financial literacy to empower underserved communities.",
      bgColor: "bg-blue-100"
    },
    {
      icon: PieChart,
      title: "Agronomic Practices and Agribusiness Skills",
      description: "Supporting farmers with modern agricultural techniques, value chain development, and market linkages to boost productivity and income.",
      bgColor: "bg-purple-100"
    },
    {
      icon: Target,
      title: "Youth Skilling and Employability",
      description: "Providing vocational and entrepreneurial training to young people, preparing them for opportunities in industries like oil and gas, clean energy, and agribusiness.",
      bgColor: "bg-yellow-100"
    },
    {
      icon: Zap,
      title: "Livelihood Support Programs",
      description: "Empowering refugees and host communities through tailored programs that build resilience and promote sustainable income-generating activities.",
      bgColor: "bg-green-100"
    },
    {
      icon: BarChart2,
      title: "Clean Energy Solutions",
      description: "Promoting the adoption of clean energy technologies to mitigate climate change while fostering sustainable development in communities.",
      bgColor: "bg-red-100"
    },
    {
      icon: Settings,
      title: "Commercial Tree Planting",
      description: "Combining environmental conservation with income generation by supporting afforestation and reforestation projects for sustainable livelihoods.",
      bgColor: "bg-yellow-100"
    }
  ];

  return (
    <div className="w-full max-w-7xl bg-blue-gray-50 mx-auto">
      <div className="rounded-3xl p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">Our Services</h2>
          <button 
            onClick={() => navigate('/services')} 
            className="px-4 py-1.5 bg-yellow-100 text-sm text-gray-700 rounded-full hover:bg-yellow-200 transition-colors"
          >
            See More
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              bgColor={service.bgColor}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VidaServices;