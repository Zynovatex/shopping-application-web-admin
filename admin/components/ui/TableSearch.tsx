"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

type Props = {
  onSearch: (term: string) => void;
  onFilterChange?: (filters: { [key: string]: string[] }) => void;
  onClear?: () => void;
  onExport?: () => void;
  showFilter?: boolean;
  filterOptions?: {
    [key: string]: string[];
  };
};

const TableSearch = ({
  onSearch,
  onFilterChange,
  onClear,
  onExport,
  showFilter = true,
  filterOptions = {},
}: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState<{ [key: string]: string[] }>({});
  const [showFilters, setShowFilters] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  const handleCheckboxToggle = (group: string, value: string) => {
    const currentGroup = activeFilters[group] || [];
    const updatedGroup = currentGroup.includes(value)
      ? currentGroup.filter((v) => v !== value)
      : [...currentGroup, value];

    const newFilters = {
      ...activeFilters,
      [group]: updatedGroup,
    };

    setActiveFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleClear = () => {
    setSearchTerm("");
    setActiveFilters({});
    onClear?.();
  };

  // Close filter panel on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowFilters(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto relative">
      {/* Search Input */}
      <div className="flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
        <Image src="/search.png" alt="search icon" width={14} height={14} />
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            onSearch(e.target.value);
          }}
          className="w-[200px] p-2 bg-transparent outline-none"
        />
      </div>

      {/* Filter & Export Buttons */}
      <div className="flex items-center gap-2">
        {showFilter && (
          <button
            className="w-8 h-8 rounded-full bg-[#5A31F5] flex items-center justify-center"
            onClick={() => setShowFilters((prev) => !prev)}
          >
            <Image src="/filter.png" alt="filter" width={14} height={14} />
          </button>
        )}
        {onExport && (
          <button
            className="w-8 h-8 rounded-full bg-[#5A31F5] flex items-center justify-center"
            onClick={onExport}
          >
            <Image src="/sort.png" alt="export" width={14} height={14} />
          </button>
        )}
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div
          ref={filterRef}
          className="bg-white p-4 rounded-md shadow-lg border mt-2 w-[340px] absolute right-0 top-12 z-50 max-h-[400px] overflow-y-auto"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
            {Object.keys(filterOptions).map((group) => (
              <div key={group} className="mb-3">
                <p className="font-semibold text-sm capitalize mb-1">{group}</p>
                {filterOptions[group].map((item) => (
                  <label key={item} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={activeFilters[group]?.includes(item) || false}
                      onChange={() => handleCheckboxToggle(group, item)}
                    />
                    {item}
                  </label>
                ))}
              </div>
            ))}
          </div>
          <button
            className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded mt-4 w-full"
            onClick={handleClear}
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default TableSearch;
