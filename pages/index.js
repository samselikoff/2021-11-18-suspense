import ChipotleStats from "../components/chipotle-stats";
import TwitterStats from "../components/twitter-stats";
import YouTubeStats from "../components/youtube-stats";

export default function Home() {
  return (
    <div className="p-8">
      <h3 className="text-lg font-medium leading-6 text-gray-900">Dashboard</h3>

      <dl className="grid grid-cols-3 gap-5 mt-5">
        <TwitterStats />
        <YouTubeStats />
        <ChipotleStats />
      </dl>
    </div>
  );
}
