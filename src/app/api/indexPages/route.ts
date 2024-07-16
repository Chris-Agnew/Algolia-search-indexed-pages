import { NextRequest, NextResponse } from "next/server";
import { fetchBuilderPages } from "@/utils/builder";
import { indexPages } from "@/utils/algolia";

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  try {
    console.log("Request received for indexing");

    const content = await fetchBuilderPages();
    console.log("Fetched content from Builder.io:", content);

    await indexPages(content);

    return NextResponse.json(
      { message: "Content indexed successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error in handler function:", error);
    let errorMessage = "Unknown error";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json(
      { message: "Error indexing content", error: errorMessage },
      { status: 500 }
    );
  }
};

export const GET = async (req: NextRequest): Promise<NextResponse> => {
  return NextResponse.json(
    { message: "Use POST to index content" },
    { status: 405 }
  );
};
