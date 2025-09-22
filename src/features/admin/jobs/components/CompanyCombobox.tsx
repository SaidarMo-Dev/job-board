"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePaginatedCompanies } from "../../hooks/usePaginatedCompanies";
import { InfiniteScrollObserver } from "@/components/InfiniteScrollObserver";
import { DEFAULT_PAGE_SIZE } from "@/constants/config";
import type { CompanyOption } from "../jobsType";
import { getCompanyById } from "../../companies/companyApi";
import { toast } from "react-toastify";

interface CompanyComboboxProps {
  value: number;
  onChange: (id: number) => void;
  placeholder?: string;
  emptyText?: string;
}

export function CompanyCombobox({
  value,
  onChange,
  placeholder = "Select company...",
  emptyText = "No company found.",
}: CompanyComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const { companies, setCompanies, loadMore, loading, hasMore } =
    usePaginatedCompanies(DEFAULT_PAGE_SIZE);

  const [selected, setSelected] = React.useState<CompanyOption | null>(null);

  React.useEffect(() => {
    if (!value) {
      setSelected(null);
      return;
    }

    // Try to find in already loaded companies
    const existing = companies.find((c) => c.id === value);
    if (existing) {
      setSelected(existing);
      return;
    }

    // Otherwise fetch from API
    async function fetchCompany() {
      try {
        const comp = (await getCompanyById<CompanyOption>(value, "id,name"))
          .data;
        setSelected(comp);
        setCompanies((prev) => [...prev, comp]);
      } catch {
        toast.error("Cannot load selected company");
      }
    }

    fetchCompany();
  }, [value, companies, setCompanies]);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between bg-transparent"
        >
          {selected ? (
            <span className="">{selected.name}</span>
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
          <ChevronsUpDown className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-(--radix-popover-trigger-width)">
        <Command>
          <CommandInput placeholder="Search company..." />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup heading="Companies">
              {companies.map((c) => (
                <CommandItem
                  key={c.id}
                  value={c.name}
                  onSelect={() => {
                    onChange(c.id);
                    setSelected(c);
                    setOpen(false);
                  }}
                  className="flex items-center gap-2"
                >
                  <Avatar className="h-5 w-5">
                    {c.name && (
                      <AvatarFallback className="text-xs">
                        {c.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <span className="flex-1 truncate">{c.name}</span>
                  <Check
                    className={cn(
                      "ml-2 h-4 w-4",
                      value === c.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
              {/* Infinite scroll trigger */}
              {hasMore && !loading && (
                <InfiniteScrollObserver onIntersect={loadMore} />
              )}
              {loading && <p className="text-center text-sm">Loading...</p>}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
