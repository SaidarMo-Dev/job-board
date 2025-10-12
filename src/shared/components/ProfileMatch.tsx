import { Link } from "react-router";

export default function ProfileMatch() {
  return (
    <div>
      <h2 className="text-3xl font-semibold">Get better matches</h2>
      <p className="text-gray-600 mt-3">
        Get better matches We’ll use your responses to give you better matches
        in the future. Update your answers anytime on
        <Link to="" className="text-sky-600 font-semibold">
          your profile
        </Link>
      </p>
      <div className="bg-white mt-3 p-5 text-center rounded-md">
        <h3 className="font-semibold text-2xl">
          Are you currently looking for a job in El Jadida?
        </h3>
        <div className="grid grid-cols-2 mt-8 gap-3 text-sm font-bold">
          <button className="border border-gray-300 rounded-md p-2 hover:bg-gray-100 cursor-pointer">
            Yes
          </button>
          <button className="border border-gray-300 rounded-md p-2 hover:bg-gray-100 cursor-pointer">
            No
          </button>
          <button className="rounded-md p-2 hover:bg-gray-100 cursor-pointer">
            Skip
          </button>
          <button className="rounded-md p-2 text-white bg-sky-600 hover:bg-sky-700 cursor-pointer">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
