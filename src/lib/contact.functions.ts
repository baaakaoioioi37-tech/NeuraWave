import emailjs from '@emailjs/browser';

interface ContactMessageData {
  name: string;
  email: string;
  message: string;
}

export async function sendContactMessage(data: ContactMessageData) {
  try {
    const templateParams = {
      name: data.name,
      email: data.email,
      message: data.message,
    };

    await emailjs.send(
      'service_mx71fhx', 
      'template_cvlh0l6', 
      templateParams, 
      'KNFQ2ihHQ2s1LjyqJ'
    );

    return { ok: true };
  } catch (error) {
    console.error("Error al enviar con EmailJS:", error);
    return { ok: false, error: "No se pudo enviar el mensaje." };
  }
}