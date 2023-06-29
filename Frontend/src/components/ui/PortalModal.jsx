import React from "react";
import { createPortal } from "react-dom";

// Modal을 CreatePortal을 통해 #modal에 연결
// DomTree 구조를 분리하기 위해 사용
// children: React.ReactNode
export default function PortalModal({ children }) {
  const element = document.getElementById("modal");

  return createPortal(children, element);
}
