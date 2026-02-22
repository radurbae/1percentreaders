import { NextResponse } from "next/server";
import { savePost, deletePost } from "@/lib/content";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const data = await req.json();

    if (!data.title || !data.content || !data.type) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newSlug = savePost(
      {
        title: data.title,
        excerpt: data.excerpt || "",
        content: data.content,
        type: data.type,
        author: data.author || "Anonymous",
        tags: data.tags || [],
        weekLabel: data.weekLabel,
        coverUrl: data.coverUrl,
        status: data.status || "published",
      },
      slug // Provide the original slug so it can rename the file if the title changed
    );

    return NextResponse.json({ success: true, slug: newSlug });
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const success = deletePost(slug);

    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: "Post not found or could not be deleted" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
}
