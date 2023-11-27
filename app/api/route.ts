import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // defaults to force-static
export async function GET(request: Request) {
  // const { form, token } = request.body;
  // console.log("request: ", request);
  return new NextResponse(JSON.stringify({ answer: "John Doe" }), {
    status: 200,
  });
}
