import { NextResponse } from "next/server";
import { connectToDatabase } from "@/util/mongodb";
import Todos from "@/models/todo";
import NextAuth from "next-auth/next";


export  async function GET() {

        await connectToDatabase();
        const todo= await Todos.find();
        return NextResponse.json({todo})

}