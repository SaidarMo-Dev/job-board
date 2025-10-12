"use client";

import * as React from "react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const allCountries = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "gb", label: "United Kingdom" },
  { value: "au", label: "Australia" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "jp", label: "Japan" },
  { value: "br", label: "Brazil" },
  { value: "in", label: "India" },
  { value: "za", label: "South Africa" },
  { value: "mx", label: "Mexico" },
  { value: "es", label: "Spain" },
  { value: "it", label: "Italy" },
  { value: "ru", label: "Russia" },
  { value: "cn", label: "China" },
];

const BATCH_SIZE = 8;

export function CountryCombobox({ onSelect }: { onSelect: (country) => void }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [loadedCountries, setLoadedCountries] = React.useState<
    typeof allCountries
  >([]);
  const [loading, setLoading] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [hasMore, setHasMore] = React.useState(true);
  const loadCountRef = React.useRef(0);
  const commandListRef = React.useRef<HTMLDivElement>(null);

  // Reset state when popover closes
  const resetState = () => {
    setLoadedCountries([]);
    loadCountRef.current = 0;
    setHasMore(true);
    setSearchQuery("");
  };

  // Load initial or more countries
  const loadCountries = (search = "") => {
    if (loading || !hasMore) return;

    setLoading(true);

    // Use setTimeout to simulate async behavior and avoid blocking UI
    setTimeout(() => {
      const startIndex = loadCountRef.current * BATCH_SIZE;
      const endIndex = startIndex + BATCH_SIZE;

      // Filter all countries if there's a search query
      const source = search ? allCountries : loadedCountries;
      const countriesToAdd = search
        ? allCountries.filter((c) =>
            c.label.toLowerCase().includes(search.toLowerCase())
          )
        : allCountries.slice(startIndex, endIndex);

      setLoadedCountries((prev) =>
        search ? countriesToAdd : [...prev, ...countriesToAdd]
      );
      loadCountRef.current += 1;

      // Update hasMore state
      if (search || endIndex >= allCountries.length) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }

      setLoading(false);
    }, 0); // No delay needed since data is in memory
  };

  // Load initial batch when popover opens
  React.useEffect(() => {
    if (open) {
      if (loadedCountries.length === 0 && !searchQuery) {
        loadCountries();
      }
    } else {
      resetState();
    }
  }, [open]);

  // Handle search
  React.useEffect(() => {
    if (searchQuery) {
      loadCountries(searchQuery);
    } else {
      resetState();
      loadCountries();
    }
  }, [searchQuery]);

  // Handle scroll for lazy loading
  const handleScroll = () => {
    if (!commandListRef.current || loading || !hasMore || searchQuery) return;

    const { scrollTop, clientHeight, scrollHeight } = commandListRef.current;
    const isNearBottom = scrollTop + clientHeight >= scrollHeight - 50;

    if (isNearBottom) {
      loadCountries();
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value.trim().length !== 0 ? value : "Select country..."}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search country..."
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandList
            ref={commandListRef}
            onScroll={handleScroll}
            className="max-h-[200px] overflow-y-auto"
            style={{
              scrollbarWidth: "thin",
              scrollbarGutter: "stable",
            }}
          >
            <div className="pr-2">
              {loading && loadedCountries.length === 0 ? (
                <div className="py-2 text-center text-sm">
                  Loading countries...
                </div>
              ) : (
                <>
                  <CommandEmpty>No country found.</CommandEmpty>
                  <CommandGroup>
                    {loadedCountries.map((country) => (
                      <CommandItem
                        key={country.value}
                        value={country.label}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue);
                          onSelect(currentValue);
                          setOpen(false);
                        }}
                      >
                        <CheckIcon
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === country.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {country.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                  {loading && (
                    <div className="py-2 text-center text-sm">
                      Loading more countries...
                    </div>
                  )}
                  {!hasMore && loadedCountries.length > 0 && !searchQuery && (
                    <div className="py-2 text-center text-sm text-muted-foreground">
                      No more countries
                    </div>
                  )}
                </>
              )}
            </div>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
