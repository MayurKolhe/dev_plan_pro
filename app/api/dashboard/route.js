import { NextResponse } from "next/server";
import { connectToDatabase } from "@/util/mongodb";
import Todos from "@/models/todo";
import NextAuth from "next-auth/next";
import { getSession } from 'next-auth/react';


export  async function GET() {

        await connectToDatabase();
        const userEmail = session.user.email;
        const todo= await Todos.find();
       
        return NextResponse.json({todo})

}





