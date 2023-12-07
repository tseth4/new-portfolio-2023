import PostsData from "@/data/posts.json";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

import "./PostsStyles.scss";

interface PostProps {
  numberOfPosts: "all" | number;
}

export default function Posts({ numberOfPosts }: PostProps) {
  const pathname = usePathname();
  let posts_length: number =
    numberOfPosts === "all" ? PostsData.posts.length : numberOfPosts;
  return (
    <div className="posts">
      {PostsData.posts.slice(0, posts_length).map((post, index) => (
        <div
          data-page={pathname === "/" ? "home" : "all"}
          className="posts__card"
          key={index}
        >
          <div className="posts__card-preview-img">
            <Image fill={true} src={post?.preview_image} alt="Preview image" />
          </div>
          <div className="posts__card-title">{post.title}</div>
          <div className="posts__card-content">
            {post.preview_content.split(" ").slice(0, 10).join(" ")}
          </div>
          <div className="posts__card-date-container">
            <div className="posts__card-date">{post.date}</div>
            <span>•</span>
            <div className="posts__card-readmore">
              <Link href={"/posts/?index=" + index}>Read More</Link>
            </div>
          </div>
        </div>
      ))}
      {pathname != "/posts/all" ? (
        <div className="posts__all">
          <Link href="/posts/all">POSTS</Link>
          <div className="posts__all-arrow"></div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
