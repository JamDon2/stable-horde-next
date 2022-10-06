import React from "react";
import { useRecoilValue } from "recoil";
import CircleIcon from "@mui/icons-material/Circle";
import { Chip } from "@mui/material";

import { apiErrorAtom, loggedInAtom } from "../atoms/login";

export default function LoginStatus() {
    const status = useRecoilValue(loggedInAtom);
    const error = useRecoilValue(apiErrorAtom);

    return (
        <Chip
            label={status ? "Logged in" : error || "Logged out"}
            icon={<CircleIcon fontSize="small" sx={{ marginRight: "5px" }} />}
            color={status ? "success" : "error"}
        />
    );
}
