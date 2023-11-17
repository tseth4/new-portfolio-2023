import PostsData from "@/data/posts.json";
import Link from "next/link";

import "./PostsStyles.scss";

interface PostProps {
  posts: "all" | number;
  pathname?: string;
}

export default function Posts({ posts, pathname }: PostProps) {
  // console.log("postsy pathname: ", pathname);

  let posts_length: number = posts === "all" ? PostsData.posts.length : posts;
  return (
    <div className="posts">
      {PostsData.posts.slice(0, posts_length).map((post, index) => (
        <div className="posts__card" key={index}>
          <div className="posts__card-title">{post.title}</div>
          <div className="posts__card-content">{post.preview_content}</div>
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
          <Link href="/posts/all">all posts</Link>
        </div>
      ) : (
        <div className="posts__all">
          <Link href="/">{"<<"} HOME</Link>
        </div>
      )}
    </div>
  );
}
