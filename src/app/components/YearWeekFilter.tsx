import React, { useState, useEffect, useRef } from "react";

// Helper: get ISO week number
function getISOWeek(date: Date) {
  const tmp = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = tmp.getUTCDay() || 7;
  tmp.setUTCDate(tmp.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(tmp.getUTCFullYear(),0,1));
  return Math.ceil(((tmp.getTime() - yearStart.getTime())/86400000 + 1)/7);
}

interface YearWeekFilterProps {
  year: number;
  weeks: number[];
  onChange: (year: number, weeks: number[]) => void;
  range?: { past: number; future: number };
}

const YearWeekFilter: React.FC<YearWeekFilterProps> = ({
  year,
  weeks,
  onChange,
  range = { past: 5, future: 2 },
}) => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentWeek = getISOWeek(now);

  const startYear = currentYear - range.past;
  const endYear = currentYear + range.future;
  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);

  // Available weeks for tempYear
  const [tempYear, setTempYear] = useState(year);
  const [tempWeeks, setTempWeeks] = useState<number[]>(weeks);
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // reset weeks when year changes
    setTempWeeks([]);
  }, [tempYear]);

  // close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (open && ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setTempYear(year);
        setTempWeeks(weeks);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, year, weeks]);

  const availableWeeks = 
    tempYear === currentYear
      ? Array.from({ length: currentWeek - 1 }, (_, i) => i + 1)
      : Array.from({ length: 52 }, (_, i) => i + 1);

  const onWeeksChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(e.target.selectedOptions, o => +o.value);
    if (selected.length <= 5) setTempWeeks(selected);
  };

  const confirm = () => {
    onChange(tempYear, tempWeeks);
    setOpen(false);
  };

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        className="border border-gray-300 rounded-md px-3 py-2 bg-white text-sm shadow-sm hover:bg-gray-50"
      >
        {year} · {weeks.map(w => `W${w}`).join(", ") || "Select Weeks"}
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-56 bg-gradient-to-r from-purple-50 via-pink-50 to-yellow-50 rounded-md shadow-lg p-4">
          {/* Year */}
          <div className="flex flex-col text-sm mb-3">
            <label className="mb-1 font-medium text-gray-600">Year</label>
            <select
              value={tempYear}
              onChange={e => setTempYear(+e.target.value)}
              className="border rounded p-2 bg-white text-sm"
            >
              {years.map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
          {/* Weeks Multi-select */}
          <div className="flex flex-col text-sm mb-3">
            <label className="mb-1 font-medium text-gray-600">
              Weeks (max 5)
            </label>
            <select
              multiple
              size={5}
              value={tempWeeks.map(String)}
              onChange={onWeeksChange}
              className="border rounded p-2 bg-white text-sm h-28"
            >
              {availableWeeks.map(w => (
                <option key={w} value={w}>
                  Week {w}
                </option>
              ))}
            </select>
          </div>
          {/* Actions */}
          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                setOpen(false);
                setTempYear(year);
                setTempWeeks(weeks);
              }}
              className="text-sm text-gray-600 hover:underline"
            >
              Cancel
            </button>
            <button
              onClick={confirm}
              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-sm hover:bg-blue-200"
            >
              Ok
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default YearWeekFilter;
