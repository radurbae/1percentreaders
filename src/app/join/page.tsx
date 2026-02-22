import { MessageCircle, Instagram, ArrowRight, Users, BookOpen, PenTool } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join Community",
  description: "Join the 1% Readers community and start your journey of intentional reading.",
};

export default function JoinPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Join 1% Readers</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          Become part of a community that reads intentionally, reflects deeply, and grows together.
        </p>
      </div>

      {/* Benefits */}
      <div className="mb-12 grid gap-6 sm:grid-cols-3">
        <div className="rounded-xl border border-border/50 p-6 text-center">
          <BookOpen className="mx-auto mb-3 h-8 w-8 text-primary" />
          <h3 className="mb-2 font-semibold">Shared Reading</h3>
          <p className="text-sm text-muted-foreground">
            Read curated books together and join weekly discussions.
          </p>
        </div>
        <div className="rounded-xl border border-border/50 p-6 text-center">
          <PenTool className="mx-auto mb-3 h-8 w-8 text-primary" />
          <h3 className="mb-2 font-semibold">Publish Writing</h3>
          <p className="text-sm text-muted-foreground">
            Share your reflections, essays, and book notes with the community.
          </p>
        </div>
        <div className="rounded-xl border border-border/50 p-6 text-center">
          <Users className="mx-auto mb-3 h-8 w-8 text-primary" />
          <h3 className="mb-2 font-semibold">Grow Together</h3>
          <p className="text-sm text-muted-foreground">
            Connect with like-minded readers and thinkers from everywhere.
          </p>
        </div>
      </div>

      {/* Join Options */}
      <div className="space-y-4">
        <h2 className="text-center text-2xl font-bold tracking-tight">Connect With Us</h2>
        <p className="text-center text-muted-foreground mb-8">
          Choose your preferred platform to join the community.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <a
            href="https://wa.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-xl border border-border/50 p-6 transition-all hover:border-border hover:shadow-md"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-100 dark:bg-green-900/30">
              <MessageCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">WhatsApp Group</h3>
              <p className="text-sm text-muted-foreground">Join our active reading group</p>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
          </a>

          <a
            href="https://instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-xl border border-border/50 p-6 transition-all hover:border-border hover:shadow-md"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-pink-100 dark:bg-pink-900/30">
              <Instagram className="h-6 w-6 text-pink-600 dark:text-pink-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">Instagram</h3>
              <p className="text-sm text-muted-foreground">Follow for updates and quotes</p>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
          </a>
        </div>
      </div>

      {/* Already a member */}
      <div className="mt-12 rounded-xl border border-border/50 bg-muted/20 p-8 text-center">
        <h3 className="mb-2 font-semibold">Already a member?</h3>
        <p className="mb-4 text-sm text-muted-foreground">
          Share your thoughts and writings with the community.
        </p>
        <Button asChild variant="outline">
          <Link href="/submit">Submit Your Writing</Link>
        </Button>
      </div>
    </div>
  );
}
