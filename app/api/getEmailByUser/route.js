import { connectToDatabase } from "@/util/mongodb";
import Todos from '@/models/todo';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    await connectToDatabase();
    const url = new URL(request.url);
    const boardID = url.searchParams.get('email');

    // Query the database for the user
    const user = await Todos.find({ "boardID": boardID });

    if (!user) {
      console.log('user is not there');
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({user }, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
