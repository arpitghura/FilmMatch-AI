"use client";

import Link from "next/link";
import { getLocalStorage, setLocalStorage } from "@/lib/storageHelper";
import { useState, useEffect } from "react";

export default function CookieBanner() {
  const [cookieConsent, setCookieConsent] = useState(true);

  useEffect(() => {
    const storedCookieConsent = getLocalStorage("cookie_consent", null);

    setCookieConsent(storedCookieConsent);
  }, [setCookieConsent]);

  // useEffect(() => {
  //   const newValue = cookieConsent ? "granted" : "denied";

  //   window.gtag("consent", "update", {
  //     analytics_storage: newValue,
  //   });

  //   setLocalStorage("cookie_consent", cookieConsent);
  // }, [cookieConsent]);

  useEffect(()=> {
    
    // window.gtag("consent", "update", {
    //   analytics_storage: 'granted',
    // });

    setLocalStorage("cookie_consent", cookieConsent);
  }, []);
  return (
    <div
      className={`mx-auto max-w-max md:max-w-screen-sm fixed bottom-0 left-0 right-0 
                  flex px-3 md:px-4 py-2 justify-between flex-row 
                  gap-4 bg-gray-800 rounded-t-lg shadow z-50
                  ${cookieConsent !== null ? "hidden" : "flex"}`}
    >
      <div className="text-sm  text-gray-200">
        {/* <Link href="/info/cookies"> */}
          <p>
            We use cookies on our site to improve your experience.
          </p>
        {/* </Link> */}
      </div>

      {/* close button to unmount the componemt */}
      <button
        className="text-gray-200 text-sm"
        onClick={() => setCookieConsent(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* <div className="flex gap-2">
        <button
          className="px-5 py-2 text-gray-300 rounded-md border-gray-900"
          onClick={() => setCookieConsent(false)}
        >
          Decline
        </button>
        <button
          className="bg-gray-900 px-5 py-2 text-white-200 rounded-lg"
          onClick={() => setCookieConsent(true)}
        >
          Allow Cookies
        </button>
      </div> */}
    </div>
  );
}
