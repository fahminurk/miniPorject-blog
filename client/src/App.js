import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Loading from "./components/loading";
import { Routes } from "react-router-dom";
import routes from "./routes/routes";

function App() {
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [isloading]);

  return (
    <>{isloading ? <Loading /> : <Routes>{routes.map((val) => val)}</Routes>}</>
  );
}

export default App;
