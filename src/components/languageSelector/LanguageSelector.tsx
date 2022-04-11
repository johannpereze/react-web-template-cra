import { useTranslation } from "react-i18next";

interface Lngs {
  en: Lang;
  es: Lang;
}

interface Lang {
  nativeName: string;
}

const lngs: Lngs = {
  en: { nativeName: "English" },
  es: { nativeName: "Spanish" },
};

export default function LanguageSelector() {
  const { t, i18n } = useTranslation();
  return (
    <>
      <div>
        {Object.keys(lngs).map((lng) => (
          <button
            key={lng}
            style={{
              fontWeight: i18n.resolvedLanguage === lng ? "bold" : "normal",
            }}
            type="submit"
            onClick={() => i18n.changeLanguage(lng)}
          >
            {lngs[lng as keyof Lngs].nativeName}
          </button>
        ))}
      </div>
      <p>{t("general.hello_world")}</p>
    </>
  );
}
