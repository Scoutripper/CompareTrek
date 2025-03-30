'use client';

import { useState } from 'react';

interface FilterOption {
  label: string;
  value: string;
}

interface FilterProps {
  onFilterChange: (filters: Filters) => void;
}

interface Filters {
  difficulty: string[];
  location: string[];
  priceRange: string;
  duration: string[];
  altitude: string[];
  bestTime: string[];
}

const difficulties: FilterOption[] = [
  { label: 'Easy', value: 'easy' },
  { label: 'Moderate', value: 'moderate' },
  { label: 'Difficult', value: 'difficult' },
  { label: 'Very Difficult', value: 'very-difficult' },
];

const locations: FilterOption[] = [
  { label: 'Uttarakhand', value: 'uttarakhand' },
  { label: 'Himachal Pradesh', value: 'himachal-pradesh' },
  { label: 'Sikkim', value: 'sikkim' },
  { label: 'Kashmir', value: 'kashmir' },
  { label: 'Ladakh', value: 'ladakh' },
];

const priceRanges: FilterOption[] = [
  { label: 'Under ₹10,000', value: 'under-10000' },
  { label: '₹10,000 - ₹20,000', value: '10000-20000' },
  { label: '₹20,000 - ₹30,000', value: '20000-30000' },
  { label: 'Above ₹30,000', value: 'above-30000' },
];

const durations: FilterOption[] = [
  { label: '1-3 days', value: '1-3' },
  { label: '4-6 days', value: '4-6' },
  { label: '7-10 days', value: '7-10' },
  { label: 'Above 10 days', value: 'above-10' },
];

const altitudes: FilterOption[] = [
  { label: 'Under 2000m', value: 'under-2000' },
  { label: '2000m - 3000m', value: '2000-3000' },
  { label: '3000m - 4000m', value: '3000-4000' },
  { label: 'Above 4000m', value: 'above-4000' },
];

const bestTimes: FilterOption[] = [
  { label: 'Spring (Mar-May)', value: 'spring' },
  { label: 'Summer (Jun-Aug)', value: 'summer' },
  { label: 'Autumn (Sep-Nov)', value: 'autumn' },
  { label: 'Winter (Dec-Feb)', value: 'winter' },
];

export default function TrekFilters({ onFilterChange }: FilterProps) {
  const [filters, setFilters] = useState<Filters>({
    difficulty: [],
    location: [],
    priceRange: '',
    duration: [],
    altitude: [],
    bestTime: [],
  });

  const handleCheckboxChange = (category: keyof Omit<Filters, 'priceRange'>, value: string) => {
    const newFilters = { ...filters };
    const values = newFilters[category];
    if (values.includes(value)) {
      newFilters[category] = values.filter((v) => v !== value);
    } else {
      newFilters[category] = [...values, value];
    }
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleRadioChange = (value: string) => {
    const newFilters = { ...filters, priceRange: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const renderCheckboxGroup = (
    title: string,
    options: FilterOption[],
    category: keyof Omit<Filters, 'priceRange'>
  ) => (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <div className="space-y-2">
        {options.map((option) => (
          <label key={option.value} className="flex items-center">
            <input
              type="checkbox"
              checked={filters[category].includes(option.value)}
              onChange={() => handleCheckboxChange(category, option.value)}
              className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
            />
            <span className="ml-2 text-gray-700">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold mb-6">Filters</h2>

      {renderCheckboxGroup('Difficulty Level', difficulties, 'difficulty')}
      {renderCheckboxGroup('Location', locations, 'location')}

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Price Range</h3>
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <label key={range.value} className="flex items-center">
              <input
                type="radio"
                name="priceRange"
                value={range.value}
                checked={filters.priceRange === range.value}
                onChange={() => handleRadioChange(range.value)}
                className="border-gray-300 text-teal-600 focus:ring-teal-500"
              />
              <span className="ml-2 text-gray-700">{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      {renderCheckboxGroup('Duration', durations, 'duration')}
      {renderCheckboxGroup('Altitude', altitudes, 'altitude')}
      {renderCheckboxGroup('Best Time to Visit', bestTimes, 'bestTime')}

      <button
        onClick={() => {
          const emptyFilters: Filters = {
            difficulty: [],
            location: [],
            priceRange: '',
            duration: [],
            altitude: [],
            bestTime: [],
          };
          setFilters(emptyFilters);
          onFilterChange(emptyFilters);
        }}
        className="w-full mt-4 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
      >
        Clear All Filters
      </button>
    </div>
  );
} 