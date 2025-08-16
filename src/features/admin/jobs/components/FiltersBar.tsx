"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, X, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

import type { JobFilters, JobStatus } from "../jobsType";
import { useQuery } from "@tanstack/react-query";
import { fetchPopularCategories } from "../../categories/categoryApi";

interface FiltersBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filters: JobFilters;
  onFiltersChange: (filters: JobFilters) => void;
  onClearFilters: () => void;
}

export function FiltersBar({
  searchQuery,
  onSearchChange,
  filters,
  onFiltersChange,
  onClearFilters,
}: FiltersBarProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();

  // TODO : fetch most categries, locations, companies
  const categories = useQuery({
    queryKey: ["admin/categories/popular"],
    queryFn: () => fetchPopularCategories(),
  }).data;

  const locations = ["Loc1", "Loc2", "Loc3"];
  const companies = ["Comp1", "Comp2", "Comp3"];

  const statusOptions: { value: JobStatus; label: string }[] = [
    { value: "Pending", label: "Pending" },
    { value: "Active", label: "Approved" },
    { value: "Rejected", label: "Rejected" },
    { value: "Paused", label: "Paused" },
    { value: "Closed", label: "Closed" },
    { value: "Expired", label: "Expired" },
  ];

  const hasActiveFilters =
    filters.status.length > 0 ||
    filters.categories.length > 0 ||
    filters.companies.length > 0 ||
    filters.locations.length > 0 ||
    filters.datePosted?.from ||
    filters.datePosted?.to;

  const handleStatusChange = (status: JobStatus) => {
    const newStatus = filters.status.includes(status)
      ? filters.status.filter((s) => s !== status)
      : [...filters.status, status];
    onFiltersChange({ ...filters, status: newStatus });
  };

  const handleCategoryChange = (category: string) => {
    const newCategory = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];
    onFiltersChange({ ...filters, categories: newCategory });
  };

  const handleCompanyChange = (company: string) => {
    const newCompany = filters.companies.includes(company)
      ? filters.companies.filter((c) => c !== company)
      : [...filters.companies, company];
    onFiltersChange({ ...filters, companies: newCompany });
  };

  const handleLocationChange = (location: string) => {
    const newLocation = filters.locations.includes(location)
      ? filters.locations.filter((l) => l !== location)
      : [...filters.locations, location];
    onFiltersChange({ ...filters, locations: newLocation });
  };

  const handleDateRangeChange = () => {
    onFiltersChange({
      ...filters,
      datePosted: {
        from: dateFrom,
        to: dateTo,
      },
    });
  };

  return (
    <div className="space-y-4">
      {/* Search and Filter Toggle */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search jobs..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>

        <Button
          variant={showFilters ? "default" : "outline"}
          onClick={() => setShowFilters(!showFilters)}
          className="gap-2"
        >
          <Filter className="h-4 w-4" />
          Filters
          {hasActiveFilters && (
            <Badge
              variant="secondary"
              className="ml-1 h-5 w-5 rounded-full p-0 text-xs"
            >
              !
            </Badge>
          )}
        </Button>

        {hasActiveFilters && (
          <Button variant="ghost" onClick={onClearFilters} className="gap-2">
            <X className="h-4 w-4" />
            Clear
          </Button>
        )}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {filters.status.map((status) => (
            <Badge key={status} variant="secondary" className="gap-1">
              Status: {status}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => handleStatusChange(status)}
              />
            </Badge>
          ))}
          {filters.categories.map((category) => (
            <Badge key={category} variant="secondary" className="gap-1">
              Category: {category}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => handleCategoryChange(category)}
              />
            </Badge>
          ))}
          {filters.companies.map((company) => (
            <Badge key={company} variant="secondary" className="gap-1">
              Company: {company}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => handleCompanyChange(company)}
              />
            </Badge>
          ))}
          {filters.locations.map((location) => (
            <Badge key={location} variant="secondary" className="gap-1">
              Location: {location}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => handleLocationChange(location)}
              />
            </Badge>
          ))}
        </div>
      )}

      {/* Filters Panel */}
      {showFilters && (
        <div className="grid gap-4 p-4 border rounded-lg bg-card">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Status Filter */}
            <div className="space-y-2">
              <Label>Status</Label>
              <div className="space-y-2">
                {statusOptions.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-2"
                  >
                    <input
                      type="checkbox"
                      id={`status-${option.value}`}
                      checked={filters.status.includes(option.value)}
                      onChange={() => handleStatusChange(option.value)}
                      className="rounded"
                    />
                    <Label
                      htmlFor={`status-${option.value}`}
                      className="text-sm"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <Label>Category</Label>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {categories ? (
                  categories.map((category) => (
                    <div
                      key={category.id}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        id={`category-${category}`}
                        checked={filters.categories.includes(category.name)}
                        onChange={() => handleCategoryChange(category.name)}
                        className="rounded"
                      />
                      <Label
                        htmlFor={`category-${category}`}
                        className="text-sm"
                      >
                        {category.name}
                      </Label>
                    </div>
                  ))
                ) : (
                  <span className="ml-1 text-gray-600">
                    Categories not found
                  </span>
                )}
              </div>
            </div>

            {/* Company Filter */}
            <div className="space-y-2">
              <Label>Company</Label>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {companies.map((company) => (
                  <div key={company} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`company-${company}`}
                      checked={filters.companies.includes(company)}
                      onChange={() => handleCompanyChange(company)}
                      className="rounded"
                    />
                    <Label htmlFor={`company-${company}`} className="text-sm">
                      {company}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Location Filter */}
            <div className="space-y-2">
              <Label>Location</Label>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {locations.map((location) => (
                  <div key={location} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`location-${location}`}
                      checked={filters.locations.includes(location)}
                      onChange={() => handleLocationChange(location)}
                      className="rounded"
                    />
                    <Label htmlFor={`location-${location}`} className="text-sm">
                      {location}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Date Range Filter */}
          <div className="space-y-2">
            <Label>Date Posted</Label>
            <div className="flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "justify-start text-left font-normal",
                      !dateFrom && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateFrom ? format(dateFrom, "PPP") : "From date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dateFrom}
                    onSelect={setDateFrom}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <span className="text-muted-foreground">to</span>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "justify-start text-left font-normal",
                      !dateTo && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateTo ? format(dateTo, "PPP") : "To date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dateTo}
                    onSelect={setDateTo}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <Button onClick={handleDateRangeChange} size="sm">
                Apply
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
