import React, { useEffect, useState } from "react";
import NavBar from "../component/NavBar";
import { useForm, ValidationError } from "@formspree/react";
import { decodeToken } from "../services/tokenService";

const ContactPages = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [state, handleSubmit] = useForm("mnqejvya");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userRole, setUserRole] = useState(null);
  const [succesForm, setSuccesForm] = React.useState(false);
  useEffect(() => {
    if (token) {
      const decodedToken = decodeToken(token);
      if (decodedToken) {
        setUserRole(decodedToken.role);
      }
    }
  }, [token]);
  useEffect(() => {
    if (state.succeeded) {
      setSuccesForm(true);
    }
  }, [state.succeeded]);

  return (
    <>
      <NavBar token={token} userRole={userRole}></NavBar>

      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-primary-800 to-primary-900">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg p-8 bg-white/10 backdrop-blur-md rounded shadow-lg"
        >
          <div className="mb-6">
            <label
              className="block text-white text-lg font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>

            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <ValidationError prefix="Name" field="name" errors={state.errors} />
          </div>
          <div className="mb-6">
            <label
              className="block text-white text-lg font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-white text-lg font-bold mb-2"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="message"
              name="message"
              placeholder="Enter your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
            />
          </div>
          <button
            className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
          {succesForm && (
            <p className="text-white mt-4">Message envoyé avec succès</p>
          )}
        </form>
      </div>
    </>
  );
};

export default ContactPages;
