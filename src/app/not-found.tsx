"use client"; // Error components must be Client components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="text-xl text-gray-600 font-semibold mb-2 text-center mt-10">
      <h2>문제가 발생했어요!</h2>
      {/* <button
        className="w-32 rounded-lg shadow-md p-3 bg-white hover:shadow-lg transition-shadow transform hover:-translate-y-1 cursor-pointer mt-10"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        홈으로
      </button> */}
    </div>
  );
}
