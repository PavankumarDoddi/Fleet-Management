import React from "react";

interface WeeklyTrendProps {
  week: string;
  color: "blue" | "red";
}

const WeeklyTrend: React.FC<WeeklyTrendProps> = ({ week, color }) => {
  const barColor = color === "blue" ? "bg-blue-300" : "bg-red-300";

  return (
    <div className="flex flex-col items-center bg-white rounded-md shadow-sm px-4 py-2 w-56">
      <div className="text-sm font-medium mb-2">{week}</div>
      <div className="flex items-end gap-1 h-24 w-full justify-center">
        {[1, 2, 3, 4, 5].map((_, idx) => (
          <div
            key={idx}
            className={`${barColor} w-2 rounded transition-transform hover:scale-105`}
            style={{ height: `${40 + idx * 8}px` }}
          />
        ))}
      </div>
    </div>
  );
};

export default WeeklyTrend;
