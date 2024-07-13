import axios from "axios";

const builderApiKey = process.env.NEXT_PUBLIC_BUILDER_API_KEY;

export interface BuilderPage {
  id: string;
  data: {
    title: string;
    description: string;
    blocks: any[];
    url: string;
  };
}

export interface SearchResult {
  objectID: string;
  title: string;
  description: string;
  url: string;
  content: string;
}

export const fetchBuilderPages = async (): Promise<BuilderPage[]> => {
  if (!builderApiKey) {
    throw new Error("Builder API key is not defined");
  }

  try {
    const response = await axios.get<{ results: BuilderPage[] }>(
      `https://cdn.builder.io/api/v3/content/page?apiKey=${builderApiKey}`
    );
    return response.data.results;
  } catch (error: any) {
    console.error(
      "API Request Error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
