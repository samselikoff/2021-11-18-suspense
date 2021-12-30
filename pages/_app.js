import { useRouter } from "next/router";
import useSWR, { SWRConfig, mutate } from "swr";
import "tailwindcss/tailwind.css";
import { makeServer } from "../mirage";
import { useEffect, useState } from "react";
import Link from "next/link";
import Spinner from "../components/spinner";

if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  if (!window.server) {
    window.server = makeServer({ environment: "development" });
  }
}

export default function Wrapper(props) {
  let router = useRouter();
  let [isFirstRender, setIsFirstRender] = useState(true);
  useEffect(() => {
    setIsFirstRender(false);
  }, []);

  if (!router.isReady || isFirstRender) {
    return null;
  }

  return (
    <div className="flex items-center justify-center w-full min-h-screen p-8 antialiased bg-gray-100">
      <SWRConfig
        value={{
          fetcher: (...args) => fetch(...args).then((res) => res.json()),
          use: [trackLiveQueries],
        }}
      >
        <App {...props} />
      </SWRConfig>
    </div>
  );
}

function App({ Component, pageProps }) {
  let { data } = useSWR(`/api/people`);

  return (
    <div className="flex w-full max-w-3xl mx-auto bg-white rounded-md shadow max-h-[442px] overflow-hidden">
      <div className="w-1/3">
        <div className="flex flex-col max-h-full border-r">
          <Link href="/">
            <a className="pt-4 pb-2 text-lg font-semibold border-b px-7 ">
              People
            </a>
          </Link>
          <ul
            role="list"
            className="max-h-full px-4 pt-2 overflow-y-scroll divide-y divide-gray-100"
          >
            {!data ? (
              <Spinner />
            ) : (
              data.people.map((person) => (
                <PersonLink person={person} key={person.id} />
              ))
            )}
          </ul>
        </div>
      </div>
      <div className="w-2/3">
        <div className="max-h-full overflow-y-scroll">
          <Component {...pageProps} />
        </div>
      </div>
    </div>
  );
}

function PersonLink({ person }) {
  let router = useRouter();
  let active = router.asPath === `/people/${person.id}`;

  return (
    <li>
      <Link href={`/people/${person.id}`}>
        <a
          className={`
          ${active ? "bg-gray-200" : "hover:bg-gray-50"} 
          pl-4 pr-3 py-4 flex items-center rounded -my-px relative -mx-1`}
        >
          <div className="flex items-center justify-between w-full">
            <p className="text-sm font-medium">{person.name}</p>
            <span
              className={`${
                active ? "text-blue-500" : "text-blue-500"
              } text-xs font-semibold w-4 inline-block text-center`}
            >
              {person.eventIds.length > 0 && person.eventIds.length}
            </span>
          </div>
        </a>
      </Link>
    </li>
  );
}

let liveQueries = new Set();

function trackLiveQueries(useSWRNext) {
  return (key, fetcher, config) => {
    const swr = useSWRNext(key, fetcher, config);

    useEffect(() => {
      liveQueries.add(key);

      return () => {
        liveQueries.delete(key);
      };
    }, [key]);

    return swr;
  };
}

export async function revalidateLiveQueries() {
  let promises = [...liveQueries.values()].map((key) => mutate(key));

  return Promise.all(promises);
}
