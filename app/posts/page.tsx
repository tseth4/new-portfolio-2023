"use client";
import { usePathname, useSearchParams } from "next/navigation";
import PostsData from "@/data/posts.json";

export default function page() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  let index: string | null = searchParams.get('index');

  return (
    <div>
      <div>pathname: {pathname}</div>
      <div>{index ? PostsData.posts[parseInt(index)].title : "nothing"}</div>
      <div>searchParams: {searchParams.get('index')}</div>
    </div>
  );
}
