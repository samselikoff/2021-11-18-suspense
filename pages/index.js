import ChipotleStats from "../components/chipotle-stats";
import TwitterStats from "../components/twitter-stats";
import YouTubeStats from "../components/youtube-stats";
import { Suspense } from "react";
import Spinner from "../components/spinner";
import { motion } from "framer-motion";
import InstagramStats from "../components/instagram-stats";

let parent = {
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};
let stat = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

export default function Home() {
  return (
    <div className="p-8">
      <h3 className="text-lg font-medium leading-6 text-gray-900">Dashboard</h3>

      <Suspense fallback={<Loading />}>
        <motion.div
          variants={parent}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-5 mt-5 sm:grid-cols-2"
        >
          <motion.div variants={stat}>
            <TwitterStats />
          </motion.div>
          <motion.div variants={stat}>
            <YouTubeStats />
          </motion.div>
          <motion.div variants={stat}>
            <ChipotleStats />
          </motion.div>
          <motion.div variants={stat}>
            <InstagramStats />
          </motion.div>
        </motion.div>
      </Suspense>
    </div>
  );
}

function Loading() {
  return (
    <div className="flex justify-center mt-44 sm:mt-28">
      <Spinner />
    </div>
  );
}
