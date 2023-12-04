import { NextResponse } from "next/server";
import { connectToDatabase } from "@/util/mongodb";
import Boards from "@/models/boards";

export  async function DELETE(req) {
    const id = await req.json();
        try
        {
        await connectToDatabase();
        const todo= await Boards.deleteOne({"_id":id});
        return NextResponse.json({ status: 200});
        }
        catch(error){
            return NextResponse.json({ message: error }, { status: 500 });
        }
}