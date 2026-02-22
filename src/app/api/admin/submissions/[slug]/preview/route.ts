import { NextResponse } from "next/server";
import { getSubmissionBySlug } from "@/lib/content";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const submission = getSubmissionBySlug(slug);

    if (!submission) {
      return NextResponse.json(
        { error: "Submission not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ submission });
  } catch (error) {
    console.error("Error fetching submission:", error);
    return NextResponse.json(
      { error: "Failed to fetch submission preview" },
      { status: 500 }
    );
  }
}
