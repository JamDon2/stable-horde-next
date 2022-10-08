import React from "react";
import { useRecoilValue } from "recoil";
import CircleIcon from "@mui/icons-material/Circle";
import { Chip } from "@mui/material";

import { apiErrorAtom, loggedInAtom, usernameAtom } from "../atoms/login";

export default function LoginStatus() {
    const loggedIn = useRecoilValue(loggedInAtom);
    const username = useRecoilValue(usernameAtom);
    const error = useRecoilValue(apiErrorAtom);

    return (
        <Chip
            label={loggedIn ? username || "Logged in" : error || "Logged out"}
            icon={<CircleIcon fontSize="small" sx={{ marginRight: "5px" }} />}
            color={loggedIn ? "success" : "error"}
        />
    );
}
