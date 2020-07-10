# KapturaLumina
![KapturaLumina](previews/banner.jpg)

Basic Photography Learning Mobile Applications with Gamification

Bachelor Thesis (Final Project) of [Agustinus Nathaniel](https://agustinusnathaniel.com)

[<img src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" width="200"/>](https://play.google.com/store/apps/details?id=dev.sznm.kapturalumina)

## Previews

Home Page | Leaderboard | Profile
:-------------------------:|:-------------------------:|:-------------------------:
![01](previews/01.jpg) | ![02](previews/02.jpg) | ![03](previews/03.jpg)
Learn | Quiz | 
![04](previews/04.jpg) | ![05](previews/05.jpg) | 

App Theme color inspired by Dracula Theme color palette

## Tech Stacks, Dependencies
* Framework : Ionic v5 - React
* Database + Auth : Firebase
* Tools, Libraries : 
  - Ionic Capacitor
  - TypeScript
  - Cloudinary for image storage
  - CloudImage for image resizing, compression, (image transformer) and acceleration / optimization
* Deployment : Vercel (Formerly Zeit) for PWA (Web App) Version

<details>
  <summary><strong>Getting Started</strong></summary>
 
  ## SettingUptheFirebase
  In order for the application to run, you will need to connect it to Firebase Auth and Database. 
  
  1. Create a firebase project
  2. Go to project settings, add a web app to acquire the API key
  3. Go to Authentication -> Sign In Method -> Enable Email/Password
  4. Go to Database -> pick Realtime Database -> import [this sample database file](sample-database.json)

  ## Getting Started
  1. [Download](https://nodejs.org) and install node.js
  2. Install ionic CLI : 
    `npm install -g ionic`
  3. Clone this repo
    `git clone https://github.com/sozonome/kapturalumina.git`
  4. Run `npm i` or `yarn` from project root
  6. Run `ionic s`
</details>

<details>
  <summary><strong>Build Guide</strong></summary>

  ## General Build Guide
  * `npm run build-release-android` or `npm run build-clean-release-android`

  ## Build to APK Guide
  1. `npm run build-release-android`,
  2. `npm run debug-android`, wait until Android Studio Open and finish setting up Gradle etc
  3. Clean Project + Rebuild Project if needed
  4. Go to Build > Generate Signed Bundle / APK 
  5. Put in the password of the KeyStore
  6. Done
</details>

<details>
  <summary><strong>References, Notes</strong></summary>

  ## References
  ##### Some references and problems I encounter during development and I think will be helpful for my next projects
  - [Ionic](https://ionicframework.com/)
    - [Ionic Docs](https://ionicframework.com/docs/react) 
    - [Ionic + React + Firebase Tutorial](https://www.youtube.com/playlist?list=PLYxzS__5yYQlhvyLXSKhv4oAvl06MInSE)
    - [Change Font](https://commentedcoding.com/how-to-create-a-settings-page-with-customizable-font-family-in-ionic-5-steps/)
    - [Theming](https://ionicframework.com/docs/theming/themes)
    - [Colors - Color Generator](https://ionicframework.com/docs/theming/colors)
    - Hardware Back Button Android Problem
      - [Hardware Back Button Android Problem - Android](https://ionicframework.com/docs/developing/hardware-back-button)
      - [Hardware Back Button Android Problem - Android](https://forum.ionicframework.com/t/react-handle-hardware-back-button/183566/3)
        <pre><code>setupConfig({
          swipeBackEnabled: false,
          hardwareBackButton: false, //android
        });</code></pre>
      - [React Config](https://ionicframework.com/docs/react/config)
        - [Capacitor App API - Add listener back button](https://capacitor.ionicframework.com/docs/apis/app/)
        - [App Minimize](https://ionicframework.com/docs/native/app-minimize)
  - [Environment Variables](https://www.youtube.com/watch?v=17UVejOw3zA)
  - [Firebase](https://firebase.google.com/)
    - [React Auth with Firebase and Hooks](https://www.youtube.com/watch?v=unr4s3jd9qA)
    - [Manage Users](https://firebase.google.com/docs/auth/web/manage-users)
    - [Realtime Database Read and Write](https://firebase.google.com/docs/database/web/read-and-write)
  - [Persistent Login](https://www.youtube.com/watch?v=2Oz-OLB8FQQ)
  - [Capacitor](https://capacitor.ionicframework.com/docs/)
  - [Android App Version Number](https://www.freakyjolly.com/change-version-number-of-app-in-android-studio/#.XtM01TPiuHs)
</details>

