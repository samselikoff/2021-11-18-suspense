import { ArrowSmDownIcon, ArrowSmUpIcon } from "@heroicons/react/solid";

let item = {
  id: 1,
  name: "Total Subscribers",
  stat: "71,897",
  change: "122",
  changeType: "increase",
};

export default function TwitterStats() {
  return (
    <div className="relative px-4 pt-5 overflow-hidden bg-white rounded-lg shadow sm:pt-6 sm:px-6">
      <dt>
        <div className="absolute p-3 bg-[#1DA1F2] rounded-md">
          <TwitterIcon className="w-6 h-6 text-white" aria-hidden="true" />
        </div>
        <p className="ml-16 text-sm font-medium text-gray-500 truncate">
          Total Followers
        </p>
      </dt>
      <dd className="flex items-baseline ml-16 sm:pb-7">
        <p className="text-2xl font-semibold text-gray-900">71,897</p>
        <p
          className={`${
            item.changeType === "increase" ? "text-green-600" : "text-red-600"
          }
            "ml-2 flex items-baseline text-sm font-semibold"
          `}
        >
          {item.changeType === "increase" ? (
            <ArrowSmUpIcon
              className="self-center flex-shrink-0 w-5 h-5 text-green-500"
              aria-hidden="true"
            />
          ) : (
            <ArrowSmDownIcon
              className="self-center flex-shrink-0 w-5 h-5 text-red-500"
              aria-hidden="true"
            />
          )}

          <span className="sr-only">
            {item.changeType === "increase" ? "Increased" : "Decreased"} by
          </span>
          {item.change}
        </p>
      </dd>
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
