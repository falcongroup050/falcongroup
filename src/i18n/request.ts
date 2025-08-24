import { getRequestConfig } from "next-intl/server"
import { routing } from "./routing"
import { getArData, getEnData } from "@/lib/i18n-data"

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale
  }

  let messages
  if (locale === "ar") {
    messages = await getArData()
  } else {
    messages = await getEnData()
  }

  return {
    locale,
    messages,
  }
})
