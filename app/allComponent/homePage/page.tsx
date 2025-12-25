

"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function HomePage() {
  const [windowHeight, setWindowHeight] = useState(window.innerWidth.toString());
  
  useEffect(() => {
    console.log('windowHeight',windowHeight);
  }, []);
  const bioObj = {
    WorkExpList: [
      { 
        company: "SRKAY consulting group",
        role: "Front-End Developer (R & D Developer)",
        duration: "Dec 2022 - Present",
        description: [
                { 'Label': "Develop user-friendly, responsive web applications using Angular (v10+)."},
                { 'Label': "Build reusable components, modules, and services following Angular best practices."},
                { 'Label': "Integrate APIs and work closely with backend developers."},
                { 'Label': "Optimize application performance and scalability."},
                { 'Label': "Implement state management (NgRx or RxJS patterns)."},
                { 'Label': "Write clean, maintainable, and testable code."},
                { 'Label': "Troubleshoot and debug front-end applications."},
                { 'Label': "Collaborate with UI/UX designers to implement visually appealing interfaces."},
                { 'Label': "Participate in code reviews, sprint planning, and agile processes."},
                { 'Label': "Conduct research on emerging technologies, tools, and frameworks."},
                { 'Label': "Develop proof of concepts (POCs), prototypes, and experimental applications."},
                { 'Label': "Analyze business and system requirements to design innovative solutions."},
                { 'Label': "Collaborate with cross-functional teams (product, engineering, QA) to integrate R&D outputs into products."},
                { 'Label': "Evaluate third-party APIs, libraries, and components for feasibility."},
                { 'Label': "Optimize and refactor prototype code for production environments."},
                { 'Label': "Prepare technical documentation, research reports, and architecture diagrams."},
                { 'Label': "Perform performance testing and feasibility studies."},
                { 'Label': "Stay updated with the latest tech trends, AI tools, and software development practices."},
        ]
      }
    ],
    EducationList : [
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
    skillList : [
      "HTML5", "CSS3", "JavaScript", "TypeScript", "Angular", "React", "Next.js", "Bootstrap", "Git", "GitHub", "Agile Methodologies", "Problem-Solving", "Communication"
    ],
    projectList : [
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
  }
  return (
    <div className="marg-per-b-4 bg-img-portfolio">
      <div className="col-md-12 col-sm-12 col-xs-12 col-lg-12 zoom-in animation-delay-zoom-in-1s">
        <h1 className="text-center">Welcome Jainsy Anjirwala</h1>
      </div>
      <hr />
      <div className={`${Number(windowHeight) > 990 ? 'display-flex': '' } col-md-12 col-sm-12 col-xs-12 col-lg-12`}>
        <div className={`${Number(windowHeight) > 990 ? 'w-per-49': 'w-per-100' } fade-left animation-delay-fade-left-5s`}>
          <div className="w-per-100 bg-color-white">
            <div className={`${Number(windowHeight) > 990 ? 'w-per-30': 'w-per-100' } `}>
              <label className="marg-per-l-15"><b>Work Experience:</b></label>
              <div className="w-per-100 ht-per-5 marg-per-l-10">--------------------------------</div>
            </div>
            { bioObj.WorkExpList.map((workExp, index) => (
              <div key={index} className="marg-per-l-2 mb-4">
                <h5>{workExp.company}</h5>
                <span>Role: {workExp.role}</span><br/>
                <span>Duration: {workExp.duration}</span><br/>
                <span>Description:</span>
                <ul className="w-per-80 marg-per-l-5">
                  {workExp.description.map((descItem, descIndex) => (
                    <li className="disc-list-style" key={descIndex}>{descItem.Label}</li>
                  ))}
                </ul>
              </div>
            )) }
          </div>
          <div className="w-per-100 bg-color-white">
            <div className={`${Number(windowHeight) > 990 ? 'w-per-30': 'w-per-100' }`}>
              <label className="marg-per-l-15"><b>Educations:</b></label>
              <div className="w-per-100 ht-per-5 marg-per-l-10">--------------------------------</div>
            </div>
            <div className="w-per-90 new-line marg-per-l-2">
              { bioObj.EducationList.map((education, index) => (
                <div key={index} className="marg-per-l-2 mb-4">
                  <h5>{education.institution}</h5>
                  <span>Degree: {education.degree}</span><br/>
                  <span>Duration: {education.duration}</span><br/>
                </div>
              )) }
            </div>
          </div>
        </div>
        { Number(windowHeight) > 990 ? 
          (        
            <div className="w-per-2">
              <div className="mrg-h-lr-per-50 w-per-3 bg-color-grey ht-per-100"></div>
            </div>
          ): null 
        }
        <div className={`${Number(windowHeight) > 990 ? 'w-per-49': 'w-per-100' } fade-right animation-delay-fade-right-5s`}>
          <div className="w-per-100 bg-color-white">
              <div className={`${Number(windowHeight) > 990 ? 'w-per-30': 'w-per-100' }`}>
                <label className="marg-per-l-15"><b>Projects:</b></label>
                <div className="w-per-100 ht-per-5 marg-per-l-10">--------------------------------</div>
              </div>
              <div className="w-per-60 new-line marg-per-l-3">
                {bioObj.projectList.map((project, index) => (
                  <span key={project.name}>
                    <h5 className="marg-per-t-2">{project.name}</h5>
                    <span>Description:</span>
                    <ul className="w-per-100 marg-per-l-5">
                      {project.Description.map((respItem, respIndex) => (
                        <li className="disc-list-style" key={respIndex}>
                          {respItem}
                        </li>
                      ))}
                    </ul>
                  </span>
                ))}
              </div>
          </div>
          <div className="w-per-100 bg-color-white">
              <div className={`${Number(windowHeight) > 990 ? 'w-per-30': 'w-per-100' }`}>
                <label className="marg-per-l-15"><b>Skills:</b></label>
                <div className="w-per-100 ht-per-5 marg-per-l-10">--------------------------------</div>
              </div>
              <div className="w-per-60 new-line marg-per-l-2">
               {bioObj.skillList.map((skill, index) => (
                  <button key={index}
                    className={`animation-delay-fade-left-10s fade-left marg-per-l-2 border-all-px-1 border-color-grey padd-per-l-1 padd-per-r-1 padd-per-t-1 padd-per-b-1 marg-per-t-2 bg-color-light-grey cursor-style-default`}>
                    {skill}
                  </button>
                ))}
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
