import { Resend } from 'resend';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const resend = new Resend("re_FGz3PXJb_5s16c4pyno88WzfhGiTEt8rA");
const POST = async ({ request }) => {
  try {
    const data = await request.formData();
    const email = data.get("email");
    if (!email || typeof email !== "string") {
      return new Response(
        JSON.stringify({ message: "Email es requerido" }),
        { status: 400 }
      );
    }
    const audienceId = "fa0c7a65-560b-4cb0-a34d-70ed43d8f9b6";
    if (audienceId) {
      const { error: contactError } = await resend.contacts.create({
        email,
        audienceId,
        unsubscribed: false
      });
      if (contactError) {
        console.error("Error agregando contacto a audiencia:", contactError);
      }
    }
    const { data: resendData, error: emailError } = await resend.emails.send({
      from: "Boletín niiico <hola@niiico.com>",
      to: [email],
      subject: "¡Gracias por suscribirte al blog!",
      html: "<h2>¡Hola!</h2><p>Gracias por unirte al newsletter de niiico.com. Pronto recibirás contenido exclusivo sobre programación y tecnología.</p><p>Saludos,<br>Nicolás</p>"
    });
    if (emailError) {
      return new Response(
        JSON.stringify({ message: emailError.message }),
        { status: 500 }
      );
    }
    return new Response(
      JSON.stringify({ message: "¡Suscripción exitosa!" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error interno del servidor" }),
      { status: 500 }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
