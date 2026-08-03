import { FaEnvelope, FaFileDownload, FaGithub } from "react-icons/fa";
import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  git,
  figma,
  carrent,
  jobit,
  tripguide,
  threejs,
  mysql,
  java,
  jest,
  nextjs,
  python,
  springboot,
  storybook,
  vitest,
  virtusa,
} from "../assets";
import { FaLinkedin } from "react-icons/fa6";

export const navLinks = [
  {
    id: "home",
    title: "Home",
  },
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Frontend Development",
    icon: web,
  },
  {
    title: "Backend Development",
    icon: backend,
  },
  {
    title: "Interactive 3D Web",
    icon: creator,
  },
  {
    title: "AI-Powered Solutions",
    icon: mobile,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Next.js",
    icon: nextjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Three.js",
    icon: threejs,
  },
  {
    name: "Node.js",
    icon: nodejs,
  },
  {
    name: "Java",
    icon: java,
  },
  {
    name: "Spring Boot",
    icon: springboot,
  },
  {
    name: "Python",
    icon: python,
  },
  {
    name: "MySQL",
    icon: mysql,
  },
  {
    name: "Git",
    icon: git,
  },
  {
    name: "Figma",
    icon: figma,
  },
  {
    name: "Storybook",
    icon: storybook,
  },
  {
    name: "Jest",
    icon: jest,
  },
  {
    name: "Vitest",
    icon: vitest,
  },
];

const experiences = [
  {
    title: "Engineer",
    company_name: "Virtusa Consulting Services Pvt. Ltd.",
    client: "BMO",
    icon: virtusa,
    iconBg: "#E6DEDD",
    date: "Jan 2026 - Present",
    points: [
      "Developing enterprise-grade applications using React.js, TypeScript, AG Grid, and React Hook Form.",
      "Built reusable UI components with the Carbon Design System and documented them using Storybook.",
      "Integrated AMPS messaging services and optimized real-time data grids with advanced filtering, sorting, and server-side data loading.",
      "Implemented unit and integration tests using Vitest, Jest, and Playwright to improve application quality and maintainability.",
    ],
  },
  {
    title: "Associate Engineer",
    company_name: "Virtusa Consulting Services Pvt. Ltd.",
    client: "Lighthouse Credit Union",
    icon: virtusa,
    iconBg: "#383E56",
    date: "Jan 2024 - Dec 2025",
    points: [
      "Developed enterprise web applications using React.js, Next.js, TypeScript, and Tailwind CSS.",
      "Built responsive mortgage and loan management modules with reusable UI components.",
      "Integrated REST APIs and Auth0 authentication to deliver secure user experiences.",
      "Collaborated with cross-functional teams in Agile sprints while following clean coding practices.",
    ],
  },
  {
    title: "Java Full Stack Intern",
    company_name: "Virtusa Consulting Services Pvt. Ltd.",
    client: "Internal Training Project",
    icon: virtusa,
    iconBg: "#E6DEDD",
    date: "May 2023 - Aug 2023",
    points: [
      "Completed Java Full Stack training covering Java, Spring Boot, React.js, MySQL, and REST APIs.",
      "Developed a Project Management Portal using React.js, Spring Boot, and MySQL.",
      "Designed responsive user interfaces and integrated frontend with backend services.",
      "Worked with Git and Agile methodologies while collaborating with mentors and team members.",
    ],
  },
];

const projects = [
  {
    name: "Car Rent",
    description:
      "Web-based platform that allows users to search, book, and manage car rentals from various providers, providing a convenient and efficient solution for transportation needs.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "mongodb",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
    ],
    image: carrent,
    source_code_link: "https://github.com/",
  },
  {
    name: "Job IT",
    description:
      "Web application that enables users to search for job openings, view estimated salary ranges for positions, and locate available jobs based on their current location.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "restapi",
        color: "green-text-gradient",
      },
      {
        name: "scss",
        color: "pink-text-gradient",
      },
    ],
    image: jobit,
    source_code_link: "https://github.com/",
  },
  {
    name: "Trip Guide",
    description:
      "A comprehensive travel booking platform that allows users to book flights, hotels, and rental cars, and offers curated recommendations for popular destinations.",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "supabase",
        color: "green-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image: tripguide,
    source_code_link: "https://github.com/",
  },
];

const socials = [
  {
    title: "GitHub",
    subtitle: "Explore my latest open-source projects",
    action: "Explore",
    icon: FaGithub,
    href: "https://github.com/vinith4",
  },
  {
    title: "LinkedIn",
    subtitle: "Let's connect and grow together",
    action: "Connect",
    icon: FaLinkedin,
    href: "https://www.linkedin.com/in/vinithkumar27/",
  },
  {
    title: "Resume",
    subtitle: "Download my latest resume",
    action: "Download",
    icon: FaFileDownload,
    href: "/resume.pdf",
  },
  {
    title: "Email",
    subtitle: "Reach out to me directly anytime",
    action: "Send Mail",
    icon: FaEnvelope,
    href: "https://mail.google.com/mail/u/0/?view=cm&fs=1&to=vinith9047kumar@gmail.com",
  },
];

export { services, technologies, experiences, projects, socials };
