import { escapeHtml } from "@/utils/escapeHtml";
import { sendEmailWithRetry } from "./emailLogic";


const PORTAL_URL = (
  process.env.APP_URL || "https://ghcmedia.vercel.app"
).replace(/\/+$/, "");


interface ReporterAssignmentEmail {
  recipient: string;
  fname: string;
  serviceTitle: string;
  serviceDate: string;
  serviceUrl: string;
  assignedByName: string;
}

export async function sendReporterAssignedMail({
  recipient,
  fname,
  serviceTitle,
  serviceDate,
  serviceUrl,
  assignedByName,
}: ReporterAssignmentEmail): Promise<void> {
  const safeName = escapeHtml(fname);
  const safeServiceTitle = escapeHtml(serviceTitle);
  const safeServiceDate = escapeHtml(serviceDate);
  const safeAssignedBy = escapeHtml(assignedByName);
  const safeServiceUrl = escapeHtml(
    `${PORTAL_URL}${serviceUrl.startsWith("/") ? "" : "/"}${serviceUrl}`
  );

  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>You've been assigned as a service reporter</title>
      </head>
      <body style="margin:0;padding:32px 16px;background:#f7f9fc;font-family:Arial,Helvetica,sans-serif;color:#0c2340;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
          <tr>
            <td align="center">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"
                style="max-width:600px;background:#fff;border:1px solid #e5eaf0;">
                <tr>
                  <td style="padding:28px 32px;border-bottom:1px solid #edf0f5;">
                    <div style="font-size:20px;font-weight:700;">òduyémi/</div>
                    <div style="margin-top:7px;font-size:10px;color:#718096;letter-spacing:.08em;text-transform:uppercase;">
                      Global Harvest Church · Media Team
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:36px 32px;">
                    <p style="font-size:10px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#00a3e0;">
                      New reporting assignment
                    </p>
                    <h1 style="margin:0;font-size:27px;line-height:1.3;">
                      Hello, ${safeName}.
                    </h1>
                    <p style="font-size:14px;line-height:1.8;color:#596579;">
                      You have been assigned as the reporter for the service below.
                      Please sign in to review the service details and complete the
                      required preproduction checklist and reporting activities.
                    </p>

                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
                      style="margin-top:24px;background:#f7f9fc;border:1px solid #e5eaf0;">
                      <tr>
                        <td style="padding:20px;">
                          <div style="font-size:11px;color:#718096;">SERVICE</div>
                          <div style="margin-top:6px;font-size:17px;font-weight:700;">
                            ${safeServiceTitle}
                          </div>
                          <div style="margin-top:10px;font-size:13px;color:#596579;">
                            ${safeServiceDate}
                          </div>
                        </td>
                      </tr>
                    </table>

                    <p style="font-size:13px;line-height:1.8;color:#596579;">
                      Assigned by ${safeAssignedBy}.
                    </p>

                    <table role="presentation" cellspacing="0" cellpadding="0" border="0"
                      style="margin-top:24px;">
                      <tr>
                        <td style="background:#0c2340;">
                          <a href="${safeServiceUrl}"
                            style="display:inline-block;padding:15px 24px;color:#fff;text-decoration:none;font-size:13px;font-weight:700;">
                            View service assignment &rarr;
                          </a>
                        </td>
                      </tr>
                    </table>

                    <p style="margin-top:28px;font-size:12px;line-height:1.8;color:#718096;">
                      If you believe this assignment was made in error, please contact
                      your portal administrator.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:20px 32px;background:#f7f9fc;border-top:1px solid #edf0f5;text-align:center;">
                    <p style="margin:0;font-size:10px;color:#718096;">
                      Secure · Private · Professional
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
    "You've been assigned as a service reporter",
    html
  );
}