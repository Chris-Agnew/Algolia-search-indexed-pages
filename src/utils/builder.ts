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

export const fetchBuilderPages = async (): Promise<BuilderPage[]> => {
  console.log("Builder API Key:", builderApiKey); // Log the API key to ensure it is loaded

  if (!builderApiKey) {
    throw new Error("Builder API key is not defined");
  }

  try {
    const response = await axios.get<{ results: BuilderPage[] }>(
      `https://cdn.builder.io/api/v3/content/page?apiKey=${builderApiKey}`
    );
    console.log("API Response:", response.data);
    return response.data.results;
  } catch (error: any) {
    console.error(
      "API Request Error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
