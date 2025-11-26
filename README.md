This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.

## Features

- 🔍 Search events by keyword and city
- 📍 View event details with map preview
- ⭐ Mark favourite events (synced to Firebase)
- 🌐 English/Arabic language support with RTL
- 🔐 Firebase Authentication
- 👆 Biometric login support
- 📱 Modern, dark-themed UI

## Prerequisites

- Node.js >= 20
- React Native CLI
- iOS: Xcode 14+, CocoaPods
- Android: Android Studio, JDK 17+
- Firebase project configured

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
# or
yarn install
```
````

### 2. iOS Setup

```bash
cd ios
bundle install
bundle exec pod install
cd ..
```

### 3. Android Setup

Ensure Android SDK and build tools are installed.

### 4. Firebase Configuration

1. Create a Firebase project at https://console.firebase.google.com
2. Add iOS app: Download `GoogleService-Info.plist` → Place in `ios/CityPulse/`
3. Add Android app: Download `google-services.json` → Place in `android/app/`
4. Enable Authentication (Email/Password)
5. Enable Firestore Database

### 5. API Keys Configuration

#### Ticketmaster API Key

- Get free API key from: https://developer.ticketmaster.com/
- Update `src/config.ts`:
  ```typescript
  export const TICKETMASTER_API_KEY = 'YOUR_KEY_HERE';
  ```

#### Google Maps API Key (for map preview)

- Get API key from: https://console.cloud.google.com/
- Enable Maps SDK for iOS and Android
- **iOS:** Add to `ios/CityPulse/Info.plist`:
  ```xml
  <key>GMSApiKey</key>
  <string>YOUR_GOOGLE_MAPS_API_KEY</string>
  ```
- **Android:** Add to `android/app/src/main/AndroidManifest.xml`:
  ```xml
  <meta-data
    android:name="com.google.android.geo.API_KEY"
    android:value="YOUR_GOOGLE_MAPS_API_KEY"/>
  ```

### 6. Run the Application

```bash
# Start Metro bundler
npm start

# iOS
npm run ios

# Android
npm run android
```

## Assumptions Made

1. **API Keys:** Ticketmaster API key is provided in config. In production, use environment variables.
2. **Firebase:** Assumes Firebase project is already configured with Auth and Firestore enabled.
3. **RTL Support:** Arabic RTL layout requires app restart (native limitation). This is acceptable for the assessment.
4. **Biometric Support:** Assumes device has biometric capabilities (Face ID/Touch ID/Fingerprint).
5. **Network:** Assumes stable internet connection for API calls and Firebase sync.
6. **Mock Data:** Authentication uses Firebase (not mock data) as per bonus requirements.

## Project Structure

```
src/
├── components/       # Reusable UI components
├── context/         # React Context providers (Auth, Language)
├── hooks/           # Custom React hooks (useEvents, useFirebaseAuth)
├── Navigation/      # Navigation configuration
├── screens/         # Screen components
├── types/           # TypeScript type definitions
└── utils/           # Utility functions (storage, validators, toast)
```

## Key Technologies

- React Native 0.81.4
- TypeScript
- React Navigation 7
- Firebase (Auth, Firestore)
- i18next (Internationalization)
- react-native-maps
- AsyncStorage
- react-native-keychain

## Bonus Features Implemented

Firebase Authentication & Firestore  
Biometric Login  
RTL Support for Arabic

## Troubleshooting

### iOS Build Issues

- Run `cd ios && pod install && cd ..`
- Clean build folder in Xcode: Product → Clean Build Folder

### Android Build Issues

- Run `cd android && ./gradlew clean && cd ..`
- Ensure `google-services.json` is in correct location

### Firebase Not Working

- Verify `GoogleService-Info.plist` (iOS) and `google-services.json` (Android) are present
- Check Firebase project settings match bundle IDs

![Screenshot]
-Login Screen
(https://github.com/user-attachments/assets/c55c79b1-4e91-41ce-a821-28313d1c4d8f)
-Signup screen
(https://github.com/user-attachments/assets/81baa527-a36c-4f76-80f3-c8749fb5a1f3)
-HomeScreen
(https://github.com/user-attachments/assets/8c24db08-6a7e-4e75-9836-9bbf838b07b7)
-Detailsscreen
(https://github.com/user-attachments/assets/320036ca-ff70-4ce1-bb8d-c97a9c10ec13)
Profilescreen
(https://github.com/user-attachments/assets/39c4a12e-4e20-43b9-9efc-1d82cd67f0a4)

---