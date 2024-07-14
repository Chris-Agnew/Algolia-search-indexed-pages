import React, { useState, useEffect } from "react";
import algoliasearch, { SearchIndex } from "algoliasearch/lite";
import { SearchResult } from "@/utils/builder";
import Link from "next/link";

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
    <div className="search-container">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search Builder.io Pages"
        className="search-input"
        data-cy="search-input"
      />
      {query.trim() !== "" && (
        <div className="search-results" data-cy="search-results">
          {results.length > 0 ? (
            results.map((hit, index) => (
              <Link
                key={index}
                href={hit.url}
                passHref
                className="search-result-item"
                data-cy="search-result-item"
              >
                <h2>{hit.title}</h2>
              </Link>
            ))
          ) : (
            <p className="no-results" data-cy="no-results">
              No results found
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
