import { motion } from "framer-motion";
import { Suspense } from "react";
import ChipotleStats from "../components/chipotle-stats";
import InstagramStats from "../components/instagram-stats";
import Spinner from "../components/spinner";
import TwitterStats from "../components/twitter-stats";
import YouTubeStats from "../components/youtube-stats";

let container = {
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};
let item = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

export default function Home() {
  return (
    <div className="p-8">
      <h3 className="text-lg font-medium leading-6 text-gray-900">Dashboard</h3>

      <Suspense fallback={<Fallback />}>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-3 gap-5 mt-5"
        >
          <motion.div variants={item}>
            <TwitterStats />
          </motion.div>
          <motion.div variants={item}>
            <YouTubeStats />
          </motion.div>
          <motion.div variants={item}>
            <ChipotleStats />
          </motion.div>
          {/* <motion.div variants={item}>
            <InstagramStats />
          </motion.div> */}
        </motion.div>
      </Suspense>
    </div>
  );
}

function Fallback() {
  return (
    <div className="flex items-center justify-center mt-12">
      <Spinner />
    </div>
  );
}
