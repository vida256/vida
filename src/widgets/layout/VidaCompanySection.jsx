
const VidaCompanySection = () => {
  const values = [
    { name: 'Integrity', active: true },
    { name: 'Excellence', active: false },
    { name: 'Innovation', active: false },
    { name: 'Impact', active: false },
    { name: 'Collaboration', active: false },
    { name: 'Sustainability', active: false },
  ];

  return (
    <div className="w-full max-w-7xl bg-blue-gray-50 mx-auto">
      <div className="rounded-3xl p-8">
        <div className="flex">
          {/* Left Content */}
          <div className="flex-1 pr-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Who We Are
            </h2>
            <p className="text-gray-600 text-sm mb-6">
              Vida Management Consult Limited, founded in 2015, is a leading professional consulting and training firm registered in Uganda. With a central office in Kampala and regional offices in Arua and Hoima, Vida works tirelessly to address critical development challenges, including poverty alleviation, unemployment, financial exclusion, and unequal access to education and healthcare.
            </p>

            {/* Values Tabs */}
            <div className="flex gap-2 bg-white p-1 rounded-lg mb-6 flex-wrap">
              {values.map((value) => (
                <button
                  key={value.name}
                  className={`px-4 py-2 rounded-lg text-sm ${
                    value.active
                      ? 'bg-blue-900 text-white'
                      : 'text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  {value.name}
                </button>
              ))}
            </div>

            {/* Impact Content */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Our Impact</h3>
              <p className="text-gray-600 text-sm mb-4">
                Vida's interventions have directly supported over 20,000 farmers, equipping them with practical knowledge in financial inclusion, agronomic practices, and agribusiness skills to boost productivity and income. Through livelihood and resilience-building programs, the organization has positively impacted the lives of 5,000 refugees, helping them rebuild their lives and achieve economic independence.
              </p>
              <p className="text-gray-600 text-sm">
                The organization has facilitated the growth and development of 7,000 community groups, including Village Savings and Loan Associations (VSLAs), Community Savings and Credit Groups (CSCGs), SACCOs, and Farmer Groups. These groups have become engines of economic transformation, creating opportunities for savings, investment, and enterprise growth. Vida's resource mobilization efforts have secured over 5 billion UGX, enabling the implementation of impactful projects and driving significant change in Uganda's rural and urban communities.
              </p>
            </div>
          </div>

          {/* Right Stats */}
          <div className="w-80">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-900 mb-2">20,000+</div>
                  <div className="text-sm text-gray-600">Farmers Trained</div>
                </div>
                
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-900 mb-2">5,000+</div>
                  <div className="text-sm text-gray-600">Refugees Supported</div>
                </div>
                
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-900 mb-2">7,000+</div>
                  <div className="text-sm text-gray-600">Community Groups</div>
                </div>
                
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-900 mb-2">5B+</div>
                  <div className="text-sm text-gray-600">UGX Mobilized</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VidaCompanySection;