"use client";
import React, { useEffect, useState, useCallback } from "react";
import { fetchBuilderPages, BuilderPage, Block } from "@/utils/builder";
import DOMPurify from "dompurify";
import Search from "@/components/Search";
import Link from "next/link";
import Spinner from "@/components/Spinner";
import NotFound from "@/components/NotFound";

interface Props {
  params: {
    slug?: string[];
  };
}

const Page: React.FC<Props> = ({ params }) => {
  const [page, setPage] = useState<BuilderPage | null>(null);
  const [allPages, setAllPages] = useState<BuilderPage[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);
  const [notFound, setNotFound] = useState<Boolean>(false);

  // Fetch all pages from Builder.io
  //logic for setting the page and the 404 in the notFound state
  useEffect(() => {
    const fetchPages = async () => {
      try {
        const pages = await fetchBuilderPages();
        setAllPages(pages);
        const pathString = params.slug ? `/${params.slug.join("/")}` : "/";
        const foundPage = pages.find((page) => page.data.url === pathString);

        if (pathString === "/") {
          setNotFound(false);
          setPage(null);
        } else if (foundPage) {
          setPage(foundPage);
          setNotFound(false);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error("Error fetching page:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPages();
  }, [params.slug]);

  // Render the html blocks of the page from Builder.io Api call. UseCallback hook is used to memoize the function to avoid unnecessary re-renders
  const renderBlocks = useCallback((blocks: Block[]): JSX.Element[] => {
    return blocks.map((block) => {
      if (block.component?.options?.text) {
        const sanitizedHTML = DOMPurify.sanitize(
          block.component.options.text || ""
        );
        const htmlWithCustomLinks = sanitizedHTML.replace(
          /<a /g,
          '<a class="text-custom-link hover:text-custom-link-hover" '
        );

        return (
          <div
            key={block.id}
            className="my-4 p-4 bg-gray-100 rounded-lg shadow"
            // sanitize the html due to the dangerouslySetInnerHTML
            dangerouslySetInnerHTML={{
              __html: htmlWithCustomLinks,
            }}
            role="region"
            aria-labelledby={`block-title-${block.id}`}
          />
        );
      }
      if (block.children) {
        return (
          <div key={block.id} className="my-2 p-2" role="region">
            {renderBlocks(block.children)}
          </div>
        );
      }
      return <div key={block.id} className="my-2 p-2" />;
    });
  }, []);

  // Show a spinner while loading the page
  if (loading) {
    return <Spinner />;
  }

  // Return 404 page if the page is not found
  if (notFound) {
    return <NotFound />;
  }

  // Render the home page if no page is selected or render the selected page
  return (
    <div className="container mx-auto p-4 text-center max-w-md lg:max-w-xl">
      {page === null && params.slug === undefined ? (
        <>
          <h1 className="text-4xl font-bold mb-4 text-black">
            Welcome to Builder.io Pages Search
          </h1>
          <Search />
          <div className="mt-16 lg:mt-8">
            <h2 className="text-2xl font-semibold mb-4 text-black">
              Indexed Pages
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {allPages.map((page) => (
                <Link
                  key={page.id}
                  href={page.data.url}
                  className="block p-4 border rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  data-cy="page-item"
                >
                  <h3
                    className="text-xl font-semibold text-black capitalize"
                    id={`page-title-${page.id}`}
                  >
                    {page.data.title}
                  </h3>
                  <p className="text-black">{page.data.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <h2
            className="text-3xl font-bold mb-4 text-black capitalize"
            id={`page-title-${page?.id}`}
          >
            {page?.data.title}
          </h2>
          <p className="text-lg mb-4 text-black">{page?.data.description}</p>
          {page && renderBlocks(page.data.blocks)}
          <Search />
          <div className="mt-16 lg:mt-8">
            {" "}
            <h2 className="text-2xl font-semibold mb-4 text-black">
              Indexed Pages
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {allPages.map((page) => (
                <Link
                  key={page.id}
                  href={page.data.url}
                  className="block p-4 border rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  data-cy="page-item"
                >
                  <h3
                    className="text-xl font-semibold text-black capitalize"
                    id={`page-title-${page.id}`}
                  >
                    {page.data.title}
                  </h3>
                  <p className="text-black">{page.data.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
