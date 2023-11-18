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
  image_src?: string | string[];
  image_caption?: string | string[];
  image_alt?: string | string[];
  image_class?: string | string[];
  image_container_class?: string;
  image_container?: boolean;
  table_header?: string[];
  table_rows?: string[][];
  table_class?: string;
  element_content?: string;
}

export default function page() {
  const [postContent, setPostContent] = useState("");
  const [currentPost, setCurrentPost] = useState<PostType>();
  const pathname = usePathname();
  const searchParams = useSearchParams();

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

  function handleItemHtml(item: ContentItemType): string {
    let tempString = "";
    if (item.header && item.header_type) {
      tempString += `<${item.header_type}>${item.header}</${item.header_type}>`;
    }

    if (item.type === "table") {
      if (item.table_header && item.table_rows) {
        tempString += `
        <${item.type} class=${item.class}>
          <thead>
            <tr>
              ${item.table_header
                .map((item, index) => `<th key=${index}>${item}</th>`)
                .join("")}
            </tr>
          </thead>
          <tbody>
              ${item.table_rows
                .map(
                  (item, index) =>
                    `<tr key=${index}>
                  ${item.map((str, i) => `<td key=${i}>${str}</td>`).join("")}
                </tr>`
                )
                .join("")}
          </tbody>
        </${item.type}>  
      `;
      }
    }

    if (item.type === "img") {
      if (
        item.image_container &&
        Array.isArray(item.image_src) &&
        Array.isArray(item.image_caption) &&
        Array.isArray(item.image_alt)
      ) {
        tempString += `
        <div class="${`post__content-img-container ${item.image_container_class}`}">
          ${item.image_src.map(
            (src, index) =>
              `<div class="${
                item.image_class
                  ? `post__content-img ` + item.image_class[index]
                  : "post__content-img"
              }"><image key=${index} src=${src} alt="${
                item.image_alt ? item.image_alt[index] : "undefined"
              }"/></div>
            ${
              item.image_caption
                ? `<div class="${item.image_class ? item.image_class[index] + "-caption post__content-caption" : ""}">${
                    item.image_caption[index]
                  }</div>
            `
                : ""
            }`
          ).join("")}
        </div>
`;
      } else {
        tempString += `
        <img 
        src=${item.image_src}
        alt=${item.image_alt}
        class=${item.image_class}
        />
        `;
      }
    }
    if (item.element_content && item.type !== "table") {
      tempString += `<${item.type}${item.class ? ` class=${item.class}` : ""}>${
        item.element_content
      }</${item.type}>`;
    }
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
          <div
            className="post__content"
            dangerouslySetInnerHTML={{
              __html: postContent.length > 0 ? postContent : "Loading...",
            }}
          />
        </div>
      </div>
    );
  }
}
