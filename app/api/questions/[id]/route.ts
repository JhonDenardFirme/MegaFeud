// app/api/questions/[id]/route.ts
import { MegaQuestions } from "@/data/questions";
import { NextResponse } from "next/server";

export async function GET( // GET has 2 Parameters: Request Object and Params Context (destructured here)
  request: Request,
  { params }    // Next.js passes `params` as a plain object
): Promise<NextResponse> {                            // returns a NextResponse directly

  // 🚨 await the params object before using it
  const { id } = await params;

  // Convert the URL param (string) into a number
  const q_id = Number(id);

  // Find the matching ID. Find in questions (q) where q.id === the numeric ID we converted
  const question = MegaQuestions.find((q) => q.id === q_id);

  if (!question) {
    // If no question was found, return a 404 JSON response
    return NextResponse.json(
      { error: `QuestionID = ${id} not found` },
      { status: 404 }
    );
  }

  // If question is not null, proceed to returning the found NextResponse
  return NextResponse.json(question);
}
