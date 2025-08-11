declare global {
  interface Window {
    gtag: (...args: any[]) => void
    fbq: (...args: any[]) => void
  }
}

// Google Analytics
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Eventos específicos para la landing page
export const trackContactFormSubmit = () => {
  trackEvent("submit", "contact_form", "contact_page")
}

export const trackNewsletterSignup = () => {
  trackEvent("signup", "newsletter", "footer")
}

export const trackWhatsAppClick = () => {
  trackEvent("click", "whatsapp", "contact_button")
}

export const trackCalendlyClick = () => {
  trackEvent("click", "calendly", "schedule_call")
}

export const trackUseCasesView = () => {
  trackEvent("view", "use_cases", "modal")
}

// Meta Pixel
export const trackFacebookEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", eventName, parameters)
  }
}

export const trackFacebookLead = () => {
  trackFacebookEvent("Lead")
}

export const trackFacebookContact = () => {
  trackFacebookEvent("Contact")
}
