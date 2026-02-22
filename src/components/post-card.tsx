import Link from "next/link";
import { Clock, Calendar, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { PostData } from "@/lib/content";

interface PostCardProps {
  post: PostData;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/rise/${post.slug}`} className="group block">
      <article className="overflow-hidden rounded-xl border border-border/50 bg-card transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-border">
        {post.coverUrl && (
          <div className="aspect-[16/9] overflow-hidden bg-muted">
            <img
              src={post.coverUrl}
              alt={post.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}
        <div className="p-5 sm:p-6">
          {/* Tags & Week Label */}
          <div className="mb-3 flex flex-wrap items-center gap-2">
            {post.weekLabel && (
              <Badge variant="secondary" className="text-xs font-normal">
                {post.weekLabel}
              </Badge>
            )}
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs font-normal">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Title */}
          <h3 className="mb-2 text-lg font-semibold leading-snug tracking-tight transition-colors group-hover:text-primary/80 line-clamp-2">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="mb-4 text-sm leading-relaxed text-muted-foreground line-clamp-2">
            {post.excerpt}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <User className="h-3.5 w-3.5" />
              {post.author}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {post.readingTime}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
