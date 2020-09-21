# KapturaLumina
![KapturaLumina](previews/banner.jpg)

[![CodeFactor](https://www.codefactor.io/repository/github/sozonome/kapturalumina/badge)](https://www.codefactor.io/repository/github/sozonome/kapturalumina)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=sozonome_kapturalumina&metric=alert_status)](https://sonarcloud.io/dashboard?id=sozonome_kapturalumina) [![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=sozonome_kapturalumina&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=sozonome_kapturalumina) [![Bugs](https://sonarcloud.io/api/project_badges/measure?project=sozonome_kapturalumina&metric=bugs)](https://sonarcloud.io/dashboard?id=sozonome_kapturalumina) [![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=sozonome_kapturalumina&metric=code_smells)](https://sonarcloud.io/dashboard?id=sozonome_kapturalumina) [![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=sozonome_kapturalumina&metric=duplicated_lines_density)](https://sonarcloud.io/dashboard?id=sozonome_kapturalumina)

Basic Photography Learning Mobile Applications with Gamification <br/>
Part of my Bachelor Thesis research in gamification design and implementation.

[<img src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" width="200"/>](https://play.google.com/store/apps/details?id=dev.sznm.kapturalumina) [<img src="https://user-images.githubusercontent.com/9122190/28998409-c5bf7362-7a00-11e7-9b63-db56694522e7.png" width="188" style="padding:10px"/>](https://kapturalumina.sznm.dev)

## Previews

Home Page | Leaderboard | Profile
:-------------------------:|:-------------------------:|:-------------------------:
![01](previews/01.jpg) | ![02](previews/02.jpg) | ![03](previews/03.jpg)
Learn | Quiz | 
![04](previews/04.jpg) | ![05](previews/05.jpg) | 

App Theme color inspired by Dracula Theme color palette

## Tech Stacks, Dependencies
![codefactor badge](https://www.codefactor.io/repository/github/sozonome/kapturalumina/badge?style=for-the-badge)
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
  5. Run `npx cap sync android` to synchronize capacitor deps / native bridges
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
  - [TypeScript - Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)
</details>

