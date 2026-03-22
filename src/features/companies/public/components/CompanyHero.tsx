import CompanySearch from "./CompanySearch";

export function CompanyHero({
  search,
  onChange,
}: {
  search?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <div className="relative w-full bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="flex flex-col items-center text-center gap-6">
          <h1 className="text-foreground text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl text-balance">
            Discover Companies Hiring on{" "}
            <span className="text-primary">iLink</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl text-pretty">
            Connect with top-tier organizations and find your next career move
            among thousands of verified employers across the globe.
          </p>

          <CompanySearch search={search} onChange={onChange} />
        </div>
      </div>
    </div>
  );
}
