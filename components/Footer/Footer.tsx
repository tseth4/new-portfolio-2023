import "./FooterStyles.scss";
import AboutData from "@/data/about-data.json";
import SocialIcons from "../About/SocialIcons";
import Link from "next/link";
import { stringToWordSpan } from "@/lib/stringToWordSpan";
export default function Footer() {
  let myMark = stringToWordSpan("Designed and Developed by Tristan Setha");
  return (
    <div className="footer">
      <div dangerouslySetInnerHTML={{ __html: myMark }} />
      <div className="footer__social-links">
        {AboutData.about.social_data.map((item, index) => (
          <div
            className={"footer__" + item.name + " footer__social-icon"}
            key={index}
          >
            <Link href={item.href}>
              {/* <Image
                src={item.src}
                width={item.size.width}
                height={item.size.height}
                alt={item.alt}
              /> */}
              <SocialIcons title={item.alt} color="var(--primary-icon-color)" name={item.name} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
