"use client";
import React, { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LabelList,
} from "recharts";
import { FaUserFriends, FaCarSide, FaBus, FaPercentage } from "react-icons/fa";

import HeaderBanner from "./HeaderBanner";
import KPIBox from "./KPIBox";
import YearMonthPopupFilter from "./YearMonthPopupFilter";
import YearWeekFilter from "./YearWeekFilter";
import WeeklyTrend from "./WeeklyTrend";
// import MapSection from "./MapSection";
import dynamic from "next/dynamic";
// dynamically import MapSection, disabling SSR
const MapSection = dynamic(
  () => import("./MapSection"),
  { ssr: false }
);
const monthNames = [
  "Jan","Feb","Mar","Apr","May","Jun",
  "Jul","Aug","Sep","Oct","Nov","Dec"
];

// ISO‐week helper
function getDateOfISOWeek(w: number, y: number) {
  const d = new Date(Date.UTC(y, 0, 1 + (w - 1) * 7));
  const day = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 1 - day + (day <= 4 ? 0 : 7));
  return d;
}

// format "MMM d"
const fmt = (d: Date) =>
  d.toLocaleDateString(undefined, { month: "short", day: "numeric" });

const KPIDashboard: React.FC = () => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const defaultHistMonth = today.getMonth() + 1;

  // — Historical Filters —
  const [showHistFilters, setShowHistFilters] = useState(false);
  const [histShift, setHistShift] = useState("Morning");
  const [histYear, setHistYear] = useState(currentYear);
  const [histMonth, setHistMonth] = useState(defaultHistMonth);
  const [histEventType, setHistEventType] = useState("Login");

  // — Forecast Filters —
  const [showFcFilters, setShowFcFilters] = useState(false);
  const [fcShift, setFcShift] = useState("Morning");
  const [fcYear, setFcYear] = useState(currentYear);
  const [fcWeeks, setFcWeeks] = useState<number[]>([]);
  const [fcEventType, setFcEventType] = useState("Login");

  // Memoized historical bar‐chart data
  const histData = useMemo(() => {
    const days = new Date(histYear, histMonth, 0).getDate();
    return Array.from({ length: days }, (_, i) => {
      const d = new Date(histYear, histMonth - 1, i + 1);
      return {
        date: fmt(d),
        noShows: Math.floor(Math.random() * 10),
      };
    });
  }, [histShift, histYear, histMonth, histEventType]);

  // Memoized forecast weekly‐trend elements
  const fcTrendElements = useMemo(() => {
    return fcWeeks.map((w) => {
      const mon = getDateOfISOWeek(w, fcYear);
      const labels = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(mon);
        d.setDate(d.getDate() + i);
        const day = d.toLocaleDateString(undefined, { weekday: "short" });
        const month = d.toLocaleDateString(undefined, { month: "short" });
        const date = d.getDate();           // numeric day
        return `${day} ${month} ${date}`;   // e.g. "Mon Jul 29"
      });
      const values = labels.map(() => Math.floor(Math.random() * 10));
      return (
        <WeeklyTrend
          key={w}
          week={`W${w}`}
          color="red"
          values={values}
          labels={labels}
        />
      );
    });
  }, [fcShift, fcYear, fcWeeks, fcEventType]);

  // Memoized MapSection
  const memoMapSection = useMemo(
    () => (
      <MapSection
        shift={fcShift}
        year={fcYear}
        weeks={fcWeeks}
        eventType={fcEventType}
      />
    ),
    [fcShift, fcYear, fcWeeks, fcEventType]
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <HeaderBanner />

      <div className="max-w-7xl mx-auto px-[50px] py-8 space-y-10">
        {/* Historical Filter */}
        <div className="border rounded-md shadow-sm bg-white">
          <div
            className="flex justify-between items-center px-4 py-2 cursor-pointer"
            onClick={() => setShowHistFilters((f) => !f)}
          >
            <span className="font-medium text-gray-700">Filter</span>
            <svg
              className={`w-4 h-4 text-gray-500 transform transition-transform ${
                showHistFilters ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          {showHistFilters && (
            <div className="px-4 py-4 border-t bg-gradient-to-r from-blue-50 to-cyan-50 shadow-md rounded-b-lg flex flex-wrap gap-6">
              {/* Shift */}
              <div className="flex flex-col text-sm w-full md:w-[30%]">
                <label className="mb-1 font-medium text-gray-600">Shift</label>
                <select
                  className="border rounded p-2 bg-white"
                  value={histShift}
                  onChange={(e) => setHistShift(e.target.value)}
                >
                  {["Morning","General","Midday","Night"].map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
              {/* Month-Year */}
              <div className="flex flex-col items-center text-sm w-full md:w-[30%]">
                <label className="mb-1 font-medium text-gray-600">Month &amp; Year</label>
                <YearMonthPopupFilter
                  year={histYear}
                  month={histMonth}
                  onChange={(y, m) => {
                    setHistYear(y);
                    setHistMonth(m);
                  }}
                  range={{ past: 5, future: 2 }}
                />
              </div>
              {/* Event Type */}
              <div className="flex flex-col text-sm w-full md:w-[30%]">
                <label className="mb-1 font-medium text-gray-600">Event Type</label>
                <select
                  className="border rounded p-2 bg-white"
                  value={histEventType}
                  onChange={(e) => setHistEventType(e.target.value)}
                >
                  {["Login","Logout"].map((et) => (
                    <option key={et}>{et}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Historical Card */}
        <div className="rounded-lg p-6 bg-gradient-to-r from-blue-50 to-cyan-50 shadow space-y-6">
          <h2 className="text-xl font-semibold text-blue-600 text-center">
            Historical ({monthNames[histMonth - 1]} {histYear})
          </h2>
          {/* KPI Tiles */}
          <div className="flex flex-wrap justify-center gap-4">
            <KPIBox icon={<FaUserFriends />} title="Employees Booked" value={1200} color="blue" />
            <KPIBox icon={<FaCarSide />} title="3-Seater Rides" value={50} color="blue" />
            <KPIBox icon={<FaCarSide />} title="5-Seater Rides" value={75} color="blue" />
            <KPIBox icon={<FaBus />} title="8-Seater Rides" value={20} color="blue" />
            <KPIBox icon={<FaPercentage />} title="No-Show Rate %" value={5} color="blue" />
          </div>

          {/* Monthly Chart */}
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={histData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 10 }}
                  interval={0}
                  angle={-45}
                  textAnchor="end"
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="noShows" fill="#60A5FA">
                  <LabelList dataKey="noShows" position="top" style={{ fontSize: 10, fill: "#1E3A8A" }} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Forecast */}
        <div className="space-y-4">
          {/* Filters */}
          <div className="border rounded-md shadow-sm bg-white">
            <div
              className="flex justify-between items-center px-4 py-2 cursor-pointer"
              onClick={() => setShowFcFilters((f) => !f)}
            >
              <span className="font-medium text-gray-700">Filter</span>
              <svg
                className={`w-4 h-4 text-gray-500 transform transition-transform ${
                  showFcFilters ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {showFcFilters && (
              <div className="px-4 py-4 border-t bg-gradient-to-r from-red-50 to-pink-50 shadow-md rounded-b-lg flex flex-wrap gap-6">
                <div className="flex flex-col text-sm w-full md:w-[30%]">
                  <label className="mb-1 font-medium text-gray-600">Shift</label>
                  <select
                    className="border rounded p-2 bg-white"
                    value={fcShift}
                    onChange={(e) => setFcShift(e.target.value)}
                  >
                    {["Morning","General","Midday","Night"].map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col items-center text-sm w-full md:w-[30%]">
                  <label className="mb-1 font-medium text-gray-600">Year &amp; Weeks</label>
                  <YearWeekFilter
                    year={fcYear}
                    weeks={fcWeeks}
                    onChange={(y, ws) => { setFcYear(y); setFcWeeks(ws); }}
                    range={{ past: 5, future: 2 }}
                  />
                </div>
                <div className="flex flex-col text-sm w-full md:w-[30%]">
                  <label className="mb-1 font-medium text-gray-600">Event Type</label>
                  <select
                    className="border rounded p-2 bg-white"
                    value={fcEventType}
                    onChange={(e) => setFcEventType(e.target.value)}
                  >
                    {["Login","Logout"].map((et) => (
                      <option key={et}>{et}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Forecast Card */}
          <div className="rounded-lg p-6 bg-gradient-to-r from-red-50 to-pink-50 shadow space-y-6">
            <h2 className="text-xl font-semibold text-red-600 text-center">
              Forecast ({fcWeeks.map((w) => `W${w}`).join(", ")})
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <KPIBox icon={<FaUserFriends />} title="Employees Forecast" value={1300} color="red" />
              <KPIBox icon={<FaCarSide />} title="3-Seater Forecast" value={60} color="red" />
              <KPIBox icon={<FaCarSide />} title="5-Seater Forecast" value={80} color="red" />
              <KPIBox icon={<FaBus />} title="8-Seater Forecast" value={25} color="red" />
              <KPIBox icon={<FaPercentage />} title="No-Show Forecast %" value={4} color="red" />
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {fcTrendElements}
            </div>
          </div>
        </div>

        {/* Map */}
        {memoMapSection}
      </div>
    </div>
  );
};

export default KPIDashboard;
