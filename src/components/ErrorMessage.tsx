interface ErrorMessageProps {
  error: Error;
  onRetry: () => void;
}

function ErrorMessage({ error, onRetry }: ErrorMessageProps) {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Available Jobs</h1>

        <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-md mx-auto">
          {/* Error Icon */}
          <div className="text-6xl mb-4">⚠️</div>

          {/* Error Title */}
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Oops! Something went wrong
          </h2>

          {/* Error Message */}
          <p className="text-gray-600 mb-6">
            Failed to load jobs. Please check your connection and try again.
          </p>

          {/* Technical Error (for debugging) */}
          <div className="bg-red-50 border border-red-200 rounded p-3 mb-6">
            <p className="text-sm text-red-700 font-mono">{error.message}</p>
          </div>

          {/* Retry Button */}
          <button
            onClick={onRetry}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
          >
            <span>🔄</span>
            <span>Try Again</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorMessage;
