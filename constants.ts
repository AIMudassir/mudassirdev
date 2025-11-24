import { Project, Experience, Education, SkillCategory } from './types';

export const PERSONAL_INFO = {
  name: "Syed Muhammad Mudassir",
  title: "Biometrics & Intelligent Vision Researcher",
  email: "mudassirfrance@gmail.com",
  phone: "0751-066495",
  location: "Paris, France",
  linkedin: "https://www.linkedin.com/in/syed-muhammad-mudassir-b81314211/",
  summary: "MSc student in Biometrics & Intelligent Vision with expertise in AI research, machine learning, and data analysis. Currently working on developing synthetic face generation systems using Stable Diffusion XL and LoRA. Demonstrated experience in database development, Python programming, and data visualization. Actively seeking an AI/ML internship."
};

export const PROJECTS: Project[] = [
  {
    title: "Synthetic Face Generation for Drug Abuse Detection",
    role: "Co-Developer",
    date: "06/2025 – Present",
    category: "Vision",
    description: [
      "Co-developed an AI system using BLIP, CLIP, and OpenCV for generating intelligent prompts from images.",
      "Organized prompts and metadata in JSON format for model training purposes."
    ],
    tech: ["Python", "BLIP", "CLIP", "OpenCV", "LoRA", "Stable Diffusion XL"]
  },
  {
    title: "Environmental Data Processing Project",
    date: "09/2024 – 01/2025",
    category: "Data",
    description: [
      "Built a system to analyze air quality and Sentinel-2 imagery using MySQL, FFT, and image processing for pollution detection via GUI."
    ],
    tech: ["MySQL", "FFT", "Image Processing", "GUI"]
  },
  {
    title: "AI Virtual Assistant Project",
    date: "05/2021 – 02/2022",
    category: "AI",
    description: [
      "Created a Python-based AI virtual assistant, demonstrating expertise in AI."
    ],
    tech: ["Python", "AI", "NLP"]
  },
  {
    title: "Data Visualization Projects using Tableau",
    date: "01/2022 – 01/2022",
    category: "Data",
    description: [
      "Analyzed datasets and created informative Tableau dashboards for data-driven insights."
    ],
    tech: ["Tableau", "Data Analysis"]
  }
];

export const EXPERIENCE: Experience[] = [
  {
    company: "Naveena Group",
    role: "Database Developer Intern",
    location: "Karachi, Pakistan",
    date: "01/2021 – 02/2021",
    points: [
      "Proficiently wrote complex Oracle queries to retrieve data efficiently, contributing to streamlined report generation.",
      "Designed and developed user-friendly forms that enhanced data entry and retrieval processes, improving overall efficiency."
    ]
  }
];

export const EDUCATION: Education[] = [
  {
    degree: "Master Optics, Image, Vision, Multimedia: Biometrics & Intelligent Vision",
    institution: "Université Paris-Est Créteil (UPEC)",
    location: "Créteil, France",
    date: "2024 – Present",
    details: "International program focused on advanced computer vision and biometrics."
  },
  {
    degree: "BS in Software Engineering",
    institution: "Sir Syed University of Engineering & Technology",
    location: "Karachi, Pakistan",
    date: "2018 – 2022"
  }
];

export const SKILLS: SkillCategory[] = [
  {
    name: "AI & Vision",
    skills: ["OpenCV", "Stable Diffusion", "PyTorch", "BLIP", "CLIP", "LoRA", "LLMs", "Generative AI", "Deep Learning"]
  },
  {
    name: "Languages & DB",
    skills: ["Python", "Java", "JavaScript", "C++", "C", "SQL", "MySQL", "Oracle", "MS SQL Server"]
  },
  {
    name: "Data Science",
    skills: ["Tableau", "Power BI", "Excel Pivot Tables", "Data Visualization", "Data Modeling", "Matplotlib"]
  },
  {
    name: "Web Development",
    skills: ["HTML5", "CSS3", "Bootstrap", "WordPress", "React", "Node.js"]
  },
  {
    name: "Tools & OS",
    skills: ["Git", "GitHub", "Linux", "Kali Linux", "Docker", "LaTeX", "Jupyter", "VS Code", "PyCharm"]
  },
  {
    name: "Core Concepts",
    skills: ["UML Diagrams", "ERD/EERD", "Database Design", "Software Engineering", "Algorithms"]
  }
];

export const AWARDS = [
  "Presidential Appreciation – Aurora Annual Conference (2025)",
  "Aurora Student Ambassador (2024)"
];