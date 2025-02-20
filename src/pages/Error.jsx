import React from 'react';
import { Link, useRouteError } from 'react-router-dom';

const Error = () => {
    const error = useRouteError();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-9xl font-bold text-[#e30715] mb-4">{error.status}</h1>
      <h1 className="text-5xl font-bold text-[#e30715] mb-4">Oops!</h1>
      <div className='flex flex-col items-center gap-4 pb-4'>
        <div className="text-xl text-gray-700">
          {error.statusText}
        </div>
        <div className="text-xl text-gray-700 font-bold">HIRE ME &#128549; TO COMPLETE THIS PAGE</div>
      </div>
      <Link
        to="/"
        replace={true}
        className="px-6 py-3 border border-[#e30715] text-black rounded hover:bg-[#e30715] hover:text-white transition"
      >
        Go Home
      </Link>
    </div>
  );
};

export default Error;
