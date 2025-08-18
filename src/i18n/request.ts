import { getRequestConfig } from "next-intl/server"
import { hasLocale } from "next-intl"
import { routing } from "./routing"
import { getArData, getEnData } from "@/lib/i18n-data"

export default getRequestConfig(async ({ requestLocale }) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale

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
