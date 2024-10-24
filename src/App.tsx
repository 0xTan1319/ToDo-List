import LoadingPage from "@pages/loading";
import PageRouter from "@utils/routerUtils";
import { Suspense } from "react";

const App = () => {
  return (
    <Suspense fallback={<LoadingPage effect={false} />}>
      <PageRouter />
    </Suspense>
  );
};

export default App;
