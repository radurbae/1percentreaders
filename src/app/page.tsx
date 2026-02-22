import Link from "next/link";
import { ArrowRight, BookOpen, Users, PenTool, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PostCard } from "@/components/post-card";
import { getAllPosts } from "@/lib/content";

export default function HomePage() {
  const latestPosts = getAllPosts().slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
        <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32 lg:py-40">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/50 px-4 py-1.5 text-sm text-muted-foreground">
              <BookOpen className="h-4 w-4" />
              <span>A Virtual Reading Community</span>
            </div>
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Read, Reflect,{" "}
              <span className="bg-gradient-to-r from-primary/80 to-primary bg-clip-text text-transparent">
                Rise 1%
              </span>
            </h1>
            <p className="mb-10 text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Join a community of mindful readers and reflective thinkers. We read together,
              share our insights, and grow 1% every day through the power of words.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="text-base">
                <Link href="/rise">
                  Explore Writings
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base">
                <Link href="/join">Join Community</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-y border-border/40 bg-muted/20">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="grid gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold">Read Together</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                We pick books, read intentionally, and share our takeaways with the community.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Lightbulb className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold">Reflect Together</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Every week, we pause to reflect — turning raw reading into real wisdom.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold">Rise Together</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Members publish their writings and grow together, rising 1% at a time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Posts */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Latest Writings</h2>
            <p className="mt-2 text-muted-foreground">Fresh perspectives from our community members</p>
          </div>
          <Button asChild variant="ghost" className="hidden sm:flex">
            <Link href="/rise">
              View all
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {latestPosts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-border p-16 text-center">
            <PenTool className="mx-auto mb-4 h-8 w-8 text-muted-foreground/50" />
            <h3 className="mb-2 font-semibold text-muted-foreground">No posts yet</h3>
            <p className="mb-6 text-sm text-muted-foreground/70">
              Be the first to share your writing with the community.
            </p>
            <Button asChild variant="outline">
              <Link href="/submit">Submit Your Writing</Link>
            </Button>
          </div>
        )}

        <div className="mt-8 text-center sm:hidden">
          <Button asChild variant="outline">
            <Link href="/rise">
              View all writings
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border/40 bg-muted/20">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl">
              Have something to share?
            </h2>
            <p className="mb-8 text-muted-foreground">
              Submit your reflection, book note, or essay. Our curators will review and publish it.
            </p>
            <Button asChild size="lg">
              <Link href="/submit">
                <PenTool className="mr-2 h-4 w-4" />
                Submit Writing
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
