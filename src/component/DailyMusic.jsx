import React from "react";
import logo from "../Images/logo.png";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";

const DailyMusic = ({ token }) => {
  const navigate = useNavigate();

  const goToSessions = () => {
    if (token) {
      navigate("/show-sessions");
    } else {
      navigate("/login");
    }
  };

  return (
    <section className="bg-gradient-to-br from-primary-800 to-primary-900 h-screen">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7 animate-fadeIn">
          <h1 className="text-5xl font-bold text-left text-primary-50 mb-4">
            Bienvenue sur <span className="text-accent-500">DailyMusic</span>!
          </h1>
          <p className="text-left max-w-2xl mb-6 font-normal text-primary-300 lg:mb-8 md:text-lg lg:text-xl leading-relaxed">
            DailyMusic est une plateforme unique où la musique rencontre la
            démocratie! Chaque jour, découvrez des sessions de vote par
            catégories comme "Musique Française", "Rap US", et bien plus. Les
            utilisateurs peuvent voter pour leurs chansons préférées et explorer
            les nouvelles tendances musicales.
          </p>
          <button
            className="flex justify-center align-bottom items-center gap-4 bg-white p-2 rounded-full"
            onClick={goToSessions}
          >
            <span className="">Voir les sessions</span>
            <FontAwesomeIcon
              size="2x" 
              icon={faCirclePlay}
              className=" text-primary animate-pulse"
            />
          </button>
        </div>

        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex animate-slideIn">
          <img
            src={logo}
            alt="DailyMusic Logo"
            className="max-w-full h-auto animate-spinSlow"
          />
        </div>
      </div>
    </section>
  );
};

export default DailyMusic;
