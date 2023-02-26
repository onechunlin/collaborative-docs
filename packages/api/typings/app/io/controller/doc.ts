import { Patch } from "immer";

export type TUpdate = {
  docId: string;
  changes: Patch[];
};
