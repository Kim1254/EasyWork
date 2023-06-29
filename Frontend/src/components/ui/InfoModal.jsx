export default function InfoModal({ fieldElement }) {
  return (
    <article>
      <div className="mt-[45px] flex justify-end items-center px-[52px]">
        <button className=""></button>
      </div>
      <div className="h-[68px] mt-[34.64px] w-[323px] rounded-full bg-[#EEE8DA] border-none flex items-center justify-center">
        <img width={39.98} height={44.26} src={"/svg/play.svg"} alt="play" className="object-cover mr-[49.52px] " />
        <img
          width={44}
          height={44}
          src={"/svg/record.svg"}
          alt="record"
          className="relative object-cover mr-[51.5px]"
        />
        <img width={44} height={44} src={"/svg/audio-submit.svg"} alt="audio submit" />
      </div>
    </article>
  );
}
