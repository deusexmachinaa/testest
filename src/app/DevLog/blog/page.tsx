"use client"
import DevLogPostList from '@/components/DevLogPostList';
import { compareDesc } from "date-fns";
import { allPosts } from 'contentlayer/generated';


export default function Blog() {
  const posts = allPosts.sort((a, b) =>
  compareDesc(new Date(a.date), new Date(b.date))
  );
  return (
    <>
      <section className="mt-12 mb-10">
        <h1 className="font-bold text-2xl sm:text-4xl font-mono">📝 Blog</h1>
      </section>
      <DevLogPostList posts={posts} />
    </>
  );
}