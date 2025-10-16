import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Sorry, we couldn&rsquo;t find the page you&rsquo;re looking for.
          </p>
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Go back home
            </Link>
            <div className="text-center">
              <Link
                href="/tutor-hub"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Browse Tutors
              </Link>
              <span className="mx-2 text-gray-400">|</span>
              <Link
                href="/tuition-jobs"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                View Jobs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
