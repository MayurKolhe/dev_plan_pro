import { NextResponse } from "next/server";
import { connectToDatabase } from "@/util/mongodb";
import Users from "@/models/users";
import Todos from "@/models/todo";
import bcrypt from "bcryptjs";
import { doesNotMatch } from "assert";
import Register from "@/app/register/page";

export async function POST(req) {
    try {
        const { name, email, password } = await req.json();
        const hashedPassword = await bcrypt.hash(password, 15);
        await connectToDatabase();

        await Users.create({ name, email, password: hashedPassword});

        return NextResponse.json({ message: "Register Sucessfully"}, { status: 201 });

    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}

