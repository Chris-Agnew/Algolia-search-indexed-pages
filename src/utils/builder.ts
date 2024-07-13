import axios from "axios";

const builderApiKey = process.env.NEXT_PUBLIC_BUILDER_API_KEY;

export const fetchBuilderPages = async () => {
  const response = await axios.get(
    `https://cdn.builder.io/api/v3/content/page?apiKey=${builderApiKey}`
  );
  return response.data.results;
};
