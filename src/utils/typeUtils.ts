interface IRouterType {
  title: string;
  path: string;
  element: JSX.Element;
  children?: IRouterType[];
}

interface IAppProps {
  toggle: boolean;
  isLogged: boolean;
  tasks: ITaskType[];
  linkType: "all" | "active" | "completed";
}

interface ITaskType {
  _id?: string;
  name: string;
  isCompleted: boolean;
}

export type { IRouterType, IAppProps, ITaskType };
