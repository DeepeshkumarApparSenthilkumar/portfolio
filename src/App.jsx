import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import {
  Terminal,
  Database,
  Cpu,
  Zap,
  Code2,
  BrainCircuit,
  Rocket,
  Mail,
  ExternalLink,
  ChevronRight,
  Award,
  BookOpen,
  Layers,
  ArrowUp,
  Menu,
  X,
  Phone,
  Briefcase,
  ChevronDown,
  Sparkles
} from 'lucide-react';

// Brand icons (lucide deprecated these — using SVG directly)
const GithubIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
  </svg>
);

const LinkedinIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

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
    { label: "Viewership Boost", value: "47%", icon: <Zap className="w-5 h-5 text-yellow-400" />, color: "yellow" },
    { label: "Manual Work Saved", value: "2+ Hrs/Day", icon: <Rocket className="w-5 h-5 text-purple-400" />, color: "purple" },
    { label: "Prediction Accuracy", value: "97%", icon: <Cpu className="w-5 h-5 text-cyan-400" />, color: "cyan" }
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
      description: "Architecture: Model Context Protocol (MCP) | FastAPI | React | Groq LLM\n\nMulti-Layer Reasoning: Developed a 3-layer agent architecture (Discovery, Planning, Execution) that utilizes a Self-Correction loop to ensure SQL query accuracy.\n\nPremium User Experience: Built a modern React UI featuring Real-time 'Chain of Thought' visualization, allowing users to see the agent's reasoning process as it generates queries.\n\nEnterprise Features: Integrated SQL preview and dynamic data table rendering for a seamless natural-language-to-database interaction.",
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
      link: "https://medium.com/@dk5058203/cricket-news-reporting-agent-55e62cd8beb1",
      date: "Oct 26, 2025",
      readTime: "4 min read"
    }
  ]
};

// --- HELPER: Parse multi-paragraph description with bold labels ---
const FormattedDescription = ({ text, collapsed }) => {
  const paragraphs = text.split('\n\n');
  const shown = collapsed ? paragraphs.slice(0, 2) : paragraphs;
  return (
    <div className="space-y-2">
      {shown.map((para, i) => {
        const match = para.match(/^([^:]{1,45}:)\s*([\s\S]*)/);
        if (match) {
          return (
            <p key={i} className="text-sm text-slate-400 leading-relaxed">
              <span className="font-semibold text-slate-200">{match[1]}</span>{' '}
              {match[2]}
            </p>
          );
        }
        return <p key={i} className="text-sm text-slate-400 leading-relaxed">{para}</p>;
      })}
    </div>
  );
};

// --- HELPER: Section Header with divider ---
const SectionHeader = ({ icon, title, accent, rightContent }) => {
  const isPurple = accent === 'purple';
  return (
    <div className="flex items-center gap-3 mb-10">
      <div className={`p-2 rounded-lg border flex-shrink-0 ${isPurple ? 'bg-purple-500/10 border-purple-500/20' : 'bg-cyan-500/10 border-cyan-500/20'}`}>
        {icon}
      </div>
      <h2 className="text-2xl md:text-3xl font-bold text-white whitespace-nowrap">{title}</h2>
      <div className={`flex-1 h-px bg-gradient-to-r to-transparent ml-2 ${isPurple ? 'from-purple-500/30' : 'from-cyan-500/30'}`} />
      {rightContent && <div className="flex-shrink-0 ml-2">{rightContent}</div>}
    </div>
  );
};

// --- COMPONENTS ---

const AIAutomationVisualizer = () => {
  return (
    <div className="relative w-full h-56 md:h-72 flex items-center justify-center overflow-hidden rounded-2xl glass-panel border border-white/5 mt-12">
      <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5"></div>

      {/* Label */}
      <div className="absolute top-4 left-4 text-xs font-mono text-slate-500 tracking-widest uppercase">AI Workflow</div>

      <div className="relative z-10 flex items-center gap-3 md:gap-10">

        {/* Node 1: Database */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center gap-2"
        >
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-slate-800/80 border border-slate-600/60 flex items-center justify-center shadow-lg shadow-cyan-500/10 hover:border-cyan-500/40 transition-colors relative">
            <Database className="w-6 h-6 md:w-8 md:h-8 text-cyan-400" />
            <div className="absolute -bottom-1 w-8 h-1 bg-cyan-500/40 blur-sm rounded-full"></div>
          </div>
          <span className="text-xs font-mono text-slate-400">Raw Data</span>
        </motion.div>

        {/* Connection 1 */}
        <div className="relative w-8 md:w-20 h-[2px] bg-slate-700/80 overflow-hidden rounded-full">
          <motion.div
            className="absolute top-0 left-0 h-full w-1/2 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        {/* Node 2: LLM */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col items-center gap-2"
        >
          <div className="relative">
            <div className="w-18 h-18 md:w-20 md:h-20 w-[4.5rem] h-[4.5rem] md:w-20 md:h-20 rounded-2xl bg-indigo-900/40 border border-indigo-500/30 flex items-center justify-center shadow-xl shadow-indigo-500/20 backdrop-blur-md relative z-10">
              <BrainCircuit className="w-8 h-8 md:w-10 md:h-10 text-indigo-400 animate-pulse-slow" />
            </div>
            <motion.div
              className="absolute inset-0 rounded-2xl border border-indigo-400/25"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute -inset-2 rounded-3xl border border-indigo-400/10"
              animate={{ rotate: -360 }}
              transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
            />
          </div>
          <span className="text-xs font-mono text-indigo-300">LLM Reasoning</span>
        </motion.div>

        {/* Connection 2 */}
        <div className="relative w-8 md:w-20 h-[2px] bg-slate-700/80 overflow-hidden rounded-full">
          <motion.div
            className="absolute top-0 left-0 h-full w-1/2 bg-gradient-to-r from-transparent via-purple-400 to-transparent"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'linear', delay: 0.9 }}
          />
        </div>

        {/* Node 3: Action */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex flex-col items-center gap-2"
        >
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-emerald-900/25 border border-emerald-500/30 flex items-center justify-center shadow-lg shadow-emerald-500/10 hover:border-emerald-500/50 transition-colors relative">
            <Terminal className="w-6 h-6 md:w-8 md:h-8 text-emerald-400" />
            <div className="absolute -bottom-1 w-8 h-1 bg-emerald-500/40 blur-sm rounded-full"></div>
          </div>
          <span className="text-xs font-mono text-emerald-400">Action</span>
        </motion.div>
      </div>
    </div>
  );
};

const ProjectCard = ({ project, index }) => {
  const [expanded, setExpanded] = useState(false);
  const paragraphCount = project.description.split('\n\n').length;
  const isExpandable = paragraphCount > 2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08, margin: '0px 0px -80px 0px' }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      className="group relative glass-card rounded-xl overflow-hidden hover:border-cyan-500/30 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(6,182,212,0.1)] transition-all duration-300"
    >
      <div className="p-5 md:p-6 h-full flex flex-col gap-3">

        {/* Card Header */}
        <div className="flex justify-between items-start">
          <div className="p-2 rounded-lg bg-white/5 group-hover:bg-cyan-500/10 transition-colors">
            <Code2 className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="flex gap-1">
            {project.links.github !== '#' && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
                aria-label="View on GitHub"
                onClick={e => e.stopPropagation()}
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            )}
            {project.links.demo !== '#' && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
                aria-label="View live demo"
                onClick={e => e.stopPropagation()}
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            {project.links.github === '#' && project.links.demo === '#' && (
              <>
                <a href={project.links.github} className="p-2 rounded-full hover:bg-white/10 transition-colors text-slate-600">
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a href={project.links.demo} className="p-2 rounded-full hover:bg-white/10 transition-colors text-slate-600">
                  <ExternalLink className="w-4 h-4" />
                </a>
              </>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-cyan-400 transition-colors leading-snug">
          {project.title}
        </h3>

        {/* Description */}
        <div className="flex-grow">
          <FormattedDescription text={project.description} collapsed={!expanded} />
          {isExpandable && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-2 text-xs text-cyan-400/60 hover:text-cyan-400 transition-colors flex items-center gap-1 focus:outline-none"
            >
              {expanded ? 'Show less' : 'Show more'}
              <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} />
            </button>
          )}
        </div>

        {/* Footer */}
        <div className="mt-auto pt-4 border-t border-white/5 space-y-3">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag, i) => (
              <span key={i} className="text-xs px-2.5 py-1 rounded-md bg-white/5 text-slate-300 border border-white/8 hover:border-cyan-500/20 hover:text-cyan-300 transition-colors">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-3.5 h-3.5 text-yellow-500 flex-shrink-0" />
            <span className="text-xs font-semibold text-yellow-500">{project.metric}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ArticleCard = ({ article, index }) => {
  return (
    <motion.a
      href={article.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08, margin: '0px 0px -80px 0px' }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="group relative glass-card rounded-xl overflow-hidden hover:border-purple-500/30 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(168,85,247,0.12)] transition-all duration-300 flex flex-col"
      aria-label={`Read ${article.title}`}
    >
      <div className="p-5 md:p-6 flex flex-col h-full gap-3">
        <div className="flex justify-between items-start">
          <div className="p-2 rounded-lg bg-white/5 group-hover:bg-purple-500/10 transition-colors">
            <BookOpen className="w-5 h-5 text-purple-400 group-hover:text-purple-300 transition-colors" />
          </div>
          <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-purple-400 transition-colors mt-1" />
        </div>

        <h3 className="text-base md:text-lg font-bold text-white group-hover:text-purple-300 transition-colors leading-snug flex-grow">
          {article.title}
        </h3>

        <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span>{article.date}</span>
            <span className="text-slate-600">•</span>
            <span>{article.readTime}</span>
          </div>
          <span className="text-purple-400 text-xs font-medium flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
            Read <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </motion.a>
  );
};

const ExperienceItem = ({ item, index }) => {
  const isEdu = item.type === 'edu';
  const [expanded, setExpanded] = useState(false);
  const paragraphs = item.description.split('\n\n');
  const isExpandable = paragraphs.length > 2;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.08, margin: '0px 0px -80px 0px' }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="relative pl-8 pb-10 last:pb-0 border-l border-white/8"
    >
      <div className={`absolute left-[-9px] top-1 w-4 h-4 rounded-full border-2 ${isEdu ? 'border-purple-500 bg-purple-900/60' : 'border-cyan-500 bg-cyan-900/60'}`} />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
        <h3 className="text-base md:text-lg font-bold text-white">{item.role || item.degree}</h3>
        <span className="text-xs font-mono text-slate-500 bg-white/5 px-2.5 py-1 rounded-full border border-white/5 self-start sm:self-auto flex-shrink-0">{item.period}</span>
      </div>

      <div className={`text-sm font-semibold mb-3 ${isEdu ? 'text-purple-400' : 'text-cyan-400'}`}>
        {item.company || item.institution}
      </div>

      <FormattedDescription text={item.description} collapsed={!expanded} />
      {isExpandable && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-2 text-xs text-slate-500 hover:text-slate-300 transition-colors flex items-center gap-1"
        >
          {expanded ? 'Show less' : 'Show more'}
          <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} />
        </button>
      )}
    </motion.div>
  );
};

// --- MAIN APP ---
function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mouse glow (desktop only)
  useEffect(() => {
    const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const sectionIds = ['projects', 'articles', 'education', 'experience', 'skills'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.2, rootMargin: '-15% 0px -65% 0px' }
    );
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const navLinks = [
    { href: '#projects', label: 'Projects', active: activeSection === 'projects' },
    { href: '#articles', label: 'Articles', active: activeSection === 'articles' },
    { href: '#education', label: 'Education', active: activeSection === 'education' },
    { href: '#experience', label: 'Experience', active: activeSection === 'experience' },
    { href: '#skills', label: 'Skills', active: activeSection === 'skills' },
  ];

  return (
    <div className="min-h-screen bg-deepDark text-slate-200 selection:bg-cyan-500/30 selection:text-cyan-200">

      {/* Dynamic background glow (desktop) */}
      <div
        className="fixed inset-0 pointer-events-none z-0 hidden md:block transition-opacity duration-500"
        style={{
          background: `radial-gradient(700px at ${mousePosition.x}px ${mousePosition.y}px, rgba(6, 182, 212, 0.05), transparent 80%)`
        }}
      />

      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 origin-left z-50"
        style={{ scaleX, boxShadow: '0 0 8px rgba(6, 182, 212, 0.6)' }}
      />

      {/* ── NAVIGATION ── */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-deepDark/85 backdrop-blur-lg border-b border-white/8 py-3 shadow-xl shadow-black/20' : 'bg-transparent py-5'}`}>
        <div className="max-w-6xl mx-auto px-5 md:px-8 flex justify-between items-center">

          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); scrollToTop(); }}
            className="flex items-center gap-2.5 hover:opacity-80 transition-opacity group"
          >
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full blur opacity-0 group-hover:opacity-40 transition duration-300"></div>
              <img
                src="/profile.jpg"
                alt="Deepesh Kumar"
                className="relative w-8 h-8 rounded-full border border-white/20 object-cover object-top"
              />
            </div>
            <span className="hidden sm:block text-sm font-semibold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 whitespace-nowrap">
              Deepesh Kumar
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  link.active
                    ? 'text-cyan-400 bg-cyan-500/10'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href={PORTFOLIO_DATA.profile.social.email}
              className="ml-3 px-4 py-2 rounded-lg bg-white/5 hover:bg-cyan-500/15 border border-white/10 hover:border-cyan-500/40 text-sm font-medium text-white transition-all duration-200"
            >
              Contact Me
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-deepDark/98 backdrop-blur-xl border-b border-white/8 overflow-hidden"
            >
              <div className="flex flex-col px-5 pt-3 pb-5 gap-1">
                {navLinks.map(link => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                      link.active ? 'text-cyan-400 bg-cyan-500/10' : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href={PORTFOLIO_DATA.profile.social.email}
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-2 px-4 py-3 rounded-lg bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 text-base font-medium text-white text-center transition-all hover:from-cyan-500/30 hover:to-purple-500/30"
                >
                  Contact Me
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── PAGE CONTENT ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-8">

        {/* ── HERO SECTION ── */}
        <header className="pt-28 md:pt-36 pb-16 md:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-10 md:gap-16"
          >
            {/* Text content */}
            <div className="flex flex-col gap-5 md:flex-1 order-2 md:order-1">

              {/* Status badge */}
              <div className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full bg-emerald-900/20 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                {PORTFOLIO_DATA.profile.status}
              </div>

              {/* Name */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.1]">
                <span className="block">Deepesh Kumar</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400">
                  Appar Senthilkumar
                </span>
              </h1>

              {/* Role */}
              <h2 className="text-lg md:text-2xl font-semibold text-slate-300">
                {PORTFOLIO_DATA.profile.role}
              </h2>

              {/* Bio */}
              <p className="text-base text-slate-400 max-w-xl leading-relaxed">
                {PORTFOLIO_DATA.profile.bio}
              </p>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-3 mt-1">
                <a
                  href={PORTFOLIO_DATA.profile.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-black font-semibold text-sm hover:bg-cyan-50 active:scale-95 transition-all"
                >
                  <LinkedinIcon className="w-4 h-4" /> Connect
                </a>
                <a
                  href={PORTFOLIO_DATA.profile.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg glass-panel hover:bg-white/8 border border-white/10 hover:border-white/20 text-sm font-medium active:scale-95 transition-all"
                >
                  <GithubIcon className="w-4 h-4" /> GitHub
                </a>
                <a
                  href={`tel:${PORTFOLIO_DATA.profile.social.phone.replace(/[\s-]/g, '')}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg glass-panel hover:bg-white/8 border border-white/10 hover:border-white/20 text-sm font-medium active:scale-95 transition-all"
                >
                  <Phone className="w-4 h-4" />
                  <span className="hidden sm:inline">{PORTFOLIO_DATA.profile.social.phone}</span>
                  <span className="sm:hidden">Call</span>
                </a>
              </div>
            </div>

            {/* Profile photo */}
            <div className="relative flex-shrink-0 self-start md:self-center order-1 md:order-2">
              <div className="relative w-40 h-40 md:w-56 md:h-56">
                {/* Glow ring */}
                <div className="absolute -inset-3 bg-gradient-to-br from-cyan-500/20 via-transparent to-purple-600/20 rounded-full blur-xl"></div>
                <div className="absolute -inset-0.5 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full blur opacity-20"></div>
                {/* Photo */}
                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/15 shadow-2xl">
                  <img
                    src="/profile.jpg"
                    alt="Deepesh Kumar"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                {/* Orbiting decoration */}
                <motion.div
                  className="absolute -inset-2 rounded-full border border-cyan-500/20"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                />
                {/* Status dot */}
                <div className="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-emerald-500 border-2 border-deepDark shadow-lg shadow-emerald-500/50"></div>
              </div>
            </div>
          </motion.div>

          {/* AI Visualizer */}
          <AIAutomationVisualizer />
        </header>

        {/* ── IMPACT METRICS ── */}
        <section className="mb-20 md:mb-24">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {PORTFOLIO_DATA.impactMetrics.map((metric, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-panel p-5 md:p-6 rounded-xl flex items-center gap-4 hover:border-white/10 hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="p-3 rounded-xl bg-white/5 flex-shrink-0">
                  {metric.icon}
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-white tracking-tight">{metric.value}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{metric.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── PROJECTS ── */}
        <section id="projects" className="mb-20 md:mb-24 scroll-mt-24">
          <SectionHeader
            icon={<Layers className="w-5 h-5 text-cyan-400" />}
            title="Featured Projects"
            accent="cyan"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {PORTFOLIO_DATA.projects.map((project, idx) => (
              <ProjectCard key={idx} project={project} index={idx} />
            ))}
          </div>
        </section>

        {/* ── ARTICLES ── */}
        <section id="articles" className="mb-20 md:mb-24 scroll-mt-24">
          <SectionHeader
            icon={<BookOpen className="w-5 h-5 text-purple-400" />}
            title="Publications & Articles"
            accent="purple"
            rightContent={
              <a
                href="https://medium.com/@dk5058203"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1"
              >
                View all <ChevronRight className="w-4 h-4" />
              </a>
            }
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {PORTFOLIO_DATA.articles.map((article, idx) => (
              <ArticleCard key={idx} article={article} index={idx} />
            ))}
          </div>
        </section>

        {/* ── EDUCATION ── */}
        <section id="education" className="mb-20 md:mb-24 scroll-mt-24">
          <SectionHeader
            icon={<BookOpen className="w-5 h-5 text-purple-400" />}
            title="Education"
            accent="purple"
          />
          <div className="grid grid-cols-1 gap-5">
            {PORTFOLIO_DATA.education.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: idx * 0.1 }}
                className="glass-panel p-6 md:p-8 rounded-2xl border-l-4 border-purple-500 relative overflow-hidden hover:border-l-purple-400 hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                  <BookOpen className="w-28 h-28 text-purple-400" />
                </div>
                <div className="relative z-10">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
                    <h3 className="text-xl md:text-2xl font-bold text-white leading-snug">{item.degree}</h3>
                    <span className="text-xs font-mono text-purple-300 bg-purple-900/20 px-3 py-1 rounded-full border border-purple-500/25 flex-shrink-0 self-start">
                      {item.period}
                    </span>
                  </div>
                  <div className="text-lg text-purple-400 font-medium mb-3">{item.institution}</div>
                  <p className="text-slate-300 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── EXPERIENCE ── */}
        <section id="experience" className="mb-20 md:mb-24 scroll-mt-24">
          <SectionHeader
            icon={<Briefcase className="w-5 h-5 text-cyan-400" />}
            title="Professional Experience"
            accent="cyan"
          />
          <div className="pl-4">
            {PORTFOLIO_DATA.experience.map((item, idx) => (
              <ExperienceItem key={idx} item={item} index={idx} />
            ))}
          </div>
        </section>

        {/* ── SKILLS ── */}
        <section id="skills" className="mb-20 md:mb-24 scroll-mt-24">
          <SectionHeader
            icon={<Sparkles className="w-5 h-5 text-cyan-400" />}
            title="Technical Arsenal"
            accent="cyan"
          />
          <div className="flex flex-wrap gap-2.5 justify-start">
            {PORTFOLIO_DATA.skills.map((skill, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.04 }}
                className="px-4 py-2 rounded-full glass-panel text-sm text-slate-300 border border-white/5 hover:border-cyan-500/35 hover:text-cyan-300 hover:bg-cyan-500/5 transition-all duration-200 cursor-default"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="border-t border-white/5 pt-10 pb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">

            {/* Left: name + tagline + contact */}
            <div className="text-center md:text-left">
              <h3 className="text-base font-bold text-white">{PORTFOLIO_DATA.profile.name}</h3>
              <p className="text-slate-500 text-sm mt-1 italic">{PORTFOLIO_DATA.profile.tagline}</p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-3">
                <a
                  href={`tel:${PORTFOLIO_DATA.profile.social.phone.replace(/[\s-]/g, '')}`}
                  className="inline-flex items-center gap-2 text-slate-400 text-sm hover:text-cyan-400 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" /> {PORTFOLIO_DATA.profile.social.phone}
                </a>
                <a
                  href={PORTFOLIO_DATA.profile.social.email}
                  className="inline-flex items-center gap-2 text-slate-400 text-sm hover:text-cyan-400 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" /> Email
                </a>
              </div>
            </div>

            {/* Right: social icons + copyright */}
            <div className="flex flex-col items-center md:items-end gap-4">
              <div className="flex gap-4">
                <a href={PORTFOLIO_DATA.profile.social.email} className="p-2 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-white/5 transition-all" aria-label="Email">
                  <Mail className="w-5 h-5" />
                </a>
                <a href={PORTFOLIO_DATA.profile.social.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-white/5 transition-all" aria-label="LinkedIn">
                  <LinkedinIcon className="w-5 h-5" />
                </a>
                <a href={PORTFOLIO_DATA.profile.social.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-white/5 transition-all" aria-label="GitHub">
                  <GithubIcon className="w-5 h-5" />
                </a>
              </div>
              <div className="text-slate-600 text-xs">
                © {new Date().getFullYear()} Deepesh Kumar. All rights reserved.
              </div>
            </div>
          </div>
        </footer>

      </div>

      {/* ── SCROLL TO TOP ── */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            className="fixed bottom-6 right-5 md:right-8 z-50"
          >
            <button
              onClick={scrollToTop}
              className="p-3 rounded-full bg-slate-800/90 backdrop-blur-sm border border-white/10 text-cyan-400 shadow-lg shadow-black/40 hover:bg-slate-700 hover:border-cyan-500/30 focus:outline-none transition-all active:scale-90 group"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default App;
