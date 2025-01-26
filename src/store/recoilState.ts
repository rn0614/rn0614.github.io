import { atom } from "recoil";

export const asideState = atom<boolean>({
  key: "asideState",
  default: false,
});
