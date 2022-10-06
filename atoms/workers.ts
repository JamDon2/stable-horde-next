import { atom } from "recoil";

export const myWorkersAtom = atom<{ [key: string]: object }>({
    key: "myWorkers",
    default: {},
});
