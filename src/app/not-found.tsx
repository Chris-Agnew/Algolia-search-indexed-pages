"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const CustomNotFound = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="not-found-container">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <p>Redirecting to the homepage...</p>
      <Link href="/" className="home-link">
        Go back to the homepage
      </Link>
    </div>
  );
};

export default CustomNotFound;
