import React, { useState } from "react";

const Explication = ({ text }) => {
  const [show, setShow] = useState(true);

  return (
    show && (
      <div className="bg-white/10 backdrop-blur-md rounded p-4 mx-auto italic mt-8 w-3/4 relative">
        <button 
          className="absolute top-0 right-0 text-red-700 font-bold p-2"
          onClick={() => setShow(false)}
        >
          &#10005; 
        </button>
        {text}
      </div>
    )
  );
};

export default Explication;
