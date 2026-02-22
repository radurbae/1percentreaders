import { getAllPosts } from "@/lib/content";
import { ArrowLeft, Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import { PostsTable } from "./posts-table";

export const metadata: Metadata = {
  title: "Manage Posts - Admin Dashboard",
};

export default function ManagePostsPage() {
  // Pass includeDrafts = true to get EVERYTHING
  const posts = getAllPosts(true);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Button variant="ghost" size="icon" asChild className="-ml-2">
              <Link href="/admin">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-2xl font-bold tracking-tight">Manage Posts</h1>
          </div>
          <p className="text-muted-foreground ml-10">
            View, edit, or delete all your articles across the platform.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/posts/new">
            <Plus className="mr-2 h-4 w-4" /> New Post
          </Link>
        </Button>
      </div>

      <div className="rounded-md border bg-card">
        <PostsTable initialPosts={posts} />
      </div>
    </div>
  );
}
