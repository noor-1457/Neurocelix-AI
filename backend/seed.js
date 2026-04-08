const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const Service = require("./models/Service");
const Pricing = require("./models/Pricing");
const Blog = require("./models/Blog");
const CaseStudy = require("./models/CaseStudy");
const FAQ = require("./models/FAQ");
const User = require("./models/User");

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB");

  // Clear existing
  await Promise.all([
    Service.deleteMany(),
    Pricing.deleteMany(),
    Blog.deleteMany(),
    CaseStudy.deleteMany(),
    FAQ.deleteMany(),
  ]);

  // Services
  await Service.insertMany([
    {
      title: "AI Automation",
      description:
        "Automate your business processes with cutting-edge AI solutions that save time and reduce costs.",
      icon: "Bot",
      features: [
        "Process Automation",
        "Machine Learning",
        "Natural Language Processing",
        "Predictive Analytics",
      ],
      category: "AI",
    },
    {
      title: "Cloud Solutions",
      description:
        "Scalable cloud infrastructure and migration services for modern enterprises.",
      icon: "Cloud",
      features: ["Cloud Migration", "DevOps", "Serverless", "Load Balancing"],
      category: "Cloud",
    },
    {
      title: "Data Analytics",
      description:
        "Transform raw data into actionable insights with our advanced analytics platform.",
      icon: "BarChart3",
      features: [
        "Real-time Analytics",
        "Data Visualization",
        "BI Reports",
        "Data Warehousing",
      ],
      category: "Data",
    },
    {
      title: "Cybersecurity",
      description:
        "Protect your digital assets with enterprise-grade security solutions.",
      icon: "ShieldCheck",
      features: [
        "Threat Detection",
        "Penetration Testing",
        "Compliance",
        "Security Audits",
      ],
      category: "Security",
    },
    {
      title: "Mobile Development",
      description:
        "Build powerful cross-platform mobile applications for iOS and Android.",
      icon: "Smartphone",
      features: ["React Native", "Flutter", "iOS", "Android"],
      category: "Development",
    },
    {
      title: "Web Development",
      description:
        "Create stunning, high-performance web applications with modern technologies.",
      icon: "Globe",
      features: ["React/Next.js", "Node.js", "Performance Optimization", "SEO"],
      category: "Development",
    },
  ]);

  // Pricing
  await Pricing.insertMany([
    {
      name: "Starter",
      monthlyPrice: 29,
      yearlyPrice: 290,
      features: [
        "5 Projects",
        "10GB Storage",
        "Basic Analytics",
        "Email Support",
        "API Access",
      ],
      highlighted: false,
    },
    {
      name: "Professional",
      monthlyPrice: 79,
      yearlyPrice: 790,
      features: [
        "25 Projects",
        "100GB Storage",
        "Advanced Analytics",
        "Priority Support",
        "API Access",
        "Team Collaboration",
        "Custom Integrations",
      ],
      highlighted: true,
    },
    {
      name: "Enterprise",
      monthlyPrice: 199,
      yearlyPrice: 1990,
      features: [
        "Unlimited Projects",
        "1TB Storage",
        "Full Analytics Suite",
        "24/7 Dedicated Support",
        "API Access",
        "Team Collaboration",
        "Custom Integrations",
        "SLA Guarantee",
        "White Label",
      ],
      highlighted: false,
    },
  ]);

  // Blogs
  await Blog.insertMany([
    {
      title: "The Future of AI in Business Automation",
      content:
        "Artificial Intelligence is revolutionizing how businesses operate. From automated customer service to predictive maintenance, AI is transforming every industry sector. In this comprehensive guide, we explore the latest trends and how companies can leverage AI to stay competitive in 2024.\n\nThe integration of machine learning algorithms into business processes has shown remarkable results. Companies report up to 40% reduction in operational costs and 60% improvement in efficiency after implementing AI solutions.\n\nKey areas where AI is making the biggest impact include customer service automation, supply chain optimization, financial forecasting, and personalized marketing campaigns.",
      excerpt:
        "Exploring how AI is transforming modern business operations and what it means for the future.",
      category: "AI",
      image: "https://i.ytimg.com/vi/6bQbNVo5a7Y/maxresdefault.jpg",
      tags: ["AI", "Automation", "Business", "Technology"],
      author: "Tech Team",
    },
    {
      title: "Cloud Migration: A Complete Guide for Enterprises",
      content:
        "Migrating to the cloud is one of the most significant IT decisions a company can make. This comprehensive guide walks you through every step of the process, from initial assessment to post-migration optimization.\n\nThe benefits of cloud migration are substantial: reduced infrastructure costs, improved scalability, enhanced disaster recovery, and access to cutting-edge services. However, the migration journey requires careful planning and execution.\n\nOur proven methodology has helped over 200 enterprises successfully migrate their workloads to the cloud with zero downtime and full data integrity.",
      excerpt:
        "A comprehensive guide to planning and executing your cloud migration strategy.",
      category: "Cloud",
      image:
        "https://media-cdn.openxcell.com/wp-content/uploads/2024/01/16151430/A-Complete-Guide-to-Enterprise-Application-Development.webp",
      tags: ["Cloud", "Migration", "Enterprise", "AWS"],
      author: "Cloud Team",
    },
    {
      title: "Cybersecurity Trends to Watch in 2024",
      content:
        "The cybersecurity landscape continues to evolve rapidly. As threats become more sophisticated, organizations must adapt their security strategies accordingly.\n\nRansomware attacks have increased by 300% in recent years, targeting businesses of all sizes. Zero-trust architecture has emerged as the gold standard for enterprise security, requiring verification for every user and device.\n\nAI-powered security tools are now capable of detecting threats in milliseconds, far outpacing human analysts. This shift is fundamentally changing how security operations centers function.",
      excerpt:
        "Stay ahead of emerging cyber threats with our expert analysis of 2024 security trends.",
      category: "Security",
      image:
        "https://icssindia.in/blog/wp-content/uploads/2023/10/Cybersecurity-Trends-in-2024-and-Beyond-1024x536.png",
      tags: ["Security", "Cybersecurity", "Trends", "2024"],
      author: "Security Team",
    },
    {
      title: "Building Scalable APIs with Node.js",
      content:
        "Creating robust, scalable APIs is crucial for modern web applications. Node.js has become the go-to platform for building high-performance APIs that can handle millions of requests.\n\nIn this tutorial, we cover best practices for API design, authentication with JWT, rate limiting, caching strategies, and monitoring. We also explore microservices architecture and how to structure your APIs for maximum scalability.\n\nReal-world examples from our projects show how proper API design can reduce server costs by 50% while improving response times by 80%.",
      excerpt:
        "Learn how to build production-ready APIs with Node.js that scale effortlessly.",
      category: "Development",
      image:
        "https://miro.medium.com/v2/resize:fit:1358/format:webp/1*IOpLDynhuVr2iQmahNWQMA.png",
      tags: ["Node.js", "API", "Backend", "JavaScript"],
      author: "Dev Team",
    },
    {
      title: "Top 10 Web Development Trends in 2026",
      content:
        "Web development is evolving rapidly with new frameworks and tools emerging every year. In 2026, trends like serverless architecture, AI-powered development, and Web3 integration are dominating the industry.\n\nDevelopers are increasingly adopting frameworks like Next.js for better performance and SEO. Progressive Web Apps (PWAs) are also gaining popularity due to their offline capabilities and improved user experience.\n\nBusinesses that adopt these trends early can gain a competitive edge in the digital marketplace.",
      excerpt:
        "Discover the latest web development trends shaping the future of the internet.",
      category: "Development",
      image:
        "https://tse4.mm.bing.net/th/id/OIP.1Qizl4tm1rjJ008KoGK0XQHaEI?pid=Api&P=0&h=220",
      tags: ["Web", "Trends", "Development", "2026"],
      author: "Dev Team",
    },
    {
      title: "Why Data Analytics is Crucial for Business Growth",
      content:
        "Data is the new oil, and businesses that leverage data analytics can make smarter decisions. From customer behavior analysis to sales forecasting, data analytics plays a vital role in modern organizations.\n\nCompanies using data-driven strategies report higher efficiency and profitability. Tools like Power BI and Tableau help visualize complex data into simple dashboards.\n\nInvesting in analytics is no longer optional—it's essential for growth.",
      excerpt: "Learn how data analytics can drive smarter business decisions.",
      category: "Data",
      image:
        "https://clearinsights.io/wp-content/uploads/2023/08/Blue-3D-Animation-Cloud-Data-Center-Tech-Video-.png",
      tags: ["Data", "Analytics", "Business"],
      author: "Data Team",
    },
    {
      title: "Mobile App Development: Native vs Cross Platform",
      content:
        "Choosing between native and cross-platform development is a major decision for businesses. Native apps offer better performance, while cross-platform solutions reduce cost and development time.\n\nFrameworks like Flutter and React Native have made cross-platform development highly efficient.\n\nUnderstanding your business needs is key to making the right choice.",
      excerpt:
        "A complete comparison between native and cross-platform mobile apps.",
      category: "Development",
      image:
        "https://www.appnality.com/blog/wp-content/uploads/2024/12/Cross-Platform-vs-Native.png",
      tags: ["Mobile", "Apps", "Development"],
      author: "Mobile Team",
    },
  ]);

  // Case Studies
  await CaseStudy.insertMany([
    {
      title: "E-Commerce AI Transformation",
      description:
        "We helped a major retail chain implement AI-powered recommendations and inventory management, resulting in dramatic improvements across all key metrics.",
      category: "AI",
      client: "RetailMax Corp",
      results: [
        "150% increase in conversion rate",
        "40% reduction in inventory costs",
        "$2M saved annually",
        "99.9% system uptime",
      ],
      tags: ["AI", "E-Commerce", "Retail"],
    },
    {
      title: "FinTech Cloud Migration",
      description:
        "A complete cloud infrastructure overhaul for a leading financial services company, enabling real-time processing and enhanced security compliance.",
      category: "Cloud",
      client: "FinServe Global",
      results: [
        "70% reduction in infrastructure costs",
        "Zero downtime migration",
        "10x faster transaction processing",
        "SOC 2 compliance achieved",
      ],
      tags: ["Cloud", "FinTech", "Migration"],
    },
    {
      title: "Healthcare Data Analytics Platform",
      description:
        "Built a comprehensive data analytics platform for a hospital network to improve patient outcomes and operational efficiency.",
      category: "Data",
      client: "MedCare Network",
      results: [
        "30% improvement in patient outcomes",
        "50% faster diagnosis",
        "Real-time monitoring of 10,000+ patients",
        "HIPAA compliant platform",
      ],
      tags: ["Healthcare", "Analytics", "Data"],
    },
    {
      title: "Manufacturing Automation System",
      description:
        "Implemented an end-to-end automation solution for a manufacturing giant, revolutionizing their production line efficiency.",
      category: "Automation",
      client: "IndusTech Solutions",
      results: [
        "60% increase in production efficiency",
        "80% reduction in defects",
        "24/7 automated monitoring",
        "ROI achieved in 8 months",
      ],
      tags: ["Manufacturing", "Automation", "IoT"],
    },
    {
      title: "AI Chatbot for Customer Support",
      description:
        "Developed an intelligent AI chatbot for a telecom company to handle customer queries efficiently and reduce support workload.",
      category: "AI",
      client: "TeleConnect Ltd",
      results: [
        "70% reduction in support tickets",
        "24/7 automated responses",
        "Improved customer satisfaction by 45%",
        "Handled 50,000+ queries monthly",
      ],
      tags: ["AI", "Chatbot", "Customer Support"],
    },
    {
      title: "E-Learning Platform Development",
      description:
        "Created a scalable e-learning platform with video streaming, quizzes, and student analytics for an educational institute.",
      category: "Development",
      client: "EduSmart Academy",
      results: [
        "10,000+ active students",
        "Smooth video streaming experience",
        "Real-time progress tracking",
        "99.8% uptime",
      ],
      tags: ["Education", "E-learning", "Platform"],
    },
    {
      title: "Retail Mobile App نجاح",
      description:
        "Built a feature-rich mobile shopping app with secure payments and real-time order tracking for a retail business.",
      category: "Mobile",
      client: "ShopEase",
      results: [
        "200% increase in mobile sales",
        "Seamless checkout experience",
        "Integrated payment gateways",
        "Real-time notifications",
      ],
      tags: ["Retail", "Mobile App", "E-commerce"],
    },
    {
      title: "Cybersecurity Upgrade for Enterprise",
      description:
        "Enhanced the security infrastructure of a large enterprise with advanced threat detection and zero-trust implementation.",
      category: "Security",
      client: "SecureCorp",
      results: [
        "90% reduction in security incidents",
        "Real-time threat monitoring",
        "Zero-trust architecture implemented",
        "Compliance with international standards",
      ],
      tags: ["Security", "Enterprise", "Cybersecurity"],
    },
  ]);

  // FAQs
  await FAQ.insertMany([
    {
      question: "What services does Codecelix offer?",
      answer:
        "Codecelix offers a comprehensive suite of digital services including AI automation, cloud solutions, data analytics, cybersecurity, mobile development, and web development. We tailor our solutions to meet the specific needs of each client.",
      category: "General",
      order: 1,
    },
    {
      question: "How long does a typical project take?",
      answer:
        "Project timelines vary depending on scope and complexity. A simple website might take 2-4 weeks, while a complex enterprise solution could take 3-6 months. We provide detailed timelines during our initial consultation and keep you updated throughout the process.",
      category: "Projects",
      order: 2,
    },
    {
      question: "Do you offer ongoing support after project completion?",
      answer:
        "Yes! We offer comprehensive post-launch support packages. Our team is available 24/7 for critical issues, and we provide regular maintenance updates, security patches, and performance optimizations to keep your systems running smoothly.",
      category: "Support",
      order: 3,
    },
    {
      question: "What technologies do you specialize in?",
      answer:
        "Our team specializes in React, Next.js, Node.js, Python, MongoDB, PostgreSQL, AWS, Azure, Google Cloud, TensorFlow, and many more cutting-edge technologies. We continuously update our skills to stay at the forefront of technological innovation.",
      category: "Technical",
      order: 4,
    },
    {
      question: "How do you ensure data security?",
      answer:
        "We take security seriously at every level. We implement industry-standard encryption, regular security audits, penetration testing, and comply with major regulations including GDPR, HIPAA, and SOC 2. All our systems use multi-factor authentication and zero-trust architecture.",
      category: "Security",
      order: 5,
    },
    {
      question: "Can you work with our existing systems?",
      answer:
        "Absolutely! We specialize in system integration and can work with virtually any existing technology stack. Our team performs thorough analysis of your current infrastructure and designs solutions that seamlessly integrate with what you already have.",
      category: "Technical",
      order: 6,
    },
    {
      question: "What is your pricing model?",
      answer:
        "We offer flexible pricing models including project-based pricing, monthly retainers, and time-and-materials billing. We also have subscription plans for our SaaS products. Contact us for a custom quote tailored to your specific requirements.",
      category: "Pricing",
      order: 7,
    },
    {
      question: "Do you sign NDAs?",
      answer:
        "Yes, we sign Non-Disclosure Agreements as standard practice. We understand the importance of confidentiality and take all necessary legal steps to protect your intellectual property and business information.",
      category: "Legal",
      order: 8,
    },
  ]);

  // Admin user
  const adminExists = await User.findOne({ email: "admin@codecelix.com" });
  if (!adminExists) {
    await User.create({
      name: "Admin",
      email: "admin@codecelix.com",
      password: "admin123",
      role: "admin",
    });
    console.log("Admin user created: admin@codecelix.com / admin123");
  }

  console.log("Seed completed successfully!");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
