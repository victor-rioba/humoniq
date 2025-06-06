import { type DefineMethods } from "aspida";
import type { DetailedMission } from "~/types";

export type Methods = DefineMethods<{
  get: {
    resBody: DetailedMission;
  };
}>;
