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

    const welcomeEmailHtml = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Bienvenido a niiico</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      background-color: #0a0a0a;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
  </style>
</head>
<body style="background-color: #0a0a0a; margin: 0; padding: 0;">

  <!-- Wrapper -->
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0a0a0a;">
    <tr>
      <td align="center" style="padding: 40px 16px;">

        <!-- Container -->
        <table width="560" border="0" cellspacing="0" cellpadding="0" style="max-width: 560px; width: 100%;">

          <!-- ====== HEADER ====== -->
          <tr>
            <td align="center" style="padding: 20px 0;">
              <p style="
                color: #ffffff;
                font-family: 'Inter', sans-serif;
                font-size: 28px;
                font-weight: 600;
                letter-spacing: -0.5px;
                margin: 0;
              ">
                niiico
              </p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding: 0 0 20px 0;">
              <hr style="border: none; border-top: 1px solid #1a1a1a; margin: 0;">
            </td>
          </tr>

          <!-- ====== GREETING ====== -->
          <tr>
            <td style="padding: 10px 0 20px 0;">
              <p style="
                color: #ffffff;
                font-family: 'Inter', sans-serif;
                font-size: 22px;
                font-weight: 600;
                line-height: 1.4;
                margin: 0;
              ">
                Hola 👋
              </p>
            </td>
          </tr>

          <!-- ====== BODY ====== -->
          <tr>
            <td>
              <p style="
                color: #a3a3a3;
                font-family: 'Inter', sans-serif;
                font-size: 16px;
                line-height: 1.7;
                margin: 0 0 16px 0;
              ">
                Qué bueno que estás aquí.
              </p>
            </td>
          </tr>

          <tr>
            <td>
              <p style="
                color: #a3a3a3;
                font-family: 'Inter', sans-serif;
                font-size: 16px;
                line-height: 1.7;
                margin: 0 0 16px 0;
              ">
                Este es mi rincón en internet donde escribo sobre las cosas
                que me pasan, lo que pienso, historias que necesito sacar
                y todo lo que no cabe en ningún otro lugar.
              </p>
            </td>
          </tr>

          <tr>
            <td>
              <p style="
                color: #a3a3a3;
                font-family: 'Inter', sans-serif;
                font-size: 16px;
                line-height: 1.7;
                margin: 0 0 16px 0;
              ">
                No hay reglas, no hay calendario editorial, no hay fórmulas.
                Solo yo escribiendo cuando tengo algo que decir.
              </p>
            </td>
          </tr>

          <tr>
            <td>
              <p style="
                color: #a3a3a3;
                font-family: 'Inter', sans-serif;
                font-size: 16px;
                line-height: 1.7;
                margin: 0 0 16px 0;
              ">
                A veces será algo profundo, a veces algo random,
                a veces solo necesitaré escribir y ya.
              </p>
            </td>
          </tr>

          <!-- ====== HIGHLIGHT ====== -->
          <tr>
            <td style="padding: 8px 0 24px 0;">
              <p style="
                color: #e5e5e5;
                font-family: 'Inter', sans-serif;
                font-size: 16px;
                line-height: 1.7;
                font-weight: 600;
                margin: 0;
              ">
                Gracias por querer leerme. De verdad. ✨
              </p>
            </td>
          </tr>

          <tr>
            <td>
              <p style="
                color: #a3a3a3;
                font-family: 'Inter', sans-serif;
                font-size: 16px;
                line-height: 1.7;
                margin: 0 0 24px 0;
              ">
                Mientras tanto, si quieres echar un ojo a lo que ya hay:
              </p>
            </td>
          </tr>

          <!-- ====== CTA BUTTON ====== -->
          <tr>
            <td align="center" style="padding: 8px 0 32px 0;">
              <!--[if mso]>
              <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" 
                xmlns:w="urn:schemas-microsoft-com:office:word" 
                href="https://niiico.com" 
                style="height:44px;v-text-anchor:middle;width:200px;" 
                arcsize="14%" 
                fillcolor="#ffffff">
                <w:anchorlock/>
                <center style="color:#0a0a0a;font-family:sans-serif;font-size:14px;font-weight:bold;">
                  Visitar el blog →
                </center>
              </v:roundrect>
              <![endif]-->
              <!--[if !mso]><!-->
              <a href="https://niiico.com" target="_blank" style="
                background-color: #ffffff;
                color: #0a0a0a;
                padding: 12px 32px;
                border-radius: 6px;
                font-family: 'Inter', sans-serif;
                font-size: 14px;
                font-weight: 600;
                text-decoration: none;
                display: inline-block;
              ">
                Visitar el blog →
              </a>
              <!--<![endif]-->
            </td>
          </tr>

          <!-- ====== CLOSING ====== -->
          <tr>
            <td style="padding: 0 0 32px 0;">
              <p style="
                color: #ffffff;
                font-family: 'Inter', sans-serif;
                font-size: 16px;
                font-weight: 600;
                margin: 0;
              ">
                — Nico
              </p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding: 0 0 20px 0;">
              <hr style="border: none; border-top: 1px solid #1a1a1a; margin: 0;">
            </td>
          </tr>

          <!-- ====== FOOTER ====== -->
          <tr>
            <td align="center" style="padding: 10px 0;">
              <p style="
                color: #525252;
                font-family: 'Inter', sans-serif;
                font-size: 12px;
                line-height: 1.6;
                margin: 0 0 8px 0;
              ">
                Recibiste esto porque te suscribiste en
                <a href="https://niiico.com" style="color: #737373; text-decoration: underline;">
                  niiico.com
                </a>
              </p>
              <p style="
                color: #525252;
                font-family: 'Inter', sans-serif;
                font-size: 12px;
                line-height: 1.6;
                margin: 0;
              ">
                Si no quieres recibir más correos,
                <a href="{{{unsubscribe_url}}}" style="color: #737373; text-decoration: underline;">
                  puedes salirte aquí
                </a>
                (sin resentimientos 🤙)
              </p>
            </td>
          </tr>

        </table>
        <!-- /Container -->

      </td>
    </tr>
  </table>
  <!-- /Wrapper -->

</body>
</html>
`;

    // 2. Enviamos el email de bienvenida simple usando el dominio configurado en Resend
    const { data: resendData, error: emailError } = await resend.emails.send({
      from: 'Boletín niiico <hola@niiico.com>', 
      to: [email],
      subject: '¡Bienvenido al rincón de niiico! 👋',
      html: welcomeEmailHtml,
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
