"use client";
import { usePathname, useSearchParams } from "next/navigation";
import PostsData from "@/data/posts.json";
import "./PostStyle.scss";

export default function page() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  let index: string | null = searchParams.get("index");

  return (
    <div className="post">
      <div className="post__container">
        <div className="post__header">
          <h1>
            {index ? PostsData.posts[parseInt(index)].title : "Loading..."}
          </h1>
          <div className="post__header-info">
            <div>
              {index ? PostsData.posts[parseInt(index)].date : "Loading..."}
            </div>
            <div>
              {index ? PostsData.posts[parseInt(index)].author : "Loading..."}
            </div>
          </div>
        </div>

        <div className="post__content">
          {index ? PostsData.posts[parseInt(index)].content : "Loading..."}
        </div>
      </div>
    </div>
  );
}
