import { NextResponse } from "next/server";
import { connectToDatabase } from "@/util/mongodb";
import Users from "@/models/users";
import Todos from "@/models/todo";
import bcrypt from "bcryptjs";
import { doesNotMatch } from "assert";
import { use } from "react";

export async function POST(req) {
    try {

        const { title, status, Image, boardID } = await req.json();
        var id;
        console.log("title, status, Image, boardID",title, status, Image, boardID);
        await connectToDatabase();

       const result =await Todos.insertMany({ title, status, Image, boardID});
       console.log('add result', result)
       id=result.map(({ _id }) => ({ _id }));
       return NextResponse.json({ message:id}, { status: 200});

    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}

