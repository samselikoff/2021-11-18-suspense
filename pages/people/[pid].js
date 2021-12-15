import * as Icons from "@heroicons/react/solid";
import useSWR from "swr";
import { useRouter } from "next/router";
import { useState } from "react";
import Spinner from "../../components/spinner";
import { revalidateLiveQueries } from "../_app";

function useMutation(key) {
  return async function (data) {
    await fetch(key, {
      method: "POST",
      body: JSON.stringify(data),
    });
    await revalidateLiveQueries();
  };
}

export default function Person() {
  let router = useRouter();
  let { data } = useSWR(`/api/people/${router.query.pid}`);
  let [isSaving, setIsSaving] = useState(false);
  let createEvent = useMutation("/api/events");

  async function addEvent(personId) {
    setIsSaving(true);

    // Create the event
    await createEvent({ personId });

    setIsSaving(false);
  }

  return (
    <div className="px-6">
      <div className="flex justify-between mt-4">
        <p className="text-2xl font-semibold">{data?.person.name}</p>
        <button
          onClick={() => addEvent(router.query.pid)}
          type="button"
          disabled={isSaving}
          className="inline-flex items-center px-2 py-2 text-sm font-medium leading-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 active:bg-blue-800 focus:outline-none"
        >
          {!isSaving ? (
            <Icons.PlusIcon className="w-4 h-4" aria-hidden="true" />
          ) : (
            <Spinner className="w-4 h-4 text-white" />
          )}
        </button>
      </div>

      <div className="">
        <div className="py-8">
          {data?.person.events.length > 0 ? (
            <div className="flow-root">
              <ul role="list" className="-mb-8">
                {data.person.events.map((event, index) => (
                  <div className="relative pb-8" key={event.id}>
                    {index !== data.person.events.length - 1 && (
                      <span
                        className="absolute w-px h-full -ml-px bg-gray-200 top-4 left-4"
                        aria-hidden="true"
                      />
                    )}
                    <Event event={event} eventIdx={index} />
                  </div>
                ))}
              </ul>
            </div>
          ) : (
            <div className="text-sm text-gray-500">
              <p>No events.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

let eventStyles = {
  applied: { icon: "UserIcon", iconBackground: "bg-gray-400" },
  advanced: { icon: "ThumbUpIcon", iconBackground: "bg-blue-500" },
  completed: { icon: "CheckIcon", iconBackground: "bg-green-500" },
};
function Event({ event }) {
  let Icon = Icons[eventStyles[event.type].icon];

  return (
    <li>
      <div className="relative flex space-x-3">
        <div>
          <span
            className={`${
              eventStyles[event.type].iconBackground
            } h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white`}
          >
            <Icon className="w-5 h-5 text-white" aria-hidden="true" />
          </span>
        </div>
        <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
          <div>
            <p className="text-sm text-gray-500">
              {event.content}{" "}
              <strong className="font-medium text-gray-900">
                {event.target}
              </strong>
            </p>
          </div>
          <div className="text-sm text-right text-gray-500 whitespace-nowrap">
            <time dateTime={event.datetime}>{event.date}</time>
          </div>
        </div>
      </div>
    </li>
  );
}
