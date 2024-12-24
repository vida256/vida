import { Award, Clock, DollarSign, FileText, Shield, Users } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm text-center max-w-xs mx-auto">
    <div className="flex justify-center mb-2">
      <Icon className="w-10 h-10 text-blue-900" strokeWidth={1.5} />
    </div>
    <h3 className="text-gray-900 font-medium mb-2">{title}</h3>
    <p className="text-sm text-gray-600 leading-relaxed">
      {description}
    </p>
  </div>
);

const EssayServiceFeatures = () => {
  const values = [
    {
      icon: Shield,
      title: "Integrity",
      description: "Upholding honesty and strong ethical standards in all our engagements, ensuring trust and reliability in everything we do."
    },
    {
      icon: FileText,
      title: "Professionalism",
      description: "Delivering high-quality services with competence, dedication, and a commitment to excellence in every project."
    },
    {
      icon: Award,
      title: "Transparency",
      description: "Ensuring accountability and openness in all our processes and operations, fostering trust with our partners and communities."
    },
    {
      icon: Clock,
      title: "Efficiency",
      description: "Providing timely and innovative solutions to meet the needs of our clients and the communities we serve."
    },
    {
      icon: Users,
      title: "Community Development",
      description: "Working purposefully to uplift and empower underserved populations, ensuring inclusive growth and sustainability."
    },
    {
      icon: DollarSign,
      title: "Excellence",
      description: "Striving for the highest standards in all our initiatives, ensuring impactful and meaningful contributions to development."
    }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 bg-blue-gray-50">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">
          Our Core Values
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          At Vida Management Consult, our core values guide our operations and define how we interact with our clients, partners, and communities. These values ensure our work drives meaningful and sustainable change.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
        {values.map((value, index) => (
          <FeatureCard
            key={index}
            icon={value.icon}
            title={value.title}
            description={value.description}
          />
        ))}
      </div>
    </div>
  );
};

export default EssayServiceFeatures;
