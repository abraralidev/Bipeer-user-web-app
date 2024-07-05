import React, { useEffect, useState } from "react";

const GoogleTranslateButton = () => {
  const [currentLanguage, setCurrentLanguage] = useState("en");

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Load Google Translate script
      const script = document.createElement("script");
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);

      // Initialize Google Translate element
      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: currentLanguage, // Use current language state
            autoDisplay: false,
            gaTrack: false, // Disable Google Analytics tracking
            layout:
              window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            multilanguagePage: true,
          },
          "google_translate_element"
        );
      };
    }
  }, [currentLanguage]);

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === "en" ? "es" : "en";
    setCurrentLanguage(newLanguage);

    if (typeof window !== "undefined") {
      // Update Google Translate element with new language
      window.google.translate.TranslateElement({
        pageLanguage: newLanguage,
        autoDisplay: true,
        gaTrack: false, // Disable Google Analytics tracking
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        multilanguagePage: true,
      });
    }
  };

  // Custom CSS to hide attribution text
  useEffect(() => {
    const style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = `
      .goog-te-logo {
        display: none !important;
      }

      .goog-te-gadget img{
      display: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <button onClick={toggleLanguage}>
      {/* {currentLanguage === "en" ? "EN" : "ES"} */}
    </button>
  );
};

export default GoogleTranslateButton;
