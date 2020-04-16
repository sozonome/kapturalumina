import { lazy } from "react";

export const Home = lazy(() => import("./pages/Home"));
export const Leaderboards = lazy(() => import("./pages/Leaderboards"));
export const Profile = lazy(() => import("./pages/Profile"));

export const MainTabs = lazy(() => import("./pages/MainTabs"));
export const ChapterPage = lazy(() =>import("./pages/ChapterPage"));
export const SubModulePage = lazy(() => import("./pages/SubModulePage"));
export const AboutPage = lazy(() => import("./pages/AboutPage"));
export const QuizPage = lazy(() => import("./pages/QuizPage"));
