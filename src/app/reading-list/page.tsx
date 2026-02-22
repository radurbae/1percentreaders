import { PostCard } from "@/components/post-card";
import { getPostsByType } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reading List",
  description: "Curated reading digests and recommendations from the 1% Readers community.",
};

export default function ReadingListPage() {
  const posts = getPostsByType("digest");

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Reading List</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Curated digests and reading recommendations from our community.
        </p>
      </div>

      {posts.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-border p-16 text-center">
          <p className="text-muted-foreground">
            No reading digests yet. Check back soon!
          </p>
        </div>
      )}
    </div>
  );
}
