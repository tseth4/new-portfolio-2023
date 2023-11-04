import Image from "next/image";
import "./HomeStyles.scss";
import Nav from "@/components/Nav/Nav";
import Splash from "@/components/Splash/Splash";

export default function Home() {
  return (
    <main className="home">
      <Nav />
      <div id="home" className="home__splash">
        <Splash/>
      </div>
      <div id="posts" className="home__posts-feed">Posts</div>
      <div id="about" className="home__posts-about">About</div>
    </main>
  );
}
