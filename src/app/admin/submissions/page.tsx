import { getAllSubmissions } from "@/lib/content";
import { StatusBadge } from "@/components/status-badge";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Submissions",
};

export default function SubmissionsPage() {
  const submissions = getAllSubmissions();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Submissions</h1>
        <p className="mt-1 text-muted-foreground">
          Review community submissions. To approve, edit the markdown file&apos;s <code className="rounded bg-muted px-1.5 py-0.5 text-xs">status</code> field.
        </p>
      </div>

      {submissions.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-16 text-center">
          <p className="text-muted-foreground">No submissions yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Table */}
          <div className="overflow-hidden rounded-xl border border-border/50">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50 bg-muted/30 text-left">
                  <th className="px-4 py-3 font-medium">Nickname</th>
                  <th className="px-4 py-3 font-medium">Title</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((sub) => (
                  <tr key={sub.slug} className="border-b border-border/30 last:border-0">
                    <td className="px-4 py-3 font-medium">{sub.nickname}</td>
                    <td className="px-4 py-3 max-w-[200px] truncate">{sub.title}</td>
                    <td className="px-4 py-3"><StatusBadge status={sub.status} /></td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {new Date(sub.date).toLocaleDateString("en-US", {
                        month: "short", day: "numeric", year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {sub.status === "pending" && (
                        <a
                          href={`/admin/submissions/${sub.slug}/approve`}
                          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 px-3"
                        >
                          Review & Publish
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Previews */}
          <h2 className="text-lg font-semibold">Previews</h2>
          {submissions.map((sub) => (
            <div key={sub.slug} className="rounded-xl border border-border/50 p-6">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{sub.title}</h3>
                  <p className="text-sm text-muted-foreground">by {sub.nickname}</p>
                </div>
                <StatusBadge status={sub.status} />
              </div>
              {sub.notes && (
                <div className="mb-4 rounded-lg bg-muted/50 p-3">
                  <p className="text-xs font-medium text-muted-foreground mb-1">Curator Notes:</p>
                  <p className="text-sm">{sub.notes}</p>
                </div>
              )}
              <div className="border-t border-border pt-4">
                <MarkdownRenderer content={sub.content} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
