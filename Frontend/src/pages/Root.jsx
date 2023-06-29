import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import BackgroundContainer from "../components/ui/BackgroundContainer";

export default function Root() {
  return (
    <>
      <BackgroundContainer>
        <Header />
        <Outlet />
      </BackgroundContainer>
    </>
  );
}
