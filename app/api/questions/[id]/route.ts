import { MegaQuestions } from "@/data/questions";
import { NextResponse } from "next/server";

export function GET( // GET has 2 Parameters. Request Object and Params Context (Shortcut in NextJS)
    request: Request,
    { params }: { params: { id: string } }): NextResponse {  //NextResponse is a Promise. In regular cases, just NextResponse

    const id = Number (params.id)  // Convert to Num
    // Find the matching ID. Find in questions (q) where question.id === to the id We converted from the URL Param
    const question = MegaQuestions.find((q) => q.id === id);

    if (!question) {
        return NextResponse.json(
            { error: `QuestionID = ${id} not found` },
            { status: 404 }
        )
    }

    // If question is not null, proceed to returning the found NextResponse
    return NextResponse.json(question);

}