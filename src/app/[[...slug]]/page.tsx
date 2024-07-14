"use client";
import React, { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { fetchBuilderPages, BuilderPage, Block } from "@/utils/builder";
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
  const [allPages, setAllPages] = useState<BuilderPage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const pages = await fetchBuilderPages();
        setAllPages(pages);
        const pathString = params.slug ? `/${params.slug.join("/")}` : "/";
        const foundPage = pages.find((page) => page.data.url === pathString);

        if (foundPage) {
          setPage(foundPage);
        } else if (pathString === "/") {
          setPage(null); // This indicates we should show the home page content
        } else {
          setPage(null);
          notFound(); // Handle not found
        }
      } catch (error) {
        console.error("Error fetching page:", error);
        setPage(null);
        notFound(); // Handle fetch error
      } finally {
        setLoading(false);
      }
    };

    fetchPages();
  }, [params.slug]);

  const renderBlocks = (blocks: Block[]): JSX.Element[] => {
    return blocks.map((block) => {
      if (block.component?.options?.text) {
        return (
          <div
            key={block.id}
            className="content-block"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(block.component.options.text || ""),
            }}
          />
        );
      }
      if (block.children) {
        return (
          <div key={block.id} className="nested-block">
            {renderBlocks(block.children)}
          </div>
        );
      }
      return <div key={block.id} className="empty-block" />;
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (page === null && params.slug === undefined) {
    return (
      <div className="home-container">
        <div className="header">
          <h1>Welcome to Builder.io Pages Search</h1>
          <p>Use the search below to find Builder.io pages:</p>
        </div>
        <Search />
        <div className="indexed-pages">
          <h2>Indexed Pages</h2>
          <div className="pages-list">
            {allPages.map((page) => (
              <Link key={page.id} href={page.data.url} className="page-item">
                <h3>{page.data.title}</h3>
                <p>{page.data.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (page === null) {
    notFound();
    return null; // Avoid displaying the loading state after notFound is triggered
  }

  return (
    <div className="page-content">
      <h2>{page.data.title}</h2>
      <p>{page.data.description}</p>
      {renderBlocks(page.data.blocks)}
      <Search />
    </div>
  );
};

export default Page;
