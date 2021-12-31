import { SWRConfig } from "swr";
import "tailwindcss/tailwind.css";
import { makeServer } from "../mirage";

let isClient = typeof window !== "undefined";

if (isClient && process.env.NODE_ENV === "development") {
  if (!window.server) {
    window.server = makeServer({ environment: "development" });
  }
}

export default function App({ Component, pageProps }) {
  return (
    <div className="flex justify-center w-full min-h-screen antialiased pt-28 bg-slate-100">
      <SWRConfig
        value={{
          fetcher: (...args) => {
            return isClient
              ? fetch(...args).then((res) => res.json())
              : new Promise(() => {});
          },
          suspense: true,
        }}
      >
        <div className="w-full max-w-5xl">
          <Component {...pageProps} />
        </div>
      </SWRConfig>
    </div>
  );
}
