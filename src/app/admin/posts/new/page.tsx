"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Save, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { PostType } from "@/lib/content";

const RichTextEditor = dynamic(() => import("@/components/rich-text-editor"), {
  ssr: false,
  loading: () => (
    <div className="rounded-xl border border-border p-8 text-center text-muted-foreground">
      Loading editor...
    </div>
  ),
});

export default function NewPostPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    author: "",
    type: "rise_post" as PostType,
    weekLabel: "",
    tags: "",
    coverUrl: "",
    excerpt: "",
    content: "",
  });

  async function handlePublish(statusContext: "draft" | "published") {
    setLoading(true);
    try {
      const tagsArray = form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const res = await fetch("/api/admin/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          tags: tagsArray,
          status: statusContext,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create post");
      }

      toast.success(
        statusContext === "published"
          ? "Post published successfully!"
          : "Draft saved successfully!"
      );
      router.push("/admin/posts");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center gap-4 border-b pb-4">
        <Button variant="ghost" size="icon" asChild className="-ml-2">
          <Link href="/admin">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">Create New Post</h1>
      </div>

      <div className="space-y-8 pb-10">
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                placeholder="Post title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Post Type *</Label>
              <select
                id="type"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value as PostType })}
              >
                <option value="rise_post">Rise Together (Member Posts)</option>
                <option value="reflect_recap">Reflect Recap (Weekly Reflections)</option>
                <option value="digest">Reading Digest</option>
                <option value="announcement">Announcement</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="author">Author *</Label>
              <Input
                id="author"
                placeholder="Pen name or your name"
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="weekLabel">Week Label (Optional)</Label>
              <Input
                id="weekLabel"
                placeholder="e.g. Week 4"
                value={form.weekLabel}
                onChange={(e) => setForm({ ...form, weekLabel: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <Input
                id="tags"
                placeholder="Reflection, Book Notes, Habit"
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
              />
            </div>
            
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="coverUrl">Cover Image URL (Optional)</Label>
              <Input
                id="coverUrl"
                placeholder="https://example.com/image.jpg"
                value={form.coverUrl}
                onChange={(e) => setForm({ ...form, coverUrl: e.target.value })}
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="excerpt">Excerpt / Subtitle *</Label>
              <Textarea
                id="excerpt"
                placeholder="A brief summary for the card view..."
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                rows={2}
              />
            </div>
          </div>
        </div>

        <div className="space-y-2 flex-grow flex flex-col">
          <Label className="mb-2">Content *</Label>
          <div className="flex-grow rounded-md border min-h-[500px]">
            <RichTextEditor
              content={form.content}
              onChange={(content) => setForm({ ...form, content })}
              placeholder="Write your article here..."
            />
          </div>
        </div>

        <div className="flex items-center gap-4 pt-4 border-t">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => handlePublish("draft")} 
            disabled={loading}
            className="w-full sm:w-auto"
          >
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Save as Draft
          </Button>
          <Button 
            type="button" 
            onClick={() => handlePublish("published")} 
            disabled={loading}
            className="w-full sm:w-auto"
          >
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Publish Post
          </Button>
        </div>
      </div>
    </div>
  );
}
