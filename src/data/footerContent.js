// src/data/footerContent.js

const year = new Date().getFullYear();

export const footerContent = {
  title: "VIDA Management Consult Limited",
  description: "We are committed to empowering communities through tailored financial literacy, microfinance training, and enterprise development services. Partner with us for innovative and impactful solutions.",

  officeInfo: {
    title: "Head Office - Kampala",
    address: "Plot 1375 Bakule Complex, Gayaza Road\nP.O. Box 146843, Kampala, Uganda",
    email: "vidamanagementconsult@gmail.com",
    phone: "+256 772 070 679 / +256 701 323 779",
    coordinates: [0.3476, 32.5825], // Kampala coordinates
    buttonText: "Get in Touch"
  },

  newsletter: {
    title: "Stay Updated with Our Latest Insights",
    subtitle: "Sign up for news, updates, and insights on financial literacy, entrepreneurship, and community development.",
    placeholder: "Your Email Address",
    buttonText: "Subscribe"
  },

  socials: [
    {
      color: "white",
      name: "facebook",
      path: "#"
    },
    {
      color: "white",
      name: "twitter",
      path: "#"
    },
    {
      color: "white",
      name: "linkedin",
      path: "#"
    }
  ],

  menus: [
    {
      name: "Company",
      items: [
        { name: "About Us", path: "#" },
        { name: "Our Vision & Mission", path: "#" },
        { name: "Leadership Team", path: "#" },
        { name: "News & Updates", path: "#" },
        { name: "Careers", path: "#" }
      ]
    },
    {
      name: "Services",
      items: [
        { name: "Microfinance Training", path: "#" },
        { name: "Enterprise Development", path: "#" },
        { name: "Financial Literacy", path: "#" },
        { name: "Capacity Building", path: "#" },
        { name: "Research & Evaluation", path: "#" },
        { name: "Community Empowerment", path: "#" }
      ]
    },
    {
      name: "Resources",
      items: [
        { name: "Case Studies", path: "#" },
        { name: "Publications", path: "#" },
        { name: "Training Materials", path: "#" },
        { name: "Reports", path: "#" },
        { name: "FAQs", path: "#" }
      ]
    }
  ],

  quickContact: {
    title: "Quick Contact",
    description: "If you have any questions or need assistance, feel free to reach out to our team.",
    email: "vidamanagementconsult@gmail.com",
    phone: "+256 772 070 679 / +256 701 323 779",
    address: "Plot 1375 Bakule Complex, Gayaza Road, Kampala, Uganda"
  },

  copyright: `Copyright © ${year} VIDA Management Consult Limited. All rights reserved.`
};
