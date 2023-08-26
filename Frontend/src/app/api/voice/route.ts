import { NextResponse } from "next/server";

export async function POST() {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return NextResponse.json({
    data: "안녕하세요. 힘들어 죽겠네요.",
  });
}
