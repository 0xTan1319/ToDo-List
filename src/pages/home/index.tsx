import { useApp } from "@contexts/appContext";
import S from "./index.module.scss";
import clsx from "clsx";
import { TaskItemComponent } from "@features/ui";
import axiosInstance from "@utils/axiosUtils";
import { KeyboardEvent, useEffect, useState } from "react";
import { ITaskType } from "@utils/typeUtils";

const HomePage = () => {
  const { app, setApp } = useApp();
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [todoText, setTodoText] = useState<string>("");

  useEffect(() => {
    const getLists = async () => {
      const data: ITaskType[] = await axiosInstance.get("/task");

      setApp((prevState) => ({ ...prevState, tasks: data }));
    };

    getLists();
  }, []);

  const handleLogin = async () => {
    await axiosInstance.post("/auth/login", {
      email: "testUser@gmail.com",
      password: "testuser",
    });

    setApp((prevState) => ({ ...prevState, isLogged: true }));
  };

  const handleLogout = async () => {
    await axiosInstance.get("/auth/logout");

    setApp((prevState) => ({ ...prevState, isLogged: false }));
  };

  const handleCreateNewTask = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const res: ITaskType = await axiosInstance.post("/task/new", {
        name: todoText,
        isCompleted: isCompleted,
      });

      setApp((prevState) => ({
        ...prevState,
        tasks: [...prevState.tasks, res],
      }));

      setTodoText("");
      setIsCompleted(false);
    }
  };

  const handleChangeSortType = async (data: "all" | "active" | "completed") => {
    const res: ITaskType[] = await axiosInstance.get(`/task/${data}`);
    setApp((prevState) => ({ ...prevState, linkType: data, tasks: res }));
  };

  const handleClearDatas = async () => {
    await axiosInstance.delete(`/task/clear/${app.linkType}`);
    setApp((prevState) => ({ ...prevState, tasks: [] }));
  };

  return (
    <div className={clsx(S.root, app.toggle ? S.dark : S.light)}>
      <div className={S.header}>
        <h1 className={S.header_title}>Todo</h1>
        <button
          type="button"
          className={S.header_login}
          onClick={app.isLogged ? handleLogout : handleLogin}
        >
          {app.isLogged ? "Logout" : "Login"}
        </button>
      </div>
      <div className={S.body}>
        <form className={S.body_form}>
          <input
            type="checkbox"
            name="todo-checkbox"
            checked={isCompleted}
            onChange={() => setIsCompleted(!isCompleted)}
            className={S.body_form_checkbox}
          />
          <input
            type="text"
            name="new-todo"
            placeholder="Create new todo..."
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
            onKeyDown={handleCreateNewTask}
            className={S.body_form_new}
          />
        </form>
        <ul className={S.body_list}>
          {app.tasks.map((data, index) => (
            <TaskItemComponent key={index} data={data} />
          ))}
        </ul>
        <div className={S.body_note}>
          <p className="">
            <span>{app.tasks.length} </span>items left
          </p>
          <p className={S.body_note_clear} onClick={handleClearDatas}>
            Clear Completed
          </p>
        </div>
      </div>
      <div className={S.footer}>
        <span
          className={clsx(S.footer_link, app.linkType === "all" && S.active)}
          onClick={() => handleChangeSortType("all")}
        >
          All
        </span>
        <span
          className={clsx(S.footer_link, app.linkType === "active" && S.active)}
          onClick={() => handleChangeSortType("active")}
        >
          Active
        </span>
        <span
          className={clsx(
            S.footer_link,
            app.linkType === "completed" && S.active
          )}
          onClick={() => handleChangeSortType("completed")}
        >
          Completed
        </span>
      </div>
    </div>
  );
};

export default HomePage;
