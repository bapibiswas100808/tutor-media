import { Metadata } from "next";
import Link from "next/link";
import { mediumsData } from "@/data/mediumsData";
import Image from "next/image";

interface MediumPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return mediumsData.map((medium) => ({
    slug: medium.slug,
  }));
}

export async function generateMetadata({
  params,
}: MediumPageProps): Promise<Metadata> {
  const { slug } = await params;
  const medium = mediumsData.find((m) => m.slug === slug);

  if (!medium) {
    return {
      title: "Medium Not Found",
    };
  }

  return {
    title: `${medium.name} - Tutor Media`,
    description: medium.description,
  };
}

export default async function MediumPage({ params }: MediumPageProps) {
  const { slug } = await params;
  const medium = mediumsData.find((m) => m.slug === slug);

  if (!medium) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Medium Not Found
          </h1>
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-700 underline"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section with Background Image */}
      <section className="relative py-20 px-4 overflow-hidden text-white">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={medium.image}
            alt={medium.name}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Content */}
        <div className="container mx-auto relative z-10 px-2">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              {medium.name}
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              {medium.description}
            </p>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 my-8">
        <nav className="flex items-center space-x-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{medium.name}</span>
        </nav>
      </div>

      {/* Classes Grid */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Available Classes
          </h2>
          <p className="text-gray-600 text-lg">
            Choose your class level to get started
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {medium.classes.map((classItem) => (
            <Link
              key={classItem.slug}
              href={`/mediums/${medium.slug}/${classItem.slug}`}
              className="group"
            >
              <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 h-full">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Content */}
                <div className="relative">
                  {/* Icon */}
                  <div className="relative w-full h-[400px]">
                    <Image
                      src={classItem.image}
                      alt={classItem.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="p-6">
                    {/* Title */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {classItem.name}
                    </h3>

                    {/* Subtitle */}
                    <p className="text-sm font-medium text-blue-600 mb-3">
                      {classItem.subtitle}
                    </p>

                    {/* Description Preview */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                      {classItem.description}
                    </p>

                    {/* Duration */}
                    {classItem.duration && (
                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {classItem.duration}
                      </div>
                    )}

                    {/* Subjects */}
                    {classItem.subjects && classItem.subjects.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {classItem.subjects.slice(0, 3).map((subject, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-gray-100 group-hover:bg-blue-50 text-gray-700 group-hover:text-blue-700 text-xs rounded-full transition-colors"
                          >
                            {subject}
                          </span>
                        ))}
                        {classItem.subjects.length > 3 && (
                          <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                            +{classItem.subjects.length - 3} more
                          </span>
                        )}
                      </div>
                    )}

                    {/* CTA */}
                    <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700">
                      <span>Learn More</span>
                      <svg
                        className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Need Help Choosing the Right Class?
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Our expert consultants can guide you to the perfect learning path
            for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/hire-tutor"
              className="px-8 py-4 bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg"
            >
              Find a Tutor
            </Link>
            <Link
              href="/become-a-tutor"
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white/10 transition-colors"
            >
              Become a Tutor
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
