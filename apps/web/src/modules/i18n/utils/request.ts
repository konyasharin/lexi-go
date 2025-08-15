import { getRequestConfig } from "next-intl/server";

import { importLang } from "./importLang";

export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  const locale = "en";

  return {
    locale,
    messages: await importLang(locale),
    timeZone: "Europe/Vienna",
  };
});
