import type { DefineMethods } from "aspida";
import type { User } from "~/types";

export type Methods = DefineMethods<{
  get: {
    resBody: { success: boolean; user: User };
  };
}>;
