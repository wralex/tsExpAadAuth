# Typescript & Express with MSAL Authentication

I put this project up based on the sample Microsoft App Registration Node project, but using Typescript as opposed to keeping in JS files.

In addition I've moved/edited source files, views, and included partials to make it more modular.

**NOTE:** There are **Environment variables** used in this project. The commons ones are also contained in the Dockerfile contained in this project. There are 3 special variables however that will need to be put in when executing the Run command to allow for the site to authenticate users with the Azure tenant.

Here is the list of **Environment variables** required to run the site:

| **Name** | **Value** |
|------|-------|
| **GRAPH_API_ENDPOINT** | `"https://graph.microsoft.com/"`<br /><small>_(# graph api endpoint string should end with a trailing slash)_</small> |
| **CLOUD_INSTANCE** | `"https://login.microsoftonline.com/"`<br /><small>_(# cloud instance string should end with a trailing slash)_</small> |
| **EXPRESS_SESSION_SECRET** | `"AUTH_SESSSION"`<br /><small>_(can be modified)_</small>|
| **PORT** | `3080`<br /><small>_(can be modified)_</small> |
| **REDIRECT_URI** | `"http://localhost:3080/auth/redirect"`<br /><small>_(based on the local instance & PORT as above, would need to modify based on where it's executing)_</small> |
| **POST_LOGOUT_REDIRECT_URI** | `"http://localhost:3080"`<br /><small>_(based on the local instance & PORT as above, would need to modify based on where it's executing)_</small> |
| **EXPRESS_SESSION_COOKIE_HTTPONLY** | `true`<br /><small>_(based on the local instance, would need to modify based on where it's executing)_</small> |
| **EXPRESS_SESSION_COOKIE_SECURE** | `false`<br /><small>_(based on the local instance, would need to modify based on where it's executing)_</small> |
| **TENANT_ID** | **_`(secret string from AZ Tenant)`_** |
| **CLIENT_ID** | **_`(secret string from AZ Tenant App Reg)`_** |
| **CLIENT_SECRET** | **_`(secret string from AZ Tenant App Reg)`_** |

If you find this helpful let me know.
