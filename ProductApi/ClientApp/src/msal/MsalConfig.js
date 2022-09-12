export const msalConfig = {
    authority: 'https://login.microsoftonline.com/0fc6d325-22c6-4862-ba1b-5996433407e4',
    clientId: '74bdb7e7-6e01-410f-9657-b3b7c2ff72f4',
    redirectUri:"http://localhost:3000/"
};

export const apiConfig = {
    resourceUri: "http://localhost:5000/api",
    resourceScopes: ["api://0f0f21cd-f7b4-4921-8a25-c8c677da7333/ReadWrite"]
}