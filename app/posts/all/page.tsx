"use client";
import Posts from "@/components/Posts/Posts";
import { usePathname } from "next/navigation";

export default function page() {
  const pathname = usePathname();
  // console.log("posts all pathname: ", pathname);

  return (
    <div className="posts-all">
      <div className="posts-all__container">
        <div className="posts-all__title">POSTS</div>
        <Posts posts="all" pathname={pathname} />
      </div>
    </div>
  );
}
