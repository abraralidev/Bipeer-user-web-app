import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "next-i18next";

const HomePage = () => {
  const { locale, locales, push } = useRouter();
  const { t, i18n } = useTranslation("common");

  React.useEffect(() => {
    console.log("Locale:", locale);
    console.log("Current Language:", i18n.language);
    console.log("Translation:", t("title"));
  }, [locale, i18n, t]);

  const handleClick = (l) => {
    push("/HomePage", undefined, { locale: l });
  };

  return (
    <div>
      <h1>{locale}</h1>
      <h1>{t("title")}</h1>
      {locales.map((l) => (
        <button key={l} onClick={() => handleClick(l)}>
          {l}
        </button>
      ))}
    </div>
  );
};

export default HomePage;
