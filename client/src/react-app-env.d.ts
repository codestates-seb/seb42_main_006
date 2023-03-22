/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    REACT_APP_HOST_URL: string;
    REACT_APP_S3_URL: string;
    REACT_APP_YOUTUBE_API_KEY: string;
  }
}
