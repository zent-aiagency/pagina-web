import { type NextRequest, NextResponse } from "next/server"

interface NewsletterData {
  email: string
}

export async function POST(request: NextRequest) {
  try {
    const body: NewsletterData = await request.json()

    // Validación básica
    if (!body.email) {
      return NextResponse.json({ error: "Email es requerido" }, { status: 400 })
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 })
    }

    if (process.env.MAILCHIMP_API_KEY && process.env.MAILCHIMP_AUDIENCE_ID) {
      const datacenter = process.env.MAILCHIMP_API_KEY.split("-")[1]
      const url = `https://${datacenter}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_AUDIENCE_ID}/members`

      await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.MAILCHIMP_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_address: body.email,
          status: "subscribed",
          tags: ["website-newsletter"],
        }),
      })
    }

    if (process.env.CONVERTKIT_API_KEY && process.env.CONVERTKIT_FORM_ID) {
      await fetch(`https://api.convertkit.com/v3/forms/${process.env.CONVERTKIT_FORM_ID}/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          api_key: process.env.CONVERTKIT_API_KEY,
          email: body.email,
          tags: ["website-newsletter"],
        }),
      })
    }

    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import("resend")
      const resend = new Resend(process.env.RESEND_API_KEY)

      await resend.emails.send({
        from: "newsletter@zentai.agency",
        to: [body.email],
        subject: "¡Bienvenido al newsletter de Zent AI! 🚀",
        html: `
          <h2>¡Gracias por suscribirte!</h2>
          <p>Te has suscrito exitosamente a nuestro newsletter. Recibirás:</p>
          <ul>
            <li>📈 Tips de automatización semanales</li>
            <li>🎯 Casos de éxito reales</li>
            <li>🔧 Tutoriales de n8n y herramientas</li>
            <li>🚀 Novedades de la industria</li>
          </ul>
          <p>Como regalo de bienvenida, <a href="https://zentai.agency/guia-automatizacion">descarga nuestra guía gratuita</a> de automatización para principiantes.</p>
          <p>¡Saludos!<br>El equipo de Zent AI</p>
        `,
      })
    }

    return NextResponse.json({ message: "Suscripción exitosa" }, { status: 200 })
  } catch (error) {
    console.error("Error processing newsletter subscription:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
