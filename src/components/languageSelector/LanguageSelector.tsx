import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useTranslation } from "react-i18next";

interface Lngs {
  en: Lang;
  es: Lang;
}

interface Lang {
  nativeName: string;
}

export default function LanguageSelector() {
  const { t, i18n } = useTranslation();

  const lngs: Lngs = {
    en: { nativeName: "English" },
    es: { nativeName: "Spanish" },
  };

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="language-selector-select">
          {t("general.language")}
        </InputLabel>
        <Select
          labelId="language-selector-select"
          fullWidth
          size="small"
          name="language"
          label="Language"
          value={i18n.resolvedLanguage}
          onChange={(e) => i18n.changeLanguage(e.target.value)}
        >
          {Object.keys(lngs).map((lng) => (
            <MenuItem key={lng} value={lng}>
              {lng}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}
