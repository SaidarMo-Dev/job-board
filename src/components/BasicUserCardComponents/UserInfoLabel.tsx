export default function UserInfoLabel({ fieldInfo }) {
  return (
    <div className="py-2 px-3 bg-gray-50 rounded-md border w-full">
      <span className="text-gray-700">{fieldInfo}</span>
    </div>
  );
}
