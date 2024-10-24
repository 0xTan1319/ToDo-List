import { FC, useEffect, useState } from "react";
import S from "./index.module.scss";
import closeIcon from "@assets/icons/icon-cross.svg";
import { ITaskType } from "@utils/typeUtils";
import axiosInstance from "@utils/axiosUtils";
import { useApp } from "@contexts/appContext";

interface IProps {
  data: ITaskType;
}

export const TaskItemComponent: FC<IProps> = ({ data }) => {
  const { setApp } = useApp();
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  useEffect(() => {
    setIsCompleted(data.isCompleted);
  }, [data.isCompleted]);

  const handleChangeState = async () => {
    const res: ITaskType = await axiosInstance.put(`/task/update/${data._id}`, {
      name: data.name,
      isCompleted: !isCompleted,
    });
    console.log(res);
    setApp((prevState) => ({
      ...prevState,
      tasks: prevState.tasks.map((task) => (task._id === res._id ? res : task)),
    }));
    setIsCompleted(!isCompleted);
  };

  const handleDeleteTask = async () => {
    await axiosInstance.delete(`/task/delete/${data._id}`);

    setApp((prevState) => ({
      ...prevState,
      tasks: prevState.tasks.filter((task) => task._id !== data._id),
    }));
  };

  return (
    <li className={S.root}>
      <label>
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={handleChangeState}
        />
        <p>{data.name}</p>
      </label>
      <img src={closeIcon} alt="Close Icon Image" onClick={handleDeleteTask} />
    </li>
  );
};
