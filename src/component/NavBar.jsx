import React, { useEffect, useState } from "react";
import logo from "../Images/logo.png";
import { decodeToken } from "../services/tokenService";
import Logout from "./Logout";

const NavBar = ({ userRole, token }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-primary-500 border-gray-200 shadow font-heading text-accent-800">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a
          href="/home"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={logo} className="h-20" alt="DailyMusic Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-accent-900">
            DailyMusic
          </span>
        </a>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-accent-800 rounded-lg md:hidden"
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {isMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } w-full md:block md:w-auto`}
          id="navbar-default"
        >
          <ul
            className={`${
              isMenuOpen
                ? "flex flex-col items-start"
                : "flex  md:flex-row gap-5"
            }`}
          >
            <li>
              <a
                href="/home"
                className="block py-2 px-3 text-accent-800 text-xl  rounded md:hover:bg-transparent md:border-0 md:hover:text-accent-900 md:p-0"
                aria-current="page"
              >
                Accueil
              </a>
            </li>

            {userRole === "admin" && (
              <li>
                <a
                  href="/create-sessions"
                  className="block py-2 px-3 text-accent-800 text-xl rounded md:hover:bg-transparent md:border-0 md:hover:text-accent-900 md:p-0"
                >
                  Ajouter une session
                </a>
              </li>
            )}

            {token && (
              <div className="flex gap-5">
                <li>
                  <a
                    href="/show-sessions"
                    className="block py-2 px-3 text-accent-800 text-xl rounded md:hover:bg-transparent md:border-0 md:hover:text-accent-900 md:p-0"
                  >
                    Voir les sessions
                  </a>
                </li>
              </div>
            )}

            <li>
              <a
                href="/contact"
                className="block py-2 px-3 text-accent-800  text-xl rounded md:hover:bg-transparent md:border-0 md:hover:text-accent-900 md:p-0"
              >
                Contact
              </a>
            </li>

            {!token && (
              <div className="flex gap-5">
                <li>
                  <a
                    href="/login"
                    className="block py-2 px-3 text-accent-800  text-xl rounded md:hover:bg-transparent md:border-0 md:hover:text-accent-900 md:p-0"
                  >
                    Se connecter
                  </a>
                </li>
                <li>
                  <a
                    href="/register"
                    className="block py-2 px-3 text-accent-800  text-xl rounded md:hover:bg-transparent md:border-0 md:hover:text-accent-900 md:p-0"
                  >
                    S'inscrire
                  </a>
                </li>
              </div>
            )}

            {token && (
              <li>
                <a
                  href="/home"
                  className="block py-2 px-3 text-accent-800  text-xl rounded md:hover:bg-transparent md:border-0 md:hover:text-accent-900 md:p-0"
                >
                  <Logout></Logout>
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
