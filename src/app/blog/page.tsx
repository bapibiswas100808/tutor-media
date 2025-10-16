import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Tutor Media",
  description:
    "Read our latest articles about education, tutoring tips, and learning strategies",
};

const blogPosts = [
  {
    id: 1,
    title: "10 Tips for Effective Online Learning",
    excerpt:
      "Discover proven strategies to make your online learning experience more productive and engaging.",
    date: "2024-01-15",
    category: "Learning Tips",
  },
  {
    id: 2,
    title: "How to Choose the Right Tutor for Your Child",
    excerpt:
      "A comprehensive guide to finding the perfect tutor that matches your child's learning style and needs.",
    date: "2024-01-12",
    category: "Parent Guide",
  },
  {
    id: 3,
    title: "The Benefits of Group Tutoring",
    excerpt:
      "Explore why group tutoring can be an effective and cost-efficient learning solution.",
    date: "2024-01-10",
    category: "Tutoring Methods",
  },
  {
    id: 4,
    title: "Preparing for Board Exams: A Student's Guide",
    excerpt:
      "Essential tips and strategies to help students excel in their board examinations.",
    date: "2024-01-08",
    category: "Exam Preparation",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Our Blog
        </h1>
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-8 md:grid-cols-2">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm">
                      {post.category}
                    </span>
                    <span className="text-gray-500 text-sm">{post.date}</span>
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
        </div>
      </div>
    </div>
  );
}
