import { type NextRequest, NextResponse } from "next/server"

interface ContactFormData {
  name: string
  email: string
  phone?: string
  company?: string
  message: string
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json()

    // Validación básica
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 })
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 })
    }

    await sendEmail(body)

    console.log("Nuevo contacto procesado:", {
      name: body.name,
      email: body.email,
      phone: body.phone,
      company: body.company,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json(
      {
        success: true,
        message: "Mensaje enviado exitosamente",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error procesando contacto:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}

async function sendEmail(data: ContactFormData) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY no configurado")
  }

  try {
    const { Resend } = await import("resend")
    const resend = new Resend(process.env.RESEND_API_KEY)

    // Email al equipo
    await resend.emails.send({
      from: "contacto@zentai.agency",
      to: [process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hola@zentai.agency"],
      subject: `🚀 Nuevo contacto de ${data.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #f97316;">Nuevo mensaje de contacto</h2>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>👤 Nombre:</strong> ${data.name}</p>
            <p><strong>📧 Email:</strong> ${data.email}</p>
            <p><strong>📱 Teléfono:</strong> ${data.phone || "No proporcionado"}</p>
            <p><strong>🏢 Empresa:</strong> ${data.company || "No proporcionado"}</p>
          </div>
          <div style="background: #fff; padding: 20px; border-left: 4px solid #f97316; margin: 20px 0;">
            <h3>💬 Mensaje:</h3>
            <p style="line-height: 1.6;">${data.message}</p>
          </div>
          <p style="color: #666; font-size: 12px;">
            Recibido el ${new Date().toLocaleString("es-AR")}
          </p>
        </div>
      `,
    })

    // Email de confirmación al cliente
    await resend.emails.send({
      from: "hola@zentai.agency",
      to: [data.email],
      subject: "✅ Hemos recibido tu mensaje - Zent AI",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #f97316;">¡Gracias por contactarnos, ${data.name}!</h2>
          <p>Hemos recibido tu mensaje y nos pondremos en contacto contigo en las próximas 24 horas.</p>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>📋 Resumen de tu consulta:</h3>
            <p><strong>Mensaje:</strong> ${data.message.substring(0, 200)}${data.message.length > 200 ? "..." : ""}</p>
          </div>

          <p>¡Saludos!<br><strong>El equipo de Zent AI</strong></p>
        </div>
      `,
    })
  } catch (error) {
    console.error("Error enviando email:", error)
    throw error
  }
}
