// import React from 'react'
import "./AboutStyles.scss";
import Image from "next/image";
export default function About() {
  return (
    <div className="about">
      <div className="about__profile-picture">
        <Image
          width={200}
          height={200}
          className="about__profile-picture-img"
          src="/pp_v5.jpg"
          alt="ppv5"
        />
      </div>
      <h1>Hey, I’m Tristan,</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore
      </p>
      <div className="about__social-links">
        <div>LN</div>
        <div>CP</div>
        <div>GH</div>
        <div>CV</div>
      </div>
    </div>
  );
}
