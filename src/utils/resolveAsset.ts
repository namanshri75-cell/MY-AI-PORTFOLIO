/**
 * Resolves public assets relative to current page base URI.
 * Works seamlessly across GitHub Pages (with or without repo subpaths, with or without trailing slash),
 * custom domains, Netlify, Vercel, and local Vite dev servers.
 */
export function resolvePublicAsset(filename: string): string {
  const cleanFilename = filename.replace(/^\/+/, "");
  if (typeof window === "undefined") {
    return `./${cleanFilename}`;
  }
  try {
    const baseUri = document.baseURI || window.location.href;
    const cleanUrl = baseUri.split("?")[0].split("#")[0];
    // Strip trailing document names like index.html or 404.html
    const folderUrl = cleanUrl.replace(/\/[^/]+\.[a-zA-Z0-9]+$/i, "/");
    const normalizedFolder = folderUrl.endsWith("/") ? folderUrl : `${folderUrl}/`;
    return new URL(cleanFilename, normalizedFolder).href;
  } catch {
    return `./${cleanFilename}`;
  }
}
