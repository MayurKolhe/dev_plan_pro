import { NextResponse } from "next/server";
import { connectToDatabase } from "@/util/mongodb";
import Users from "@/models/users";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        const { name, email, password } = await req.json();
        const hashedPassword = await bcrypt.hash(password, 15);
        await connectToDatabase();

        await Users.create({ name, email, password: hashedPassword});

        return NextResponse.json({ message: "User registered Successfully" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}