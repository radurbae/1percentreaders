import { Suspense } from "react";
import { PostCard } from "@/components/post-card";
import { TagFilter } from "@/components/tag-filter";
import { SearchBar } from "@/components/search-bar";
import { getPostsByType, getAllTags } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rise Together",
  description: "Explore writings from our community members — essays, reflections, and book notes.",
};

interface PageProps {
  searchParams: Promise<{ q?: string; tag?: string }>;
}

export default async function RisePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const q = params.q || "";
  const tag = params.tag || "";

  const allTags = getAllTags();
  let posts = getPostsByType("rise_post");

  // Filter by search query
  if (q) {
    const query = q.toLowerCase();
    posts = posts.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.excerpt.toLowerCase().includes(query)
    );
  }

  // Filter by tag
  if (tag) {
    posts = posts.filter((p) => p.tags.includes(tag));
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Rise Together</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Explore writings from our community — essays, reflections, and book notes.
        </p>
      </div>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Suspense>
          <TagFilter tags={allTags} />
        </Suspense>
        <div className="w-full sm:max-w-xs">
          <Suspense>
            <SearchBar />
          </Suspense>
        </div>
      </div>

      {posts.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-border p-16 text-center">
          <p className="text-muted-foreground">No posts found. Check back later!</p>
        </div>
      )}
    </div>
  );
}
