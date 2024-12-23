// content/inquiryFormContent.js

export const inquiryFormContent = {
  stats: {
    number: "5K+",
    title: "Empowered Clients",
    subtitle: "Across Uganda",
    description1: "We provide reliable and customized consulting, training, and advisory services in financial literacy, microfinance, and enterprise development.",
    description2: "Partner with us to enhance skills, build capacity, and create sustainable economic solutions.",
    ctaButton: "Get Started Now"
  },
  form: {
    title: "Send an Inquiry",
    subtitle: "Please complete the form below, and we'll be in touch. Or you can call us",
    phoneNumber: "+256 772 070 679",
    phoneText: "for immediate assistance!",
    submitButton: "Send Inquiry",
    fields: {
      serviceType: {
        label: "Service Type",
        placeholder: "Select service type",
        options: [
          "Microfinance Training",
          "Enterprise Development",
          "Financial Literacy",
          "Capacity Building",
          "Research & Evaluation",
          "Community Empowerment"
        ]
      },
      businessType: {
        label: "Client Type",
        placeholder: "Select client type",
        options: [
          "Nonprofit Organization",
          "Government Agency",
          "Corporate",
          "Community Group",
          "Individual"
        ]
      },
      subject: {
        label: "Subject",
        placeholder: "What's your inquiry about?"
      },
      message: {
        label: "Message",
        placeholder: "Please describe your requirements..."
      },
      fullName: {
        label: "Full Name",
        placeholder: "Your full name"
      },
      companyName: {
        label: "Organization Name",
        placeholder: "Your organization name"
      },
      email: {
        label: "Email Address",
        placeholder: "your@email.com"
      },
      phone: {
        label: "Phone Number",
        placeholder: "Your phone number"
      }
    }
  }
};
