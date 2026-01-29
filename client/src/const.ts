export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

// Get environment variables at runtime (not build time)
// This allows the app to work even if env vars are not set during build
const getEnvVar = (key: string, fallback: string): string => {
  // Try to get from window.__ENV__ (injected by server)
  if (typeof window !== 'undefined' && (window as any).__ENV__?.[key]) {
    return (window as any).__ENV__[key];
  }
  // Try to get from import.meta.env (Vite build-time variables)
  const buildTimeValue = (import.meta.env as any)[key];
  if (buildTimeValue) {
    return buildTimeValue;
  }
  // Use fallback
  return fallback;
};

// Generate login URL at runtime so redirect URI reflects the current origin.
export const getLoginUrl = () => {
  const oauthPortalUrl = getEnvVar('VITE_OAUTH_PORTAL_URL', 'https://api.manus.im');
  const appId = getEnvVar('VITE_APP_ID', 'dev-app-id');
  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  const state = btoa(redirectUri);

  try {
    const url = new URL(`${oauthPortalUrl}/app-auth`);
    url.searchParams.set("appId", appId);
    url.searchParams.set("redirectUri", redirectUri);
    url.searchParams.set("state", state);
    url.searchParams.set("type", "signIn");
    return url.toString();
  } catch (error) {
    console.error("Failed to construct login URL:", error);
    // Return a safe fallback URL
    return `${oauthPortalUrl}/app-auth?appId=${appId}&redirectUri=${encodeURIComponent(redirectUri)}&state=${state}&type=signIn`;
  }
};
