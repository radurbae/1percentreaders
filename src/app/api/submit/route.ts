import { NextRequest, NextResponse } from "next/server";
import { saveSubmission } from "@/lib/content";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nickname, title, content_md, notes } = body;

    if (!nickname?.trim() || !title?.trim() || !content_md?.trim()) {
      return NextResponse.json(
        { error: "Nickname, title, and content are required." },
        { status: 400 }
      );
    }

    saveSubmission({
      nickname: nickname.trim(),
      title: title.trim(),
      content: content_md.trim(),
      notes: notes?.trim() || undefined,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
