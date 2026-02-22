import { NextResponse } from "next/server";
import { savePost } from "@/lib/content";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!data.title || !data.content || !data.type || !data.author) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const slug = savePost({
      title: data.title,
      excerpt: data.excerpt || "",
      content: data.content,
      type: data.type,
      author: data.author || "Anonymous",
      tags: data.tags || [],
      weekLabel: data.weekLabel,
      coverUrl: data.coverUrl,
      status: data.status || "published",
    });

    return NextResponse.json({ success: true, slug });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
