import Link from "next/link";
import Image from "next/image";
import { BookOpen } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/40 bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Image src="/logo.png" alt="1% Readers Logo" width={24} height={24} className="h-6 w-6 object-contain" />
              <span className="text-lg font-semibold tracking-tight">1% Readers</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Read, Reflect, Rise 1%. A virtual reading &amp; reflective thinking community.
            </p>
          </div>

          {/* Explore */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Explore</h4>
            <div className="flex flex-col gap-2">
              <Link href="/rise" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Rise Together</Link>
              <Link href="/reflect" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Reflect Together</Link>
              <Link href="/reading-list" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Reading List</Link>
            </div>
          </div>

          {/* Community */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Community</h4>
            <div className="flex flex-col gap-2">
              <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About Us</Link>
              <Link href="/join" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Join Community</Link>
              <Link href="/submit" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Submit Writing</Link>
            </div>
          </div>

          {/* Connect */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Connect</h4>
            <div className="flex flex-col gap-2">
              <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">WhatsApp</a>
              <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Instagram</a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-border/40 pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} 1% Readers. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
