
import { escapeHtml } from "@/utils/escapeHtml";
import { sendEmailWithRetry } from "./emailLogic";

type UserRole = "member" | "admin" | "pastor" | "other";

const PORTAL_URL = (
  process.env.APP_URL || "https://ghcmedia.vercel.app"
).replace(/\/+$/, "");

const SETUP_URL = `${PORTAL_URL}/setup-password`;

export const sendOnboardingMail = async (
  recipient: string,
  setupToken: string,
  role: UserRole,
  fname: string
): Promise<void> => {
  const safeName = escapeHtml(fname);
  const safeToken = encodeURIComponent(setupToken);
  const setupLink = escapeHtml(`${SETUP_URL}?token=${safeToken}`);
  const safePortalUrl = escapeHtml(PORTAL_URL);

  const roleLabels: Record<UserRole, string> = {
    member: "Media Team Member",
    admin: "Administrator",
    pastor: "Pastor",
    other: "Authorized Visitor",
  };
  
  const roleLabel = roleLabels[role];

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <title>Your Media Team Portal Invitation</title>
      </head>

      <body
        style="
          margin: 0;
          padding: 0;
          background-color: #f7f9fc;
          font-family: Arial, Helvetica, sans-serif;
          color: #0c2340;
        "
      >
        <table
          role="presentation"
          width="100%"
          cellpadding="0"
          cellspacing="0"
          border="0"
          style="width: 100%; background-color: #f7f9fc; padding: 40px 16px;"
        >
          <tr>
            <td align="center">
              <table
                role="presentation"
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="
                  max-width: 600px;
                  width: 100%;
                  background-color: #ffffff;
                  border: 1px solid #e5eaf0;
                "
              >
                <!-- Header -->
                <tr>
                  <td
                    style="
                      padding: 28px 32px;
                      border-bottom: 1px solid #edf0f5;
                    "
                  >
                    <div
                      style="
                        font-size: 20px;
                        font-weight: 700;
                        letter-spacing: -0.5px;
                        color: #0c2340;
                      "
                    >
                      òduyémi/
                    </div>

                    <div
                      style="
                        margin-top: 7px;
                        font-size: 10px;
                        color: #718096;
                        letter-spacing: 0.08em;
                        text-transform: uppercase;
                      "
                    >
                      Global Harvest Church · Media Team
                    </div>
                  </td>
                </tr>

                <!-- Main content -->
                <tr>
                  <td style="padding: 40px 32px;">
                    <div
                      style="
                        margin-bottom: 12px;
                        font-size: 10px;
                        font-weight: 700;
                        letter-spacing: 0.14em;
                        text-transform: uppercase;
                        color: #00a3e0;
                      "
                    >
                      Your portal invitation
                    </div>

                    <h1
                      style="
                        margin: 0;
                        font-size: 30px;
                        line-height: 1.2;
                        letter-spacing: -0.7px;
                        font-weight: 700;
                        color: #0c2340;
                      "
                    >
                      Welcome, ${safeName}.
                    </h1>

                    <p
                      style="
                        margin: 18px 0 0;
                        font-size: 14px;
                        line-height: 1.8;
                        color: #596579;
                      "
                    >
                      Your Media Team Portal account has been created.
                      We're glad to have you on board.
                    </p>

                    <p
                      style="
                        margin: 12px 0 0;
                        font-size: 14px;
                        line-height: 1.8;
                        color: #596579;
                      "
                    >
                      Before signing in for the first time, set a secure
                      password using the button below.
                    </p>

                    <!-- Account type -->
                    <table
                      role="presentation"
                      width="100%"
                      cellpadding="0"
                      cellspacing="0"
                      border="0"
                      style="
                        margin-top: 28px;
                        background-color: #f7f9fc;
                        border: 1px solid #e5eaf0;
                      "
                    >
                      <tr>
                        <td style="padding: 18px 20px;">
                          <div
                            style="
                              font-size: 10px;
                              font-weight: 700;
                              letter-spacing: 0.1em;
                              text-transform: uppercase;
                              color: #718096;
                            "
                          >
                            Account type
                          </div>

                          <div
                            style="
                              margin-top: 7px;
                              font-size: 14px;
                              font-weight: 700;
                              color: #0c2340;
                            "
                          >
                            ${roleLabel}
                          </div>
                        </td>
                      </tr>
                    </table>

                    <!-- Setup CTA -->
                    <table
                      role="presentation"
                      cellpadding="0"
                      cellspacing="0"
                      border="0"
                      style="margin-top: 30px;"
                    >
                      <tr>
                        <td
                          align="center"
                          style="background-color: #0c2340;"
                        >
                          <a
                            href="${setupLink}"
                            target="_blank"
                            rel="noopener noreferrer"
                            style="
                              display: inline-block;
                              padding: 15px 25px;
                              font-size: 13px;
                              font-weight: 700;
                              color: #ffffff;
                              text-decoration: none;
                            "
                          >
                            Set up your password &rarr;
                          </a>
                        </td>
                      </tr>
                    </table>

                    <p
                      style="
                        margin: 18px 0 0;
                        font-size: 12px;
                        line-height: 1.8;
                        color: #718096;
                      "
                    >
                      This link expires in 30 minutes and can only be used
                      once. If it expires, contact your portal administrator
                      to request a new invitation.
                    </p>

                    <p
                      style="
                        margin: 20px 0 0;
                        font-size: 12px;
                        line-height: 1.8;
                        color: #718096;
                      "
                    >
                      If the button doesn't work, copy and paste this
                      address into your browser:
                    </p>

                    <p
                      style="
                        overflow-wrap: anywhere;
                        font-size: 12px;
                        line-height: 1.7;
                      "
                    >
                      <a
                        href="${setupLink}"
                        style="color: #007fae; text-decoration: underline;"
                      >
                        ${setupLink}
                      </a>
                    </p>

                    ${
                      role === "admin"
                        ? `
                          <div
                            style="
                              margin-top: 28px;
                              padding: 16px;
                              background-color: #fff9e8;
                              border-left: 3px solid #ffc72c;
                            "
                          >
                            <p
                              style="
                                margin: 0;
                                font-size: 12px;
                                line-height: 1.8;
                                color: #596579;
                              "
                            >
                              Your account has administrator privileges.
                              Keep your account secure and only perform
                              administrative actions you are authorized to
                              carry out.
                            </p>
                          </div>
                        `
                        : ""
                    }

                    <p
                      style="
                        margin: 32px 0 0;
                        font-size: 13px;
                        line-height: 1.8;
                        color: #596579;
                      "
                    >
                      I look forward to working with you.
                    </p>

                    <p
                      style="
                        margin: 16px 0 0;
                        font-size: 13px;
                        line-height: 1.8;
                        color: #596579;
                      "
                    >
                      Best regards,<br />
                      <strong style="color: #0c2340;">
                        Kofoworola
                      </strong>
                    </p>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td
                    style="
                      padding: 22px 32px;
                      border-top: 1px solid #edf0f5;
                      background-color: #f7f9fc;
                    "
                  >
                    <p
                      style="
                        margin: 0;
                        font-size: 10px;
                        line-height: 1.7;
                        color: #718096;
                        text-align: center;
                      "
                    >
                      Secure · Private · Professional
                    </p>

                    <p
                      style="
                        margin: 7px 0 0;
                        font-size: 10px;
                        color: #9aa4b2;
                        text-align: center;
                      "
                    >
                      &copy; ${new Date().getFullYear()} Òduyémi ·
                      Artisanery Tech Studio
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

  await sendEmailWithRetry(
    recipient,
    "Your Media Team Portal Invitation",
    htmlContent
  );
};
