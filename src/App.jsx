import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import {
  Terminal,
  Database,
  Cpu,
  Zap,
  Code2,
  BrainCircuit,
  Rocket,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ChevronRight,
  Award,
  BookOpen,
  Layers,
  ArrowUp,
  Menu,
  X,
  Phone
} from 'lucide-react';

// --- CENTRALIZED DATA ---
const PORTFOLIO_DATA = {
  profile: {
    name: "Deepesh Kumar Appar Senthilkumar",
    role: "AI Solutions Engineer & Full-Stack Developer",
    status: "M.S. in AI Candidate @ Illinois Tech",
    tagline: "Building the Autonomous Future",
    bio: "AI Researcher and Graduate Student focused on deploying multi-agent systems and real-world AI applications. Proven track record in rapid product development—from urban life platforms like chi360 to AI-driven newsletter engines—leveraging LLMs and modern web stacks to solve local and global challenges.",
    social: {
      github: "https://github.com/DeepeshkumarApparSenthilkumar",
      linkedin: "https://www.linkedin.com/in/deepesh-kumar-a90a16218",
      email: "mailto:dapparsenthilkumar@hawk.illinoistech.edu",
      phone: "+1 312 451 3943"
    }
  },
  impactMetrics: [
    { label: "Viewership Boost", value: "47%", icon: <Zap className="w-5 h-5 text-yellow-400" /> },
    { label: "Manual Work Saved", value: "2+ Hrs/Day", icon: <Rocket className="w-5 h-5 text-purple-400" /> },
    { label: "Prediction Accuracy", value: "97%", icon: <Cpu className="w-5 h-5 text-cyan-400" /> }
  ],
  skills: [
    "Microsoft Copilot Studio", "MCP", "Groq LLM", "LangChain",
    "FastAPI", "React", "Tailwind CSS", "SQL", "SQLite",
    "Selenium", "BeautifulSoup4", "GitHub Actions",
    "Text-to-SQL Optimization", "Predictive Modeling", "Enterprise AI Workflows"
  ],
  experience: [
    {
      company: "Illinois Institute of Technology",
      role: "Research Assistant",
      period: "Jan 2026 – Present",
      description: "Email & Outlook Automation: Architecting intelligent enterprise agents within Microsoft Copilot Studio to automate complex scheduling and communication workflows.\n\nText-to-SQL Research: Conducting advanced research on natural language interface for databases, optimizing LLM ability to translate complex user queries into executable SQL.\n\nAcademic Collaboration: Working under the guidance of Dr. Gerald Balekaki to bridge the gap between theoretical AI models and practical enterprise applications.",
      type: "work"
    },
    {
      company: "I Am I Authentications, Inc.",
      role: "AI R&D Intern",
      period: "Jan 2026 – Present",
      description: "Contributing to the Research and Development of next-generation authentication protocols using AI-driven security patterns.\n\nExploring cutting-edge identity verification technologies to enhance user security and system integrity.",
      type: "work"
    },
    {
      company: "Wayfair",
      role: "AI Automation Extern",
      period: "Remote",
      description: "Role Context: Focused on the intersection of Supply Chain/Retail operations and AI to remove manual friction in market intelligence.\n\nAgent Architecture: Built autonomous agents using n8n and Zapier designed for real-time data processing and cross-departmental workflow synchronization.\n\nCompetitive Intelligence: Engineered Python-based automated scraping pipelines to monitor competitor pricing and product shifts.\n\nPrompt Engineering: Specialized in refining LLM outputs to ensure high-fidelity data for stakeholders.",
      type: "work"
    },
    {
      company: "Sportsmechanics",
      role: "Machine Learning Intern",
      period: "Chennai, India",
      description: "Role Context: Handled high-velocity live data for premier cricket leagues (IPL and TNPL).\n\nComputer Vision (YOLO): Developed a proprietary ball-tracking model from the ground up for granular trajectory analytics.\n\nAI Commentary Engine: Architected a system that processed live match metrics to generate real-time text-based commentary.\n\nPredictive Analytics: Built engagement models that increased app viewership by 47%.",
      type: "work"
    }
  ],
  education: [
    {
      institution: "Illinois Institute of Technology",
      degree: "M.S. in Artificial Intelligence",
      period: "2024 - 2026",
      description: "Focusing on Autonomous Systems, Deep Learning, and Computer Vision. GPA: 3.6",
      type: "edu"
    },
    {
      institution: "Shiv Nadar University",
      degree: "B.Tech in IoT",
      period: "Graduated",
      description: "Specialized in IoT and AI. GPA: 3.7. Capstone: Conductive Polymer Based Novel Electronic Devices for Biomedical Application and Neuromorphic Computing.",
      type: "edu"
    }
  ],
  projects: [
    {
      title: "Flavor Bridge",
      tags: ["AI", "Web", "Hackathon"],
      metric: "Built in 45m",
      description: "The Problem: Bridging the gap between familiar dishes and unexplored global cuisines.\n\nThe Solution: An interactive AI-powered culinary compass that takes user input to predict and recommend the best food replacements.\n\nTechnical Feat: Integrated AI to map personalized flavor DNA and suggest alternative global cuisines, fully conceptualized and deployed in just 45 minutes.",
      links: { github: "#", demo: "https://taste-bridge-labs.base44.app" }
    },
    {
      title: "chi360 @ Demon Hacks",
      tags: ["React", "Node.js", "Supabase", "Vercel"],
      metric: "6 Modules in 48h",
      description: "The Problem: A need to capture Chicago's pulse across different dimensions without combining into a single lens.\n\nThe Solution: chi360, a decentralized 6-pillar platform (Markets, Skyline, Atmos, Living, Discover, Transit) addressing transit, housing, air quality, and more.\n\nTechnical Stack: Built collaboratively in 48 hours utilizing a scalable React UI, Node.js & Express backend, and Supabase for seamless data auth.",
      links: { github: "#", demo: "https://youtu.be/EHFtcalkXnI" }
    },
    {
      title: "Text-to-SQL AI Agent",
      tags: ["MCP", "FastAPI", "React", "Groq LLM"],
      metric: "Real-time CoT",
      description: "Architecture: Model Context Protocol (MCP) | FastAPI | React | Groq LLM\n\nMulti-Layer Reasoning: Developed a 3-layer agent architecture (Discovery, Planning, Execution) that utilizes a Self-Correction loop to ensure SQL query accuracy.\n\nPremium User Experience: Built a modern React UI featuring Real-time 'Chain of Thought' visualization, allowing users to see the agent’s reasoning process as it generates queries.\n\nEnterprise Features: Integrated SQL preview and dynamic data table rendering for a seamless natural-language-to-database interaction.",
      links: { github: "#", demo: "#" }
    },
    {
      title: "Automated Panchang Mailer",
      tags: ["Python", "Selenium", "GitHub Actions", "BS4"],
      metric: "100% Uptime",
      description: "End-to-End Automation: Engineered a tool that autonomously fetches daily Tamil Panchangam details for Chicago from Drik Panchang using Selenium browser automation.\n\nCloud Orchestration: Configured GitHub Actions to trigger the pipeline daily at 6:00 AM CST, ensuring 100% uptime without manual intervention.\n\nData Delivery: Extracts key astronomical data (Tithi, Nakshatra, Rahu Kalam) and formats it into a beautifully styled HTML email dispatched via SMTP.",
      links: { github: "#", demo: "#" }
    },
    {
      title: "Market Intelligence Agent",
      tags: ["n8n", "Gemini", "NewsAPI"],
      metric: "2+ Hrs Saved/Day",
      description: "The Problem: Manual monitoring of market sentiment and news trends is time-intensive and prone to delay.\n\nThe Solution: An end-to-end pipeline using NewsAPI and Gemini AI.\n\nTechnical Workflow: Automates data ingestion via n8n, processes sentiment using LLMs, and outputs actionable alerts, eliminating 2+ hours of daily manual work.",
      links: { github: "#", demo: "#" }
    },
    {
      title: "Career Path AI",
      tags: ["Mixtral-8x7B", "Node.js", "SerpAPI"],
      metric: "Hackathon Winner",
      description: "The Problem: Job seekers struggle with ATS compatibility and identifying skill gaps.\n\nThe Solution: A personalized mentor-tone agent built with Mixtral-8x7B and Node.js.\n\nTechnical Workflow: Uses SerpAPI for live job data, parses resumes for ATS scoring, and generates custom project roadmaps to help users bridge technical gaps.",
      links: { github: "#", demo: "#" }
    },
    {
      title: "Transit Deserts Analysis",
      tags: ["Python", "NetworkX", "GeoPandas"],
      metric: "Research Paper",
      description: "Conducted a dual-layer network analysis of Chicago's transit system to identify 'Transit Deserts'.\n\nMethodology: Developed a custom Transit Accessibility Index (TAI) by synthesizing CTA GTFS data and ACS Census data.\n\nNetwork Modeling: Constructed two distinct graph layers using Python (NetworkX) to identify neighborhoods that are geographically central but structurally isolated.",
      links: { github: "#", demo: "#" }
    },
    {
      title: "IPL Match Predictor",
      tags: ["Scikit-learn", "Python", "ML"],
      metric: "97% Accuracy",
      description: "The Problem: Real-time sports betting and fan engagement require accurate, live probability forecasting.\n\nThe Solution: A machine learning model achieving 97% accuracy using a Scikit-learn pipeline.\n\nTechnical Detail: The model synthesizes complex variables such as RRR and historical stadium performance to update win probabilities ball-by-ball.",
      links: { github: "#", demo: "#" }
    },
    {
      title: "AI Cricket Journalist",
      tags: ["n8n", "Perplexity", "Gemini"],
      metric: "Autonomous",
      description: "Built an autonomous AI journalist agent that gathers, summarizes, and emails a curated 'Cricket Today' news bulletin.\n\nLayered LLM Architecture: Used Perplexity Sonar-Pro for search and Google Gemini 2.5 Flash for formatting.\n\nAutomation Pipeline: Engineered a complete n8n workflow for scheduled triggering and delivery via Gmail.",
      links: { github: "#", demo: "#" }
    },
    {
      title: "IoT Injury Prevention",
      tags: ["Arduino", "MATLAB", "IoT"],
      metric: "Real-time",
      description: "The Problem: Athlete fatigue often goes unnoticed until an injury occurs.\n\nThe Solution: A hardware-software integration using EMG BioAmp sensors and Arduino.\n\nTechnical Workflow: Captures biomechanical signals, processes them in MATLAB, and displays fatigue patterns on a dashboard to alert coaches before the 'injury threshold' is reached.",
      links: { github: "#", demo: "#" }
    }
  ],
  articles: [
    {
      title: "6 People, 48 Hours, 1 City: How We Built chi360 at Demon Hacks",
      link: "https://medium.com/@dk5058203/6-people-48-hours-1-city-how-we-built-chi360-at-demon-hacks-a6eb2d405d57",
      date: "Mar 6, 2026",
      readTime: "5 min read"
    },
    {
      title: "Transit Deserts and Network Reach: A Data-Driven Analysis of Chicago's Urban Mobility",
      link: "https://medium.com/@dk5058203/transit-deserts-and-network-reach-a-data-driven-analysis-of-chicagos-urban-mobility-e6a83bc60b17",
      date: "Dec 17, 2025",
      readTime: "6 min read"
    },
    {
      title: "Recipe Compass, Story Driven Recipe Recommendation Engine",
      link: "https://medium.com/@dk5058203/recipe-compass-story-driven-recipe-recommendation-engine-2d520dd7fbd7",
      date: "Nov 28, 2025",
      readTime: "4 min read"
    },
    {
      title: "CareerPath AI — Your Personal AI Mentor for Smarter Career Growth",
      link: "https://medium.com/@dk5058203/careerpath-ai-your-personal-ai-mentor-for-smarter-career-growth-fa01eb8c9216",
      date: "Nov 9, 2025",
      readTime: "7 min read"
    },
    {
      title: "Cricket News Reporting Agent",
      tags: ["AI Agents", "n8n", "Generative AI"],
      link: "https://medium.com/@dk5058203/cricket-news-reporting-agent-55e62cd8beb1",
      date: "Oct 26, 2025",
      readTime: "4 min read"
    }
  ]
};

// --- COMPONENTS ---

const AIAutomationVisualizer = () => {
  return (
    <div className="relative w-full h-64 md:h-80 flex items-center justify-center overflow-hidden rounded-2xl glass-panel border border-white/5 my-12">
      <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>

      {/* Workflow Container */}
      <div className="relative z-10 flex items-center gap-4 md:gap-12">

        {/* Node 1: Database */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-2"
        >
          <div className="w-16 h-16 rounded-xl bg-slate-800/80 border border-slate-600 flex items-center justify-center shadow-lg shadow-cyan-500/10 relative group">
            <Database className="w-8 h-8 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
            <div className="absolute -bottom-1 w-10 h-1 bg-cyan-500/50 blur-sm rounded-full"></div>
          </div>
          <span className="text-xs font-mono text-slate-400">Raw Data</span>
        </motion.div>

        {/* Connection 1 */}
        <div className="relative w-12 md:w-24 h-[2px] bg-slate-700 overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full w-1/2 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Node 2: LLM Processing (n8n style) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col items-center gap-2"
        >
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-indigo-900/40 border border-indigo-500/30 flex items-center justify-center shadow-xl shadow-indigo-500/20 backdrop-blur-md z-10 relative">
              <BrainCircuit className="w-10 h-10 text-indigo-400 animate-pulse-slow" />
            </div>
            {/* Orbiting particles */}
            <motion.div
              className="absolute inset-0 rounded-2xl border border-indigo-400/30"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
          </div>
          <span className="text-xs font-mono text-indigo-300">LLM Reasoning</span>
        </motion.div>

        {/* Connection 2 */}
        <div className="relative w-12 md:w-24 h-[2px] bg-slate-700 overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full w-1/2 bg-gradient-to-r from-transparent via-purple-400 to-transparent"
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }}
          />
        </div>

        {/* Node 3: Result */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col items-center gap-2"
        >
          <div className="w-16 h-16 rounded-xl bg-emerald-900/20 border border-emerald-500/30 flex items-center justify-center shadow-lg shadow-emerald-500/10">
            <Terminal className="w-8 h-8 text-emerald-400" />
          </div>
          <span className="text-xs font-mono text-emerald-400">Action</span>
        </motion.div>
      </div>
    </div>
  );
};

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1, margin: "0px 0px -100px 0px" }}
      transition={{ delay: index * 0.1 }}
      className="group relative glass-card rounded-xl overflow-hidden hover:border-cyan-500/30 transition-all duration-300"
    >
      <div className="p-6 h-full flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 rounded-lg bg-white/5 group-hover:bg-cyan-500/10 transition-colors">
            <Code2 className="w-6 h-6 text-cyan-400" />
          </div>
          <div className="flex gap-2">
            <a href={project.links.github} className="p-2 rounded-full hover:bg-white/10 transition-colors text-slate-400 hover:text-white">
              <Github className="w-4 h-4" />
            </a>
            <a href={project.links.demo} className="p-2 rounded-full hover:bg-white/10 transition-colors text-slate-400 hover:text-white">
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{project.title}</h3>
        <p className="text-slate-400 text-sm mb-4 flex-grow whitespace-pre-line leading-relaxed">{project.description}</p>

        <div className="mt-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag, i) => (
              <span key={i} className="text-xs px-2 py-1 rounded-md bg-white/5 text-slate-300 border border-white/5">
                {tag}
              </span>
            ))}
          </div>
          <div className="pt-4 border-t border-white/5 flex items-center gap-2">
            <Award className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-semibold text-yellow-500">{project.metric}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ArticleCard = ({ article, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1, margin: "0px 0px -100px 0px" }}
      transition={{ delay: index * 0.1 }}
      className="group relative glass-card rounded-xl overflow-hidden hover:border-purple-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] flex flex-col justify-between"
    >
      <a href={article.link} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10" aria-label={`Read ${article.title}`}></a>
      <div className="p-6 md:p-8 flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 rounded-lg bg-white/5 group-hover:bg-purple-500/10 transition-colors">
            <BookOpen className="w-6 h-6 text-purple-400 group-hover:text-purple-300" />
          </div>
          <ExternalLink className="w-5 h-5 text-slate-500 group-hover:text-purple-400 transition-colors" />
        </div>

        <h3 className="text-xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors leading-tight">
          {article.title}
        </h3>

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
          <div className="flex gap-4 text-sm text-slate-400">
            <span>{article.date}</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">{article.readTime}</span>
          </div>
          <span className="text-purple-400 text-sm font-medium group-hover:translate-x-1 transition-transform flex items-center gap-1">
            Read <ChevronRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const ExperienceItem = ({ item, index }) => {
  const isEdu = item.type === 'edu';
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.1, margin: "0px 0px -100px 0px" }}
      transition={{ delay: index * 0.1 }}
      className="relative pl-8 pb-12 last:pb-0 border-l border-white/10"
    >
      <div className={`absolute left-[-9px] top-0 w-4 h-4 rounded-full border-2 ${isEdu ? 'border-purple-500 bg-purple-900' : 'border-cyan-500 bg-cyan-900'}`} />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
        <h3 className="text-lg font-bold text-white">{item.role || item.degree}</h3>
        <span className="text-xs font-mono text-slate-500 bg-white/5 px-2 py-1 rounded">{item.period}</span>
      </div>

      <div className="text-cyan-400 text-sm font-medium mb-2">{item.company || item.institution}</div>
      <p className="text-slate-400 text-sm leading-relaxed max-w-2xl whitespace-pre-line">{item.description}</p>
    </motion.div>
  );
};

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-deepDark text-slate-200 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Dynamic Background Glow */}
      <div
        className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(6, 182, 212, 0.06), transparent 80%)`
        }}
      />

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-cyan-500 origin-left z-50 shadow-[0_0_10px_rgba(6,182,212,0.8)]"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-deepDark/80 backdrop-blur-md border-b border-white/10 py-4 shadow-lg' : 'bg-transparent py-6'}`}>
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <a href="#" onClick={(e) => { e.preventDefault(); scrollToTop(); }} className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 hover:opacity-80 transition-opacity flex items-center gap-2">
            <img src="/profile.jpg" alt="Deepesh Kumar Avatar" className="w-8 h-8 rounded-full border border-white/20 shadow-lg shadow-cyan-500/20 object-cover object-top" />
            <span className="hidden sm:block whitespace-nowrap">Deepesh Kumar</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#projects" className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors">Projects</a>
            <a href="#articles" className="text-sm font-medium text-slate-300 hover:text-purple-400 transition-colors">Articles</a>
            <a href="#education" className="text-sm font-medium text-slate-300 hover:text-purple-400 transition-colors">Education</a>
            <a href="#experience" className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors">Experience</a>
            <a href={PORTFOLIO_DATA.profile.social.email} className="px-4 py-2 rounded-lg bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-500/50 text-sm font-medium text-white transition-all">
              Contact Me
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-slate-300 hover:text-white focus:outline-none">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-deepDark/95 backdrop-blur-xl border-b border-white/10 overflow-hidden"
            >
              <div className="flex flex-col py-4 px-6 gap-4">
                <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-slate-300 hover:text-cyan-400 py-2 border-b border-white/5">Projects</a>
                <a href="#articles" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-slate-300 hover:text-purple-400 py-2 border-b border-white/5">Articles</a>
                <a href="#education" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-slate-300 hover:text-purple-400 py-2 border-b border-white/5">Education</a>
                <a href="#experience" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-slate-300 hover:text-cyan-400 py-2 border-b border-white/5">Experience</a>
                <a href={PORTFOLIO_DATA.profile.social.email} onClick={() => setMobileMenuOpen(false)} className="mt-2 text-center px-4 py-3 rounded-lg bg-cyan-500/20 border border-cyan-500/50 text-base font-medium text-white shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                  Contact Me
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 pt-32 md:py-20 md:pt-40">

        {/* HERO SECTION */}
        <header className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            {/* Profile Photo */}
            <div className="mb-8 relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative w-32 h-32 md:w-48 md:h-48 flex-shrink-0 rounded-full overflow-hidden border-2 border-white/20 bg-white shadow-2xl">
                <img
                  src="/profile.jpg"
                  alt="Deepesh Kumar"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>

            <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-emerald-900/20 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              {PORTFOLIO_DATA.profile.status}
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white glow-text leading-tight">
              {PORTFOLIO_DATA.profile.name.split(' ').map((word, i) => (
                <span key={i} className="block">{word}</span>
              ))}
            </h1>
            <h2 className="text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500 font-semibold">
              {PORTFOLIO_DATA.profile.role}
            </h2>

            <p className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed">
              {PORTFOLIO_DATA.profile.bio}
            </p>

            <div className="flex flex-wrap gap-4 mt-4">
              <a href={PORTFOLIO_DATA.profile.social.linkedin} className="px-6 py-3 rounded-lg bg-white text-black font-semibold hover:bg-cyan-50 transition-colors flex items-center gap-2">
                <Linkedin className="w-4 h-4" /> Connect
              </a>
              <a href={PORTFOLIO_DATA.profile.social.github} className="px-6 py-3 rounded-lg glass-panel hover:bg-white/5 transition-colors flex items-center gap-2">
                <Github className="w-4 h-4" /> GitHub
              </a>
              <a href={`tel:${PORTFOLIO_DATA.profile.social.phone.replace(/[\s-]/g, '')}`} className="px-6 py-3 rounded-lg glass-panel hover:bg-white/5 transition-colors flex items-center gap-2">
                <Phone className="w-4 h-4" /> {PORTFOLIO_DATA.profile.social.phone}
              </a>
            </div>
          </motion.div>

          <AIAutomationVisualizer />
        </header>

        {/* IMPACT METRICS (Bento Bar) */}
        <section className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PORTFOLIO_DATA.impactMetrics.map((metric, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-panel p-6 rounded-xl flex items-center gap-4 hover:border-cyan-500/20 transition-colors"
              >
                <div className="p-3 rounded-lg bg-white/5">
                  {metric.icon}
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{metric.value}</div>
                  <div className="text-sm text-slate-400">{metric.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* PROJECTS GRID */}
        <section id="projects" className="mb-24 pt-10 scroll-mt-20">
          <div className="flex items-center gap-2 mb-8">
            <Layers className="w-5 h-5 text-cyan-400" />
            <h2 className="text-2xl font-bold text-white">Featured Projects</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PORTFOLIO_DATA.projects.map((project, idx) => (
              <ProjectCard key={idx} project={project} index={idx} />
            ))}
          </div>
        </section>

        {/* ARTICLES SECTION */}
        <section id="articles" className="mb-24 pt-10 scroll-mt-20">
          <div className="flex items-center gap-2 mb-8">
            <BookOpen className="w-5 h-5 text-purple-400" />
            <h2 className="text-2xl font-bold text-white">Publications & Articles</h2>
            <a href="https://medium.com/@dk5058203" target="_blank" rel="noopener noreferrer" className="ml-auto text-sm text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1">
              View all on Medium <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PORTFOLIO_DATA.articles.map((article, idx) => (
              <ArticleCard key={idx} article={article} index={idx} />
            ))}
          </div>
        </section>

        {/* EDUCATION SECTION (Prioritized) */}
        <section id="education" className="mb-24 pt-10 scroll-mt-20">
          <div className="flex items-center gap-2 mb-8">
            <BookOpen className="w-6 h-6 text-purple-400" />
            <h2 className="text-3xl font-bold text-white">Education</h2>
          </div>
          <div className="grid grid-cols-1 gap-8">
            {PORTFOLIO_DATA.education.map((item, idx) => (
              <div key={idx} className="glass-panel p-8 rounded-2xl border-l-4 border-purple-500 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <BookOpen className="w-24 h-24 text-purple-400" />
                </div>
                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-white">{item.degree}</h3>
                    <span className="text-sm font-mono text-purple-300 bg-purple-900/20 px-3 py-1 rounded-full border border-purple-500/30">{item.period}</span>
                  </div>
                  <div className="text-xl text-purple-400 font-medium mb-4">{item.institution}</div>
                  <p className="text-slate-300 leading-relaxed max-w-3xl">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EXPERIENCE SECTION */}
        <section id="experience" className="mb-24 pt-10 scroll-mt-20">
          <div className="flex items-center gap-2 mb-8">
            <BriefcaseIcon className="w-6 h-6 text-cyan-400" />
            <h2 className="text-3xl font-bold text-white">Professional Experience</h2>
          </div>
          <div className="pl-4 border-l-2 border-white/5 space-y-12">
            {PORTFOLIO_DATA.experience.map((item, idx) => (
              <ExperienceItem key={idx} item={item} index={idx} />
            ))}
          </div>
        </section>

        {/* SKILLS MARQUEE (Simple Grid for now) */}
        <section className="mb-24">
          <h2 className="text-xl font-bold text-white mb-6 text-center">Technical Arsenal</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {PORTFOLIO_DATA.skills.map((skill, idx) => (
              <span key={idx} className="px-4 py-2 rounded-full glass-panel text-sm text-slate-300 border border-white/5 hover:border-cyan-500/30 hover:text-cyan-400 transition-colors cursor-default">
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold text-white">{PORTFOLIO_DATA.profile.name}</h3>
            <p className="text-slate-500 text-sm mt-1">{PORTFOLIO_DATA.profile.tagline}</p>
            <a href={`tel:${PORTFOLIO_DATA.profile.social.phone.replace(/[\s-]/g, '')}`} className="inline-flex items-center gap-2 text-slate-400 text-sm mt-3 hover:text-cyan-400 transition-colors">
              <Phone className="w-4 h-4" /> {PORTFOLIO_DATA.profile.social.phone}
            </a>
          </div>

          <div className="flex gap-6">
            <a href={PORTFOLIO_DATA.profile.social.email} className="text-slate-400 hover:text-cyan-400 transition-colors">
              <Mail className="w-5 h-5" />
            </a>
            <a href={PORTFOLIO_DATA.profile.social.linkedin} className="text-slate-400 hover:text-cyan-400 transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href={PORTFOLIO_DATA.profile.social.github} className="text-slate-400 hover:text-cyan-400 transition-colors">
              <Github className="w-5 h-5" />
            </a>
          </div>

          <div className="text-slate-600 text-xs">
            © {new Date().getFullYear()} All rights reserved.
          </div>
        </footer>

      </div>

      {/* Floating Scroll to Top */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="fixed bottom-6 right-6 z-50"
          >
             <button
              onClick={scrollToTop}
              className="p-3 md:p-4 rounded-full bg-slate-800/80 backdrop-blur border border-white/10 text-cyan-400 shadow-lg shadow-cyan-500/20 hover:bg-slate-700 transition-colors group focus:outline-none"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Helper Icon Component since 'Briefcase' wasn't imported in the list above but used
const BriefcaseIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

export default App;
