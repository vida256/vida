import {
    BookOpen,
    Briefcase,
    Coins,
    Globe,
    HardHat,
    Users
} from "lucide-react";

export const servicesContent = {
    title: "OUR SERVICES",
    introduction: {
        text: "We offer a comprehensive range of consulting and training services focused on financial inclusion, entrepreneurship development, capacity building, and community empowerment for both public and private clients."
    },
    services: [
        {
            title: "Microfinance Training & Advisory Services",
            description: "We provide tailored microfinance training and advisory services to help individuals and organizations effectively access and manage financial services. Our programs enhance financial literacy and empower communities to achieve financial stability.",
            image: "/img/microfinance-training.jpg"
        },
        {
            title: "Enterprise Development & Entrepreneurship Skilling",
            description: "We equip rural communities and entrepreneurs with the skills needed to start, grow, and manage successful businesses. Our training focuses on business planning, financial management, and market linkage strategies.",
            image: "/img/enterprise-development.jpg"
        },
        {
            title: "Financial Inclusion Programs",
            description: "Our Financial Inclusion programs are designed to improve knowledge and skills related to budgeting, saving, borrowing, and investing. We support individuals and groups to make informed financial decisions.",
            image: "/img/financial-literacy.jpg"
        },
        {
            title: "Capacity Building for VSLAs & SACCOs",
            description: "We build the capacity of Village Savings and Loan Associations (VSLAs) and Savings and Credit Cooperatives (SACCOs) through training, mentorship, and support in adopting best practices for financial management and sustainability.",
            image: "/img/vsla-capacity-building.jpg"
        },
        {
            title: "Research, Evaluation & Project Design",
            description: "We conduct research, evaluations, and project design services to support evidence-based decision-making. Our work helps organizations improve their programs and achieve greater impact in their communities.",
            image: "/img/research-evaluation.jpg"
        },
        {
            title: "Community Empowerment & Market Assessments",
            description: "We empower communities through market assessments, skills development, and linking them to economic opportunities. Our goal is to create sustainable livelihoods and promote social inclusion.",
            image: "/img/community-empowerment.jpg"
        }
    ],
    icons: [
        { id: "training", Icon: BookOpen },
        { id: "enterprise", Icon: Briefcase },
        { id: "finance", Icon: Coins },
        { id: "global", Icon: Globe },
        { id: "capacity", Icon: HardHat },
        { id: "community", Icon: Users }
    ]
};
