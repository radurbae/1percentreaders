import { getPostBySlug } from "@/lib/content";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { EditPostForm } from "./edit-form";

export const metadata: Metadata = {
  title: "Edit Post - Admin Dashboard",
};

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center gap-4 border-b pb-4">
        <Button variant="ghost" size="icon" asChild className="-ml-2">
          <Link href="/admin/posts">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">Edit Post</h1>
      </div>

      <EditPostForm post={post} />
    </div>
  );
}
