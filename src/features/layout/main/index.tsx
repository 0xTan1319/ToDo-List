import LoadingPage from "@pages/loading";
import S from "./index.module.scss";
import { Outlet } from "react-router-dom";
import { useApp } from "@contexts/appContext";
import clsx from "clsx";

const MainLayout = () => {
  const { app } = useApp();

  return (
    <>
      <LoadingPage effect />
      <div className={clsx(S.root, app.toggle ? S.dark : S.light)}>
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
