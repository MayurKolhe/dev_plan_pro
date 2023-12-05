import { NextResponse } from "next/server";
import OpenAi from "@/openAi";

export async function POST(req: Request) {
  const { todotaks, userName } = await req.json();
  const response = await OpenAi.chat.completions.create({
    model: "gpt-3.5-turbo",
    temperature: 0.8,
    n: 1,
    stream: false,
    messages: [
      {
        role: "system",
        content: `When responding, welcome the user always as say welcome ${JSON.stringify(
          userName
        )} to the DevPlanProApp! Limit the response to 200 characters`,
      },
      {
        role: "user",
        content: `Hi there, provide a summary of the following todos. Count how many todos are in each category such as To do, in progress and done, then tell the user to have a productive day! Here's the data: ${JSON.stringify(
          todotaks
        )}`,
      },
    ],
  });
  console.log("Response is : ", response);

  const responseData = response || {};
  const message = responseData.choices[0]?.message;
  if (message) {
    return NextResponse.json(message);
  } else {
    console.error("Unexpected response format:", response);
    return NextResponse.error();
  }
}
