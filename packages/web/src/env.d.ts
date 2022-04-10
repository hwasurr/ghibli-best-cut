/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string;
    readonly REACT_APP_API_HOST: string;
    readonly REACT_APP_API_SUBSCRIPTION_HOST: string;
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}