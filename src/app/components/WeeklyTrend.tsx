import React from "react";

interface WeeklyTrendProps {
  week: string;
  color: "blue" | "red";
  values: number[];
  labels: string[];
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
      <div className={`text-sm font-semibold mb-2 ${textColor}`}>{week}</div>
      <div className="flex items-end justify-around h-[140px] w-full">
        {values.map((val, i) => {
          const heightPx = (val / maxVal) * maxBarHeight;
          return (
            <div key={i} className="flex flex-col items-center w-6">
              <div className="text-xs font-semibold mb-1">{val}</div>
              <div
                className={`${barBg} w-full rounded-t transition-all`}
                style={{ height: `${heightPx}px`, minHeight: "4px" }}
              />
              <div className="text-xs mt-1 text-gray-600">{labels[i]}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeeklyTrend;
