import { NextResponse } from "next/server";
import { connectToDatabase } from "@/util/mongodb";
import Todos from "@/models/todo";

// export async function PUT(req) {
//     console.log('req.json', req.json());
//     try {
//         console.log('req.json', req.body.json());
//         const { $id, title, status, image, createdAt } = await req.json();
//         await connectToDatabase();

//         await Todos.findByIdAndUpdate(findByIdAndUpdate($id, { $id,title, status, image, createdAt} )
//         )
        
//         return NextResponse.json({ message: "Topic Updated" }, { status: 200 });
//     } catch (error) {
//         return NextResponse.json({ message: error }, { status: 500 });
//     }
// }

export async function PUT(req) {
    try {
      const { $id, title, status, image, createdAt } = await req.json();
      await connectToDatabase(); // Ensure you have a proper database connection setup
  
      // Assuming you have a 'Todos' model with a 'findByIdAndUpdate' method
      const updatedTodo = await Todos.findByIdAndUpdate(
        $id,
        { title, status, image, createdAt },
        { new: true } // Returns the updated document
      );
  
      return NextResponse.json({ message: "Todo Updated", data: updatedTodo }, { status: 200 });
    } catch (error) {
      console.error('Error updating todo:', error);
      return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
  }

