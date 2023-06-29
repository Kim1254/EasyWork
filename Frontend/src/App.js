import { useState } from "react";
import "./App.css";
import VoiceRecord from "./components/VoiceRecord";
import ProtalModal from "./components/ui/PortalModal";
import ModalContainer from "./components/ui/ModalContainer";
import HomePage from "./pages/HomePage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ResumePage from "./pages/ResumePage";
import Root from "./pages/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/resume", element: <ResumePage /> },
    ],
  },
]);

function App() {
  // const [showModal, setShowModal] = useState(false);
  return (
    // <>
    //   {showModal && (
    //     <ProtalModal>
    //       <ModalContainer handleClose={() => setShowModal(false)}>
    //         <div className="">테스트 모달입니다.</div>
    //       </ModalContainer>
    //     </ProtalModal>
    //   )}

    //   <div className="App">
    //     {/* 녹음 관련 기능 Component */}
    //     <VoiceRecord />
    //     <button onClick={() => setShowModal(true)}>test</button>
    //   </div>
    // </>
    <RouterProvider router={router} />
  );
}

export default App;
