import React from "react";

interface WeeklyTrendProps {
  week: string;        // e.g. "W32"
  color: "blue" | "red";
  values: number[];    // counts per day
  labels: string[];    // now strings like "Mon Jul 29"
  maxBarHeight?: number;
}

const WeeklyTrend: React.FC<WeeklyTrendProps> = ({
  week,
  color,
  values,
  labels,
  maxBarHeight = 120,
}) => {
  const barBg = color === "blue" ? "bg-blue-400" : "bg-red-400";
  const textColor = color === "blue" ? "text-blue-700" : "text-red-700";
  const maxVal = Math.max(...values, 1);

  return (
    <div className="flex flex-col items-center bg-white rounded-lg shadow-md px-4 py-3 w-60">
      {/* Week header */}
      <div className={`text-sm font-semibold mb-2 ${textColor}`}>{week}</div>

      {/* Bars */}
      <div className="flex items-end justify-around h-[140px] w-full">
        {values.map((val, i) => {
          const heightPx = (val / maxVal) * maxBarHeight;
          // split into [weekday, month, date]
          const parts = labels[i].split(" ");
          return (
            <div key={i} className="flex flex-col items-center w-6">
              <div className="text-xs font-semibold mb-1">{val}</div>
              <div
                className={`${barBg} w-full rounded-t transition-all`}
                style={{ height: `${heightPx}px`, minHeight: "4px" }}
              />
              {/* three‐line label */}
              <div className="text-xs mt-1 text-gray-600 text-center leading-tight">
                {parts.map((p, idx) => (
                  <span key={idx} className="block">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeeklyTrend;
