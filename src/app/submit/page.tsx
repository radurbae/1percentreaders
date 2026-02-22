import { SubmissionForm } from "@/components/submission-form";
import { PenTool, CheckCircle, Clock, Shield } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Submit Writing",
  description: "Submit your reflection, essay, or book note to the 1% Readers community.",
};

export default function SubmitPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Submit Your Writing</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Share your reflection, essay, or book note with the community.
        </p>
      </div>

      {/* Guidelines */}
      <div className="mb-10 grid gap-4 sm:grid-cols-3">
        <div className="flex items-start gap-3 rounded-lg border border-border/50 p-4">
          <PenTool className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <div>
            <h3 className="text-sm font-semibold">Write freely</h3>
            <p className="text-xs text-muted-foreground">Markdown is supported. Write naturally.</p>
          </div>
        </div>
        <div className="flex items-start gap-3 rounded-lg border border-border/50 p-4">
          <Shield className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <div>
            <h3 className="text-sm font-semibold">Use a nickname</h3>
            <p className="text-xs text-muted-foreground">Your pen name will be displayed, not your real name.</p>
          </div>
        </div>
        <div className="flex items-start gap-3 rounded-lg border border-border/50 p-4">
          <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <div>
            <h3 className="text-sm font-semibold">Curator review</h3>
            <p className="text-xs text-muted-foreground">A curator will review before publishing.</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="rounded-xl border border-border/50 p-6 sm:p-8">
        <SubmissionForm />
      </div>

      {/* Process */}
      <div className="mt-10">
        <h2 className="mb-4 text-lg font-semibold">How it works</h2>
        <div className="space-y-3">
          {[
            { icon: PenTool, text: "Submit your writing using the form above" },
            { icon: Clock, text: "A curator reviews your submission" },
            { icon: CheckCircle, text: "Once approved, your writing is published to the library" },
          ].map(({ icon: Icon, text }, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                {i + 1}
              </span>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon className="h-4 w-4" />
                {text}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
