import { NextResponse } from "next/server";
import { connectToDatabase } from "@/util/mongodb";
import Boards from "@/models/boards";
import bcrypt from "bcryptjs";
import { doesNotMatch } from "assert";
import { use } from "react";

export async function POST(req) {
    try {

        const { name,email } = await req.json();
        console.log("name,email",name,email)
        await connectToDatabase();

       const result =await Boards.insertMany({ name,email});
       console.log('boards result', result)
       return NextResponse.json({ value:result}, { status: 200});

    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}

