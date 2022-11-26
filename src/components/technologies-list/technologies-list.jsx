import React from 'react';
import styles from "./technologies-list.module.scss";
import { FaLinux, FaGithub, FaReact, FaCss3Alt, FaSass, FaHtml5, FaNodeJs, FaGitAlt, FaDocker } from "react-icons/fa";
import { SiElectron, SiRails, SiMysql, SiAnsible } from "react-icons/si";
import { DiJavascript1, DiRuby } from "react-icons/di";

const ICON_SIZE = "2rem";
const ICON_COLOR = "white"

const TechnologiesList = () => {
    return (
      <div className={styles.listWrapper}>
        <div className={styles.hexagon}>
          <DiJavascript1 size={ICON_SIZE} color={ICON_COLOR} className={styles.icon} title="Javascript"/>
        </div>

        <div className={styles.hexagon}>
          <DiRuby size={ICON_SIZE} color={ICON_COLOR} className={styles.icon} title="Ruby Programming Language"/>
        </div>
        
        <div className={styles.hexagon}>
          <SiMysql size={ICON_SIZE} color={ICON_COLOR} className={styles.icon} title="MySQL Database"/>
        </div>

        <div className={styles.hexagon}>
          <FaGitAlt size={ICON_SIZE} color={ICON_COLOR} className={styles.icon} title="Git"/>
        </div>

        <div className={styles.hexagon}>
          <FaGithub size={ICON_SIZE} color={ICON_COLOR} className={styles.icon} title="Github"/>
        </div>

        <div className={styles.hexagon}>
          <FaHtml5 size={ICON_SIZE} color={ICON_COLOR} className={styles.icon} title="HTML5"/>
        </div>

        <div className={styles.hexagon}>
          <FaCss3Alt size={ICON_SIZE} color={ICON_COLOR} className={styles.icon} title="CSS3"/>
        </div>

        <div className={styles.hexagon}>
          <FaSass size={ICON_SIZE} color={ICON_COLOR} className={styles.icon} title="Sass"/>
        </div>

        <div className={styles.hexagon}>
          <FaNodeJs size={ICON_SIZE} color={ICON_COLOR} className={styles.icon} title="NodeJs"/>
        </div>

        <div className={styles.hexagon}>
          <FaReact size={ICON_SIZE} color={ICON_COLOR} className={styles.icon} title="React"/>
        </div>

        <div className={styles.hexagon}>
          <SiRails size={ICON_SIZE} color={ICON_COLOR} className={styles.icon} title="Ruby on Rails"/>
        </div>

        <div className={styles.hexagon}>
          <FaDocker size={ICON_SIZE} color={ICON_COLOR} className={styles.icon} title="Docker"/>
        </div>

        <div className={styles.hexagon}>
          <SiAnsible size={ICON_SIZE} color={ICON_COLOR} className={styles.icon} title="Ansible"/>
        </div>

        <div className={styles.hexagon}>
          <FaLinux size={ICON_SIZE} color={ICON_COLOR} className={styles.icon} title="Linux"/>
        </div>

        <div className={styles.hexagon}>
          <SiElectron size={ICON_SIZE} color={ICON_COLOR} className={styles.icon} title="Electron"/>
        </div>
      </div>
    );
};

export default TechnologiesList;