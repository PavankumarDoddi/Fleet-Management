import "./globals.css";
import React from "react";

export const metadata = {
  title: "KPI Dashboard",
  description: "Forecast vs Historical metrics",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-800 min-h-screen flex flex-col">
        {/* Main layout */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <footer className="bg-white border-t text-gray-600 text-sm text-center py-4 shadow-inner">
          &copy; {new Date().getFullYear()} FinYatra — Visualize. Forecast. Improve.
        </footer>
      </body>
    </html>
  );
}
