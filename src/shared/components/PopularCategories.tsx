import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const categories = [
  { id: 1, category: "Engineering" },
  { id: 2, category: "Design" },
  { id: 3, category: "Product" },
  { id: 4, category: "Marketing" },
  { id: 5, category: "Sales" },
  { id: 6, category: "Data" },
];

export default function PopularCategories() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Popular Categories</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {categories.map((cat) => {
            return (
              <button
                key={cat.id}
                className="block text-left w-full text-sm text-gray-500 py-2 px-3 hover:bg-gray-100 cursor-pointer"
              >
                {cat.category}
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
