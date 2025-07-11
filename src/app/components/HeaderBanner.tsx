import React from "react";

const HeaderBanner: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-sky-400 to-cyan-300 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-6 text-center">
        <h1 className="text-3xl font-bold">Cab Demand Forecasting</h1>
        <p className="mt-1 text-sm">
          Quickly visualize your historical data and forecast future needs.
        </p>
        <div className="mt-4 flex justify-center gap-4">
          <button className="bg-white text-black px-4 py-2 rounded shadow hover:bg-gray-100">
            Upload Data
          </button>
          <button className="bg-white text-black px-4 py-2 rounded border border-blue-400 hover:bg-blue-50">
            Download Report
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeaderBanner;
