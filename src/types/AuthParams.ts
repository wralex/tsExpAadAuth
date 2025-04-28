interface MsalConfig {
    successRedirect: string;
    scopes?: string[];
    redirectUri?: string;
    postLogoutRedirectUri?: string;
}

export default MsalConfig;