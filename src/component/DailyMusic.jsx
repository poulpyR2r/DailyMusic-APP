import React from "react";
import logo from "../Images/logo.png";
import { useNavigate } from "react-router-dom";

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
    <section class="bg-secondary-100  h-screen">
      <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div class="mr-auto place-self-center lg:col-span-7">
          <h1 class=" text-4xl  text-left font-heading ">
            Bienvenue sur DailyMusic !
          </h1>
          <p class=" text-left max-w-2xl mb-6 font-light text-accent-600 lg:mb-8 md:text-lg lg:text-xl ">
            DailyMusic est une plateforme unique où la musique rencontre la
            démocratie ! Chaque jour, découvrez des sessions de vote par
            catégories comme "Musique Française", "Rap US", et bien plus. Les
            utilisateurs peuvent voter pour leurs chansons préférées et explorer
            les nouvelles tendances musicales.
          </p>
          <div className="flex">
            <button
              class="bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded flex align-middle items-center"
              onClick={goToSessions}
            >
              <p>Voir les sessions </p>
              <svg
                class="w-5 h-5 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <img src={logo} alt="mockup" />
        </div>
      </div>
    </section>
  );
};

export default DailyMusic;
