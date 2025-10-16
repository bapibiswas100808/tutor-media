import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Categories - Tuition Types & Subjects",
  description: "Explore different tutoring categories and subjects available",
};

const categories = [
  {
    id: 1,
    name: "Mathematics",
    slug: "mathematics",
    description: "Algebra, Calculus, Geometry, and more",
    count: 45,
  },
  {
    id: 2,
    name: "Physics",
    slug: "physics",
    description: "Classical Physics, Modern Physics, Lab work",
    count: 32,
  },
  {
    id: 3,
    name: "Chemistry",
    slug: "chemistry",
    description: "Organic, Inorganic, Physical Chemistry",
    count: 28,
  },
  {
    id: 4,
    name: "English",
    slug: "english",
    description: "Grammar, Literature, Creative Writing",
    count: 52,
  },
  {
    id: 5,
    name: "Bangla",
    slug: "bangla",
    description: "Language, Literature, Composition",
    count: 38,
  },
  {
    id: 6,
    name: "Biology",
    slug: "biology",
    description: "Botany, Zoology, Human Biology",
    count: 25,
  },
  {
    id: 7,
    name: "Computer Science",
    slug: "computer-science",
    description: "Programming, Algorithms, Web Development",
    count: 18,
  },
  {
    id: 8,
    name: "Economics",
    slug: "economics",
    description: "Micro Economics, Macro Economics",
    count: 15,
  },
];

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Tutoring Categories
        </h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="block bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                {category.name}
              </h3>
              <p className="text-gray-600 mb-4">{category.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-blue-600 font-medium">View Details</span>
                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-sm">
                  {category.count} tutors
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
