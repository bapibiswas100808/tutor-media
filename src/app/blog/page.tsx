import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Blog - Tutor Media",
  description:
    "Read our latest articles about education, tutoring tips, and learning strategies",
};

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image?: string;
}

interface StrapiResponse {
  data: StrapiPost[];
}

interface StrapiPost {
  id: number;
  attributes: {
    title: string;
    excerpt: string;
    category?: string;
    date?: string;
    createdAt?: string;
    image?: {
      data: Array<{
        attributes: {
          url: string;
        };
      }>;
    };
  };
}

async function getBlogPosts(): Promise<BlogPost[]> {
  const strapiUrl =
    process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

  try {
    const res = await fetch(`${strapiUrl}/api/blogs?populate=*`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(`Strapi API error: ${res.status}`);
      return [];
    }

    const data: StrapiResponse = await res.json();
    console.log("Raw Strapi data:", data);

    if (!data.data || !Array.isArray(data.data)) {
      return [];
    }

    // Map Strapi response to your interface
    const blogPosts: BlogPost[] = data.data.map((post: StrapiPost) => ({
      id: post.id,
      title: post.attributes?.title || "Untitled",
      excerpt: post.attributes?.excerpt || "No excerpt",
      category: post.attributes?.category || "Uncategorized",
      date: post.attributes?.date || post.attributes?.createdAt || "No date",
      image: post.attributes?.image?.data?.[0]?.attributes?.url,
    }));

    console.log("Mapped blog posts:", blogPosts);
    return blogPosts;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Our Blog
        </h1>
        <div className="max-w-6xl mx-auto">
          {blogPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No blog posts available yet.
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Make sure your Strapi server is running at{" "}
                {process.env.NEXT_PUBLIC_STRAPI_URL}
              </p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-3">
              {blogPosts.map((post: BlogPost) => (
                <article
                  key={post.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 relative">
                    {post.image ? (
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <span className="text-white text-4xl">📚</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm">
                        {post.category || "Uncategorized"}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {post.date || "No date"}
                      </span>
                    </div>
                    <h2 className="text-xl font-semibold mb-3 text-gray-900">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors">
                      Read More →
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}