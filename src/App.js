import React, { useState, useRef, useEffect, useCallback } from "react";
import "./App.css";
import styles from "./App.module.scss";
import Cv from "../src/assets/cv.pdf";
import cx from "classnames";
import TechnologiesList from "./components/technologies-list/technologies-list"

const projects = [
  {
    title: "Video Editor For Educast",
    img: "./assets/educast.png",
    tools: ["React", "Redux", "Sass", "CSS3", "JavaScript", "Github"],
    description:
      "The objective of this project was to develop a web interface for editing videos using React, the difficulty of the project was to develop components from scratch since there were no reusable components already developed to build a complex interface for a video editor. It was a challenging and very interesting project because most of the components were not common as buttons, forms, and texts, this greatly increased the complexity and the need to think about innovative solutions.",
  },
  {
    title: "Space Management System for IPB",
    img: "./assets/space_management.png",
    tools: [
      "React",
      "Redux",
      "Sass",
      "CSS3",
      "JavaScript",
      "NodeJs",
      "Express",
      "Mongoose",
      "MongoDB",
      "Github",
    ],
    description:
      "This project's goal was to develop a web system to manage classrooms of IPB allowing professors to make requests to reserve spaces for classes. It was also a very challenging project because besides the front-end it was also necessary to implement a REST API to handle all the data of the system. The front-end was mainly developed using React and SASS. The back-end was developed using NodeJS with express and MongoDB for the database.",
  },
  {
    title: "Graphical Representations for Calculus Teaching",
    img: "./assets/funny_calculus.png",
    tools: ["VueJs", "CSS3", "GeogebraScript", "JavaScript", "Github"],
    description:
      "This was a website project to help to teach calculus through graphical representations and animations of mathematical concepts in order to make learning more dynamic. This project was developed using VueJs and geogebrascript to make the animations.",
  },
];

function App() {
  const [isEmailClicked, setIsEmailClicked] = useState(false);
  const emailRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (emailRef.current && !emailRef.current.contains(event.target)) {
        setIsEmailClicked(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [emailRef]);

  const buildCards = useCallback((projects) => {
    return projects.map((project) => {
      return (
        <div className={styles.projectCard}>
          <div className={cx(styles.projectCardSide, styles.projectCardFront)}>
            <div
              className={styles.projectCardImage}
              style={{
                backgroundImage: `url(${require("" + project.img)})`,
              }}
            />
            <div className={styles.projectCardContent}>
              <span className={styles.projectCardTitle}>{project.title}</span>
              <span className={styles.projectCardText}>Tools Used</span>
              <ul className={styles.projectCardList}>
                {project.tools.map((tool) => {
                  return <li>-{tool}</li>;
                })}
              </ul>
            </div>
          </div>

          <div className={cx(styles.projectCardSide, styles.projectCardBack)}>
            <h1 className={cx(styles.projectCardBackTitle)}>Description</h1>
            <p className={styles.projectCardBackText}>{project.description}</p>
          </div>
        </div>
      );
    });
  }, []);

  return (
    <div className="App">
      <div
        className={styles.intro}
        style={{ backgroundImage: `url(${require("./assets/code.jpg")})` }}
      >
        <div className={styles.introTextWrapper}>
          <p className={styles.introText}>Hey, I'm Caio</p>
          <p className={styles.introText}>I can solve problems</p>
        </div>
      </div>

      <div className={styles.aboutMe}>
        <p className={styles.sectionTitle}>About Me</p>
        <div className={styles.aboutMeTextWrapper}>
          <p className={styles.aboutMeText}>
            Hey there, my name is Caio, i’m from Brazil currently living in
            Portugal working at the National Foundation for Scientific Computing (FCCN - FCT)
            as a Fullstack Developer.
          </p>
          <p className={styles.aboutMeText}>
            I have a bachelor's degree in Computer Science (UTFPR - Brazil) and a 
            Master's degree in Informations Systems (IPB - Portugal)
          </p>
          <p className={styles.aboutMeText}>
            Nowadays I am engaged in web development but I also have an interest
            in artificial intelligence, image processing, and data
            visualization.
          </p>
        </div>
        <p className={styles.aboutMeTextItalic}>
          Solving problems and making people's lives better through code is my
          passion.
        </p>
      </div>

      <div className={styles.technicalSkills}>
        <p className={styles.sectionTitle}>Technical Skills</p>
        <p className={styles.technicalSkillsText}>
          Here’s a list of technologies I am more used to, but other
          technologies/programming languages is not a barrier to me!
        </p>
        <TechnologiesList />
        
      </div>

      <div className={styles.projects}>
        <p className={styles.sectionTitle}>Projects</p>
        <p className={styles.projectTitle}>
          These are some of my projects that I think make people’s lives better,
          there are plenty of other projects in my Github but most of them are
          for learning purposes and there are more coming soon!
        </p>
        <div className={styles.projectCardWrapper}>{buildCards(projects)}</div>
      </div>

      <div className={styles.contact}>
        <p className={styles.sectionTitle}>Contact & Resume</p>

        <div className={styles.contactLinksWrapper}>
          <a
            className={styles.contactText}
            href="https://www.linkedin.com/in/caio-nakai-570b9711a/"
          >
            LinkedIn
          </a>
          <a className={styles.contactText} href="https://github.com/caionakai">
            Github
          </a>

          <p
            className={
              isEmailClicked ? cx(styles.email, styles.tooltip) : styles.email
            }
            title="Copied to clipboard!"
            onClick={() => {
              navigator.clipboard.writeText("caionakai2015@gmail.com");
              setIsEmailClicked(true);
            }}
            ref={emailRef}
          >
            Email
          </p>
        </div>

        <div className={styles.textBtnWrapper}>
          <p className={styles.contactText}>Feel free to download my Resume</p>
          <a href={Cv} download="cv_caionakai.pdf">
            <button className={styles.button}>Download Resume</button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
