"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  CommandSeparator,
} from "@/components/ui/command";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Option } from "../jobsType";
import { InfiniteScrollObserver } from "@/components/InfiniteScrollObserver";

export function MultiSelectCombobox({
  options,
  selected,
  onChange,
  loadMore,
  hasMore,
  loading,
  placeholder = "Select options...",
  emptyText = "No results.",
  max = 5,
  counterLabel,
}: {
  options: Option[];
  selected: number[];
  onChange: (ids: number[]) => void;
  loadMore: () => void;
  hasMore: boolean;
  loading: boolean;
  placeholder?: string;
  emptyText?: string;
  max?: number;
  counterLabel?: string;
}) {
  const [open, setOpen] = React.useState(false);

  const toggle = (id: number) => {
    const isSelected = selected.includes(id);
    if (isSelected) {
      onChange(selected.filter((i) => i !== id));
    } else {
      if (selected.length < max) {
        onChange([...selected, id]);
      }
    }
  };

  const labelFor = (id: number) => options.find((o) => o.id === id)?.name ?? id;

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between bg-transparent"
          >
            <span className="truncate text-left">
              {selected && selected.length > 0
                ? `${selected.length} selected`
                : placeholder}
            </span>
            <ChevronsUpDown className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-(--radix-popover-trigger-width)">
          <Command>
            <CommandInput placeholder="Search..." />
            <CommandList>
              <CommandEmpty>{emptyText}</CommandEmpty>
              <CommandGroup>
                {options.map((o) => {
                  const isSelected = selected.includes(o.id);
                  const disabled = !isSelected && selected.length >= max;
              
                  return (
                    <CommandItem
                      key={o.id}
                      value={o.name}
                      onSelect={() => toggle(o.id)}
                      className={cn(
                        "flex items-center gap-2",
                        disabled && "opacity-50 cursor-not-allowed"
                      )}
                      disabled={disabled}
                    >
                      <Check
                        className={cn(
                          "h-4 w-4",
                          isSelected ? "opacity-100" : "opacity-0"
                        )}
                      />
                      <span className="truncate">{o.name}</span>
                    </CommandItem>
                  );
                })}

                {/* Infinite scroll trigger */}
                {hasMore && !loading && (
                  <InfiniteScrollObserver onIntersect={loadMore} />
                )}
              </CommandGroup>
              <CommandSeparator />
              <div className="px-3 py-2 text-xs text-muted-foreground">
                {counterLabel
                  ? counterLabel
                  : `${selected ? selected.length : 0} selected`}
              </div>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {selected && selected.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selected.map((id) => (
            <Badge
              key={id}
              variant="secondary"
              className="px-2 py-1 rounded-full"
            >
              <span className="mr-1">{labelFor(id)}</span>
              <button
                aria-label={`Remove ${labelFor(id)}`}
                onClick={() => onChange(selected.filter((i) => i !== id))}
                className="ml-1 inline-flex"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
