import { CompanyMiniCard } from "../CompanyMiniCard";

export function TopCompaniesHiring() {
  return (
    <section className="p-15">
      <div className="custum-container">
        <div className="text-center">
          <h3 className="font-bold text-4xl">Top Companies Hiring</h3>
          <p className="text-neutral-600 mt-3">
            Join Industry leading companies that offer exceptional career grwoth
            opportunities
          </p>
        </div>

        {/* companies  */}
        <div className="mt-10 grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] gap-5">
          <CompanyMiniCard />
          <CompanyMiniCard />
          <CompanyMiniCard />
          <CompanyMiniCard />
          <CompanyMiniCard />
          <CompanyMiniCard />
          <CompanyMiniCard />
          <CompanyMiniCard />
        </div>
      </div>
    </section>
  );
}
