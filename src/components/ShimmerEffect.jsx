const ShimmerCardH = () => {
  return (
    <div className="bg-gray-100 rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between">
        {/* Left side — text placeholders */}
        <div className="flex-1">
          <div className="h-4 w-3/4 mb-3 rounded shimmer"></div>
          <div className="h-6 w-1/4 rounded shimmer"></div>
        </div>

        {/* Right side — circular profile placeholder */}
        <div className="w-16 h-16 rounded-full ml-6 shimmer"></div>
      </div>
    </div>
  );
};

const ShimmerCardV = () => (
  <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
    <div className="flex items-center justify-center mb-6">
      <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
    </div>
    <div className="h-6 bg-gray-300 rounded w-1/2 mx-auto mb-4"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
    <div className="space-y-2">
      <div className="h-3 bg-gray-200 rounded w-3/4 mx-auto"></div>
    </div>
  </div>
);

const ShimmerTable = () => (
  <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
    <div className="h-8 bg-gray-300 rounded w-1/3 mb-6"></div>
    <div className="space-y-3">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex space-x-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/5"></div>
        </div>
      ))}
    </div>
  </div>
);

export { ShimmerCardH, ShimmerCardV, ShimmerTable };
