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
    console.log(response);
  } catch (error) {
    console.error("Error indexing content to Algolia", error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const content = await fetchBuilderPages();
    await indexContentToAlgolia(content);
    return NextResponse.json(
      { message: "Content indexed successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in handler function", error);
    return NextResponse.json(
      { message: "Error indexing content" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  return NextResponse.json(
    { message: "Use POST to index content" },
    { status: 405 }
  );
}
