import { atom } from "recoil";

export const loggedInAtom = atom<boolean>({
    key: "loggedIn",
    default: false,
});

export const apiErrorAtom = atom<string | null>({
    key: "apiError",
    default: null,
});

export const apikeyAtom = atom<string>({
    key: "apiKey",
    default: "",
});
