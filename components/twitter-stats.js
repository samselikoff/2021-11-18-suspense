import { ArrowSmDownIcon, ArrowSmUpIcon } from "@heroicons/react/solid";
import useSWR from "swr";
import Spinner from "./spinner";

let item = {
  id: 1,
  name: "Total Subscribers",
  stat: "71,897",
  change: "122",
  changeType: "increase",
};

export default function TwitterStats() {
  let { data } = useSWR("/api/twitter");

  return (
    <div className="flex items-center justify-center p-6 overflow-hidden bg-white rounded-lg shadow">
      {data ? (
        <>
          <TwitterIcon className="w-10 h-10 text-[#1DA1F2]" />
          <div className="pl-5">
            <p className="text-sm font-medium text-gray-500 truncate">
              Followers
            </p>
            <div className="flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">71,897</p>
              <p
                className={`${
                  item.changeType === "increase"
                    ? "text-green-600"
                    : "text-red-600"
                }
                "ml-2 flex items-baseline text-sm font-semibold"
              `}
              >
                {item.changeType === "increase" ? (
                  <ArrowSmUpIcon className="self-center w-5 h-5 text-green-500 shrink-0" />
                ) : (
                  <ArrowSmDownIcon className="self-center w-5 h-5 text-red-500 shrink-0" />
                )}
                <span className="sr-only">
                  {item.changeType === "increase" ? "Increased" : "Decreased"}{" "}
                  by
                </span>
                {item.change}
              </p>
            </div>
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

function TwitterIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M24 4.557a9.83 9.83 0 01-2.828.775 4.932 4.932 0 002.165-2.724 9.864 9.864 0 01-3.127 1.195 4.916 4.916 0 00-3.594-1.555c-3.179 0-5.515 2.966-4.797 6.045A13.978 13.978 0 011.671 3.149a4.93 4.93 0 001.523 6.574 4.903 4.903 0 01-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.935 4.935 0 01-2.224.084 4.928 4.928 0 004.6 3.419A9.9 9.9 0 010 19.54a13.94 13.94 0 007.548 2.212c9.142 0 14.307-7.721 13.995-14.646A10.025 10.025 0 0024 4.557z" />
    </svg>
  );
}
