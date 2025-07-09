import Loader from "./Loader";

interface PageLoaderProps {
  variant?: "dots" | "spinner" | "pulse" | "bars";
  message?: string;
  size?: "sm" | "md" | "lg";
}
export default function PageLoader({
  variant = "spinner",
  size = "md",
  message = "",
}: PageLoaderProps) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center space-y-4">
        <Loader variant={variant} size={size} />
        <p className="text-gray-400">{message}</p>
      </div>
    </div>
  );
}
