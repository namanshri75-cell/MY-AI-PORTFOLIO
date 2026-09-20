/**
 * Google Sheets & Submissions Service
 * Handles appending new contact submissions to the designated Google Sheet or Webhook.
 */

export interface SheetInquiry {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp?: string;
}

// User-provided active SheetMonkey endpoint connected to their Google Sheet
export const SHEETMONKEY_ENDPOINT = "https://api.sheetmonkey.io/form/iyPAhEKJot7uMZuh41riFw";

const STORAGE_SUBMISSIONS_KEY = "naman_portfolio_submissions";

/**
 * Extracts spreadsheet ID from a full Google Sheets URL or returns the raw ID.
 */
export function extractSpreadsheetId(input: string): string {
  if (!input) return "";
  const trimmed = input.trim();
  const match = trimmed.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (match && match[1]) {
    return match[1];
  }
  return trimmed;
}

/**
 * Get configured Google Sheet / Webhook URL from environment or fallback to SheetMonkey endpoint.
 */
export function getSavedSpreadsheetTarget(): string {
  try {
    const envTarget = ((import.meta.env.VITE_GOOGLE_SHEET_URL as string) || "").trim();
    // If the env variable is a valid webhook/service endpoint (SheetMonkey, Apps Script, etc.)
    if (
      envTarget.includes("api.sheetmonkey.io") ||
      envTarget.includes("script.google.com") ||
      envTarget.includes("webhook") ||
      envTarget.includes("/exec")
    ) {
      return envTarget;
    }
  } catch {
    // Ignore error
  }
  // Default to the user's verified SheetMonkey bridge
  return SHEETMONKEY_ENDPOINT;
}

/**
 * Save submission to local backup log.
 */
export function saveLocalSubmission(inquiry: { name: string; email: string; message: string }): void {
  try {
    const existingRaw = localStorage.getItem(STORAGE_SUBMISSIONS_KEY);
    const list: SheetInquiry[] = existingRaw ? JSON.parse(existingRaw) : [];
    const newEntry: SheetInquiry = {
      id: `sub-${Date.now()}`,
      name: inquiry.name,
      email: inquiry.email,
      message: inquiry.message,
      timestamp: new Date().toLocaleString(),
    };
    list.unshift(newEntry);
    localStorage.setItem(STORAGE_SUBMISSIONS_KEY, JSON.stringify(list.slice(0, 100)));
  } catch {
    // Ignore storage issues
  }
}

/**
 * Get all locally saved submissions (backup log).
 */
export function getLocalSubmissions(): SheetInquiry[] {
  try {
    const existingRaw = localStorage.getItem(STORAGE_SUBMISSIONS_KEY);
    return existingRaw ? JSON.parse(existingRaw) : [];
  } catch {
    return [];
  }
}

/**
 * Send inquiry to SheetMonkey / Google Apps Script Web App / Webhook URL.
 * Employs multiple transmission strategies:
 * 1. JSON payload with matching column headers (NAME, EMAIL, MESSAGE, Created)
 * 2. FormData payload with matching column headers
 */
export async function sendInquiryToWebhook(
  webhookUrl: string,
  inquiry: { name: string; email: string; message: string }
): Promise<boolean> {
  if (!webhookUrl) return false;

  const now = new Date();
  const timestamp = now.toLocaleString();

  // SheetMonkey form headers & Google Sheet exact matches
  // Matches "Name", "Email", "Paragraph" from https://share.sheetmonkey.io/f/iyPAhEKJot7uMZuh41riFw
  const payload = {
    Name: inquiry.name,
    Email: inquiry.email,
    Paragraph: inquiry.message,
    NAME: inquiry.name,
    EMAIL: inquiry.email,
    MESSAGE: inquiry.message,
    name: inquiry.name,
    email: inquiry.email,
    message: inquiry.message,
    Message: inquiry.message,
    "4NBDSej5nc": inquiry.name,
    "0hEkc4T5ao": inquiry.email,
    "7fJ3u81CX5": inquiry.message,
    Created: "x-sheetmonkey-current-date-time",
    timestamp: timestamp,
    date: timestamp,
  };

  let dispatched = false;

  // 1. JSON dispatch (standard SheetMonkey API)
  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    dispatched = true;
  } catch (err) {
    console.warn("JSON submission attempt warning:", err);
  }

  // 2. FormData / urlencoded dispatch (handles native form simulation)
  try {
    const formData = new FormData();
    formData.append("Name", inquiry.name);
    formData.append("Email", inquiry.email);
    formData.append("Paragraph", inquiry.message);
    formData.append("NAME", inquiry.name);
    formData.append("EMAIL", inquiry.email);
    formData.append("MESSAGE", inquiry.message);
    formData.append("Message", inquiry.message);
    formData.append("Created", "x-sheetmonkey-current-date-time");
    formData.append("name", inquiry.name);
    formData.append("email", inquiry.email);
    formData.append("message", inquiry.message);

    await fetch(webhookUrl, {
      method: "POST",
      mode: "no-cors",
      body: formData,
    });
    dispatched = true;
  } catch (err) {
    console.warn("FormData submission attempt warning:", err);
  }

  return dispatched;
}

/**
 * Universal dispatcher:
 * 1. Records submission locally so no message is ever lost.
 * 2. Dispatches to SheetMonkey / configured webhook endpoint.
 */
export async function dispatchContactSubmission(
  inquiry: { name: string; email: string; message: string }
): Promise<{ success: boolean; sheetUpdated: boolean }> {
  // Always save locally first
  saveLocalSubmission(inquiry);

  const target = getSavedSpreadsheetTarget();
  let sheetUpdated = false;

  if (target && target.startsWith("http")) {
    try {
      sheetUpdated = await sendInquiryToWebhook(target, inquiry);
    } catch (err) {
      console.warn("Webhook transmission error:", err);
    }
  }

  return { success: true, sheetUpdated };
}
