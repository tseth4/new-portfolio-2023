// import React from 'react'
import "./AboutStyles.scss";
import Image from "next/image";
import AboutData from "@/data/about-data.json";
import SocialIcons from "./SocialIcons";
import Link from "next/link";
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
        <div dangerouslySetInnerHTML={{ __html: AboutData.about.paragraph }}/>
        {/* <p>{AboutData.about.paragraph}</p> */}
        <div className="about__social-links">
          {AboutData.about.social_data.map((item, index) => (
            <div key={index}>
              <Link href={item.href}>
                <SocialIcons
                  color="var(--primary-text-color)"
                  name={item.name}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
