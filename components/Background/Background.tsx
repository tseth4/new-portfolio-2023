import React from "react";
import "./BackgroundStyles.scss";
import Image from "next/image";
interface BackgroundTypes {
  theme: string;
}
export default function Background(props: BackgroundTypes) {
  const { theme } = props;

  return (
    <div className="background">
      {theme === "atmosphere" ? (
        <div>
          <div className="background__atmosphere">
            <Image
              priority
              fill={true}
              // width={100}
              // height={100}
              // style={{objectFit: "cover"}}
              // src={"/mybackground2.png"}
              src={"/atmosphere.png"}
              alt="Background image"
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
