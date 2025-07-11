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
  const currentYear = new Date().getFullYear();
  const start = currentYear - range.past;
  const end = currentYear + range.future;
  const years = Array.from({ length: end - start + 1 }, (_, i) => start + i);
  const months = [
    'Jan','Feb','Mar','Apr','May','Jun',
    'Jul','Aug','Sep','Oct','Nov','Dec'
  ];

  const [open, setOpen] = useState(false);
  const [tempYear, setTempYear] = useState(year);
  const [tempMonth, setTempMonth] = useState(month);

  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (open && ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setTempYear(year);
        setTempMonth(month);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [open, year, month]);

  const confirm = () => {
    onChange(tempYear, tempMonth);
    setOpen(false);
  };

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="border border-gray-300 rounded-md px-3 py-2 bg-white text-sm shadow-sm hover:bg-gray-50"
      >
        {months[month-1]} {year}
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-48 bg-gradient-to-r from-purple-50 via-pink-50 to-yellow-50 rounded-md shadow-lg p-4">
          <div className="flex flex-col gap-4">
            {/* Year */}
            <div className="flex flex-col text-sm">
              <label className="mb-1 font-medium text-gray-600">Year</label>
              <select
                value={tempYear}
                onChange={(e) => setTempYear(+e.target.value)}
                className="border rounded p-2 text-sm bg-white"
              >
                {years.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
            {/* Month */}
            <div className="flex flex-col text-sm">
              <label className="mb-1 font-medium text-gray-600">Month</label>
              <select
                value={tempMonth}
                onChange={(e) => setTempMonth(+e.target.value)}
                className="border rounded p-2 text-sm bg-white"
              >
                {months.map((m, idx) => (
                  <option key={idx} value={idx+1}>{m}</option>
                ))}
              </select>
            </div>
            {/* Actions */}
            <div className="flex justify-end gap-2 mt-2">
              <button
                onClick={() => { setOpen(false); setTempYear(year); setTempMonth(month); }}
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
        </div>
      )}
    </div>
  );
};

export default YearMonthPopupFilter;
