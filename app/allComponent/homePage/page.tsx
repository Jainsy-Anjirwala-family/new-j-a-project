

"use client";

import { motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faGraduationCap, faProjectDiagram, faCogs, faCalendarAlt, faBuilding } from '@fortawesome/free-solid-svg-icons';

export default function HomePage() {
  const [windowHeight, setWindowHeight] = useState("0");

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerWidth.toString());
    };

    // Set initial value
    handleResize();

    window.addEventListener('resize', handleResize);
    console.log('windowHeight', windowHeight);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const bioObj = {
    WorkExpList: [
      {
        company: "SRKAY consulting group",
        role: "Front-End Developer (R & D Developer)",
        duration: "Dec 2022 - Present",
        description: [
          { 'Label': "Develop user-friendly, responsive web applications using Angular (v10+)." },
          { 'Label': "Build reusable components, modules, and services following Angular best practices." },
          { 'Label': "Integrate APIs and work closely with backend developers." },
          { 'Label': "Optimize application performance and scalability." },
          { 'Label': "Implement state management (NgRx or RxJS patterns)." },
          { 'Label': "Write clean, maintainable, and testable code." },
          { 'Label': "Troubleshoot and debug front-end applications." },
          { 'Label': "Collaborate with UI/UX designers to implement visually appealing interfaces." },
          { 'Label': "Participate in code reviews, sprint planning, and agile processes." },
          { 'Label': "Conduct research on emerging technologies, tools, and frameworks." },
          { 'Label': "Develop proof of concepts (POCs), prototypes, and experimental applications." },
          { 'Label': "Analyze business and system requirements to design innovative solutions." },
          { 'Label': "Collaborate with cross-functional teams (product, engineering, QA) to integrate R&D outputs into products." },
          { 'Label': "Evaluate third-party APIs, libraries, and components for feasibility." },
          { 'Label': "Optimize and refactor prototype code for production environments." },
          { 'Label': "Prepare technical documentation, research reports, and architecture diagrams." },
          { 'Label': "Perform performance testing and feasibility studies." },
          { 'Label': "Stay updated with the latest tech trends, AI tools, and software development practices." },
        ]
      }
    ],
    EducationList: [
      {
        institution: "Sarvajanik College of Engineering and Technology,Surat",
        degree: "Bachelor of Technology in Information Technology",
        duration: "2019 - 2022",
      },
      {
        institution: "Government Polytechnic For Girls, Surat",
        degree: "Diploma in Information Technology",
        duration: "2016 - 2019"
      }
    ],
    skillList: [
      "HTML5", "CSS3", "JavaScript", "TypeScript", "Angular", "React", "Next.js", "Bootstrap", "Git", "GitHub", "Agile Methodologies", "Problem-Solving", "Communication"
    ],
    projectList: [
      {
        name: "Pure-Web - Dimond Base Company",
        Description: [
          "Quickly understood and worked with complex frontend codebases to deliver efficient, maintainable features.",
          "Adapted to complex existing code structures and resolved critical UI and integration issues under tight deadlines.",
          "Collaborated with senior developers to analyze and optimize complex application logic, ensuring smooth frontend performance.",
          "Demonstrated strong problem-solving by understanding and refactoring complex component logic, state management, and API integration."
        ]
      },
      {
        name: "Pure-cc - Permission Based Page Access",
        Description: [
          "Understood and worked with complex web application codebases to add new features and fix bugs efficiently.",
          "Collaborated with backend and design teams to integrate APIs and improve user experience.",
          "Enhanced code maintainability by refactoring redundant logic and optimizing Angular components.",
          "Contributed to responsive UI implementation using Angular, Bootstrap, and TypeScript."
        ]
      },
    ]
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-[#0a0a0a] to-[#0a0a0a] text-white pt-24 pb-20 px-4 md:px-8">
      {/* Hero Welcome */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto mb-16 text-center"
      >
        <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-blue-400 uppercase bg-blue-500/10 border border-blue-500/20 rounded-full">
          Portfolio Overview
        </span>
        <h1 className="text-5xl md:text-7xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-neutral-500">
          Welcome Jainsy Anjirwala
        </h1>
        <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          A passionate Front-End R&D Developer dedicated to building performant,
          visually stunning, and user-centric digital experiences.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className={`max-w-7xl mx-auto grid grid-cols-1 ${Number(windowHeight) > 990 ? 'lg:grid-cols-2' : ''} gap-8`}
      >
        {/* Left Column: Experience & Education */}
        <div className="space-y-8">
          {/* Work Experience */}
          <motion.section variants={itemVariants} className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative overflow-hidden group">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-blue-600/20 rounded-2xl flex items-center justify-center border border-blue-500/30">
                <FontAwesomeIcon icon={faBriefcase} className="text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold">Work Experience</h2>
            </div>
            {bioObj.WorkExpList.map((work, idx) => (
              <div key={idx} className="relative pl-8 border-l border-white/10 mt-2">
                <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                <h3 className="text-xl font-bold text-white mb-1">{work.company}</h3>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-neutral-400 mb-4">
                  <span className="flex items-center gap-2"><FontAwesomeIcon icon={faBuilding} className="w-3" /> {work.role}</span>
                  <span className="flex items-center gap-2"><FontAwesomeIcon icon={faCalendarAlt} className="w-3" /> {work.duration}</span>
                </div>
                <ul className="space-y-3 text-sm text-neutral-400 leading-relaxed">
                  {work.description.map((desc, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="text-blue-500 mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                      {desc.Label}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.section>

          {/* Education */}
          <motion.section variants={itemVariants} className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-2xl group">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-purple-600/20 rounded-2xl flex items-center justify-center border border-purple-500/30">
                <FontAwesomeIcon icon={faGraduationCap} className="text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold">Education</h2>
            </div>
            <div className="space-y-8">
              {bioObj.EducationList.map((edu, idx) => (
                <div key={idx} className="relative pl-8 border-l border-white/10">
                  <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 bg-purple-500 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                  <h3 className="text-lg font-bold text-white mb-1">{edu.institution}</h3>
                  <p className="text-neutral-300 text-sm mb-1">{edu.degree}</p>
                  <p className="text-neutral-500 text-xs font-medium uppercase tracking-wider">{edu.duration}</p>
                </div>
              ))}
            </div>
          </motion.section>
        </div>

        {/* Right Column: Projects & Skills */}
        <div className="space-y-8">
          {/* Projects */}
          <motion.section variants={itemVariants} className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative overflow-hidden group">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-emerald-600/20 rounded-2xl flex items-center justify-center border border-emerald-500/30">
                <FontAwesomeIcon icon={faProjectDiagram} className="text-emerald-400" />
              </div>
              <h2 className="text-2xl font-bold">Featured Projects</h2>
            </div>
            <div className="grid gap-6">
              {bioObj.projectList.map((project, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors border-l-4 border-l-emerald-500">
                  <h3 className="text-lg font-bold text-white mb-2">{project.name}</h3>
                  <div className="space-y-2">
                    {project.Description.map((desc, i) => (
                      <p key={i} className="text-neutral-400 text-sm leading-relaxed">{desc}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Skills */}
          <motion.section variants={itemVariants} className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-2xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-orange-600/20 rounded-2xl flex items-center justify-center border border-orange-500/30">
                <FontAwesomeIcon icon={faCogs} className="text-orange-400" />
              </div>
              <h2 className="text-2xl font-bold">Technical Skills</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {bioObj.skillList.map((skill, idx) => (
                <motion.span
                  key={idx}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm font-medium hover:bg-white/10 hover:border-orange-500/50 hover:text-orange-400 transition-all cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.section>
        </div>
      </motion.div>
    </div>
  );
}
