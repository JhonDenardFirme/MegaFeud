import { NextResponse } from "next/server";
import { MegaQuestions } from "@/data/questions";

export function GET(){
    return NextResponse.json(MegaQuestions)
}