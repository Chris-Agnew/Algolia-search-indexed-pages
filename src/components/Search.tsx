import React, { useState, useEffect } from "react";
import algoliasearch, { SearchIndex } from "algoliasearch/lite";
import Link from "next/link";
import DOMPurify from "dompurify";

interface SearchResult {
  title: string;
  url: string;
  description: string;
}

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY!
);

const Search: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [index, setIndex] = useState<SearchIndex | null>(null);

  useEffect(() => {
    const idx = searchClient.initIndex(
      process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME!
    );
    setIndex(idx);
  }, []);

  // Handle search input change and update the results
  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);

    if (index && event.target.value.trim() !== "") {
      const { hits } = await index.search<SearchResult>(event.target.value);
      setResults(hits);
    } else {
      setResults([]);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4" data-cy="search-container">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search Builder.io Pages"
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          data-cy="search-input"
          aria-label="Search"
        />
        {query.trim() !== "" && (
          <div
            className="absolute mt-2 w-full bg-white border rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto capitalize"
            data-cy="search-results"
          >
            {results.length > 0 ? (
              results.map(
                (hit, index) =>
                  hit.title && (
                    <Link
                      key={index}
                      href={hit.url ?? "#"} // Fallback URL if hit.url is undefined
                      className="block p-2 hover:bg-gray-200 focus:bg-gray-200 "
                      data-cy="search-result-item"
                    >
                      <div>
                        <h2 className="text-lg font-semibold">{hit.title}</h2>
                        <p className="text-sm text-gray-600">
                          {hit.description}
                        </p>
                      </div>
                    </Link>
                  )
              )
            ) : (
              <div className="p-2">
                <p className="text-gray-600" data-cy="no-results">
                  No results found
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
