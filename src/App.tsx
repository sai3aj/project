import { AnimatePresence, motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Handshake, Users, LineChart, LayoutPanelTop as LayoutPlaneLine, Instagram, Twitter, Linkedin, Mail, Send, X } from 'lucide-react';
import { useState, useEffect } from 'react';

import emailjs from '@emailjs/browser';

const ContactModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [sending, setSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    
    try {
      await emailjs.sendForm(
        'service_9gbqndh',
        'template_b0exrrp',
        e.target as HTMLFormElement,
        'zLXCQVLyVWGeUOX6G'
      );
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 3000);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your actual public key
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        >
          {/* Background animations */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute top-0 left-0 w-full h-full"
            >
              <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-purple-500/20 rounded-full blur-3xl" />
              <div className="absolute bottom-1/4 right-1/4 w-1/2 h-1/2 bg-pink-500/20 rounded-full blur-3xl" />
            </motion.div>
          </div>

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-gray-800/90 backdrop-blur-lg p-8 rounded-2xl w-full max-w-md relative overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <motion.div
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            </button>

            {showSuccess ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-8"
              >
                <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-gray-300">Thank you for reaching out. We'll get back to you soon!</p>
              </motion.div>
            ) : (
              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Contact Us
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <label htmlFor="from_name" className="block text-sm font-medium text-gray-300 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="from_name"
                      name="from_name"
                      required
                      className="w-full px-4 py-2 rounded-lg bg-white/5 border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-white placeholder-gray-400 transition-colors duration-200"
                      placeholder="Brand Name"
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <label htmlFor="reply_to" className="block text-sm font-medium text-gray-300 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="reply_to"
                      name="reply_to"
                      required
                      className="w-full px-4 py-2 rounded-lg bg-white/5 border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-white placeholder-gray-400 transition-colors duration-200"
                      placeholder="your@email.com"
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      className="w-full px-4 py-2 rounded-lg bg-white/5 border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-white placeholder-gray-400 transition-colors duration-200"
                      placeholder="How can we help you?"
                    />
                  </motion.div>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
                    disabled={sending}
                  >
                    {sending ? 'Sending...' : 'Send Message'}
                  </motion.button>
                </form>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const FeatureCard = ({ icon: Icon, title, description, index }: { 
  icon: any; 
  title: string; 
  description: string; 
  index: number;
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
    rootMargin: "50px",
  });

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        duration: 0.8,
        bounce: 0.3,
        delay: index * 0.2, // Stagger based on index
      }
    },
    hover: {
      scale: 1.02,
      y: -5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { 
      scale: 0.98,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        delay: (index * 0.2) + 0.3
      }
    },
    hover: {
      scale: 1.1,
      rotate: [0, -10, 10, 0],
      transition: {
        duration: 0.6,
        ease: "easeInOut",
        times: [0, 0.2, 0.5, 0.8],
        repeat: Infinity,
        repeatDelay: 1
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.5,
        delay: (index * 0.2) + 0.4
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileHover="hover"
      whileTap="tap"
      className="bg-white/5 backdrop-blur-lg p-6 rounded-xl relative overflow-hidden group"
    >
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />
      
      <motion.div
        variants={iconVariants}
        className="mb-4 relative z-10"
      >
        <Icon className="w-12 h-12 text-purple-500" />
      </motion.div>

      <motion.div variants={textVariants} className="relative z-10">
        <h3 className="text-xl font-bold mb-2 text-white/90">
          {title}
        </h3>
        <p className="text-white/60">
          {description}
        </p>
      </motion.div>
    </motion.div>
  );
};

const LogoTitle = () => {
  const pathVariants = {
    hidden: { pathLength: 0 },
    visible: {
      pathLength: 1,
      transition: {
        duration: 3,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 1
      }
    }
  };

  return (
    <div className="relative">
      {/* Main text */}
      <h1 className="text-7xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
        ProPlay Creatives
      </h1>

      {/* Animated underline/circle */}
      <svg
        className="absolute -inset-4 w-[108%] h-[120%]"
        viewBox="0 0 600 100"
        fill="none"
      >
        <motion.path
          d="M 40,50 C 40,50 140,50 300,50 C 460,50 560,50 560,50"
          stroke="url(#purple-gradient)"
          strokeWidth="2"
          strokeLinecap="round"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
          className="filter drop-shadow-[0_0_3px_rgba(168,85,247,0.5)]"
        />
        <defs>
          <linearGradient id="purple-gradient" x1="0" y1="0" x2="100%" y2="0">
            <stop offset="0%" stopColor="#C084FC" />
            <stop offset="50%" stopColor="#A855F7" />
            <stop offset="100%" stopColor="#9333EA" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
  
const HeroSection = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Main title with fade-in and slide-up animation */}
      <motion.h1 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-7xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent"
      >
        ProPlay Creatives
      </motion.h1>

      {/* Subtitle with delayed fade-in */}
      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="text-2xl text-gray-300 mt-4"
      >
        Where Innovation Meets Opportunity
      </motion.h2>

      {/* Tagline with stagger effect */}
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        className="text-lg text-gray-400 mt-6 relative"
      >
        We connect brands with creators to maximize growth and profitability
        <motion.div 
          className="absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1.2, ease: "easeInOut" }}
        />
      </motion.p>

      {/* CTA Button with bounce effect */}
      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.5, delay: 0.9 }}
        onClick={() => setIsContactModalOpen(true)}
        className="mt-8 px-8 py-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full 
                   text-white font-semibold shadow-lg hover:shadow-purple-500/30 transition-shadow"
      >
        Get Started with ProPlay Creatives
      </motion.button>
      
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </div>
  );
};

const SocialIcons = () => {
  return (
    <div className="flex space-x-4">
      {/* Commented out the Instagram, Twitter, and LinkedIn icons */}
      {/* <Instagram className="text-gray-400 hover:text-white transition-colors" /> */}
      {/* <Twitter className="text-gray-400 hover:text-white transition-colors" /> */}
      {/* <Linkedin className="text-gray-400 hover:text-white transition-colors" /> */}
      
      <a href="mailto:creativesproplay@gmail.com">
        <Mail className="text-gray-400 hover:text-white transition-colors" />
      </a>
      <a href="https://t.me/proplaycreatives" target="_blank" rel="noopener noreferrer">
        <Send className="text-gray-400 hover:text-white transition-colors" /> 
      </a>
    </div>
  );
};

function App() {
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        initial={{ opacity: 0 }}
        animate={heroInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
      >
        <div className="container mx-auto px-4 text-center relative z-10">
          <HeroSection />
        </div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-500/20 to-transparent rounded-full"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-pink-500/20 to-transparent rounded-full"
          />
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={Handshake}
              title="Brand Partnership Optimization"
              description="We match you with the right creators to maximize your brand's reach."
              index={0}
            />
            <FeatureCard
              icon={Users}
              title="Creator Empowerment"
              description="Creators thrive with the right support and brand collaborations."
              index={1}
            />
            <FeatureCard
              icon={LineChart}
              title="Data-Driven Growth"
              description="We use data to power your next big campaign. Insights that lead to measurable success."
              index={2}
            />
            <FeatureCard
              icon={LayoutPlaneLine}
              title="Campaign Management"
              description="From strategy to execution, we manage every detail for seamless campaigns."
              index={3}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/20 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center space-y-6">
            <p className="text-xl font-semibold text-center">Let's create something extraordinary together</p>
            <div className="flex space-x-6">
              <SocialIcons />
            </div>
            <p className="text-gray-500 text-sm">© 2024 ProPlay Creatives. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;