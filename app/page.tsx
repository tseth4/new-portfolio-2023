import Image from "next/image";
import "./HomeStyles.scss";
import Nav from "@/components/Nav/Nav";
import Splash from "@/components/Splash/Splash";

export default function Home() {
  return (
    <main className="home">
      <Nav />
      <div className="home__splash">
        <Splash/>
      </div>
      <div className="home__posts-feed">Posts</div>
      <div className="home__posts-about">Posts</div>
    </main>
  );
}
