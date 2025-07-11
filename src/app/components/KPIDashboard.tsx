import React, { useState } from 'react';
import HeaderBanner from './HeaderBanner';
import YearMonthPopupFilter from './YearMonthPopupFilter';
import KPIBox from './KPIBox';
import WeeklyTrend from './WeeklyTrend';
import { FaUserFriends, FaCarSide, FaBus, FaPercentage } from 'react-icons/fa';

const monthNames = [
  'Jan','Feb','Mar','Apr','May','Jun',
  'Jul','Aug','Sep','Oct','Nov','Dec'
];

const KPIDashboard: React.FC = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [year, setYear]     = useState(new Date().getFullYear());
  const [month, setMonth]   = useState(new Date().getMonth() + 1);
  const [shift, setShift]   = useState('Morning');
  const [eventType, setEventType] = useState('Login');

  return (
    <div className="bg-gray-50 min-h-screen">
      <HeaderBanner />

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
        {/* Filter Root */}
        <div className="w-full">
          <div className="border rounded-md shadow-sm bg-white">
            {/* Toggle Header */}
            <div
              className="flex justify-between items-center px-4 py-2 cursor-pointer"
              onClick={() => setShowFilters(prev => !prev)}
            >
              <span className="font-medium text-gray-700">Filter</span>
              <svg
                className={`w-4 h-4 text-gray-500 transform transition-transform duration-200 ${
                  showFilters ? 'rotate-180' : 'rotate-0'
                }`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M19 9l-7 7-7-7" />
              </svg>
            </div>

             {/* Popup Filter Controls */}
            {showFilters && (
              <div className="px-4 py-4 border-t bg-gradient-to-r from-purple-50 via-pink-50 to-yellow-50 shadow-md rounded-b-lg flex flex-wrap justify-between gap-6">
                {/* Shift */}
                <div className="flex flex-col text-sm w-full md:w-[30%]">
                  <label className="mb-1 font-medium text-gray-600">Shift Timings</label>
                  <select
                    value={shift}
                    onChange={e => setShift(e.target.value)}
                    className="border rounded p-2 bg-white text-sm"
                  >
                    {['Morning','General','Midday','Night'].map(s => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* Month & Year Popup */}
                <div className="flex flex-col items-center text-sm w-full md:w-[30%]">
                  <label className="mb-1 font-medium text-gray-600">Select Month & Year</label>
                  <YearMonthPopupFilter
                    year={year}
                    month={month}
                    onChange={(y,m) => { setYear(y); setMonth(m); }}
                    range={{ past: 10, future: 2 }}
                  />
                </div>

                {/* Event Type */}
                <div className="flex flex-col text-sm w-full md:w-[30%]">
                  <label className="mb-1 font-medium text-gray-600">Event Type</label>
                  <select
                    value={eventType}
                    onChange={e => setEventType(e.target.value)}
                    className="border rounded p-2 bg-white text-sm"
                  >
                    <option>Login</option>
                    <option>Logout</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Historical Section */}
        <div className="rounded-lg p-6 bg-gradient-to-r from-blue-50 to-cyan-50 shadow">
          <h2 className="text-xl font-semibold text-blue-600 text-center mb-4">
            Historical ({monthNames[month - 1]} {year})
          </h2>
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <KPIBox icon={<FaUserFriends />} title="Employees Booked" value={1200} color="blue" />
            <KPIBox icon={<FaCarSide />} title="3-Seater Rides" value={50} color="blue" />
            <KPIBox icon={<FaCarSide />} title="5-Seater Rides" value={75} color="blue" />
            <KPIBox icon={<FaBus />} title="8-Seater Rides" value={20} color="blue" />
            <KPIBox icon={<FaPercentage />} title="No-Show Rate %" value={5} color="blue" />
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {[1,2,3,4].map(w => (
              <WeeklyTrend key={w} week={`Week ${w}`} color="blue" />
            ))}
          </div>
        </div>

        {/* Forecast Section */}
        <div className="rounded-lg p-6 bg-gradient-to-r from-red-50 to-pink-50 shadow">
          <h2 className="text-xl font-semibold text-red-600 text-center mb-4">
            Forecast
          </h2>
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <KPIBox icon={<FaUserFriends />} title="Employees Forecast" value={1300} color="red" />
            <KPIBox icon={<FaCarSide />} title="3-Seater Forecast" value={60} color="red" />
            <KPIBox icon={<FaCarSide />} title="5-Seater Forecast" value={80} color="red" />
            <KPIBox icon={<FaBus />} title="8-Seater Forecast" value={25} color="red" />
            <KPIBox icon={<FaPercentage />} title="No-Show Forecast %" value={4} color="red" />
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {[1,2,3,4].map(w => (
              <WeeklyTrend key={w} week={`Week ${w}`} color="red" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KPIDashboard;
