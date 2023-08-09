export default function InfoModal({ handleClose }) {
  return (
    <article className="w-full h-full relative">
      <img
        width={800}
        height={800}
        className="object-cover h-[800px]"
        alt="사용법에 대한 이미지입니다."
        src={"/image/info_modal.png"}
      />
      <button className="absolute z-50  top-5  right-11 p-6 cursor-pointer" onClick={handleClose}></button>
    </article>
  );
}
