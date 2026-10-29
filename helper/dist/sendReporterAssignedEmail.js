"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.sendReporterAssignedMail = void 0;
var escapeHtml_1 = require("@/utils/escapeHtml");
var emailLogic_1 = require("./emailLogic");
var PORTAL_URL = (process.env.APP_URL || "https://ghcmedia.vercel.app").replace(/\/+$/, "");
function sendReporterAssignedMail(_a) {
    var recipient = _a.recipient, fname = _a.fname, serviceTitle = _a.serviceTitle, serviceDate = _a.serviceDate, serviceUrl = _a.serviceUrl, assignedByName = _a.assignedByName;
    return __awaiter(this, void 0, Promise, function () {
        var safeName, safeServiceTitle, safeServiceDate, safeAssignedBy, safeServiceUrl, html;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    safeName = escapeHtml_1.escapeHtml(fname);
                    safeServiceTitle = escapeHtml_1.escapeHtml(serviceTitle);
                    safeServiceDate = escapeHtml_1.escapeHtml(serviceDate);
                    safeAssignedBy = escapeHtml_1.escapeHtml(assignedByName);
                    safeServiceUrl = escapeHtml_1.escapeHtml("" + PORTAL_URL + (serviceUrl.startsWith("/") ? "" : "/") + serviceUrl);
                    html = "\n    <!DOCTYPE html>\n    <html lang=\"en\">\n      <head>\n        <meta charset=\"UTF-8\" />\n        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n        <title>You've been assigned as a service reporter</title>\n      </head>\n      <body style=\"margin:0;padding:32px 16px;background:#f7f9fc;font-family:Arial,Helvetica,sans-serif;color:#0c2340;\">\n        <table role=\"presentation\" width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\">\n          <tr>\n            <td align=\"center\">\n              <table role=\"presentation\" width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\"\n                style=\"max-width:600px;background:#fff;border:1px solid #e5eaf0;\">\n                <tr>\n                  <td style=\"padding:28px 32px;border-bottom:1px solid #edf0f5;\">\n                    <div style=\"font-size:20px;font-weight:700;\">\u00F2duy\u00E9mi/</div>\n                    <div style=\"margin-top:7px;font-size:10px;color:#718096;letter-spacing:.08em;text-transform:uppercase;\">\n                      Global Harvest Church \u00B7 Media Team\n                    </div>\n                  </td>\n                </tr>\n                <tr>\n                  <td style=\"padding:36px 32px;\">\n                    <p style=\"font-size:10px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#00a3e0;\">\n                      New reporting assignment\n                    </p>\n                    <h1 style=\"margin:0;font-size:27px;line-height:1.3;\">\n                      Hello, " + safeName + ".\n                    </h1>\n                    <p style=\"font-size:14px;line-height:1.8;color:#596579;\">\n                      You have been assigned as the reporter for the service below.\n                      Please sign in to review the service details and complete the\n                      required preproduction checklist and reporting activities.\n                    </p>\n\n                    <table role=\"presentation\" width=\"100%\" cellspacing=\"0\" cellpadding=\"0\"\n                      style=\"margin-top:24px;background:#f7f9fc;border:1px solid #e5eaf0;\">\n                      <tr>\n                        <td style=\"padding:20px;\">\n                          <div style=\"font-size:11px;color:#718096;\">SERVICE</div>\n                          <div style=\"margin-top:6px;font-size:17px;font-weight:700;\">\n                            " + safeServiceTitle + "\n                          </div>\n                          <div style=\"margin-top:10px;font-size:13px;color:#596579;\">\n                            " + safeServiceDate + "\n                          </div>\n                        </td>\n                      </tr>\n                    </table>\n\n                    <p style=\"font-size:13px;line-height:1.8;color:#596579;\">\n                      Assigned by " + safeAssignedBy + ".\n                    </p>\n\n                    <table role=\"presentation\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\"\n                      style=\"margin-top:24px;\">\n                      <tr>\n                        <td style=\"background:#0c2340;\">\n                          <a href=\"" + safeServiceUrl + "\"\n                            style=\"display:inline-block;padding:15px 24px;color:#fff;text-decoration:none;font-size:13px;font-weight:700;\">\n                            View service assignment &rarr;\n                          </a>\n                        </td>\n                      </tr>\n                    </table>\n\n                    <p style=\"margin-top:28px;font-size:12px;line-height:1.8;color:#718096;\">\n                      If you believe this assignment was made in error, please contact\n                      your portal administrator.\n                    </p>\n                  </td>\n                </tr>\n                <tr>\n                  <td style=\"padding:20px 32px;background:#f7f9fc;border-top:1px solid #edf0f5;text-align:center;\">\n                    <p style=\"margin:0;font-size:10px;color:#718096;\">\n                      Secure \u00B7 Private \u00B7 Professional\n                    </p>\n                  </td>\n                </tr>\n              </table>\n            </td>\n          </tr>\n        </table>\n      </body>\n    </html>\n  ";
                    return [4 /*yield*/, emailLogic_1.sendEmailWithRetry(recipient, "You've been assigned as a service reporter", html)];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.sendReporterAssignedMail = sendReporterAssignedMail;
