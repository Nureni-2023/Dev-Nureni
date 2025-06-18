import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock Data (replace with your actual data, possibly fetched from a backend/CMS)
const developerData = {
  name: "Jane Doe",
  title: "Full-Stack Web & App Developer",
  location: "Akure, Nigeria",
  avatar: "https://placehold.co/150x150/A3E635/1F2937?text=JD", // Placeholder
  bio: "With over 5 years of experience, I specialize in crafting robust and scalable web and mobile applications. My expertise spans across modern frontend frameworks like React and Next.js, robust backend solutions with Node.js/Express, and cross-platform mobile development using Flutter and React Native. I'm passionate about building innovative solutions that solve real-world problems and enhance user experiences.",
  education: "B.Sc. Computer Science, University of XYZ",
  experienceSummary: "5+ years developing and deploying high-performance applications.",
  nicheFocus: "High-performance SaaS applications, DeFi dApps, and intuitive mobile experiences.",
  workType: "Freelance & Agency Collaboration",
  skills: {
    frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Redux", "GraphQL (Apollo)"],
    backend: ["Node.js", "Express.js", "Fastify", "RESTful APIs", "Socket.IO", "WebSockets"],
    mobile: ["Flutter", "React Native", "Kotlin (Android)", "Swift (iOS)"],
    database: ["MongoDB", "PostgreSQL", "Firebase (Firestore)"],
    devops: ["Docker", "AWS (EC2, S3)", "Vercel", "Netlify", "CI/CD (GitHub Actions)"],
    apis: ["Stripe API", "Google Cloud APIs", "OpenAI API", "Twilio API"],
  },
  certifications: [
    { name: "Google Certified Professional Cloud Developer", issuer: "Google" },
    { name: "Meta Frontend Developer Professional Certificate", issuer: "Meta" },
    { name: "AWS Certified Developer – Associate", issuer: "AWS" },
  ],
  projects: [
    {
      id: "project-1",
      title: "Decentralized Finance (DeFi) Platform",
      image: "https://placehold.co/600x400/99F6E4/0F172A?text=DeFi+Platform",
      stack: ["Next.js", "Tailwind CSS", "Solidity", "Hardhat", "Ethers.js"],
      role: "Lead Frontend Developer",
      keyFeatures: ["Real-time price feeds", "Wallet integration (MetaMask)", "Smart contract interaction"],
      github: "#",
      live: "#",
    },
    {
      id: "project-2",
      title: "AI-Powered Content Generator SaaS",
      image: "https://placehold.co/600x400/FBCFE8/0F172A?text=AI+SaaS",
      stack: ["React", "Node.js", "Express.js", "MongoDB", "OpenAI API"],
      role: "Full-Stack Developer",
      keyFeatures: ["Generative text & image creation", "User authentication", "Subscription management"],
      github: "#",
      live: "#",
    },
    {
      id: "project-3",
      title: "Cross-Platform E-commerce Mobile App",
      image: "https://placehold.co/600x400/BFDBFE/0F172A?text=Mobile+E-commerce",
      stack: ["Flutter", "Firebase (Firestore, Auth)", "Stripe"],
      role: "Mobile App Developer",
      keyFeatures: ["Product catalog", "Shopping cart", "Secure checkout", "Push notifications"],
      github: "#",
      live: "#",
    },
    {
      id: "project-4",
      title: "Progressive Web App (PWA) Task Manager",
      image: "https://placehold.co/600x400/A78BFA/0F172A?text=PWA+Task+Manager",
      stack: ["React", "Service Workers", "IndexedDB", "Node.js (API)"],
      role: "Frontend & PWA Specialist",
      keyFeatures: ["Offline support", "Add to homescreen", "Real-time sync", "Notifications"],
      github: "#",
      live: "#",
    },
    {
      id: "project-5",
      title: "GraphQL API for Social Network",
      image: "https://placehold.co/600x400/FECACA/0F172A?text=GraphQL+API",
      stack: ["Node.js", "Apollo Server", "PostgreSQL", "TypeORM"],
      role: "Backend & API Developer",
      keyFeatures: ["Complex data relationships", "Authentication & Authorization", "Real-time subscriptions"],
      github: "#",
      live: "#",
    },
    {
      id: "project-6",
      title: "Custom CRM Dashboard",
      image: "https://placehold.co/600x400/D1FAE5/0F172A?text=CRM+Dashboard",
      stack: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB", "Express.js"],
      role: "Full-Stack Developer",
      keyFeatures: ["User management", "Data visualization", "Reporting features", "Admin panel"],
      github: "#",
      live: "#",
    },
    {
      id: "project-7",
      title: "NFT Marketplace (Mobile)",
      image: "https://placehold.co/600x400/DBEAFE/0F172A?text=NFT+Marketplace",
      stack: ["React Native", "Solana Web3.js", "IPFS"],
      role: "Mobile Blockchain Developer",
      keyFeatures: ["NFT minting", "Marketplace listings", "Wallet connect", "Auction system"],
      github: "#",
      live: "#",
    },
    {
      id: "project-8",
      title: "Real-time Chat Application",
      image: "https://placehold.co/600x400/EDE9FE/0F172A?text=Chat+App",
      stack: ["React", "Socket.IO", "Node.js", "Express.js", "Redis"],
      role: "Backend & Real-time Specialist",
      keyFeatures: ["Instant messaging", "User presence", "Typing indicators", "Group chats"],
      github: "#",
      live: "#",
    },
  ],
  services: [
    { icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
    ), title: "Web App Development", description: "Building scalable and interactive web applications using modern frameworks." },
    { icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
    ), title: "Mobile App Development", description: "Crafting native-like iOS & Android experiences with cross-platform tools." },
    { icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-600 dark:text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
    ), title: "API Integration", description: "Seamlessly connecting various services and building robust API backends." },
    { icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h4l2-2m-6-1V4h2m6 10V4h2m6 10l2-2m-2 2l-2 2m2-2h-2M4 14v-2M20 14v-2M10 20h4l1-1v-4m-6-10H4l1-1V3m6 0v4m-6 0h-4l-1 1V6m6-10H4l1-1V3m-2-2l2 2m-2-2l-2 2M10 20v4m-6-4h-4l-1-1V6m6-10H4l1-1V3m2 2h-4l-1 1V6m6 0h-4l-1 1V6m6-10H4l1-1V3m2 2h-4l-1 1V6" />
        </svg>
    ), title: "UI/UX Design", description: "Designing intuitive and engaging user interfaces for optimal experiences." },
    { icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v-1a2 2 0 012-2h12a2 2 0 012 2v1m-6 4H8m6 0l3-3m-3 3l-3-3m-6-4V4a2 2 0 012-2h4l2 5V2m-2 5h1a2 2 0 002-2V4a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2h4" />
        </svg>
    ), title: "Cloud Deployment", description: "Deploying applications to cloud platforms ensuring scalability and reliability." },
    { icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
    ), title: "CI/CD Pipelines", description: "Automating software delivery with robust Continuous Integration/Deployment." },
  ],
  testimonials: [
    {
      id: 1,
      name: "Alice Johnson",
      image: "https://placehold.co/80x80/6EE7B7/0F172A?text=AJ",
      role: "CTO, Tech Solutions Inc.",
      review: "Jane delivered an exceptional web application that exceeded our expectations. Her attention to detail and problem-solving skills are outstanding. Highly recommend!",
    },
    {
      id: 2,
      name: "Bob Williams",
      image: "https://placehold.co/80x80/93C5FD/0F172A?text=BW",
      role: "CEO, Innovate Mobile",
      review: "Working with Jane on our mobile app was a fantastic experience. She brought our vision to life with a user-friendly and highly performant product. A true professional!",
    },
    {
      id: 3,
      name: "Carol Davis",
      image: "https://placehold.co/80x80/FDBA74/0F172A?text=CD",
      role: "Product Manager, Data Insights LLC",
      review: "Jane's expertise in backend development and API integration was crucial for our project's success. She built a robust and scalable solution.",
    },
    {
        id: 4,
        name: "David Smith",
        image: "https://placehold.co/80x80/C4B5FD/0F172A?text=DS",
        role: "Startup Founder, NextGen Apps",
        review: "Jane transformed our complex ideas into a sleek, functional product. Her technical acumen and communication were top-notch. Will definitely collaborate again!",
    },
    {
        id: 5,
        name: "Emily White",
        image: "https://placehold.co/80x80/FFEDD5/0F172A?text=EW",
        role: "Lead Engineer, Global Solutions",
        review: "Her proficiency with modern tech stacks, especially React and Node.js, made our integration project seamless. An invaluable asset to any team.",
    },
  ],
  techStackLogos: [
    { name: "React", logo: "https://placehold.co/80x80/22D3EE/0F172A?text=React" },
    { name: "Tailwind CSS", logo: "https://placehold.co/80x80/38BDF8/0F172A?text=Tailwind" },
    { name: "Framer Motion", logo: "https://placehold.co/80x80/9F7AEA/0F172A?text=Framer" },
    { name: "Next.js", logo: "https://placehold.co/80x80/000000/FFFFFF?text=Next.js" },
    { name: "Node.js", logo: "https://placehold.co/80x80/6EE7B7/0F172A?text=Node.js" },
    { name: "Flutter", logo: "https://placehold.co/80x80/06B6D4/0F172A?text=Flutter" },
    { name: "MongoDB", logo: "https://placehold.co/80x80/4ADE80/0F172A?text=MongoDB" },
    { name: "PostgreSQL", logo: "https://placehold.co/80x80/3B82F6/0F172A?text=PostgreSQL" },
    { name: "Docker", logo: "https://placehold.co/80x80/2563EB/FFFFFF?text=Docker" },
    { name: "AWS", logo: "https://placehold.co/80x80/FBBF24/0F172A?text=AWS" },
    { name: "TypeScript", logo: "https://placehold.co/80x80/3178C6/FFFFFF?text=TS" },
    { name: "Express.js", logo: "https://placehold.co/80x80/4F46E5/FFFFFF?text=Express" },
  ],
  socialLinks: {
    linkedin: "https://www.linkedin.com/in/janedoe", // Replace with actual links
    github: "https://github.com/janedoe",
    twitter: "https://twitter.com/janedoe",
    devto: "https://dev.to/janedoe",
  },
  email: "jane.doe@example.com",
  cvLink: "https://example.com/jane-doe-cv.pdf", // Placeholder for CV download
};

// Utility function to get scroll position
const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return scrollPosition;
};

// Testimonial Carousel Component
const TestimonialCarousel = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full overflow-hidden rounded-lg shadow-lg bg-white dark:bg-gray-800 p-8">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center"
        >
          <img
            src={testimonials[currentIndex].image}
            alt={testimonials[currentIndex].name}
            className="w-20 h-20 rounded-full object-cover mb-4 ring-2 ring-indigo-500 dark:ring-indigo-400"
          />
          <p className="text-lg italic text-gray-700 dark:text-gray-300 mb-4">
            "{testimonials[currentIndex].review}"
          </p>
          <p className="font-semibold text-gray-900 dark:text-white">
            {testimonials[currentIndex].name}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {testimonials[currentIndex].role}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Navigation buttons */}
      <button
        onClick={goToPrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
        aria-label="Previous testimonial"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={goToNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
        aria-label="Next testimonial"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};


// Main App Component
const App = () => {
  const [darkMode, setDarkMode] = useState(() => {
    // Initialize dark mode from localStorage or system preference
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('theme');
      if (savedMode) {
        return savedMode === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false; // Default to light if not in browser environment
  });
  const [activeSection, setActiveSection] = useState('home');
  const scrollPosition = useScrollPosition();
  const [isLoading, setIsLoading] = useState(true); // Loading spinner state

  const sectionsRef = useRef({});

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Simulate 1.5 seconds loading time
    return () => clearTimeout(timer);
  }, []);

  // Effect to apply dark mode class to HTML
  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Effect to update active section based on scroll
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px', // When section is in the middle 50% of viewport
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    Object.values(sectionsRef.current).forEach(section => {
      if (section) observer.observe(section);
    });

    return () => {
      Object.values(sectionsRef.current).forEach(section => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);


  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Smooth scroll function
  const scrollToSection = (id) => {
    const section = sectionsRef.current[id];
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { id: 'home', name: 'Home' },
    { id: 'about', name: 'About' },
    { id: 'projects', name: 'Projects' },
    { id: 'services', name: 'Services' },
    { id: 'testimonials', name: 'Testimonials' },
    { id: 'contact', name: 'Contact' },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className={`font-inter antialiased ${darkMode ? 'dark' : ''}`}>
      {/* Tailwind CSS Script - Always include this for Tailwind classes to work */}
      <script src="https://cdn.tailwindcss.com"></script>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          body {
            font-family: 'Inter', sans-serif;
            margin: 0;
            padding: 0;
            overflow-x: hidden;
            background-color: #f8fafc; /* Default light mode background */
          }
          body.dark {
            background-color: #0F172A; /* Default dark mode background */
          }
          /* Custom scrollbar for better aesthetics */
          ::-webkit-scrollbar {
              width: 8px;
          }
          ::-webkit-scrollbar-track {
              background: #f1f1f1;
              border-radius: 10px;
          }
          .dark ::-webkit-scrollbar-track {
              background: #1e293b;
          }
          ::-webkit-scrollbar-thumb {
              background: #888;
              border-radius: 10px;
          }
          .dark ::-webkit-scrollbar-thumb {
              background: #64748b;
          }
          ::-webkit-scrollbar-thumb:hover {
              background: #555;
          }
          .dark ::-webkit-scrollbar-thumb:hover {
              background: #94a3b8;
          }

          /* General button styles for hover effects */
          .btn-primary {
            @apply bg-indigo-600 text-white py-3 px-8 rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105;
          }
          .btn-secondary {
            @apply bg-transparent border-2 border-indigo-600 text-indigo-600 py-3 px-8 rounded-full hover:bg-indigo-600 hover:text-white transition-all duration-300 transform hover:scale-105 dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-indigo-400 dark:hover:text-gray-900;
          }
        `}
      </style>

      {/* Sticky Navbar */}
      <motion.nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrollPosition > 50 ? 'bg-white/90 shadow-lg backdrop-blur-md dark:bg-gray-900/90' : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-800 dark:text-white">
            <a href="#" onClick={() => scrollToSection('home')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              {developerData.name.split(' ')[0]}
            </a>
          </div>
          <div className="hidden md:flex space-x-6 items-center">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => { e.preventDefault(); scrollToSection(link.id); }}
                className={`text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors relative group py-2 px-2 rounded-lg
                  ${activeSection === link.id ? 'font-semibold text-indigo-600 dark:text-indigo-400' : ''}`}
              >
                {link.name}
                {activeSection === link.id && (
                  <motion.span
                    layoutId="underline"
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 dark:bg-indigo-400 rounded-full"
                  />
                )}
              </a>
            ))}
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h1M3 12H2m15.325-4.275l-.707-.707M6.075 17.925l-.707.707M17.925 6.075l.707-.707M6.075 6.075l-.707-.707M12 18a6 6 0 100-12 6 6 0 000 12z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 mr-2"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h1M3 12H2m15.325-4.275l-.707-.707M6.075 17.925l-.707.707M17.925 6.075l.707-.707M6.075 6.075l-.707-.707M12 18a6 6 0 100-12 6 6 0 000 12z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            <button
              className="text-gray-800 dark:text-white focus:outline-none"
              aria-label="Open menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </motion.nav>

      <main className="text-gray-900 dark:text-gray-200">
        {/* Hero Section */}
        <section
          id="home"
          ref={(el) => (sectionsRef.current.home = el)}
          className="relative min-h-screen flex items-center justify-center text-center bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 py-20 overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 z-0 opacity-10 dark:opacity-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239CA3AF' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='30' cy='30' r='10'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '20px 20px',
            }}
          />
          <div className="relative z-10 max-w-4xl mx-auto px-6">
            <motion.img
              src={developerData.avatar}
              alt={developerData.name}
              className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto mb-6 object-cover shadow-xl ring-4 ring-indigo-500 dark:ring-indigo-400"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
            />
            <motion.h1
              className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Hi, I'm <span className="text-indigo-600 dark:text-indigo-400">{developerData.name}</span>
            </motion.h1>
            <motion.p
              className="text-xl md:text-3xl text-gray-700 dark:text-gray-300 mb-8 font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              {developerData.title}
              {developerData.location && (
                <span className="block text-lg mt-2 text-gray-500 dark:text-gray-400">
                  Based in {developerData.location}
                </span>
              )}
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <motion.a
                href={`mailto:${developerData.email}`}
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Hire Me
              </motion.a>
              <motion.button
                onClick={() => scrollToSection('projects')}
                className="btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Projects
              </motion.button>
              <motion.a
                href={developerData.cvLink}
                download
                className="btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Download CV
              </motion.a>
            </motion.div>
          </div>
        </section>

        {/* About Me Section */}
        <section
          id="about"
          ref={(el) => (sectionsRef.current.about = el)}
          className="py-20 md:py-28 bg-white dark:bg-gray-800"
        >
          <div className="container mx-auto px-6 max-w-5xl">
            <motion.h2
              className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
            >
              About Me
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <p className="mb-4">{developerData.bio}</p>
                <p className="mb-2">
                  <span className="font-semibold text-gray-900 dark:text-white">Education:</span> {developerData.education}
                </p>
                <p className="mb-2">
                  <span className="font-semibold text-gray-900 dark:text-white">Experience:</span> {developerData.experienceSummary}
                </p>
                <p className="mb-2">
                  <span className="font-semibold text-gray-900 dark:text-white">Niche Focus:</span> {developerData.nicheFocus}
                </p>
                <p>
                  <span className="font-semibold text-gray-900 dark:text-white">Work Type:</span> {developerData.workType}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Technical Skills</h3>
                {Object.entries(developerData.skills).map(([category, skills]) => (
                  <div key={category} className="mb-6 last:mb-0">
                    <h4 className="text-lg font-medium text-indigo-600 dark:text-indigo-400 mb-3 capitalize">{category}</h4>
                    <div className="flex flex-wrap gap-3">
                      {skills.map((skill, index) => (
                        <motion.span
                          key={skill}
                          className="px-4 py-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-full text-sm font-medium shadow-md"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.5 }}
                          transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                          whileHover={{ scale: 1.1, backgroundColor: '#6366F1' }}
                          whileTap={{ scale: 0.9 }}
                          style={{ color: darkMode ? '#C7D2FE' : '#4338CA' }} // Adjust text color for dark mode if needed
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                ))}

                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-10 mb-6">Certifications & Achievements</h3>
                <div className="space-y-4">
                  {developerData.certifications.map((cert, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-sm"
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500 dark:text-green-400 mr-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.001 12.001 0 002.92 12c0 2.872 1.125 5.501 3.076 7.426L12 21.025l6.004-3.599c1.951-1.925 3.076-4.554 3.076-7.426a12.001 12.001 0 00-3.382-8.016z" />
                      </svg>
                      <div>
                        <h5 className="font-semibold text-gray-900 dark:text-white">{cert.name}</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{cert.issuer}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          ref={(el) => (sectionsRef.current.projects = el)}
          className="py-20 md:py-28 bg-gray-50 dark:bg-gray-900"
        >
          <div className="container mx-auto px-6 max-w-6xl">
            <motion.h2
              className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
            >
              My Projects
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {developerData.projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{project.role}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.stack.map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-full text-xs font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 text-sm mb-4">
                      {project.keyFeatures.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                    <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors flex items-center text-sm font-medium"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6m3 0V7a2 2 0 012-2h4a2 2 0 012 2v12m-6 0h6" />
                        </svg>
                        GitHub
                      </a>
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors flex items-center text-sm font-medium"
                      >
                        Live Demo
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0l-7 7m7-7v6" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section
          id="services"
          ref={(el) => (sectionsRef.current.services = el)}
          className="py-20 md:py-28 bg-white dark:bg-gray-800"
        >
          <div className="container mx-auto px-6 max-w-6xl">
            <motion.h2
              className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
            >
              My Services
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {developerData.services.map((service, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-700 p-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="mb-4 flex justify-center text-center">
                    <motion.div
                        className="p-4 rounded-full bg-indigo-100 dark:bg-indigo-900 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800 transition-colors duration-300"
                        whileHover={{ rotate: 15 }}
                    >
                        {service.icon}
                    </motion.div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 text-center">
                    {service.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-center">
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          id="testimonials"
          ref={(el) => (sectionsRef.current.testimonials = el)}
          className="py-20 md:py-28 bg-gray-50 dark:bg-gray-900"
        >
          <div className="container mx-auto px-6 max-w-4xl">
            <motion.h2
              className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
            >
              Client Testimonials
            </motion.h2>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.2 }}
            >
              <TestimonialCarousel testimonials={developerData.testimonials} />
            </motion.div>
          </div>
        </section>

        {/* Tech Stack Showcase */}
        <section
          id="tech-stack"
          className="py-20 md:py-28 bg-white dark:bg-gray-800"
        >
          <div className="container mx-auto px-6 max-w-6xl">
            <motion.h2
              className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
            >
              My Tech Stack
            </motion.h2>

            <div className="flex flex-wrap justify-center gap-8">
              {developerData.techStackLogos.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  className="flex flex-col items-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md transition-transform duration-300 hover:scale-110"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                >
                  <img
                    src={tech.logo}
                    alt={tech.name}
                    className="w-16 h-16 object-contain mb-2"
                  />
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{tech.name}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          ref={(el) => (sectionsRef.current.contact = el)}
          className="py-20 md:py-28 bg-gray-50 dark:bg-gray-900"
        >
          <div className="container mx-auto px-6 max-w-4xl">
            <motion.h2
              className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
            >
              Get in Touch
            </motion.h2>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl grid grid-cols-1 md:grid-cols-2 gap-10">
              <motion.div
                className="md:border-r md:border-gray-200 md:pr-10 dark:md:border-gray-700"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Contact Details</h3>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <p className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>{developerData.email}</span>
                  </p>
                  <p className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{developerData.location}</span>
                  </p>
                  <p className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h.01M7 12h.01M5 16h.01M17 16h.01M13 16h.01M17 21H7a2 2 0 01-2-2V5a2 2 0 012-2h10a2 2 0 012 2v14a2 2 0 01-2 2z" />
                    </svg>
                    <span>Available for new projects!</span>
                  </p>
                </div>

                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-6">Connect with Me</h3>
                <div className="flex space-x-6">
                  <motion.a
                    href={developerData.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    whileHover={{ scale: 1.2 }}
                  >
                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 fill-current"><title>LinkedIn</title><path d="M20.447 20.452h-3.51V14.61a2.88 2.88 0 01-2.584-1.282c-.895-1.282-1.077-3.08-.435-4.832.643-1.752 2.302-2.923 4.14-2.923C20.5 5.572 22 7.072 22 9.072v11.38zM7.29 8.016a2.025 2.025 0 01-2.02-2.02c0-1.12.9-2.02 2.02-2.02s2.02.9 2.02 2.02-.9 2.02-2.02 2.02zM3.784 20.452h7.026v-12.8h-7.026v12.8z"/></svg>
                  </motion.a>
                  <motion.a
                    href={developerData.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    whileHover={{ scale: 1.2 }}
                  >
                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 fill-current"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.28-.01-1.017-.015-2.004-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.334-1.756-1.334-1.756-1.09-.744.08-.73.08-.73 1.205.086 1.838 1.238 1.838 1.238 1.07 1.835 2.809 1.305 3.49.998.108-.775.418-1.305.762-1.605-2.665-.3-5.464-1.332-5.464-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.13-3.18 0 0 1-.322 3.3.122.96-.265 1.98-.397 3-.397 1.02 0 2.04.132 3 .397 2.3-1.442 3.3-1.22 3.3-1.22.67 1.657.26 2.877.13 3.18.77.84 1.235 1.91 1.235 3.22 0 4.61-2.8 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.895-.015 3.28 0 .32.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                  </motion.a>
                  <motion.a
                    href={developerData.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    whileHover={{ scale: 1.2 }}
                  >
                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 fill-current"><title>Twitter</title><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.185a4.916 4.916 0 00-8.384 4.482c-4.09-.21-7.73-2.17-10.193-5.172.424.646.66 1.398.66 2.222 0 1.59-.805 2.99-2.035 3.791a4.916 4.916 0 01-2.228-.616v.061c0 2.272 1.62 4.16 3.774 4.59.395.08.805.122 1.227.122.301 0 .59-.028.872-.084.59.186 1.15.347 1.7.347 1.414 0 2.607-.638 3.51-1.63a4.935 4.935 0 001.378-2.608A9.957 9.957 0 0024 4.597z"/></svg>
                  </motion.a>
                  <motion.a
                    href={developerData.socialLinks.devto}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    whileHover={{ scale: 1.2 }}
                  >
                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 fill-current"><title>DEV Community</title><path d="M12.041 23.018c-.378-.005-.75-.027-1.113-.066-.363-.039-.718-.088-1.066-.148-1.745-.296-3.232-.888-4.46-1.776C3.992 20.088 3.125 18.736 2.458 17.07c-.667-1.666-1-3.666-1-6.002 0-3.385.945-6.09 2.836-8.118C6.182 1.043 8.804 0 12.041 0c3.232 0 5.845 1.042 7.842 3.123 1.996 2.081 2.994 4.77 2.994 8.068 0 3.328-1.127 6.035-3.382 8.12-2.255 2.084-5.275 3.126-9.034 3.126Zm.006-2.66c3.197 0 5.67-.98 7.42-2.94a7.994 7.994 0 002.555-5.748c0-2.316-.763-4.225-2.29-5.727-1.527-1.503-3.668-2.254-6.425-2.254-2.763 0-4.908.75-6.435 2.254-1.527 1.502-2.29 3.411-2.29 5.727 0 2.332.76 4.257 2.28 5.776 1.52 1.518 3.655 2.278 6.405 2.278Zm0-3.328c-1.305 0-2.348-.36-3.13-.108-.782.252-1.378.784-1.787 1.597-.41.813-.615 1.764-.615 2.853 0 .822.257 1.485.772 1.988.514.503 1.258.756 2.23.756.883 0 1.636-.263 2.262-.787.626-.525.94-1.196.94-2.012 0-1.07-.282-1.956-.846-2.656-.563-.7-.954-1.048-1.17-.98-.215.068-.323.364-.323.888Zm-.005-2.02c-1.284 0-2.304-.32-3.06-1.17-.754-.852-1.132-1.93-1.132-3.235 0-1.285.38-2.35 1.14-3.194.76-.845 1.782-1.267 3.066-1.267 1.288 0 2.308.423 3.06 1.27.75.848 1.127 1.91 1.127 3.187 0 1.305-.375 2.385-1.125 3.245-.75.86-1.77 1.29-3.055 1.29ZM12.046 5.86c-.848 0-1.527-.272-2.036-.816-.51-.544-.764-1.234-.764-2.07 0-.81.254-1.47.764-1.98.51-.51 1.19-.764 2.036-.764.846 0 1.524.254 2.03.764.507.51.76.1.76 1.98 0 .836-.253 1.526-.764 2.07-.507.544-1.185.816-2.03.816Z"/></svg>
                  </motion.a>
                </div>
                <motion.a
                  href={developerData.cvLink}
                  download
                  className="btn-primary w-full mt-8"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Download CV
                </motion.a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Send Me a Message</h3>
                {/* Replace with your Formspree/EmailJS or custom backend endpoint */}
                <form action="https://formspree.io/f/your_form_id" method="POST" className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="_replyto"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    ></textarea>
                  </div>
                  <motion.button
                    type="submit"
                    className="btn-primary w-full"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Send Message
                  </motion.button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 dark:bg-gray-950 py-10 text-center text-gray-400">
          <div className="container mx-auto px-6">
            <p>&copy; {new Date().getFullYear()} {developerData.name}. All rights reserved.</p>
            <p className="mt-2 text-sm">Built with React, Tailwind CSS, and Framer Motion</p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;
