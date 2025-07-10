import React from "react";

interface KPIBoxProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  color: "blue" | "red";
}

const KPIBox: React.FC<KPIBoxProps> = ({ icon, title, value, color }) => {
  const borderColor =
    color === "blue"
      ? "border-blue-300 text-blue-600"
      : "border-red-300 text-red-600";

  return (
    <div
      className={`flex flex-col items-center justify-center p-4 rounded-md border ${borderColor} shadow-sm w-44 h-28 bg-white`}
    >
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-xl font-semibold">{value}</div>
      <div className="text-sm text-center">{title}</div>
    </div>
  );
};

export default KPIBox;
