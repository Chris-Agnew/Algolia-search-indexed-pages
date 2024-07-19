import { fetchBuilderPages } from "../utils/builder";
import { indexPages } from "../utils/algolia";

// Function to fetch all pages from Builder.io and index them in Algolia
const run = async () => {
  try {
    const pages = await fetchBuilderPages();
    await indexPages(pages);
  } catch (error) {
    console.error("Error running the script:", error);
  }
};

run().catch(console.error);
