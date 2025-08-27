import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const company = formData.get("company") as string
    const service = formData.get("service") as string
    const message = formData.get("message") as string

    const files: File[] = []
    for (const [key, value] of formData.entries()) {
      if (key.startsWith("pdf-") && value instanceof File) {
        files.push(value)
      }
    }

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 })
    }

    if (service === "Hiring" && files.length > 0) {
      for (const file of files) {
        if (file.type !== "application/pdf") {
          return NextResponse.json({ error: "Only PDF files are allowed" }, { status: 400 })
        }
        if (file.size > 10 * 1024 * 1024) {
          // 10MB limit
          return NextResponse.json({ error: "File size must be less than 10MB" }, { status: 400 })
        }
      }
    }

    // Create transporter for Zoho SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.ZOHO_SMTP_HOST || "smtp.zoho.com",
      port: Number.parseInt(process.env.ZOHO_SMTP_PORT || "587"),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.ZOHO_EMAIL,
        pass: process.env.ZOHO_PASSWORD, // Use app-specific password
      },
    })

    const fileInfo =
      files.length > 0
        ? `\n\nAttached Files (${files.length}):\n${files.map((f) => `- ${f.name} (${(f.size / 1024 / 1024).toFixed(2)}MB)`).join("\n")}`
        : ""

    const emailContent = `
      New Contact Form Submission
      
      Name: ${name}
      Email: ${email}
      Phone: ${phone || "Not provided"}
      Company: ${company || "Not provided"}
      Service: ${service || "Not specified"}
      
      Message:
      ${message}${fileInfo}
      
      ---
      Sent from your website contact form
    `

    const attachments = await Promise.all(
      files.map(async (file) => ({
        filename: file.name,
        content: Buffer.from(await file.arrayBuffer()),
        contentType: file.type,
      })),
    )

    // Send email
    await transporter.sendMail({
      from: process.env.ZOHO_EMAIL,
      to: process.env.ZOHO_EMAIL, // Send to your own Zoho email
      subject: `New Contact Form Submission from ${name}`,
      text: emailContent,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #f0c14b; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
            <p><strong>Company:</strong> ${company || "Not provided"}</p>
            <p><strong>Service:</strong> ${service || "Not specified"}</p>
          </div>
          
          <div style="background: #fff; padding: 20px; border-left: 4px solid #f0c14b; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Message:</h3>
            <p style="line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          
          ${files.length > 0
          ? `
          <div style="background: #f0f8ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Attached Files (${files.length}):</h3>
            <ul style="margin: 0; padding-left: 20px;">
              ${files.map((f) => `<li>${f.name} (${(f.size / 1024 / 1024).toFixed(2)}MB)</li>`).join("")}
            </ul>
          </div>
          `
          : ""
        }
          
          <p style="color: #666; font-size: 12px; text-align: center; margin-top: 30px;">
            Sent from your website contact form
          </p>
        </div>
      `,
      attachments: attachments,
    })

    return NextResponse.json({ success: true, message: "Email sent successfully" })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}
