import Link from "next/link";
import Image from "next/image";
import { BookOpen, LayoutDashboard, FileText, Inbox, Files } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-border/40 bg-muted/20 md:block">
        <div className="flex h-full flex-col">
          <div className="border-b border-border/40 p-6">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.png" alt="1% Readers Logo" width={24} height={24} className="h-5 w-5 object-contain" />
              <span className="text-lg font-semibold tracking-tight">1% Readers</span>
            </Link>
            <p className="mt-1 text-xs text-muted-foreground">Curator Panel</p>
          </div>

          <nav className="flex-1 space-y-1 p-4">
            <Link
              href="/admin"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/admin/submissions"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <Inbox className="h-4 w-4" />
              Submissions
            </Link>
            <Link
              href="/admin/posts"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <Files className="h-4 w-4" />
              Manage Posts
            </Link>
            <Link
              href="/admin/posts/new"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <FileText className="h-4 w-4" />
              New Post
            </Link>
          </nav>

          <div className="border-t border-border/40 p-4">
            <Link
              href="/"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              ← Back to Site
            </Link>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 overflow-y-auto">
        {/* Mobile Header */}
        <div className="flex items-center justify-between border-b border-border/40 p-4 md:hidden">
          <Link href="/admin" className="flex items-center gap-2">
            <Image src="/logo.png" alt="1% Readers Logo" width={24} height={24} className="h-5 w-5 object-contain" />
            <span className="font-semibold">Admin</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/admin/submissions" className="rounded-md p-2 text-muted-foreground hover:bg-accent">
              <Inbox className="h-5 w-5" />
            </Link>
            <Link href="/admin/posts" className="rounded-md p-2 text-muted-foreground hover:bg-accent">
              <Files className="h-5 w-5" />
            </Link>
            <Link href="/admin/posts/new" className="rounded-md p-2 text-muted-foreground hover:bg-accent">
              <FileText className="h-5 w-5" />
            </Link>
          </div>
        </div>

        <div className="p-6 sm:p-8">{children}</div>
      </div>
    </div>
  );
}
