import React from "react";
import NavBar from "../component/NavBar";

const Pages404 = () => {
  return (
    <>
      <NavBar></NavBar>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-4xl font-bold text-gray-800">404</h1>
        <p className="text-gray-600">Page not found</p>
      </div>
    </>
  );
};

export default Pages404;
