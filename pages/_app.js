import { SWRConfig } from "swr";
import "tailwindcss/tailwind.css";
import { makeServer } from "../mirage";

if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  if (!window.server) {
    window.server = makeServer({ environment: "development" });
  }
}

export default function Wrapper(props) {
  return (
    <div className="flex items-center justify-center w-full min-h-screen p-8 antialiased bg-gray-100">
      <SWRConfig
        value={{
          fetcher: (...args) => fetch(...args).then((res) => res.json()),
        }}
      >
        <App {...props} />
      </SWRConfig>
    </div>
  );
}

function App({ Component, pageProps }) {
  return (
    <div className="flex w-full max-w-4xl mx-auto">
      <Component {...pageProps} />
    </div>
  );
}
