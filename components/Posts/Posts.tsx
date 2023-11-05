// import React from "react";
import PostsData from "@/data/posts.json";
import Link from 'next/link'

import "./PostsStyles.scss";

export default function Posts() {
  return (
    <div className="posts">
      {PostsData.posts.map((post, index) => (
        <div className="posts__card" key={index}>
          <div className="posts__card-title">{post.title}</div>
          <div className="posts__card-content">{post.content}</div>
          <div className="posts__card-date-container">
            <div className="posts__card-date">{post.date}</div>
            <span>•</span>
            <div className="posts__card-readmore"><Link href={"/posts/?index=" + index}>Read More</Link></div>
          </div>
        </div>
      ))}
    </div>
  );
}
