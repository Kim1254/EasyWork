import React from "react";

// Modal의 Container 부분
// children: React.ReactNode;
// handleClose: () => void;
export default function ModalContainer({ children, handleClose }) {
  const handleModalClose = (e) => {
    // onClick event가 발생한 부분의 target이 currenTarget과 일치할때만 실행
    //(ex: modal 창을 직접 누르는 부분을 눌렀을 때는 x Container 부분을 눌렀을 때 실행)
    if (e.target === e.currentTarget) {
      handleClose();
    } else {
      return;
    }
  };
  return (
    // Modal의 Container
    <section
      onClick={handleModalClose}
      className="fixed top-0 right-0 h-full w-full z-30  flex flex-col justify-center items-center  bg-neutral-500/50"
    >
      {/* Modal */}
      <div className="h-[800px] w-[800px] bg-white z-60">{children}</div>
    </section>
  );
}
