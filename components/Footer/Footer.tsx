// import React from 'react'
import "./FooterStyles.scss";
import AboutData from "@/data/about-data.json";
import SocialIcons from "../About/SocialIcons";
import Link from "next/link";
export default function Footer() {
  return (
    <div className="footer">
      <div className="footer__social-links">
        {AboutData.about.social_data.map((item, index) => (
          <div className={"footer__" + item.name + " footer__social-icon"} key={index}>
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
  );
}
