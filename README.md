# KapturaLumina

Basic Photography Learning Mobile Applications with Gamification

Bachelor Thesis (Final Project) of [Agustinus Nathaniel](https://agustinusnathaniel.com)

## Previews
-- W.I.P.

## Tech Stacks
* Framework : Ionic React
* Database + Auth : Firebase
* Tools, Libraries : 
  - CloudImage for image resizing, compression, and acceleration
  - Cloudinary for image storage
  - SwiperJS (used for useRef towards IonSlides)
  - TypeScript
* Deployment : Vercel (Formerly Zeit)

## Getting Started
* [Download](https://nodejs.org) and install node.js
* Install ionic CLI : 
  `npm install -g ionic`
* Clone this repo
  `git clone https://github.com/sozonome/kapturalumina.git`
* Run `npm i` or `yarn` from project root
* Important
  - Setup a Firebase console
  - Put the required keys in `.env` (see [.env_sample](https://github.com/sozonome/kapturalumina/blob/master/.env_sample))
  - Set up the [Auth and Database](#SettingUptheFirebase)
* Run `ionic s`

## SettingUptheFirebase
In order for the application to run, you will need to connect it to Firebase Auth and Database. The specified database structure are included in the [models](https://github.com/sozonome/kapturalumina/blob/master/src/models/learnModules.tsx).

## General Build Guide
* `npm run build-release-android` or `npm run build-clean-release-android`

## Build to APK Guide
-- W.I.P.

## References
- [Ionic](https://ionicframerwork.com/)
  - [Ionic Docs](https://ionicframework.com/docs/react) 
  - [Ionic + React + Firebase Tutorial](https://www.youtube.com/playlist?list=PLYxzS__5yYQlhvyLXSKhv4oAvl06MInSE)
  - [Change Font](https://commentedcoding.com/how-to-create-a-settings-page-with-customizable-font-family-in-ionic-5-steps/)
- [Environment Variables](https://www.youtube.com/watch?v=17UVejOw3zA)
- [Firebase](https://firebase.google.com/)
  - [React Auth with Firebase and Hooks](https://www.youtube.com/watch?v=unr4s3jd9qA)
  - [Manage Users](https://firebase.google.com/docs/auth/web/manage-users)
  - [Realtime Database Read and Write](https://firebase.google.com/docs/database/web/read-and-write)
- [Persistent Login](https://www.youtube.com/watch?v=2Oz-OLB8FQQ)
- [Swiperjs](https://swiperjs.com/api)