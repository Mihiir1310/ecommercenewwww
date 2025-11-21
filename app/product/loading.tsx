export default function Loading() {
  return (
    <div className="max-w-3xl mx-auto p-6 animate-pulse">
      <div className="w-full h-64 bg-gray-300 rounded mb-4"></div>
      <div className="h-6 bg-gray-300 w-1/2 mb-2 rounded"></div>
      <div className="h-4 bg-gray-200 w-1/3 mb-4 rounded"></div>
      <div className="h-8 bg-gray-300 w-1/4 rounded mt-4"></div>
    </div>
  );
}

