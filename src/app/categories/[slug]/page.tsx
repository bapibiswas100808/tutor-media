import { Metadata } from "next";
import { notFound } from "next/navigation";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

const categories: Record<
  string,
  { name: string; description: string; tutors: number }
> = {
  mathematics: {
    name: "Mathematics",
    description: "Algebra, Calculus, Geometry, and more",
    tutors: 45,
  },
  physics: {
    name: "Physics",
    description: "Classical Physics, Modern Physics, Lab work",
    tutors: 32,
  },
  chemistry: {
    name: "Chemistry",
    description: "Organic, Inorganic, Physical Chemistry",
    tutors: 28,
  },
  english: {
    name: "English",
    description: "Grammar, Literature, Creative Writing",
    tutors: 52,
  },
  bangla: {
    name: "Bangla",
    description: "Language, Literature, Composition",
    tutors: 38,
  },
  biology: {
    name: "Biology",
    description: "Botany, Zoology, Human Biology",
    tutors: 25,
  },
  "computer-science": {
    name: "Computer Science",
    description: "Programming, Algorithms, Web Development",
    tutors: 18,
  },
  economics: {
    name: "Economics",
    description: "Micro Economics, Macro Economics",
    tutors: 15,
  },
};

export async function generateStaticParams() {
  return Object.keys(categories).map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = categories[slug];

  if (!category) {
    return {
      title: "Category Not Found - Tutor Media",
    };
  }

  return {
    title: `${category.name} Tutors - Tutor Media`,
    description: `Find qualified ${category.name} tutors. ${category.description}`,
  };
}

export default async function CategoryDetailPage({
  params,
}: CategoryPageProps) {
  const { slug } = await params;
  const category = categories[slug];

  if (!category) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {category.name} Tutors
          </h1>
          <p className="text-gray-600 mb-2">{category.description}</p>
          <p className="text-blue-600 font-medium">
            {category.tutors} available tutors
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Mock tutor cards for this category */}
          {Array.from({ length: Math.min(category.tutors, 9) }, (_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-6">
              <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-center mb-2">
                {category.name} Expert {i + 1}
              </h3>
              <p className="text-gray-600 text-center mb-2">
                {category.name} Specialist
              </p>
              <p className="text-gray-600 text-center mb-2">
                {3 + i}+ years experience
              </p>
              <p className="text-gray-600 text-center mb-4">
                Online & Home Tutoring
              </p>
              <div className="flex justify-center mb-4">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm">
                  {category.name}
                </span>
              </div>
              <button className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors">
                Contact Tutor
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
