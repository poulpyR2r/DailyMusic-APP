import React, { useEffect, useState } from "react";
import { decodeToken } from "../services/tokenService";
import logo from "../Images/logo.png";
import Logout from "./Logout";

const Profil = ({ token }) => {
  const [name, setName] = useState(null);
  const [mail, setMail] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (token) {
      const decodedToken = decodeToken(token);
      if (decodedToken) {
        console.log(decodedToken);
        setName(decodedToken.name);
        setMail(decodedToken.email);
      }
    }
  }, [token]);

  const handleOpenMenu = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const twoFirestLetter = name ? name.slice(0, 2) : "";

  return (
    <>
      <div
        className="w-10 h-10 rounded-full cursor-pointer bg-white/10 backdrop-blur-md flex items-center justify-center text-white"
        onClick={handleOpenMenu}
      >
        {twoFirestLetter.toUpperCase()}
      </div>
      {isOpen && (
        <div
          id="userDropdown"
          className="absolute bg-white/10 backdrop-blur-md divide-y divide-gray-100 rounded-lg shadow w-44 text-white mt-5"
        >
          <div className="px-4 py-3 text-sm">
            <div>{name}</div>
          </div>
          <div className="px-4 py-3 text-sm truncate">
            <div className="">{mail}</div>
          </div>
          <div className="px-4 py-3 text-sm">
            <Logout></Logout>
          </div>
        </div>
      )}
    </>
  );
};

export default Profil;
