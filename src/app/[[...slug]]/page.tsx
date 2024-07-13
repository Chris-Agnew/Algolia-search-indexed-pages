"use client";
import React, { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { fetchBuilderPages, BuilderPage } from "@/utils/builder";
import DOMPurify from "dompurify";
import Search from "@/components/Search";
import Link from "next/link";

interface Props {
  params: {
    slug?: string[];
  };
}

const Page: React.FC<Props> = ({ params }) => {
  const [page, setPage] = useState<BuilderPage | null>(null);
  const [pages, setPages] = useState<BuilderPage[]>([]);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const fetchedPages = await fetchBuilderPages();
        setPages(fetchedPages);

        const pathString = params.slug ? `/${params.slug.join("/")}` : "/";
        const foundPage = fetchedPages.find(
          (page) => page.data.url === pathString
        );

        if (foundPage) {
          setPage(foundPage);
        } else if (pathString === "/") {
          setPage(null); // This indicates we should show the home page content
        } else {
          notFound();
        }
      } catch (error) {
        console.error("Error fetching page:", error);
        notFound();
      }
    };

    fetchPages();
  }, [params.slug]);

  if (page === null && params.slug === undefined) {
    return (
      <div className="home-container">
        <header className="header">
          <h1>Welcome to Builder.io Pages Search</h1>
          <p>Use the search below to find Builder.io pages:</p>
        </header>
        <Search />
        <section className="indexed-pages">
          <h2>Indexed Pages</h2>
          <div className="pages-list">
            {pages.map((page) => (
              <Link
                key={page.id}
                href={page.data.url}
                passHref
                className="page-item"
              >
                <div>
                  <h3>{page.data.title}</h3>
                  <p>{page.data.description}</p>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(
                        page.data.blocks
                          .map((block) => block.component?.options?.text)
                          .join(" ")
                      ),
                    }}
                  />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    );
  }

  if (page === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="page-content">
      <h2>{page.data.title}</h2>
      <p>{page.data.description}</p>
      {page.data.blocks
        .filter((block) => block.component?.options?.text) // Filter out blocks without text
        .map((block, index) => (
          <div
            key={index}
            className="content-block"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(block.component?.options?.text),
            }}
          />
        ))}
      <Search />
    </div>
  );
};

export default Page;
