import { MegaQuestions } from "@/data/questions";
import { NextResponse } from "next/server";

export async function GET ( // GET has 2 Parameters. Request Object and Params Context (Shortcut in NextJS)
    request: Request, 
    {params}: {params: {id:string}}) : Promise<NextResponse> {  //NextResponse is a Promise. In regular cases, just NextResponse
    
    const {id} = await params;  // Await the params first
    const q_id = Number(id);    // Then convert to a Number

    // Find the matching ID. Find in questions (q) where question.id === to the Q_ID We converted from the URL Param
    const question = MegaQuestions.find((q) => q.id === q_id);

    if (!question){
        return NextResponse.json(
            {error: `QuestionID = ${id} not found`},
            {status: 404}
        )
    }

    // If question is not null, proceed to returning the found NextResponse
    return NextResponse.json(question);

}