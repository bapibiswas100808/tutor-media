import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop - Educational Resources",
  description:
    "Browse our collection of educational books, materials, and resources",
};

const products = [
  {
    id: 1,
    name: "Mathematics Workbook - Class 10",
    price: "BDT 450",
    category: "Textbooks",
    image: "/placeholder-book.jpg",
  },
  {
    id: 2,
    name: "Physics Lab Manual",
    price: "BDT 350",
    category: "Lab Manuals",
    image: "/placeholder-book.jpg",
  },
  {
    id: 3,
    name: "English Grammar Guide",
    price: "BDT 380",
    category: "Language",
    image: "/placeholder-book.jpg",
  },
  {
    id: 4,
    name: "Chemistry Reference Book",
    price: "BDT 520",
    category: "Reference",
    image: "/placeholder-book.jpg",
  },
  {
    id: 5,
    name: "Biology Practical Notebook",
    price: "BDT 280",
    category: "Notebooks",
    image: "/placeholder-book.jpg",
  },
  {
    id: 6,
    name: "Complete Bangla Literature",
    price: "BDT 650",
    category: "Literature",
    image: "/placeholder-book.jpg",
  },
];

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Educational Shop
        </h1>

        <div className="mb-8">
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
              All Products
            </button>
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors">
              Textbooks
            </button>
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors">
              Reference Books
            </button>
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors">
              Lab Manuals
            </button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Book Image</span>
              </div>
              <div className="p-6">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm mb-2 inline-block">
                  {product.category}
                </span>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">
                  {product.name}
                </h3>
                <p className="text-xl font-bold text-green-600 mb-4">
                  {product.price}
                </p>
                <div className="flex gap-2">
                  <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                    Add to Cart
                  </button>
                  <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors">
                    ♡
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
