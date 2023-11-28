import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // defaults to force-static
export async function POST(request: Request) {
  const data = await request.json();
  if (data.token) {
    let url = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.GOOGLE_RECAPTCHA_SECRET_KEY}&response=${data.token}`;
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
    });
    if (response.ok) {
      response = await response.json();
      return new Response(JSON.stringify({ response }));
    }
  }
}
