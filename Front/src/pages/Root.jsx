import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import BackgroundContainer from "../components/ui/BackgroundContainer";

export default function Root() {
  const location = useLocation();

  console.log(location);
  return (
    <>
      {location.pathname !== "/resume" ? (
        <BackgroundContainer>
          <Header />
          <Outlet />
        </BackgroundContainer>
      ) : (
        <Outlet />
      )}
    </>
  );
}
