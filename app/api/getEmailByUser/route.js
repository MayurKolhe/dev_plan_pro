import { connectToDatabase } from "@/util/mongodb";
import Todos from '@/models/todo';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    await connectToDatabase();
    const url = new URL(request.url);
    const email = url.searchParams.get('email');
    console.log('Email ID:', email);

    // Query the database for the user
    const user = await Todos.find({ "user": email });
    console.log('Welcome to Get User email');
    console.log('User', typeof user);

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
