import { NextResponse } from "next/server";
import { connectToDatabase } from "@/util/mongodb";
import Users from "@/models/users";
import Todos from "@/models/todo";
import bcrypt from "bcryptjs";
import { doesNotMatch } from "assert";

export async function POST(req) {
    try {

        const { title, status, Image } = await req.json();
       
        await connectToDatabase();

        await Todos.create({ title, status, Image});
            
        return NextResponse.json({ message: "Todos Created Successfully "}, { status: 200});
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}

