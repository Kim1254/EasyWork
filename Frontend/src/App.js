import { useState } from "react";
import "./App.css";
import VoiceRecord from "./VoiceRecord";
import ProtalModal from "./components/ui/PortalModal";
import ModalContainer from "./components/ui/ModalContainer";

function App() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      {showModal && (
        <ProtalModal>
          <ModalContainer handleClose={() => setShowModal(false)}>
            <div className="">테스트 모달입니다.</div>
          </ModalContainer>
        </ProtalModal>
      )}

      <div className="App">
        {/* 녹음 관련 기능 Component */}
        <VoiceRecord />
        <button onClick={() => setShowModal(true)}>test</button>
      </div>
    </>
  );
}

export default App;
