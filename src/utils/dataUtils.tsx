import HomePage from "@pages/home";
import { IRouterType } from "./typeUtils";
import { lazy } from "react";

const LazyMainLayout = lazy(() => import("@features/layout/main"));

export const ROUTER_DATA: IRouterType[] = [
  {
    title: "Main Layout",
    path: "/",
    element: <LazyMainLayout />,
    children: [{ title: "Home Page", path: "", element: <HomePage /> }],
  },
];
