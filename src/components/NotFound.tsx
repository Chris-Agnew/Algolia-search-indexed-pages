"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const NotFound: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 3000); // Redirect to home page after 3 seconds

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4"
      data-cy="not-found-page"
    >
      <div
        className="bg-white p-8 rounded-lg shadow-lg text-center"
        role="alert"
        aria-live="assertive"
        data-cy="alert-box"
      >
        <h1
          className="text-4xl font-bold text-black mb-4"
          data-cy="not-found-title"
        >
          404 - Page Not Found
        </h1>
        <p className="text-lg text-black mb-2" data-cy="not-found-message">
          Sorry, the page you are looking for does not exist.
        </p>
        <p className="text-black mb-4" data-cy="redirect-message">
          Redirecting to the homepage...
        </p>
        <Link
          href="/"
          className="text-blue-500 hover:underline text-lg"
          aria-label="Go back to the homepage"
          data-cy="home-link"
        >
          Go back to the homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
