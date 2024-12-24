// src/data/about.js

export const companyInfo = {
    name: "VIDA Management Consult Limited",
    established: 2015,
    location: {
      address: "Plot 1375 Bakule Complex Gayaza Road",
      poBox: "P.O. Box 146843",
      city: "Kampala",
      country: "Uganda"
    },
    contact: {
      phones: ["+256 772 070 679", "+256 701 323 779"],
      emails: ["vidamanagementconsult@gmail.com", "danmuza77@yahoo.com"],
      focalPoint: {
        name: "Muhumuza Daniel Kawuki",
        position: "CEO",
        phone: "+256 772070679",
        email: "danmuza77@yahoo.com"
      }
    },
    stats: {
      fullTimeEmployees: 12,
      partTimeEmployees: 63,
      yearsExperience: 10,
      branches: 3,
      completedProjects: 15
    },
    branches: [
      {
        location: "Kampala",
        type: "Head Office",
        description: "Central administrative unit for country wide operations",
        region: "Central Uganda"
      },
      {
        location: "Arua",
        type: "Regional Office",
        description: "Serving West Nile and Northern Uganda operations",
        region: "Northern Uganda"
      },
      {
        location: "Hoima",
        type: "Regional Office",
        description: "Serving mid-western, western and South Western regions",
        region: "Western Uganda"
      }
    ],
    vision: "Transcend as a global leading professional services firm focused on best practice consulting and training in financial and social inclusion.",
    mission: "To provide tailored micro-finance training and advisory services to enhance skills and knowledge in effectively accessing financial services.",
    background: {
      established: 2015,
      mainText: "Empowering communities through innovative financial solutions and sustainable development initiatives",
      description: "VIDA Management Consult Limited is a leading consultancy firm specializing in microfinance, enterprise development, and capacity building across Uganda. Established in 2015, we are committed to fostering financial and social inclusion through innovative solutions and dedicated partnerships.",      highlights: [
        {
          title: "Financial Inclusion",
          description: "Supporting access to financial services for underserved communities"
        },
        {
          title: "Capacity Building",
          description: "Strengthening local organizations and institutions"
        },
        {
          title: "Enterprise Development",
          description: "Fostering sustainable business growth and entrepreneurship"
        }
      ],
      impactAreas: [
        "Government Partnerships",
        "Nonprofit Organizations",
        "Civil Society",
        "Academia",
        "Corporate Social Investment"
      ],
      keyFocus: [
        "Poverty Reduction",
        "Employment Creation",
        "Healthcare Access",
        "Educational Equity",
        "Environmental Sustainability"
      ]
    },
    values: [
      {
        name: "Integrity",
        description: "Maintaining highest ethical standards in all operations"
      },
      {
        name: "Professionalism",
        description: "Delivering excellence in every service"
      },
      {
        name: "Transparency",
        description: "Clear and open communication with stakeholders"
      },
      {
        name: "Reliability",
        description: "Consistent and dependable service delivery"
      },
      {
        name: "Efficiency",
        description: "Optimal use of resources for maximum impact"
      }
    ],
    keyProjects: [
      {
        title: "RISE Programme",
        partner: "GIZ",
        year: "2021-2022",
        value: "UGX 808,050,000",
        impact: "Trained 275 refugee and host community learners",
        description: "Financial literacy and entrepreneurship training for refugees"
      },
      {
        title: "FIEFOC II Project",
        partner: "Ministry of Water & Environment",
        year: "2019-2021",
        value: "UGX 1,138,816,000",
        impact: "Supported farmer organizations across 5 irrigation schemes",
        description: "Capacity building in financial management for farmers"
      },
      {
        title: "AWEAR Project",
        partner: "CARE International",
        year: "2020-2022",
        value: "Multiple phases",
        impact: "Enhanced women's economic empowerment in refugee settlements",
        description: "Market assessment and skills development for women"
      }
    ],
    expertise: [
      "Financial Literacy Training",
      "Enterprise Development",
      "Microfinance Institution Support",
      "Project Monitoring & Evaluation",
      "Capacity Building",
      "Research & Assessment",
      "Training Material Development",
      "Digital Financial Services"
    ]
  };
  
  export const orgChart = `
  graph TD
      BOD[Board of Directors] --> CEO[Chief Ex. Officer]
      ADVISORS[Advisors] --> BOD
      ADVISORS --> CEO
      CEO --> FLM[Financial Literacy Manager]
      CEO --> MEM[M&E Manager]
      CEO --> SPM[SPM Manager]
      CEO --> BD[Business Dev.]
      CEO --> FAM[Finance & Admin]
      
      FLM & MEM & SPM & BD --> PO[Project Officers]
      FAM --> AS[Admin Secretary]
      AS --> OFFICE[Office]
      AS --> TLM[Transport & Logistics]
  `;