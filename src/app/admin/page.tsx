import { getAllPosts, getAllSubmissions } from "@/lib/content";
import { FileText, Inbox, Users, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

export default function AdminDashboard() {
  const posts = getAllPosts();
  const submissions = getAllSubmissions();
  const pendingSubmissions = submissions.filter((s) => s.status === "pending");
  const uniqueAuthors = new Set(posts.map((p) => p.author));

  const cards = [
    { label: "Total Posts", value: posts.length, icon: FileText, color: "text-blue-500" },
    { label: "Published", value: posts.length, icon: TrendingUp, color: "text-emerald-500" },
    { label: "Pending Submissions", value: pendingSubmissions.length, icon: Inbox, color: "text-amber-500" },
    { label: "Authors", value: uniqueAuthors.size, icon: Users, color: "text-purple-500" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">Overview of your community platform.</p>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="rounded-xl border border-border/50 p-6">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{label}</span>
              <Icon className={`h-4 w-4 ${color}`} />
            </div>
            <p className="text-3xl font-bold">{value}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border/50 p-6">
          <h3 className="mb-2 font-semibold">Review Submissions</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            {pendingSubmissions.length > 0
              ? `You have ${pendingSubmissions.length} pending submission(s) to review.`
              : "No pending submissions."}
          </p>
          <Button asChild variant="outline" size="sm">
            <Link href="/admin/submissions">View Submissions</Link>
          </Button>
        </div>
        <div className="rounded-xl border border-border/50 p-6">
          <h3 className="mb-2 font-semibold">Create Post</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Create a new post by adding a markdown file to the content/posts directory.
          </p>
          <Button asChild size="sm">
            <Link href="/admin/posts/new">New Post</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
