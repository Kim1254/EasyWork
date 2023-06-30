import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="fixed mt-[110px] ml-[110px] ">
      <Link href={"/"}>
        <img src="/svg/logo.svg" width={175} height={87} aly="쉬운, 이력서" />
      </Link>
    </header>
  );
}
