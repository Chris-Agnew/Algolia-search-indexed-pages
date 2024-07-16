import { NextRequest, NextResponse } from "next/server";
import algoliasearch from "algoliasearch";
import { fetchBuilderPages, BuilderPage } from "@/utils/builder";

const client = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY!
);
const index = client.initIndex(process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME!);

async function indexContentToAlgolia(content: BuilderPage[]): Promise<void> {
  try {
    const response = await index.saveObjects(content, {
      autoGenerateObjectIDIfNotExist: true,
    });
    console.log("Algolia response:", response);
  } catch (error) {
    console.error("Error indexing content to Algolia:", error);
    throw new Error("Indexing to Algolia failed");
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // Check for a test header to simulate an error
    if (req.headers.get("x-test-error") === "true") {
      throw new Error("Simulated error for testing");
    }

    console.log("Request received for indexing");
    const content = await fetchBuilderPages();
    console.log("Fetched content from Builder.io:", content);
    await indexContentToAlgolia(content);
    return NextResponse.json(
      { message: "Content indexed successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in handler function:", error);
    let errorMessage = "Unknown error";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.log("Error details:", error);
    return NextResponse.json(
      { message: "Error indexing content", error: errorMessage },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  return NextResponse.json(
    { message: "Use POST to index content" },
    { status: 405 }
  );
}
