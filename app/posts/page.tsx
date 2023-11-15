"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import PostsData from "@/data/posts.json";
import Image from "next/image";
import "./PostStyle.scss";

export interface PostType {
  title: string;
  author: string;
  date: string;
  header_image: string;
  preview_content: string;
  post_content: ContentItemType[];
  tags: string[];
}

export interface ContentItemType {
  type: string;
  class?: string;
  header?: string;
  header_type?: string;
  image_src?: string;
  image_alt?: string;
  image_class?: string;
  table_header?: string[];
  table_rows?: string[][];
  element_content?: string;
}

export default function page() {
  const [postContent, setPostContent] = useState("");
  const [currentPost, setCurrentPost] = useState<PostType>();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // const elementKeyMap = { paragraph: "<p></p>" };
  useEffect(() => {
    let index: string | null = searchParams.get("index");

    if (index && PostsData.posts[parseInt(index)]) {
      const selectedPost = PostsData.posts[parseInt(index)];
      setCurrentPost(selectedPost);
    }
  }, []);

  useEffect(() => {
    let tempString = "";
    if (currentPost) {
      for (const item of currentPost.post_content) {
        tempString += handleItemHtml(item);
      }
      setPostContent(tempString);
    }
  }, [currentPost]);

  function handleItemHtml(item: ContentItemType) {
    console.log("item: ", item);
    let tempString = "";
    if (item.header && item.header_type) {
      tempString += `<${item.header_type}>${item.header}</${item.header_type}>`;
    }

    if (item.type === "img") {
      tempString += `<img 
        class=${item.image_class}
        src=${item.image_src}
        alt=${item.image_alt}
      />`;
    }
    if (item.element_content) {
      tempString += `<${item.type}${item.class ? ` class=${item.class}` : ""}>${
        item.element_content
      }</${item.type}>`;
    }
    console.log("tempString2: ", tempString)
    return tempString;
  }
  if (currentPost) {
    return (
      <div className="post">
        <div className="post__container">
          <div className="post__header">
            <h1>{currentPost.title}</h1>
            <div className="post__header-info">
              <div>{currentPost.date}</div>
              <span>•</span>
              <div>{currentPost.author}</div>
            </div>
          </div>
          {currentPost.header_image ? (
            <div className="post__header-image">
              <Image
                fill={true}
                src={currentPost?.header_image}
                alt="Header image"
              />
            </div>
          ) : (
            ""
          )}
          {/* {currentPost.content.map((item, index) => (
            <></>
          ))} */}

          {/* <div className="post__content"> */}
          {/* <div
            className="post__content"
            dangerouslySetInnerHTML={{
              __html: index
                ? currentPost.content
                : "Loading...",
            }}
          /> */}
          <div
            className="post__content"
            dangerouslySetInnerHTML={{
              __html: postContent.length > 0 ? postContent : "Loading...",
            }}
          />

          {/* {index ? currentPost.content : "Loading..."} */}
          {/* </div> */}
        </div>
      </div>
    );
  }
}
