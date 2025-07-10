import type { ProgressBarProps } from "../types/ProgressBarProps";



const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  color = "",
  className = "",
}) => {
  return (
    <div className={`w-full bg-gray-200 rounded-full h-2 ${className}`}>
      <div
        className={`bg-sky-600 h-full rounded-full transition-all duration-300 ${color} `}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
};

export default ProgressBar;
