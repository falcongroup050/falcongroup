import { fetchAllDataFromSheets } from "./google-sheets"

export async function getArData() {
  const data = await fetchAllDataFromSheets()
  return buildLanguageData("ar", data)
}

export async function getEnData() {
  const data = await fetchAllDataFromSheets()
  return buildLanguageData("en", data)
}

function buildLanguageData(lang: string, data: any) {
  const { navigation, pageContent, services, teamMembers, achievementsTimeline } = data
  const isArabic = lang === "ar"

  // Helper function to get content by page/section/key
  const getContent = (page: string, section: string, key: string) => {
    const item = pageContent?.find((c: any) => c.page === page && c.section === section && c.key === key)
    return item ? (isArabic ? item.ar_text : item.en_text) : ""
  }

  // Helper function to get navigation text
  const getNav = (key: string) => {
    const item = navigation?.find((n: any) => n.key === key)
    return item ? (isArabic ? item.ar_text : item.en_text) : ""
  }

  // Helper function to get service data
  const getService = (serviceKey: string) => {
    const service = services?.find((s: any) => s.service_key === serviceKey)
    if (!service) return {}

    return {
      title: isArabic ? service.title_ar : service.title_en,
      description: isArabic ? service.description_ar : service.description_en,
      features: isArabic ? service.features_ar : service.features_en,
      image_url: service.image_url || "",
    }
  }

  // Helper function to get team member data
  const getTeamMember = (role: string) => {
    const member = teamMembers?.find((t: any) => t.role === role)
    if (!member) return {}

    return {
      name: isArabic ? member.name_ar : member.name_en,
      title: isArabic ? member.title_ar : member.title_en,
      description: isArabic ? member.description_ar : member.description_en,
      contact: member.contact_info || [],
      img_link: member.img_link || "",
    }
  }

  const getAchievementsTimeline = () => {
    return (
      achievementsTimeline
        ?.filter((a: any) => a.language === lang)
        ?.map((achievement: any) => ({
          year: achievement.year.toString(),
          activities: achievement.activities,
          image_url: achievement.image_url || "",
        })) || []
    )
  }

  // Build the complete structure - same as original
  return {
    navigation: {
      home: getNav("home"),
      about: getNav("about"),
      services: getNav("services"),
      contact: getNav("contact"),
      achievements: getNav("achievements"),
      portfolio: getNav("portfolio"),
    },
    home: {
      hero: {
        badge: getContent("home", "hero", "badge"),
        title: getContent("home", "hero", "title"),
        subtitle: getContent("home", "hero", "subtitle"),
        description: getContent("home", "hero", "description"),
        cta: getContent("home", "hero", "cta"),
        contact: getContent("home", "hero", "contact"),
      },
      services: {
        title: getContent("home", "services", "title"),
        subtitle: getContent("home", "services", "subtitle"),
        shipping: {
          title: getService("shipping").title || (isArabic ? "خدمات الشحن" : "Shipping Services"),
          description:
            getService("shipping").description ||
            (isArabic
              ? "حلول شحن احترافية عبر جميع الموانئ البحرية المصرية بمواصفات عالمية."
              : "Professional shipping solutions across all Egyptian maritime ports with international standards."),
        },
        freight: {
          title: getService("freight").title || (isArabic ? "إدارة الشحن" : "Freight Management"),
          description:
            getService("freight").description ||
            (isArabic
              ? "معالجة وإدارة فعالة للشحن لجميع أنواع المواد والبضائع."
              : "Efficient freight handling and management for all types of materials and cargo."),
        },
        warehousing: {
          title: getService("warehousing").title || (isArabic ? "حلول التخزين" : "Warehousing Solutions"),
          description:
            getService("warehousing").description ||
            (isArabic
              ? "مرافق تخزين آمنة مع معدات حديثة ومعالجة احترافية."
              : "Secure storage facilities with modern equipment and professional handling."),
        },
        transportation: {
          title: getService("transportation").title || (isArabic ? "النقل" : "Transportation"),
          description:
            getService("transportation").description ||
            (isArabic
              ? "أسطول كبير من مركبات النقل المجهزة للتسليم الآمن وفي الوقت المحدد."
              : "Large fleet of equipped transport vehicles for safe and timely delivery."),
        },
      },
      about: {
        title: getContent("home", "about", "title"),
        description: getContent("home", "about", "description"),
        approach: getContent("home", "about", "approach"),
      },
      contact: {
        title: getContent("home", "contact", "title"),
        description: getContent("home", "contact", "description"),
        cta: getContent("home", "contact", "cta"),
      },
    },
    about: {
      title: getContent("about", "main", "title"),
      subtitle: getContent("about", "main", "subtitle"),
      excellence: getContent("about", "main", "excellence"),
      badges: isArabic
        ? ["معتمد من ISO", "حائز على جوائز", "شريك موثوق"]
        : ["ISO Certified", "Award Winner", "Trusted Partner"],
      features: {
        title: getContent("about", "features", "title"),
      },
      history: {
        title: getContent("about", "history", "title"),
        content: getContent("about", "history", "content"),
      },
      approach: {
        title: getContent("about", "approach", "title"),
        content: getContent("about", "approach", "content"),
      },
      commitment: {
        title: getContent("about", "commitment", "title"),
        content: getContent("about", "commitment", "content"),
      },
      achievements: {
        title: getContent("about", "achievements", "title"),
        stats: {
          years: getContent("about", "achievements", "years"),
          projects: getContent("about", "achievements", "projects"),
          clients: getContent("about", "achievements", "clients"),
          support: getContent("about", "achievements", "support"),
        },
      },
      team: {
        title: getContent("about", "team", "title"),
        subtitle: getContent("about", "team", "subtitle"),
        companyDirector: getTeamMember("companyDirector"),
        deputyDirector: getTeamMember("deputyDirector"),
        financialDirector: getTeamMember("financialDirector"),
        operationsManager: getTeamMember("operationsManager"),
      },
    },
    services: {
      title: getContent("services", "main", "title"),
      subtitle: getContent("services", "main", "subtitle"),
      learnMore: getContent("services", "main", "learnMore"),
      premiumService: getContent("services", "main", "premiumService"),
      shipping: getService("shipping"),
      freight: getService("freight"),
      warehousing: getService("warehousing"),
      transportation: getService("transportation"),
    },
    contact: {
      title: getContent("contact", "main", "title"),
      subtitle: getContent("contact", "main", "subtitle"),
      form: {
        subtitle: getContent("contact", "form", "subtitle"),
        name: getContent("contact", "form", "name"),
        email: getContent("contact", "form", "email"),
        phone: getContent("contact", "form", "phone"),
        company: getContent("contact", "form", "company"),
        service: getContent("contact", "form", "service"),
        message: getContent("contact", "form", "message"),
        submit: getContent("contact", "form", "submit"),
        reset: getContent("contact", "form", "reset"),
        success: getContent("contact", "form", "success"),
        error: getContent("contact", "form", "error"),
      },
      info: {
        title: getContent("contact", "info", "title"),
        subtitle: getContent("contact", "info", "subtitle"),
        address: getContent("contact", "info", "address"),
        phone: getContent("contact", "info", "phone"),
        email: getContent("contact", "info", "email"),
        hours: getContent("contact", "info", "hours"),
        hoursContent: getContent("contact", "info", "hoursContent"),
      },
    },
    achievements: {
      title: getContent("achievements", "main", "title"),
      subtitle: getContent("achievements", "main", "subtitle"),
      content: getContent("achievements", "main", "content"),
      timeline: {
        title: getContent("achievements", "timeline", "title"),
        subtitle: getContent("achievements", "timeline", "subtitle"),
        data: getAchievementsTimeline(),
      },
    },
    footer: {
      description: getContent("footer", "main", "description"),
      links: getContent("footer", "main", "links"),
      services: getContent("footer", "main", "services"),
      contact: getContent("footer", "main", "contact"),
      rights: getContent("footer", "main", "rights"),
      location: getContent("footer", "main", "location"),
      subtext: getContent("footer", "main", "subtext"),
      phone: getContent("footer", "main", "phone"),
      email: getContent("footer", "main", "email"),
    },
    portfolio: {
      title: getContent("portfolio", "main", "title"),
      subtitle: getContent("portfolio", "main", "description"),
    },
  }
}
