import { PostCard } from "@/components/post-card";
import { getPostsByType } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reflect Together",
  description: "Weekly reflection recaps from our community reading sessions.",
};

export default function ReflectPage() {
  const posts = getPostsByType("reflect_recap");

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Reflect Together</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Weekly reflection recaps — turning reading into wisdom, together.
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
            No reflections yet. Stay tuned for weekly recaps!
          </p>
        </div>
      )}
    </div>
  );
}
