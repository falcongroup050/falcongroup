import { defineRouting } from "next-intl/routing"

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "ar"],

  // Used when no locale matches
  defaultLocale: "en",

  // The prefix for the default locale
  localePrefix: {
    mode: "as-needed",
  },
})

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
// Remove Pathnames type or define your own if needed
export type Locale = (typeof routing.locales)[number]
