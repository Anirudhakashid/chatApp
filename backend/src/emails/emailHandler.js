import { resendClient, sender } from "../lib/resend.js";
import { createWelcomeEmailTemplate } from "../emails/emailTemplate.js";
import { ApiError } from "../utils/ApiError.js";

export const welcomeEmail = async (email, name, clientURL) => {
  const { data, error } = await resendClient.emails.send({
    from: `${sender.name} <${sender.email}>`,
    to: email,
    subject: "Welcome to Chatio!",
    html: createWelcomeEmailTemplate(name, clientURL),
  });

  if (error) {
    throw new ApiError(500, "Failed to send welcome email: " + error.message);
  }

  return data;
};
