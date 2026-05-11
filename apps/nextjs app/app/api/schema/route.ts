import { NextResponse } from "next/server";
import { fetchGraphQLSchema } from "@repo/context-service";

export async function GET() {
  try {
    const schema = await fetchGraphQLSchema();

    return NextResponse.json({
      schema
    });
  } catch (e: any) {
    return NextResponse.json(
      {
        error: e.message
      },
      {
        status: 500
      }
    );
  }
}