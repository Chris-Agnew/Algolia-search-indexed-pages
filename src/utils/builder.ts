import axios from "axios";

export interface Block {
  id: string;
  component?: {
    name: string;
    options: {
      text?: string;
    };
  };
  children?: Block[];
  responsiveStyles?: {
    large: {
      [key: string]: string | number;
    };
  };
}

export interface BuilderPage {
  id: string;
  data: {
    themeId: boolean;
    description: string;
    title: string;
    blocks: Block[];
    url: string;
    state: {
      deviceSize: string;
      location: {
        path: string;
        query: Record<string, string>;
      };
    };
  };
  [key: string]: any;
}

export interface SearchResult {
  title: string;
  description: string;
  url: string;
  content: string;
}

export const fetchBuilderPages = async (): Promise<BuilderPage[]> => {
  try {
    const response = await axios.get(
      `https://cdn.builder.io/api/v3/content/page?apiKey=${process.env.NEXT_PUBLIC_BUILDER_API_KEY}`
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching Builder pages:", error);
    throw error;
  }
};
