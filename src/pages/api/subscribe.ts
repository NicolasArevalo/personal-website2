import type { APIRoute } from 'astro';
import { Resend } from 'resend';

// Vercel serverless functions require this if we are in hybrid mode
export const prerender = false;

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.formData();
    const email = data.get('email');

    if (!email || typeof email !== 'string') {
      return new Response(
        JSON.stringify({ message: 'Email es requerido' }),
        { status: 400 }
      );
    }

    // 1. Agregar el contacto a la Audiencia de Resend
    const audienceId = import.meta.env.RESEND_AUDIENCE_ID;
    
    if (audienceId) {
      const { error: contactError } = await resend.contacts.create({
        email: email,
        audienceId: audienceId,
        unsubscribed: false,
      });

      if (contactError) {
        console.error("Error agregando contacto a audiencia:", contactError);
        // Continuamos de todos modos a ver si podemos enviar el email de bienvenida
      }
    }

    // 2. Enviamos el email de bienvenida simple usando el dominio configurado en Resend
    const { data: resendData, error: emailError } = await resend.emails.send({
      from: 'Boletín niiico <hola@niiico.com>', 
      to: [email],
      subject: '¡Gracias por suscribirte al blog!',
      html: '<h2>¡Hola!</h2><p>Gracias por unirte al newsletter de niiico.com. Pronto recibirás contenido exclusivo sobre programación y tecnología.</p><p>Saludos,<br>Nicolás</p>',
    });

    if (emailError) {
      console.error("Error enviando email:", emailError);
      return new Response(
        JSON.stringify({ message: "Error al enviar el correo: " + emailError.message }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({ message: '¡Suscripción exitosa!' }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error crítico en el servidor:", error);
    return new Response(
      JSON.stringify({ message: 'Error interno del servidor. Revisa los logs de Vercel.' }),
      { status: 500 }
    );
  }
};
