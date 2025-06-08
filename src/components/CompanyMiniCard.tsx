export function CompanyMiniCard() {
  return (
    <div className="flex flex-col items-center bg-white border-2 border-neutral-100 p-4">
      <div>
        <img src="../../src/assets/react.svg" alt="" />
      </div>
      <h3 className="font-bold text-lg mt-2 mb-2">Google</h3>
      <p className="mb-3 text-neutral-600">Leading technology company </p>
      <a href="" className="text-sky-600 font-semibold">23 open positions</a>
    </div>
  );
}
