import React from "react";
import Posts from "@/components/Posts/Posts";

export default function page() {
  return (
    <div className="posts-all">
      <div className="posts-all__title"> Posts</div>
      <Posts posts="all" />
    </div>
  );
}
