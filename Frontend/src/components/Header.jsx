import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="fixed top-[175px] left-[158px] ">
      <Link className="flex items-center gap-[16px]" v href={"/"}>
        <img width={52} height={52} src={"/svg/logo.svg"} alt="이지웤의 로고입니다." />
        <img width={248.14} height={30.73} alt="이지웤" src={"/svg/logo-name.svg"} />
      </Link>
    </header>
  );
}
