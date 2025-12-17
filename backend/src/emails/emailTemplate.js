export function createWelcomeEmailTemplate(name, clientURL) {
  const safeName = String(name || "there").replace(/[<>]/g, "");
  const safeURL = encodeURI(clientURL);

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to Chattio!</title>
</head>

<body style="margin:0;padding:0;background-color:#f4f6f8;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
    <tr>
      <td align="center" style="padding:20px;">
        <table width="600" cellpadding="0" cellspacing="0" role="presentation"
          style="background-color:#ffffff;border-radius:10px;overflow:hidden;font-family:Arial,Helvetica,sans-serif;color:#333333;">

          <!-- Header -->
          <tr>
            <td style="background-color:#5B86E5;padding:30px;text-align:center;">
              <img
                src="https://yourdomain.com/assets/logo.png"
                alt="Chattio Logo"
                width="72"
                height="72"
                style="display:block;margin:0 auto 16px auto;border-radius:50%;background:#ffffff;"
              />
              <h1 style="margin:0;font-size:24px;font-weight:600;color:#ffffff;">
                Welcome to Chattio!
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:32px;">
              <p style="font-size:16px;margin:0 0 12px 0;">
                Hi ${safeName},
              </p>

              <p style="font-size:14px;line-height:1.6;margin:0 0 16px 0;">
                Thanks for creating your Chattio account. You can now chat with
                friends and contacts in real time using a fast and secure platform.
              </p>

              <ul style="padding-left:18px;font-size:14px;line-height:1.6;margin:0 0 20px 0;">
                <li>Complete your profile</li>
                <li>Add your contacts</li>
                <li>Start a conversation instantly</li>
              </ul>

              <div style="text-align:center;margin:28px 0;">
                <a
                  href="${safeURL}"
                  style="background-color:#5B86E5;color:#ffffff;text-decoration:none;
                  padding:12px 28px;border-radius:24px;font-size:14px;font-weight:600;
                  display:inline-block;"
                >
                  Open Chattio
                </a>
              </div>

              <p style="font-size:13px;color:#555555;margin:0;">
                If you didn’t create this account, you can safely ignore this email.
              </p>

              <p style="font-size:14px;margin:20px 0 0 0;">
                — Chattio Team
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f4f6f8;padding:16px;text-align:center;">
              <p style="font-size:12px;color:#777777;margin:0;">
                © 2025 Chattio · All rights reserved
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
}
