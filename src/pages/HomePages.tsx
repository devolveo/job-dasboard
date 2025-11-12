import React from "react";

function HomePages() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-blue-600 mb-4">
          💼 Job Board Dashboard
        </h1>
        <p className="text-xl text-gray-600 mb-8">Find your dream job today</p>

        <a
          href="/jobs"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Browse Jobs →
        </a>
      </div>
    </div>
  );
}

export default HomePages;
