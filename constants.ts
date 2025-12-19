import { Project, Skill, Experience, Education, SocialLink, Certificate } from './types';

export const PORTFOLIO_DATA = {
  name: "Tshegofatso Sebone",
  title: "Software Developer | AI/ML Enthusiast",
  tagline: "Bridging the gap between complex algorithms and intuitive user experiences.",
  bio: "Software Developer with strong foundations in Java, Kotlin, C#, and full-stack web development, now expanding expertise into Artificial Intelligence and Machine Learning. Completed comprehensive AI/ML certification series on Coursera (IBM, Google, Intel, DeepLearning.AI, Microsoft) covering Generative AI, LLMs, Responsible AI, Prompt Engineering, and cloud AI implementations. Currently interning at Capaciti with hands-on AI project exposure. Seeking roles that leverage both software engineering rigor and applied AI/ML to build intelligent, scalable solutions.",
  location: "Johannesburg, SA",
  email: "paledisebene@gmail.com",
  profileImage: "https://media.licdn.com/dms/image/v2/D4D03AQEOSuiLeq2Usw/profile-displayphoto-scale_200_200/B4DZpZQen3HsAY-/0/1762434085176?e=1767830400&v=beta&t=WVQuCHI67mQDN2FfSTQaj9nHdYQoI-w6B11sPaeu03E",
  // Document Paths - references /doc/ folder in public
  cvPath: "/doc/tshegofatso-sebone-cv-2025.pdf",
  certBundlePath: "/doc/certificates/all-certifications-bundle.pdf"
};

export const SKILLS: Skill[] = [
  // Languages
  { name: "TypeScript", level: 95, category: "Languages", icon: "/images/skills/typescript.svg" },
  { name: "Python", level: 90, category: "Languages", icon: "/images/skills/python.svg" },
  { name: "Java", level: 85, category: "Languages", icon: "/images/skills/java.svg" },
  { name: "C#", level: 80, category: "Languages", icon: "https://drive.google.com/file/d/1yujJTg4Rd5VvdfYRLqzPHpIFax9znzU1/view?usp=sharing" },
  { name: "JavaScript", level: 95, category: "Languages", icon: "/images/skills/javascript.svg" },
  { name: "Kotlin", level: 75, category: "Languages", icon: "/images/skills/kotlin.svg" },
  { name: "PHP", level: 70, category: "Languages", icon: "/images/skills/php.svg" },

  // Frontend
  { name: "React", level: 95, category: "Frontend", icon: "/images/skills/react.svg" },
  { name: "Vue.js", level: 80, category: "Frontend", icon: "/images/skills/vuejs.svg" },
  { name: "HTML5", level: 100, category: "Frontend", icon: "/images/skills/html5.svg" },
  { name: "CSS3", level: 95, category: "Frontend", icon: "/images/skills/css3.svg" },
  { name: "Bootstrap", level: 85, category: "Frontend", icon: "/images/skills/bootstrap.svg" },
  { name: "Vite", level: 90, category: "Frontend", icon: "/images/skills/vite.svg" },

  // Backend & DB
  { name: "Node.js", level: 90, category: "Backend & DB", icon: "/images/skills/nodejs.svg" },
  { name: "PostgreSQL", level: 85, category: "Backend & DB", icon: "/images/skills/postgresql.svg" },
  { name: "MySQL", level: 85, category: "Backend & DB", icon: "/images/skills/mysql.svg" },
  { name: "Oracle", level: 75, category: "Backend & DB", icon: "/images/skills/oracle.svg" },
  { name: "Firebase", level: 85, category: "Backend & DB", icon: "/images/skills/firebase.svg" },

  // Cloud & Platforms
  { name: "AWS", level: 80, category: "Cloud & Platforms", icon: "/images/skills/aws.svg" },
  { name: "Azure", level: 75, category: "Cloud & Platforms", icon: "/images/skills/azure.svg" },
  { name: ".NET", level: 80, category: "Cloud & Platforms", icon: "/images/skills/dotnet.svg" },
  { name: "GitHub", level: 90, category: "Cloud & Platforms", icon: "/images/skills/github.svg" },
  { name: "GitLab", level: 85, category: "Cloud & Platforms", icon: "/images/skills/gitlab.svg" },

  // AI/ML
  { name: "TensorFlow", level: 80, category: "AI/ML", icon: "/images/skills/tensorflow.svg" },
  { name: "Gemini API", level: 90, category: "AI/ML", icon: "/images/skills/gemini.svg" },
  { name: "PyTorch", level: 85, category: "AI/ML", icon: "/images/skills/pytorch.svg" },
  { name: "Hugging Face", level: 80, category: "AI/ML", icon: "/images/skills/huggingface.svg" },

  // Tools
  { name: "Git", level: 95, category: "Tools", icon: "/images/skills/git.svg" },
  { name: "VS Code", level: 95, category: "Tools", icon: "/images/skills/vscode.svg" },
  { name: "Figma", level: 80, category: "Tools", icon: "/images/skills/figma.svg" },
  { name: "Jupyter", level: 85, category: "Tools", icon: "/images/skills/jupyter.svg" },
  { name: "Canva", level: 75, category: "Tools", icon: "/images/skills/canva.svg" },
];

export const EXPERIENCE: Experience[] = [
  {
    role: "Software Developer Intern",
    company: "Capaciti",
    location: "Johannesburg, SA",
    period: "Oct 2025 - Present",
    description: [
      "Developing and implementing AI-enhanced features in existing software solutions",
      "Collaborating with teams to integrate Generative AI capabilities into business applications",
      "Participating in AI ethics reviews and responsible AI implementation discussions",
      "Gaining hands-on experience with production-level AI/ML workflows"
    ]
  }
];

export const EDUCATION: Education[] = [
  // Formal Education
  {
    institution: "IIE Rosebank College",
    qualification: "Diploma in Software Development",
    period: "Completed 2025",
    type: "college",
    category: "formal"
  },
  {
    institution: "Randfontein High School",
    qualification: "Matric (High School Diploma)",
    period: "Jan 2017 - Dec 2021",
    type: "school",
    category: "formal"
  },
  // Additional Learning
  {
    institution: "Capaciti AI Internship Program",
    qualification: "Internship",
    period: "Current",
    type: "internship",
    category: "additional"
  }
];

export const CERTIFICATIONS: Certificate[] = [
  // Group 1: Generative AI & Advanced AI
 {
    id: "gen-ai-llm",
    title: "Generative AI with Large Language Models",
    issuer: "DeepLearning.AI",
    date: "Oct 2024",
    category: "Generative AI",
    imageUrl: "/images/gen-ai-llm.png",
   
  },
  {
    id: "intro-gen-ai",
    title: "Introduction to Generative AI",
    issuer: "Google Cloud",
    date: "Oct 2024",
    category: "Generative AI",
    imageUrl: "/images/intro-gen-ai.png",
   
  },

  // Group 2: AI Foundations & Specializations
  {
    id: "ai-prompt-eng",
    title: "AI Foundations: Prompt Engineering with ChatGPT",
    issuer: "Arizona State University",
    date: "Oct 2024",
    category: "Foundations",
    imageUrl: "/images/ai-prompt-eng.png"
  },
  {
    id: "intro-ai-ibm",
    title: "Introduction to Artificial Intelligence (AI)",
    issuer: "IBM",
    date: "Oct 2024",
    category: "Foundations",
    imageUrl: "/images/intro-ai-ibm.png"
  },
  {
    id: "ai-essentials-intel",
    title: "AI Essentials",
    issuer: "Intel",
    date: "Oct 2024",
    category: "Foundations",
    imageUrl: "/images/ai-essentials-intel.PNG"
  },
  {
    id: "ai-azure",
    title: "Artificial Intelligence on Microsoft Azure",
    issuer: "Microsoft",
    date: "Oct 2024",
    category: "Foundations",
    imageUrl: "/images/ai-azure.png"
  },

  // Group 3: Responsible & Ethical AI
  {
    id: "trustworthy-ai",
    title: "Trustworthy AI: Managing Bias, Ethics, and Accountability",
    issuer: "Johns Hopkins University",
    date: "Oct 2024",
    category: "Ethics",
    imageUrl: "/images/trustworthy-ai.png"
  },

  // Group 4: Development & Implementation
  {
    id: "ai-chatbots",
    title: "Building AI-Powered Chatbots Without Programming",
    issuer: "IBM",
    date: "Oct 2024",
    category: "Development",
    imageUrl: "/images/ai-chatbots.png"
  },
  {
    id: "python-dev-ai",
    title: "Python for Data Science, AI & Development",
    issuer: "IBM",
    date: "Oct 2024",
    category: "Development",
    imageUrl: "/images/python-dev-ai.png"
  }
];

export const PROJECTS: Project[] = [
  {
    id: "mzansi-market",
    title: "Mzansi Market AI",
    description: "AI-driven marketplace supporting South African artisans and local businesses. Integrates AI technologies to address market access, trust issues, and accessibility challenges for users with disabilities.",
    techStack: ["React", "Next.js", "AI Integration", "Tailwind"],
    imageUrl: "/images/projects/mzansi-market.jpg",
    demoUrl: "https://mzansimarket.vercel.app/",
    repoUrl: "https://github.com/TshegofatsoSebone/Mzansi-market",
    category: "Full Stack",
    capstone: true,
    challenges: "Building a trust-based marketplace in a digital-first environment while ensuring accessibility for all users.",
    outcomes: "Created a scalable platform that empowers local artisans with AI-driven tools for better market reach."
  },
  {
    id: "ats-cv-gen",
    title: "ATS-FREE CV Generator",
    description: "Smart resume generation system that creates customized, ATS-friendly resumes based on user inputs. Delivers recruiter-ready documents with clean structure and optimized layouts.",
    techStack: ["React", "Node.js", "PDF Generation", "AI Parsing"],
    imageUrl: "/images/projects/ats-cv-gen.jpg",
    demoUrl: "https://cvgeneration-rho.vercel.app/",
    repoUrl: "https://github.com/durksie/ATS-FREE-CV-GENERATOR-APP",
    category: "Full Stack",
    featured: true
  },
  {
    id: "sentimentsphere",
    title: "SentimentSphere",
    description: "Interactive dashboard for multi-class sentiment analysis, helping users understand emotional tone in text data such as reviews and social media posts. Provides confidence insights.",
    techStack: ["Python", "NLP", "React", "Data Visualization"],
    imageUrl: "/images/projects/sentimentsphere.jpg",
    demoUrl: "https://sentimentsphere22.vercel.app/",
    repoUrl: "https://github.com/durksie/SentimentSphere22",
    category: "AI/ML",
    featured: true
  },
  {
    id: "zazu-app",
    title: "Bird Watching Hotspots",
    description: "A mobile application built in Kotlin that helps users discover popular bird-watching hotspots. Includes location-based features, intuitive navigation, and a smooth user experience.",
    techStack: ["Kotlin", "Android", "Google Maps", "Firebase"],
    imageUrl: "/images/projects/zazu-app.jpg",
    repoUrl: "https://github.com/TshegofatsoSebone/ZAZU",
    category: "Mobile",
    featured: false
  },
  {
    id: "bias-audit",
    title: "Bias Audit Report",
    description: "Performs a fairness and bias audit on income prediction models using statistical validation and mitigation techniques. Highlights ethical AI practices and bias detection.",
    techStack: ["Python", "Jupyter", "Pandas", "Scikit-learn"],
    imageUrl: "/images/projects/bias-audit.jpg",
    repoUrl: "https://github.com/durksie/GENDER-BIAS-AUDIT-REPORT",
    category: "AI/ML",
    featured: false
  }
];

export const SOCIALS: SocialLink[] = [
  { platform: "GitHub", url: "https://github.com", icon: "Github" },
  { platform: "LinkedIn", url: "https://linkedin.com", icon: "Linkedin" },
];
