import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

// ============================================================
// Types
// ============================================================

export type PostType = "rise_post" | "reflect_recap" | "digest" | "announcement";

export interface PostData {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  type: PostType;
  author: string;
  date: string;
  status: "draft" | "published";
  tags: string[];
  weekLabel: string | null;
  coverUrl: string | null;
  readingTime: string;
}

export interface SubmissionData {
  slug: string;
  nickname: string;
  title: string;
  content: string;
  notes: string | null;
  status: "pending" | "approved" | "rejected";
  date: string;
}

// ============================================================
// Content directories
// ============================================================

const postsDirectory = path.join(process.cwd(), "content", "posts");
const submissionsDirectory = path.join(process.cwd(), "content", "submissions");

// ============================================================
// Posts
// ============================================================

export function getAllPosts(includeDrafts: boolean = false): PostData[] {
  if (!fs.existsSync(postsDirectory)) return [];

  const files = fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".md"));

  const posts = files.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    return getPostBySlug(slug);
  }).filter((post): post is PostData => {
    if (!post) return false;
    if (!includeDrafts && post.status === "draft") return false;
    return true;
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): PostData | null {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const excerpt =
    data.excerpt ||
    content
      .replace(/[#*`\n]/g, " ")
      .trim()
      .slice(0, 160) + "...";

  const stats = readingTime(content);

  return {
    slug,
    title: data.title || slug,
    excerpt,
    content,
    type: (data.type as PostType) || "rise_post",
    author: data.author || "Anonymous",
    date: data.date
      ? new Date(data.date).toISOString()
      : new Date().toISOString(),
    status: data.status === "draft" ? "draft" : "published",
    tags: data.tags || [],
    weekLabel: data.week_label || null,
    coverUrl: data.cover_url || null,
    readingTime: stats.text,
  };
}

export function getPostsByType(type: PostType, includeDrafts: boolean = false): PostData[] {
  return getAllPosts(includeDrafts).filter((post) => post.type === type);
}

export function getAllTags(): string[] {
  const posts = getAllPosts(); // Only considers published posts
  const tagSet = new Set<string>();
  posts.forEach((post) => post.tags.forEach((tag) => tagSet.add(tag)));
  return Array.from(tagSet).sort();
}

export function getAllSlugs(): string[] {
  // Return slugs for published posts to pre-render routes correctly
  return getAllPosts().map(p => p.slug);
}

// ============================================================
// Submissions
// ============================================================

export function getAllSubmissions(): SubmissionData[] {
  if (!fs.existsSync(submissionsDirectory)) return [];

  const files = fs
    .readdirSync(submissionsDirectory)
    .filter((f) => f.endsWith(".md"));

  const submissions = files.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    return getSubmissionBySlug(slug);
  }).filter(Boolean) as SubmissionData[];

  return submissions.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getSubmissionBySlug(slug: string): SubmissionData | null {
  const fullPath = path.join(submissionsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    nickname: data.nickname || "Anonymous",
    title: data.title || slug,
    content,
    notes: data.notes || null,
    status: data.status || "pending",
    date: data.date
      ? new Date(data.date).toISOString()
      : new Date().toISOString(),
  };
}

export function saveSubmission(submission: {
  nickname: string;
  title: string;
  content: string;
  notes?: string;
}): string {
  if (!fs.existsSync(submissionsDirectory)) {
    fs.mkdirSync(submissionsDirectory, { recursive: true });
  }

  const slug = submission.title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

  const timestamp = Date.now();
  const fileName = `${slug}-${timestamp}.md`;

  const frontmatter = [
    "---",
    `title: "${submission.title}"`,
    `nickname: "${submission.nickname}"`,
    `date: ${new Date().toISOString().split("T")[0]}`,
    `status: pending`,
    submission.notes ? `notes: "${submission.notes}"` : null,
    "---",
  ]
    .filter(Boolean)
    .join("\n");

  const fileContent = `${frontmatter}\n\n${submission.content}`;

  fs.writeFileSync(
    path.join(submissionsDirectory, fileName),
    fileContent,
    "utf8"
  );

  return slug;
}

export function deleteSubmission(slug: string): boolean {
  if (!fs.existsSync(submissionsDirectory)) return false;

  const fullPath = path.join(submissionsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return false;

  try {
    fs.unlinkSync(fullPath);
    return true;
  } catch (error) {
    console.error("Failed to delete submission:", error);
    return false;
  }
}

export function deletePost(slug: string): boolean {
  if (!fs.existsSync(postsDirectory)) return false;

  const fullPath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return false;

  try {
    fs.unlinkSync(fullPath);
    return true;
  } catch (error) {
    console.error("Failed to delete post:", error);
    return false;
  }
}

export function savePost(
  post: {
    title: string;
    excerpt: string;
    content: string;
    type: PostType;
    author: string;
    status: "draft" | "published";
    tags: string[];
    weekLabel?: string;
    coverUrl?: string;
  },
  originalSlug?: string
): string {
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
  }

  // Derive target slug from the title
  const newSlugBase = post.title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

  let finalSlug = newSlugBase;

  // We are creating a new post, or renaming an existing post
  if (!originalSlug || originalSlug !== newSlugBase) {
    // Avoid overwriting a completely different post with the exact same title
    if (fs.existsSync(path.join(postsDirectory, `${finalSlug}.md`))) {
      finalSlug = `${newSlugBase}-${Math.floor(Math.random() * 10000)}`;
    }
  }

  const fileName = `${finalSlug}.md`;

  const tagsYaml = post.tags && post.tags.length > 0 
    ? `\ntags:\n${post.tags.map(t => `  - ${t}`).join("\n")}`
    : "";

  const frontmatter = [
    "---",
    `title: "${post.title.replace(/"/g, '\\"')}"`,
    `author: "${post.author.replace(/"/g, '\\"')}"`,
    `date: ${new Date().toISOString().split("T")[0]}`,
    `type: ${post.type}`,
    `status: ${post.status}`,
    post.weekLabel ? `week_label: "${post.weekLabel.replace(/"/g, '\\"')}"` : null,
    post.coverUrl ? `cover_url: "${post.coverUrl.replace(/"/g, '\\"')}"` : null,
    `excerpt: "${post.excerpt.replace(/"/g, '\\"')}"`,
    "---",
  ]
    .filter(Boolean)
    .join("\n");

  const fileContent = `${frontmatter.replace("---", `---${tagsYaml}`)}\n\n${post.content}`;

  // If renaming an existing post, delete the old file first to avoid dupes
  if (originalSlug && originalSlug !== finalSlug) {
    deletePost(originalSlug);
  }

  fs.writeFileSync(
    path.join(postsDirectory, fileName),
    fileContent,
    "utf8"
  );

  return finalSlug;
}
