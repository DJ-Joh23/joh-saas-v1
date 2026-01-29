export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

// Generate login URL at runtime so redirect URI reflects the current origin.
export const getLoginUrl = (): string => {
  try {
    // Get environment variables with safe fallbacks
    const oauthPortalUrl = (import.meta.env.VITE_OAUTH_PORTAL_URL as string) || 'https://api.manus.im';
    const appId = (import.meta.env.VITE_APP_ID as string) || 'dev-app-id';
    
    // Validate that we have valid values
    if (!oauthPortalUrl || !appId) {
      console.warn('OAuth configuration incomplete, using defaults');
      return 'https://api.manus.im/app-auth?appId=dev-app-id&type=signIn';
    }
    
    const redirectUri = `${window.location.origin}/api/oauth/callback`;
    const state = btoa(redirectUri);
    
    // Construct URL safely
    const url = new URL(`${oauthPortalUrl}/app-auth`);
    url.searchParams.set('appId', appId);
    url.searchParams.set('redirectUri', redirectUri);
    url.searchParams.set('state', state);
    url.searchParams.set('type', 'signIn');
    
    return url.toString();
  } catch (error) {
    console.error('Failed to construct login URL:', error);
    // Return a safe fallback that will work in any environment
    return 'https://api.manus.im/app-auth?appId=dev-app-id&type=signIn';
  }
};
