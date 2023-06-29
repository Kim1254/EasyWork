import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import BackgroundContainer from "../components/ui/BackgroundContainer";

export default function Root() {
  const location = useLocation();
  console.log(location);
  return (
    <>
      <BackgroundContainer wave={location.pathname !== "/resume"}>
        <Header />
        <Outlet />
      </BackgroundContainer>
    </>
  );
}
