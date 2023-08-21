import Image from "next/image";
import PulseCircle from "@/components/ui/PulseCircle";
import CarouselContainer from "@/components/ui/CarouselContainer";

export default function Home() {
  return (
    <>
      {/* <PulseCircle /> */}
      <CarouselContainer>
        <Image src={"/images/trip1.jpg"} alt={"trip"} width={1009} height={568} />
        <Image src={"/images/trip2.jpg"} alt={"trip"} width={1009} height={568} />
        <Image src={"/images/trip3.jpg"} alt={"trip"} width={1009} height={568} />
      </CarouselContainer>
    </>
  );
}
