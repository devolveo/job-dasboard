function HomePages() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center max-w-2xl">
        {/* Heading - Responsive text size */}
        <h1 className="text-3xl md:text-5xl font-bold text-blue-600 mb-4">
          Job Board Dashboard
        </h1>

        <p className="text-base md:text-xl text-gray-600 mb-8">
          Find your dream job today
        </p>

        <a
          href="/jobs"
          className="inline-block bg-blue-600 text-white px-6 py-2 md:px-8 md:py-3 rounded-lg font-semibold hover:bg-blue-700 transition-smooth transform hover:scale-105 shadow-md hover:shadow-lg"
        >
          Browse Jobs →
        </a>
      </div>
    </div>
  );
}

export default HomePages;
