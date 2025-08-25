import { GoogleSpreadsheet } from "google-spreadsheet"
import { JWT } from "google-auth-library"

// Google Sheets configuration
const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_ID!
const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, "\n")

// Initialize Google Sheets client
async function getGoogleSheetsClient() {
  const serviceAccountAuth = new JWT({
    email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: GOOGLE_PRIVATE_KEY,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  })

  const doc = new GoogleSpreadsheet(SPREADSHEET_ID, serviceAccountAuth)
  await doc.loadInfo()
  return doc
}

// Fetch all data from Google Sheets
export async function fetchAllDataFromSheets() {
  const doc = await getGoogleSheetsClient()

  // Load all worksheets
  const navigationSheet = doc.sheetsByTitle["navigation"]
  const pageContentSheet = doc.sheetsByTitle["page_content"]
  const servicesSheet = doc.sheetsByTitle["services"]
  const teamMembersSheet = doc.sheetsByTitle["team_members"]
  const achievementsTimelineSheet = doc.sheetsByTitle["achievements_timeline"]

  // Fetch rows from each sheet
  const [navigationRows, pageContentRows, servicesRows, teamMembersRows, achievementsRows] = await Promise.all([
    navigationSheet.getRows(),
    pageContentSheet.getRows(),
    servicesSheet.getRows(),
    teamMembersSheet.getRows(),
    achievementsTimelineSheet.getRows(),
  ])

  // Transform rows to match Supabase structure
  const navigation = navigationRows.map((row) => ({
    id: Number.parseInt(row.get("id") || "0"),
    key: row.get("key"),
    en_text: row.get("en_text"),
    ar_text: row.get("ar_text"),
    created_at: row.get("created_at"),
    updated_at: row.get("updated_at"),
  }))

  const pageContent = pageContentRows.map((row) => ({
    id: Number.parseInt(row.get("id") || "0"),
    page: row.get("page"),
    section: row.get("section"),
    key: row.get("key"),
    ar_text: row.get("ar_text"),
    en_text: row.get("en_text"),
    created_at: row.get("created_at"),
    updated_at: row.get("updated_at"),
  }))

  const services = servicesRows.map((row) => ({
    id: row.get("id"),
    service_key: row.get("service_key"),
    title_ar: row.get("title_ar"),
    title_en: row.get("title_en"),
    description_ar: row.get("description_ar"),
    description_en: row.get("description_en"),
    features_ar: row.get("features_ar") ? JSON.parse(row.get("features_ar")) : [],
    features_en: row.get("features_en") ? JSON.parse(row.get("features_en")) : [],
    image_url: row.get("image_url"),
    created_at: row.get("created_at"),
    updated_at: row.get("updated_at"),
  }))

  const teamMembers = teamMembersRows.map((row) => ({
    id: Number.parseInt(row.get("id") || "0"),
    role: row.get("role"),
    name_ar: row.get("name_ar"),
    name_en: row.get("name_en"),
    title_ar: row.get("title_ar"),
    title_en: row.get("title_en"),
    description_ar: row.get("description_ar"),
    description_en: row.get("description_en"),
    contact_info: row.get("contact_info") ? JSON.parse(row.get("contact_info")) : {},
    img_link: row.get("image_url"),
    created_at: row.get("created_at"),
    updated_at: row.get("updated_at"),
  }))

  const achievementsTimeline = achievementsRows.map((row) => ({
    year: row.get("year"),
    language: row.get("language"),
    activities: row.get("activities") ? JSON.parse(row.get("activities")) : [],
    image_url: row.get("image_url"),
  }))

  return {
    navigation,
    pageContent,
    services,
    teamMembers,
    achievementsTimeline,
  }
}
