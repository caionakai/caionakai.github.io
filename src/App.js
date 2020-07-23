import React from "react";
import logo from "./logo.svg";
import "./App.css";
import styles from "./App.module.scss";

function App() {
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
            Hey there, my name is Caio, I’m from Brazil currently living in
            Portugal.
          </p>
          <p className={styles.aboutMeText}>
            I'm about to graduate in Computer Science (UTFPR-Brazil) and get a
            Master degree <br />
            in Information Systems (IPB-Portugal).
          </p>
          <p className={styles.aboutMeText}>
            Nowadays I am engaged in web development but I also have interest in
            artificial intelligence, <br />
            image processing and data visualization.
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

        <ul className={styles.technicalSkillsList}>
          <li> - JavaScript</li>
          <li>- Python</li>
          <li>- React </li>
          <li>- CSS3</li>
          <li>- SASS</li>
          <li>- HTML5</li>
          <li>- NodeJs</li>
          <li>- Git</li>
          <li>- Github</li>
          <li>- MongoDB</li>
        </ul>
      </div>

      <div className={styles.projects}>
        <p className={styles.sectionTitle}>Projects</p>
        <p className={styles.technicalSkillsText}>
          These are some of my projects that I think makes people’s lives
          better, there are plenty of other projects in my github but most of
          them are for learning purposes and there are more coming soon!
        </p>

        <ul className={styles.technicalSkillsList}>
          <li> - JavaScript</li>
          <li>- Python</li>
          <li>- React </li>
          <li>- CSS3</li>
          <li>- SASS</li>
          <li>- HTML5</li>
          <li>- NodeJs</li>
          <li>- Git</li>
          <li>- Github</li>
          <li>- MongoDB</li>
        </ul>
      </div>

      <div className={styles.contact}>
        <p className={styles.sectionTitle}>Contact & Resume</p>

        <div>
          <p className={styles.technicalSkillsText}>Linkedn</p>
          <p className={styles.technicalSkillsText}>Github</p>
          <p className={styles.technicalSkillsText}>Email</p>
        </div>
        <p className={styles.technicalSkillsText}>
          Feel free to download my Resume
        </p>
      </div>
    </div>
  );
}

export default App;
