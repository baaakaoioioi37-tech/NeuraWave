import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  message: z.string().trim().min(1).max(2000),
});

export const sendContactMessage = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => schema.parse(input))
  .handler(async ({ data }) => {
    const accessKey = (globalThis as any).process?.env?.WEB3FORMS_ACCESS_KEY;
    const adminEmail = (globalThis as any).process?.env?.ADMIN_EMAIL || "alanjexux@gmail.com";
    
    if (!accessKey) {
      return {
        ok: false,
        error:
          "El servicio de envío no está configurado. Añade WEB3FORMS_ACCESS_KEY en los secretos del proyecto.",
      };
    }

    // Enviar correo al administrador
    const resAdmin = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `Nueva queja/sugerencia de ${data.name}`,
        from_name: "Formulario NeuraWave",
        email: data.email,
        name: data.name,
        message: data.message,
        to_email: adminEmail,
        redirect: false,
      }),
    });

    const jsonAdmin = (await resAdmin.json().catch(() => ({}))) as { success?: boolean; message?: string };
    if (!resAdmin.ok || !jsonAdmin.success) {
      return { ok: false, error: jsonAdmin.message ?? "No se pudo enviar el mensaje." };
    }

    // Enviar correo de confirmación al usuario
    const resUser = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject: "Hemos recibido tu mensaje - NeuraWave",
        from_name: "NeuraWave",
        message: `Hola ${data.name},\n\nGracias por tu mensaje:\n\n"${data.message}"\n\nLo hemos recibido correctamente y nos pondremos en contacto contigo pronto.\n\nSaludos,\nEl equipo de NeuraWave`,
        to_email: data.email,
        redirect: false,
      }),
    });

    // No fallar si el correo de confirmación no se envía
    const jsonUser = (await resUser.json().catch(() => ({}))) as { success?: boolean };

    return { ok: true };
  });
