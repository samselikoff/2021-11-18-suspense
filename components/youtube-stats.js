import { ArrowSmDownIcon, ArrowSmUpIcon } from "@heroicons/react/solid";
import useSWR from "swr";
import Spinner from "./spinner";

let item = {
  id: 2,
  name: "Avg. Open Rate",
  stat: "58.16%",
  change: "5.4%",
  changeType: "increase",
};

export default function YouTubeStats() {
  let { data } = useSWR("/api/youtube");

  return (
    <div className="flex items-center justify-center p-6 overflow-hidden bg-white rounded-lg shadow">
      {data ? (
        <>
          <YouTubeIcon className="w-11 h-11 text-[#FF0000]" />
          <div className="pl-5">
            <p className="text-sm font-medium text-gray-500 truncate">
              Subscribers
            </p>
            <div className="flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">33,581</p>
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

function YouTubeIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0C.488 3.45.029 5.804 0 12c.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0C23.512 20.55 23.971 18.196 24 12c-.029-6.185-.484-8.549-4.385-8.816zM9 16V8l8 3.993L9 16z" />
    </svg>
  );
}
