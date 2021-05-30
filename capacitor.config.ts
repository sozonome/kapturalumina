import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "dev.sznm.kapturalumina",
  appName: "KapturaLumina",
  bundledWebRuntime: false,
  webDir: "build",
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,
    },
  },
  cordova: {},
};

export default config;
