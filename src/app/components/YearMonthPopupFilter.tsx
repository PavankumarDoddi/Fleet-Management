'use client';
import React, { useState, useRef, useEffect } from 'react';

interface YearMonthPopupFilterProps {
  year: number;
  month: number;
  onChange: (year: number, month: number) => void;
  range?: { past: number; future: number };
}

const YearMonthPopupFilter: React.FC<YearMonthPopupFilterProps> = ({
  year,
  month,
  onChange,
  range = { past: 5, future: 5 },
}) => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1; // 1–12

  // Build year options
  const startYear = currentYear - range.past;
  const endYear = currentYear + range.future;
  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);

  // Month names
  const allMonths = [
    'Jan','Feb','Mar','Apr','May','Jun',
    'Jul','Aug','Sep','Oct','Nov','Dec'
  ];

  // Local state for popup
  const [open, setOpen] = useState(false);
  const [tempYear, setTempYear] = useState(year);
  const [tempMonth, setTempMonth] = useState(month);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (open && ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setTempYear(year);
        setTempMonth(month);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open, year, month]);

  // Determine available months based on tempYear
  const availableMonths = tempYear === currentYear
    ? allMonths.slice(0, currentMonth - 1)
    : allMonths;

  // If the selected tempMonth is now out of range, clamp it
  useEffect(() => {
    if (tempYear === currentYear && tempMonth >= currentMonth) {
      setTempMonth(currentMonth - 1 || 1);
    }
  }, [tempYear, tempMonth, currentMonth]);

  // Confirm selection
  const handleOk = () => {
    onChange(tempYear, tempMonth);
    setOpen(false);
  };

  return (
    <div className="relative inline-block" ref={ref}>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(v => !v)}
        className="border border-gray-300 rounded-md px-3 py-2 bg-white text-sm shadow-sm hover:bg-gray-50"
      >
        {allMonths[month - 1]} {year}
      </button>

      {/* Popup */}
      {open && (
        <div className="absolute z-50 mt-2 w-48 bg-gradient-to-r from-purple-50 via-pink-50 to-yellow-50 rounded-md shadow-lg p-4">
          {/* Year Selector */}
          <div className="flex flex-col text-sm mb-3">
            <label className="mb-1 font-medium text-gray-600">Year</label>
            <select
              value={tempYear}
              onChange={e => {
                const y = +e.target.value;
                setTempYear(y);
                // Reset month to January whenever the year changes
                setTempMonth(1);
              }}
              className="border rounded p-2 bg-white text-sm"
            >
              {years.map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>

          {/* Month Selector */}
          <div className="flex flex-col text-sm mb-3">
            <label className="mb-1 font-medium text-gray-600">Month</label>
            <select
              value={tempMonth}
              onChange={e => setTempMonth(+e.target.value)}
              className="border rounded p-2 bg-white text-sm"
            >
              {availableMonths.map((m, idx) => (
                <option key={idx} value={idx + 1}>{m}</option>
              ))}
            </select>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <button
              onClick={() => { setOpen(false); setTempYear(year); setTempMonth(month); }}
              className="text-sm text-gray-600 hover:underline"
            >
              Cancel
            </button>
            <button
              onClick={handleOk}
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

export default YearMonthPopupFilter;
