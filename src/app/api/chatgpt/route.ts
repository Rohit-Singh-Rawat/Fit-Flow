import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const { question } = await request.json();

  console.log('here')
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",  stream: true,
        messages: [
          {
            role: "system",
            content:
              "You are a highly knowledgeable and helpful assistant with expertise in various domains, including fitness. You provide detailed, accurate, and well-researched information. Answer the user's question clearly and concisely, incorporating relevant fitness expertise where applicable.",
          },
          {
            role: "user",
            content: question,
          },
        ],
      }),
    });
   

    console.log("object", response, `Bearer ${process.env.OPENAI_API_KEY}`);
    const data = await response.json();
    const answer = data.choices[0].message.content.trim();

    return NextResponse.json({ answer });
  } catch (error:any) {
    console.log(error)
    return NextResponse.json({ error: error.message });
  }
};
