# Deep Sea Bounty — Android wrapper

Native Android wrapper for Jake's Base44 app **Deep Sea Bounty**
(live at https://deep-sea-bounty.base44.app/).

The app is an Expo (SDK 51) project whose `App.tsx` loads the live web app
in a `react-native-webview` with:

- full-screen WebView, JavaScript + DOM storage enabled
- branded loading screen while the game loads
- offline error screen with a retry button
- Android hardware back-button support (navigates WebView history)

Built with EAS (`eas build --platform android --profile production`) via the
`.github/workflows/eas-build.yml` workflow, producing a signed `.aab` for the
Google Play Console.

Package: `com.jakesadavidson.deepseabounty` · version 1.0.0 (versionCode 1)
