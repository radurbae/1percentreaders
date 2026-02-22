"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Send, Loader2 } from "lucide-react";

const RichTextEditor = dynamic(() => import("@/components/rich-text-editor"), {
  ssr: false,
  loading: () => (
    <div className="rounded-xl border border-border p-8 text-center text-muted-foreground">
      Loading editor...
    </div>
  ),
});

export function SubmissionForm() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nickname: "",
    title: "",
    content_md: "",
    notes: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.nickname.trim() || !form.title.trim() || !form.content_md.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error();

      toast.success("Your writing has been submitted! A curator will review it shortly.");
      setForm({ nickname: "", title: "", content_md: "", notes: "" });
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="nickname">Nickname *</Label>
        <Input
          id="nickname"
          placeholder="Your pen name"
          value={form.nickname}
          onChange={(e) => setForm({ ...form, nickname: e.target.value })}
          maxLength={50}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Title *</Label>
        <Input
          id="title"
          placeholder="Title of your writing"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          maxLength={200}
        />
      </div>

      <div className="space-y-2">
        <Label>Content *</Label>
        <RichTextEditor
          content={form.content_md}
          onChange={(content) => setForm({ ...form, content_md: content })}
          placeholder="Write your reflection, essay, or book note here..."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes for the curator (optional)</Label>
        <Textarea
          id="notes"
          placeholder="Any special instructions or context for the curator..."
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          rows={3}
        />
      </div>

      <Button type="submit" disabled={loading} className="w-full sm:w-auto">
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Submit Writing
          </>
        )}
      </Button>
    </form>
  );
}
