/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_WEATHER_API_KEY: string;
    readonly VITE_GOOGLE_MAPS_API_KEY: string; 
    // Define other environment variables here
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  