"use client";
import Posts from "@/components/Posts/Posts";
import { usePathname } from "next/navigation";
import "./PostsAllStyles.scss";

export default function Page() {
  const pathname = usePathname();

  return (
    <div className="posts-all">
      <div className="posts-all__container">
        {/* <div className="posts-all__title">Posts</div> */}
        <Posts posts="all" pathname={pathname} />
      </div>
    </div>
  );
}
