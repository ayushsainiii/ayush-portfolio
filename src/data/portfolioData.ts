export interface Project {
  id: string;
  number: string;
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  codeUrl?: string;
  caseStudyUrl?: string;
  image: string;
}

// @ts-ignore
import profileImageFile from "./a4.jpg";

export interface SkillCategory {
  category: string;
  items: { name: string; iconName: string }[];
}

export interface Service {
  id: string;
  number: string;
  title: string;
  description: string;
}

export interface JourneyItem {
  type: 'education' | 'experience' | 'learning';
  title: string;
  institutionOrRole: string;
  period: string;
  description: string;
  details?: string[];
}

export const personalInfo = {
  name: "Ayush Saini",
  primaryRole: "Frontend Developer",
  secondaryRole: "MERN Stack Developer",
  education: "Master of Computer Applications (MCA)",
  graduationYear: "2026 Graduate",
  location: "Noida, India",
  careerStatus: "Open to Frontend Developer, React Developer, MERN Stack Developer, Software Developer, and Software Engineer opportunities.",
  email: "ayushsaini13january@gmail.com",
  github: "https://github.com/ayushsainiii",
  linkedin: "https://linkedin.com/in/ayush-saini-b61b87327",
  profileImage: profileImageFile,
  bio: "I am Ayush Saini, an MCA graduate and frontend developer passionate about creating responsive, accessible, and user-friendly web applications. I enjoy converting ideas and UI designs into functional digital experiences using React.js, JavaScript, HTML, and CSS.\n\nI have experience building web projects and working with modern frontend technologies. I am also expanding my full-stack development skills using Node.js, Express.js, MongoDB, REST APIs, and SQL.\n\nI am currently looking for an opportunity where I can contribute to real-world software projects, improve my development skills, and grow as a software developer."
};

export const projectsData: Project[] = [
  {
    id: "project-1",
    number: "01",
    title: "Your Own AI – Document Assistant",
    description: "An intelligent document assistant that allows users to upload documents, process information, and interact with document content using AI-powered functionality.",
    tags: ["React.js", "JavaScript", "REST API", "AI Integration", "Responsive Design"],
    liveUrl: "https://example.com/demo1",
    codeUrl: "https://github.com/ayushsainiii",
    caseStudyUrl: "#",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "project-2",
    number: "02",
    title: "Deep Packet Inspection System",
    description: "A robust network security system designed to analyze and inspect packet headers and payloads in real time, identifying anomalies, malformed packets, and potential security threats.",
    tags: ["Network Security", "Java", "Packet Analysis", "Data Structures", "Security Protocols"],
    liveUrl: "https://example.com/demo2",
    codeUrl: "https://github.com/ayushsainiii",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "project-3",
    number: "03",
    title: "E-Learning Platform",
    description: "A scalable learning platform designed for students and educators with interactive learning content, quizzes, discussions, and a responsive user interface.",
    tags: ["HTML", "CSS", "JavaScript", "UI/UX", "Interactive System"],
    liveUrl: "https://example.com/demo3",
    codeUrl: "https://github.com/ayushsainiii",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80"
  }
];

export const skillsCategories: SkillCategory[] = [
  {
    category: "Frontend",
    items: [
      { name: "HTML5", iconName: "html" },
      { name: "CSS3", iconName: "css" },
      { name: "JavaScript", iconName: "js" },
      { name: "React.js", iconName: "react" },
      { name: "Tailwind CSS", iconName: "tailwind" },
      { name: "Responsive Design", iconName: "responsive" },
      { name: "Bootstrap", iconName: "bootstrap" },
      { name: "Flexbox", iconName: "flexbox" },
      { name: "CSS Grid", iconName: "grid" }
    ]
  },
  {
    category: "Backend & Databases",
    items: [
      { name: "Node.js", iconName: "node" },
      { name: "Express.js", iconName: "express" },
      { name: "REST APIs", iconName: "api" },
      { name: "MongoDB", iconName: "mongodb" },
      { name: "MySQL", iconName: "mysql" },
      { name: "SQL", iconName: "sql" }
    ]
  },
  {
    category: "Languages & Tools",
    items: [
      { name: "Java", iconName: "java" },
      { name: "Python", iconName: "python" },
      { name: "C", iconName: "c" },
      { name: "C++", iconName: "cpp" },
      { name: "Git", iconName: "git" },
      { name: "GitHub", iconName: "github" },
      { name: "VS Code", iconName: "vscode" },
      { name: "Postman", iconName: "postman" },
      { name: "npm", iconName: "npm" },
      { name: "Vite", iconName: "vite" }
    ]
  },
  {
    category: "Design",
    items: [
      { name: "Figma", iconName: "figma" },
      { name: "UI Implement", iconName: "ui" },
      { name: "Responsive Design", iconName: "responsive_design" }
    ]
  }
];

export const servicesData: Service[] = [
  {
    id: "service-1",
    number: "01",
    title: "Frontend Development",
    description: "Building responsive and interactive user interfaces using React.js, JavaScript, HTML, and CSS."
  },
  {
    id: "service-2",
    number: "02",
    title: "React Web Applications",
    description: "Developing reusable React components and scalable frontend application structures."
  },
  {
    id: "service-3",
    number: "03",
    title: "Responsive UI Development",
    description: "Converting UI designs into responsive, accessible, and functional web interfaces."
  },
  {
    id: "service-4",
    number: "04",
    title: "API Integration",
    description: "Connecting frontend applications with REST APIs and handling dynamic application data."
  }
];

export const journeyTimeline: JourneyItem[] = [
  {
    type: "education",
    title: "Master of Computer Applications (MCA)",
    institutionOrRole: "KIET Group Of Institutions, Ghaziabad",
    period: "2024 – 2026",
    description: "Specialized in Software Engineering, Modern Web Technologies, Database Management Systems, and Web Application Frameworks.",
    details: [
      "Focused on advanced algorithm design, responsive UI architectures, and databases.",
      "Consistently achieved high performance: CGPA 7.91/10.0.",
      "Coursework: Advanced Web Development, Database Management, Object-Oriented Analysis."
    ]
  },
  {
    type: "experience",
    title: "Frontend / Software Development Intern",
    institutionOrRole: "Academic & Collaborative Projects",
    period: "2025 – 2026",
    description: "Worked on building highly responsive client interfaces, debugging component trees, and integrating scalable API endpoints.",
    details: [
      "Designed and implemented modular, reusable UI components in React.js.",
      "Optimized load times and layout stability (Core Web Vitals) for project dashboards.",
      "Worked closely with code reviews, version control, and modular styling practices."
    ]
  },
  {
    type: "education",
    title: "Bachelor of Computer Applications (75.97%)",
    institutionOrRole: "S.D. College of Management Studies",
    period: "2021 – 2024",
    description: "Acquired solid foundational knowledge in computer applications, programming paradigms, and database principles.",
    details: [
      "Graduated with a aggregate score of 75.97%.",
      "Core subjects: Data Structures, Web Technology, Operating Systems, Software Engineering.",
      "Location: Muzaffarnagar, UP"
    ]
  },
  {
    type: "education",
    title: "Senior Secondary (75.6%)",
    institutionOrRole: "L J P S VM Inter College (UP Board)",
    period: "2021",
    description: "Completed higher secondary education under UP Board, specializing in scientific and mathematical disciplines.",
    details: [
      "Achieved a score of 75.6%.",
      "Specialization: Physics, Chemistry, and Mathematics (PCM).",
      "Location: Muzaffarnagar, UP"
    ]
  },
  {
    type: "education",
    title: "Secondary (84.33%)",
    institutionOrRole: "L J P S VM Inter College (UP Board)",
    period: "2019",
    description: "Completed secondary school certification with excellent academic standing, focusing on general science and mathematics.",
    details: [
      "Achieved a top score of 84.33%.",
      "Foundation coursework in mathematics, science, and English.",
      "Location: Muzaffarnagar, UP"
    ]
  },
  {
    type: "learning",
    title: "Specialized Skill Development",
    institutionOrRole: "Self-Driven Technical Growth",
    period: "Ongoing Journey",
    description: "Dedicated to mastering modern developer toolchains and bridging frontend UI layout with efficient full-stack services.",
    details: [
      "Advanced state-management: Redux Toolkit, React Context, and state-driven motion designs.",
      "Full-Stack MERN: Building clean Express routers, secured MongoDB collections, and middleware filters.",
      "Core Standards: Clean typography pairing, accessible layouts (WCAG), and responsive rendering."
    ]
  }
];
