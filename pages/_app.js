import { SWRConfig } from "swr";
import "tailwindcss/tailwind.css";
import { makeServer } from "../mirage";

if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  if (!window.server) {
    window.server = makeServer({ environment: "development" });
  }
}

export default function App({ Component, pageProps }) {
  return (
    <div className="flex items-center justify-center w-full min-h-screen antialiased bg-slate-100">
      <SWRConfig
        value={{
          fetcher: (...args) => fetch(...args).then((res) => res.json()),
        }}
      >
        <div className="w-full max-w-4xl">
          <Component {...pageProps} />
        </div>
      </SWRConfig>
    </div>
  );
}
