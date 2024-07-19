import algoliasearch from "algoliasearch";
import { BuilderPage } from "@/utils/builder";

// initialize Algolia client and index
const client = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY!
);
const index = client.initIndex(process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME!);

interface AlgoliaPage {
  objectID: string;
  title: string;
  description: string;
  url: string;
  content: string;
}

// Function to index pages in Algolia
export const indexPages = async (pages: BuilderPage[]): Promise<void> => {
  try {
    const objects: AlgoliaPage[] = pages.map((page) => ({
      objectID: page.id,
      title: page.data.title,
      description: page.data.description,
      url: page.data.url,
      content: page.data.blocks
        .map((block) => block.component?.options?.text || "")
        .join(" "),
    }));

    await index.saveObjects(objects);
    console.log("Pages indexed to Algolia");
  } catch (error) {
    console.error("Error indexing content to Algolia:", error);
    throw new Error("Indexing to Algolia failed");
  }
};
