import { Suspense } from "react";
import ChipotleStats from "../components/chipotle-stats";
import Spinner from "../components/spinner";
import TwitterStats from "../components/twitter-stats";
import YouTubeStats from "../components/youtube-stats";

export default function Home() {
  return (
    <div className="p-8">
      <h3 className="text-lg font-medium leading-6 text-gray-900">Dashboard</h3>

      <Suspense fallback={<Fallback />}>
        <div className="grid grid-cols-3 gap-5 mt-5">
          <TwitterStats />
          <YouTubeStats />
          <ChipotleStats />
        </div>
      </Suspense>
    </div>
  );
}

function Fallback() {
  return (
    <div className="h-[100px] flex items-center justify-center mt-5">
      <Spinner />
    </div>
  );
}
