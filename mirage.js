import { add, format, parseISO } from "date-fns";
import faker from "faker";
import { createServer } from "miragejs";

faker.seed(5);

export function makeServer({ environment = "test" } = {}) {
  let server = createServer({
    environment,

    timing: 750,

    routes() {
      this.namespace = "api";

      this.get(
        "/twitter",
        () => {
          return {
            stat: "71,897",
            change: "122",
            changeType: "increase",
          };
        },
        { timing: 750 }
      );

      this.get(
        "/youtube",
        () => {
          // return new Promise(() => {});

          return {
            stat: "71,897",
            change: "122",
            changeType: "increase",
          };
        },
        { timing: 2000 }
      );

      this.get(
        "/chipotle",
        () => {
          // return new Promise(() => {});

          return {
            stat: "71,897",
            change: "122",
            changeType: "increase",
          };
        },
        { timing: 1250 }
      );

      this.namespace = "";
      this.passthrough();
    },
  });

  // Don't log passthrough
  server.pretender.passthroughRequest = () => {};

  return server;
}
