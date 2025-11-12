import React from "react";

function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow">
        <h1 className="text-3xl font-bold mb-4">About This Project</h1>
        <p className="text-gray-600 mb-4">
          This Job Board Dashboard is built with:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>React + TypeScript</li>
          <li>React Query (data fetching & caching)</li>
          <li>React Router (navigation)</li>
          <li>Tailwind CSS (styling)</li>
          <li>The Muse API (job data)</li>
        </ul>
      </div>
    </div>
  );
}

export default AboutPage;
