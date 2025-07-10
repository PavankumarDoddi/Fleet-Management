import React from 'react';

interface YearMonthFilterProps {
  /** Currently selected year (e.g. 2025) */
  year: number;
  /** Currently selected month (1–12) */
  month: number;
  /**
   * Called when either month or year changes.
   * @param year  full year, e.g. 2025
   * @param month  month index 1–12
   */
  onChange: (year: number, month: number) => void;
  /** How many years back/forward from current year to show */
  range?: { past: number; future: number };
}

const YearMonthFilter: React.FC<YearMonthFilterProps> = ({
  year,
  month,
  onChange,
  range = { past: 5, future: 5 },
}) => {
  const thisYear = new Date().getFullYear();
  const start = thisYear - range.past;
  const end = thisYear + range.future;
  const years = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];

  return (
    <div className="flex flex-wrap gap-4">
      {/* Year Select */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">Year</label>
        <select
          value={year}
          onChange={(e) => onChange(+e.target.value, month)}
          className="mt-1 block w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        >
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      {/* Month Select */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">Month</label>
        <select
          value={month}
          onChange={(e) => onChange(year, +e.target.value)}
          className="mt-1 block w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        >
          {monthNames.map((name, idx) => (
            <option key={idx + 1} value={idx + 1}>
              {name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default YearMonthFilter;
