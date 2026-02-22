"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TagFilterProps {
  tags: string[];
}

export function TagFilter({ tags }: TagFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTag = searchParams.get("tag");

  function handleTagClick(tag: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (tag) {
      params.set("tag", tag);
    } else {
      params.delete("tag");
    }
    router.push(`?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button onClick={() => handleTagClick(null)}>
        <Badge
          variant={!activeTag ? "default" : "outline"}
          className={cn(
            "cursor-pointer transition-all hover:shadow-sm",
            !activeTag && "shadow-sm"
          )}
        >
          All
        </Badge>
      </button>
      {tags.map((tag) => (
        <button key={tag} onClick={() => handleTagClick(tag)}>
          <Badge
            variant={activeTag === tag ? "default" : "outline"}
            className={cn(
              "cursor-pointer transition-all hover:shadow-sm",
              activeTag === tag && "shadow-sm"
            )}
          >
            {tag}
          </Badge>
        </button>
      ))}
    </div>
  );
}
