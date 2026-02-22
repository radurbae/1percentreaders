"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PostData } from "@/lib/content";
import { Edit, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { StatusBadge } from "@/components/status-badge";

export function PostsTable({ initialPosts }: { initialPosts: PostData[] }) {
  const [posts, setPosts] = useState<PostData[]>(initialPosts);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const router = useRouter();

  if (posts.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
        <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
          <h2 className="mt-6 text-xl font-semibold">No posts created</h2>
          <p className="mb-8 mt-2 text-center text-sm font-normal leading-6 text-muted-foreground">
            You don't have any posts yet. Start writing one.
          </p>
          <Button asChild>
            <Link href="/admin/posts/new">Create Post</Link>
          </Button>
        </div>
      </div>
    );
  }

  async function handleDelete(slug: string, title: string) {
    if (!window.confirm(`Are you sure you want to delete "${title}"? This cannot be undone.`)) {
      return;
    }

    setDeletingId(slug);
    try {
      const res = await fetch(`/api/admin/posts/${slug}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete post.");
      }

      toast.success("Post deleted successfully");
      setPosts(posts.filter((p) => p.slug !== slug));
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while deleting the post.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="relative w-full overflow-auto">
      <table className="w-full caption-bottom text-sm max-w-full">
        <thead className="[&_tr]:border-b bg-muted/50">
          <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Title</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground hidden md:table-cell">Type</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground hidden sm:table-cell">Date</th>
            <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
          </tr>
        </thead>
        <tbody className="[&_tr:last-child]:border-0">
          {posts.map((post) => (
            <tr key={post.slug} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
              <td className="p-4 align-middle font-medium max-w-[200px] sm:max-w-[400px] truncate">
                <Link href={`/rise/${post.slug}`} target="_blank" className="hover:underline">
                  {post.title}
                </Link>
              </td>
              <td className="p-4 align-middle text-muted-foreground hidden md:table-cell">
                {post.type.replace("_", " ")}
              </td>
              <td className="p-4 align-middle">
                {post.status === "draft" ? (
                  <StatusBadge status="pending" /> // we can reuse pending's amber look for drafts
                ) : (
                  <StatusBadge status="published" />
                )}
              </td>
              <td className="p-4 align-middle text-muted-foreground hidden sm:table-cell">
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "short", day: "numeric", year: "numeric",
                })}
              </td>
              <td className="p-4 align-middle text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button variant="outline" size="icon" asChild>
                    <Link href={`/admin/posts/${post.slug}/edit`}>
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Link>
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    disabled={deletingId === post.slug}
                    onClick={() => handleDelete(post.slug, post.title)}
                  >
                    {deletingId === post.slug ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
