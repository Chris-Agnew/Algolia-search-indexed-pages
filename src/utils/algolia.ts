import algoliasearch from "algoliasearch";

const algoliaAppId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID;
const algoliaApiKey = process.env.NEXT_PUBLIC_ALGOLIA_API_KEY;
const algoliaIndexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME;

const algoliaClient = algoliasearch(algoliaAppId!, algoliaApiKey!);
const index = algoliaClient.initIndex(algoliaIndexName!);

export const indexPages = async (pages: any[]) => {
  const objects = pages.map((page: any) => ({
    objectID: page.id,
    title: page.data.title,
    description: page.data.description,
    url: page.data.url,
    content: page.data.blocks
      .map((block: any) => block.component?.options?.text)
      .join(" "),
  }));

  await index.saveObjects(objects);
  console.log("Pages indexed to Algolia");
};
