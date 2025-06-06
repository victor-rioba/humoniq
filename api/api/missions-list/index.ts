import type { DefineMethods } from "aspida";
import type { Mission } from "~/types";

export type Methods = DefineMethods<{
  get: {
    resBody: Mission[];
  };
}>;
