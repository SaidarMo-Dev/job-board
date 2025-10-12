export function PopularSearch({ searchBy }: { searchBy: string }) {
  return (
    <div className="bg-gray-100 mt-3 py-1 px-3 rounded-3xl mr-3 text-neutral-600">
      {searchBy}
    </div>
  );
}
