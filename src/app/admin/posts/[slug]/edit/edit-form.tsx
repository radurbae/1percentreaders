"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PostData } from "@/lib/content";
import { Loader2, Save, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import RichTextEditor from "@/components/rich-text-editor";

export function EditPostForm({ post }: { post: PostData }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    type: post.type,
    author: post.author,
    tags: post.tags.join(", "),
    weekLabel: post.weekLabel || "",
    coverUrl: post.coverUrl || "",
    status: post.status,
  });

  async function handleSave(statusContext: "draft" | "published") {
    setLoading(true);
    try {
      const tagsArray = form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const res = await fetch(`/api/admin/posts/${post.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          tags: tagsArray,
          status: statusContext,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to update post");
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
    <div className="space-y-8 pb-10">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="e.g. The Power of Atomic Habits"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Post Type *</Label>
          <Select
            value={form.type}
            onValueChange={(value: any) => setForm({ ...form, type: value })}
          >
            <SelectTrigger id="type">
              <SelectValue placeholder="Select post type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rise_post">Rise Together (Member Post)</SelectItem>
              <SelectItem value="reflect_recap">Reflect Together (Session Recap)</SelectItem>
              <SelectItem value="digest">Reading List / Digest</SelectItem>
              <SelectItem value="announcement">Announcement</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="author">Author *</Label>
          <Input
            id="author"
            required
            value={form.author}
            onChange={(e) => setForm({ ...form, author: e.target.value })}
            placeholder="e.g. John Doe"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tags">Tags (comma separated)</Label>
          <Input
            id="tags"
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
            placeholder="e.g. habits, productivity, mindset"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Excerpt / Meta Description</Label>
        <textarea
          id="excerpt"
          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          value={form.excerpt}
          onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
          placeholder="A brief summary of the post..."
        />
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
          onClick={() => handleSave("draft")}
          disabled={loading}
          className="w-full sm:w-auto"
        >
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          Save as Draft
        </Button>
        <Button
          type="button"
          onClick={() => handleSave("published")}
          disabled={loading}
          className="w-full sm:w-auto"
        >
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Send className="mr-2 h-4 w-4" />
          )}
          {post.status === "published" ? "Update Published Post" : "Publish Now"}
        </Button>
      </div>
    </div>
  );
}
