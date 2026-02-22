import { BookOpen, Heart, Target, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about 1% Readers — a virtual reading & reflective thinking community.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">About 1% Readers</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          We are a virtual community of readers and reflective thinkers, dedicated to growing 1% every day through the power of intentional reading.
        </p>
      </div>

      {/* Manifesto */}
      <div className="mb-12 space-y-6">
        <div className="rounded-xl border border-border/50 bg-muted/20 p-8">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Target className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">Our Mission</h2>
          </div>
          <p className="leading-relaxed text-muted-foreground">
            To create a space where reading becomes a shared journey — where every book sparks conversation, every reflection builds wisdom, and every member rises together. We believe that small, consistent growth compounds into extraordinary transformation.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-xl border border-border/50 p-6">
            <BookOpen className="mb-3 h-6 w-6 text-primary" />
            <h3 className="mb-2 font-semibold">Read Together</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              We pick books as a community and read them together, creating shared context for deeper conversations and understanding.
            </p>
          </div>

          <div className="rounded-xl border border-border/50 p-6">
            <Sparkles className="mb-3 h-6 w-6 text-primary" />
            <h3 className="mb-2 font-semibold">Reflect Together</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Every week, we pause to reflect on what we&apos;ve read — turning raw information into insights and actionable wisdom.
            </p>
          </div>

          <div className="rounded-xl border border-border/50 p-6">
            <Heart className="mb-3 h-6 w-6 text-primary" />
            <h3 className="mb-2 font-semibold">Rise Together</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Members share their writings, reflections, and takeaways with the community, inspiring each other to grow 1% every day.
            </p>
          </div>

          <div className="rounded-xl border border-border/50 p-6">
            <Users className="mb-3 h-6 w-6 text-primary" />
            <h3 className="mb-2 font-semibold">Community First</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              We are a supportive, judgment-free community. Every voice matters, whether you&apos;re a seasoned reader or just starting your journey.
            </p>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="mb-12">
        <h2 className="mb-6 text-2xl font-bold tracking-tight">What We Believe</h2>
        <div className="space-y-4">
          {[
            "Reading is a superpower — and it's even more powerful when shared.",
            "Reflection turns knowledge into wisdom.",
            "Small, daily improvements compound into massive growth.",
            "Everyone has a unique perspective worth sharing.",
            "The best communities are built on generosity, curiosity, and respect.",
          ].map((value, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                {i + 1}
              </span>
              <p className="text-muted-foreground leading-relaxed">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="rounded-xl border border-border/50 bg-muted/20 p-8 text-center">
        <h2 className="mb-2 text-xl font-semibold">Ready to join us?</h2>
        <p className="mb-6 text-muted-foreground">
          Start your journey of intentional reading and reflective thinking.
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild>
            <Link href="/join">Join Community</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/submit">Submit Writing</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
