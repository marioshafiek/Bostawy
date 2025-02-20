import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-[450px]">
      <div className="w-16 h-16 border-4 border-[#e30715] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
