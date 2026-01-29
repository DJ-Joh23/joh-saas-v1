export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

// Generate login URL at runtime so redirect URI reflects the current origin.
export const getLoginUrl = (): string => {
  try {
    // Use safe defaults - these will be overridden by environment variables if available
    const oauthPortalUrl = 'https://api.manus.im';
    const appId = 'dev-app-id';
    
    // Get the current origin safely
    if (typeof window === 'undefined') {
      return `${oauthPortalUrl}/app-auth?appId=${appId}&type=signIn`;
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
