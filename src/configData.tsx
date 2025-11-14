import { ProjectsData } from "./types";

export const projectData: ProjectsData = {
  headTitle: "My Projects",
  items: [
    {
      title: (
        <>
          Development of an Admin Module with{" "}
          <a
            href="https://sunrisers.com.my/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400"
          >
            Sunrise Tech Ventures
          </a>
        </>
      ),
      period: "September 2024 - Present",
      desc: [
        "Developed an Administration Module for a client, which involves an Inventory + Stock Check in/out system, and a RFQ - Quote - PO - Invoice system for client to deal with suppliers for stock purchase, procurement and storage tracking",
        "Module was developed using Vue.js with Express + Sequelize + MySQL Backend.",
      ],
      skills: ["Vue.js", "MySQL", "Vuetify", "Sequelize"],
    },
    {
      title: "AI Dating App",
      period: "May 2025",
      desc: [
        "Created as a project during the LoopHole Hackathon 2025 by Build Club Malaysia, this project involves a dating app that allows integration with an AI 'Wingman'",
        "This Wingman judges responses of matches, gives prompts for better pick-up lines, and even rates matches out of 10 points for their personality!",
        "Ran the AI locally first, then deployed the frontend on Render and exposed an API through ngrok that talks to the local AI. As a fallback, connect to an OpenAI API.",
      ],
      skills: ["React", "TypeScript", "Express.js"],
      projLink: "https://github.com/Prevsathesh3215/dating-app-ai",
    },
    {
      title: "BookWyrm: A Library Database",
      period: "October 2024 - December 2024",
      desc: [
        "A personal mini project that utilizes Node.js and Express to create an online library API.",
        "A relational database system set up using MySQL and Sequelize + Express.js.",
        "Includes user logging, JWT authentication and password hashing with bcrypt.",
        "Includes a simple frontend made with Vue.js.",
      ],
      skills: [
        "Vue.js",
        "Express.js",
        "MySQL",
        "Sequelize",
        "JWT Authentication",
        "Password Encryption",
      ],
      projLink: "https://github.com/Prevsathesh3215/library-app-frontend",
    },
    {
      title: "Autumn Knight: A Phaser.js + Electron.js Game!",
      period: "October 2025 - November 2025",
      desc: [
        "A personal mini project game I created for my love of D&D and the fantasy genre!",
        "I built the game with free assets, Phaser.js and packaged it as a desktop application with Electron.",
        "Includes dual character system with unique playstyles and abilities, parallax scrolling backgrounds for immersive depth, and dynamic music system that adapts to gameplay events!",
      ],
      skills: ["Phaser.js", "Electron.js", "JavaScript"],
      projLink: "https://github.com/Prevsathesh3215/autumn-knight",
    },
    {
      title: "Cheapest Flight Deal Finder",
      period: "June 2024",
      desc: [
        "This project involves finding the cheapest flight details from Kuala Lumpur to five locations, which are Paris, Frankfurt,Tokyo, Hong Kong, and Istanbul.",
      ],
      skills: ["Python"],
      projLink:
        "https://github.com/Prevsathesh3215/My-Python-Projects/tree/main/CAPSTONE%20PROJECT%20-%20FLIGHT%20DEAL%20FINDER",
    },
  ],
};

export const workExperience: ProjectsData = {
  headTitle: "Work Experience",
  items: [
    {
      title: "Sunrise Tech Ventures Sdn. Bhd. - Full Stack Software Developer",
      period: "September 2024 - Present",
      desc: [
        "Designed and deployed backend APIs using Node.js, Express, MySQL, and Sequelize, with secure user authentication and data management.",
        "Involved in testing of production-level software, exposed to UAT and software testing.",
        "Attended and presented software solution proposal meetings to prospective clients, explaining solution's architecture and features",
        "Involved in testing of company payroll software, assisting client and providing hands-on support during UAT and live phase.",
        "Providing support for testing phase(bug fixing and handling) during the UAT phases for HR, Marketing and Operations modules",
      ],
    },
  ],
};
