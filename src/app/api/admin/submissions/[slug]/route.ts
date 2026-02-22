import { NextResponse } from "next/server";
import { deleteSubmission } from "@/lib/content";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const success = deleteSubmission(slug);

    if (!success) {
      return NextResponse.json(
        { error: "Submission not found or could not be deleted" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting submission:", error);
    return NextResponse.json(
      { error: "Failed to delete submission" },
      { status: 500 }
    );
  }
}
