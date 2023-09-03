"use client";
import ErrorPage from "@/components/ui/ErrorPage";
import LoadingPage from "@/components/ui/LoadingPage";
import { ResultContext } from "@/context/ResultContext";
import { useContext } from "react";
import { useReactMediaRecorder } from "react-media-recorder";

export default function Test() {
  const { status, startRecording, stopRecording, resumeRecording, pauseRecording, mediaBlobUrl } =
    useReactMediaRecorder({ video: false });
  const { state, dispatch } = useContext(ResultContext);
  console.log(state);
  return (
    // <div>
    //   <p className="font-bold ">{status}</p>
    //   <button onClick={startRecording}>Start Recording</button>
    //   <button onClick={stopRecording}>Stop Recording</button>
    //   <button onClick={resumeRecording}>resume Recording</button>
    //   <button onClick={pauseRecording}>pause Recording</button>
    //   <audio src={mediaBlobUrl} controls autoPlay loop />
    //   <svg
    //     xmlns="http://www.w3.org/2000/svg"
    //     xmlnsXlink="http://www.w3.org/1999/xlink"
    //     width="101.694"
    //     height="170.489"
    //     viewBox="0 0 101.694 170.489"
    //   >
    //     <defs>
    //       <clipPath id="clip-path">
    //         <rect id="사각형_217" data-name="사각형 217" width="101.694" height="170.489" fill="#7bc278" />
    //       </clipPath>
    //     </defs>
    //     <g id="그룹_333" data-name="그룹 333" clip-path="url(#clip-path)">
    //       <path
    //         id="패스_20"
    //         data-name="패스 20"
    //         d="M50.847,73.88c-33.32,0-49.035-26.607-49.688-27.739a8.691,8.691,0,0,1,15.034-8.723C16.656,38.2,27.769,56.5,50.847,56.5S85.036,38.2,85.5,37.417a8.691,8.691,0,0,1,15.034,8.723C99.879,47.273,84.164,73.88,50.847,73.88Z"
    //         transform="translate(0.001 62.864)"
    //         fill="#7bc278"
    //       />
    //       <path
    //         id="선_1"
    //         data-name="선 1"
    //         d="M5.691,42.4A8.691,8.691,0,0,1-3,33.714V5.691a8.691,8.691,0,0,1,17.382,0V33.714A8.691,8.691,0,0,1,5.691,42.4Z"
    //         transform="translate(45.156 122.36)"
    //         fill="#7bc278"
    //       />
    //       <path
    //         id="선_2"
    //         data-name="선 2"
    //         d="M52.148,14.382H5.691A8.691,8.691,0,0,1,5.691-3H52.148a8.691,8.691,0,0,1,0,17.382Z"
    //         transform="translate(22.356 156.107)"
    //         fill="#7bc278"
    //       />
    //       <path
    //         id="패스_101"
    //         data-name="패스 101"
    //         d="M36.177,0A28.444,28.444,0,0,0,7.734,28.443V31.1H31.293a5.83,5.83,0,0,1,0,11.66H7.734v8.251H31.293a5.829,5.829,0,0,1,0,11.658H7.734v8.251H32.4a5.83,5.83,0,0,1,0,11.66H7.8a28.422,28.422,0,0,0,56.813-1.359V28.443A28.443,28.443,0,0,0,36.177,0"
    //         transform="translate(14.672 -0.001)"
    //         fill="#7bc278"
    //       />
    //     </g>
    //   </svg>
    // </div>
    // <LoadingPage />
    <ErrorPage />
  );
}
