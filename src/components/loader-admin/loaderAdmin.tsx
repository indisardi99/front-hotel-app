
import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="border-t-4 border-blue-500 border-solid rounded-full h-16 w-16 animate-spin"></div>
    </div>
  );
};

export default Loader;
