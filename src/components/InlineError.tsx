export default function InlineError({ message }: { message: string }) {
  return (
    <span className="text-red-600 bg-red-50 py-1 px-2 mt-2 rounded-sm">
      {message}
    </span>
  );
}
