"use client";

import { useState, use } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Save, Loader2, ArrowLeft, Trash2 } from "lucide-react";
import Link from "next/link";
import { PostType, SubmissionData } from "@/lib/content";

const RichTextEditor = dynamic(() => import("@/components/rich-text-editor"), {
  ssr: false,
  loading: () => (
    <div className="rounded-xl border border-border p-8 text-center text-muted-foreground">
      Loading editor...
    </div>
  ),
});

export default function ApproveSubmissionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const router = useRouter();
  
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [submissionData, setSubmissionData] = useState<SubmissionData | null>(null);
  
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

  // Fetch initial submission data
  useState(() => {
    fetch(`/api/admin/submissions/${slug}/preview`)
      .then(res => res.json())
      .then(data => {
        if (data.submission) {
          setSubmissionData(data.submission);
          setForm({
            ...form,
            title: data.submission.title,
            author: data.submission.nickname,
            content: data.submission.content,
            // A simple excerpt generator
            excerpt: data.submission.content.replace(/[#*`\n>]/g, " ").trim().slice(0, 160) + "...",
          });
        }
      })
      .catch(console.error);
  });

  async function handlePublish(e: React.FormEvent) {
    e.preventDefault();

    if (!form.title.trim() || !form.author.trim() || !form.content.trim() || !form.excerpt.trim()) {
      toast.error("Please fill in all required fields (Title, Author, Excerpt, Content).");
      return;
    }

    setLoading(true);
    try {
      const tagsArray = form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      // 1. Create the new post
      const resPost = await fetch("/api/admin/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          tags: tagsArray,
        }),
      });

      if (!resPost.ok) throw new Error("Failed to save post");
      const { slug: newSlug } = await resPost.json();

      // 2. Delete the pending submission
      const resDelete = await fetch(`/api/admin/submissions/${slug}`, {
        method: "DELETE",
      });

      if (!resDelete.ok) throw new Error("Failed to delete submission");

      toast.success("Submission approved and published!");
      router.push(`/rise/${newSlug}`);
    } catch {
      toast.error("Something went wrong processing the approval.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!window.confirm("Are you sure you want to permanently delete this submission?")) {
      return;
    }
    
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/submissions/${slug}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete submission");

      toast.success("Submission deleted.");
      router.push(`/admin/submissions`);
    } catch {
      toast.error("Failed to delete submission.");
    } finally {
      setDeleting(false);
    }
  }

  if (!submissionData) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        <Loader2 className="mx-auto h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl pb-12">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild className="-ml-2">
            <Link href="/admin/submissions">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Approve Submission</h1>
        </div>
        <Button variant="destructive" size="sm" onClick={handleDelete} disabled={deleting || loading}>
          {deleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash2 className="mr-2 h-4 w-4" />}
          Reject & Delete
        </Button>
      </div>

      {submissionData.notes && (
        <div className="mb-8 rounded-xl border border-blue-500/20 bg-blue-500/10 p-4 text-blue-700 dark:text-blue-300">
          <h3 className="mb-1 text-sm font-semibold">Curator Notes from Author:</h3>
          <p className="text-sm">{submissionData.notes}</p>
        </div>
      )}

      <form onSubmit={handlePublish} className="space-y-8">
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

        <div className="space-y-2">
          <Label>Content *</Label>
          {/* We only render the editor after submissionData is loaded so initial content sets correctly */}
          {submissionData && (
            <RichTextEditor
              content={form.content}
              onChange={(content) => setForm({ ...form, content })}
              placeholder="Edit the submission here..."
            />
          )}
        </div>

        <div className="flex items-center justify-end gap-3">
          <Button variant="outline" type="button" asChild>
            <Link href="/admin/submissions">Cancel</Link>
          </Button>
          <Button type="submit" disabled={loading || deleting}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Approving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Approve & Publish Post
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
