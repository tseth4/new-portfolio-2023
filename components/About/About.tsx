// import React from 'react'
import "./AboutStyles.scss";
import Image from "next/image";
import AboutData from "@/data/about-data.json";
export default function About() {
  return (
    <div className="about">
      <div className="about__profile-picture">
        <Image
          width={200}
          height={200}
          className="about__profile-picture-img"
          src="/pp_v6.jpg"
          alt="ppv5"
        />
      </div>
      <div className="about__info">
        <h1>{AboutData.about.h1}</h1>
        <p>{AboutData.about.paragraph}</p>
        <div className="about__social-links">
          {AboutData.about.social_data.map((item, index) => (
            <div key={index}>
              <Image
                width={item.size.width}
                height={item.size.height}
                className={item.class}
                src={item.src}
                alt={item.alt}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
