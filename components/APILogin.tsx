import { Button, TextField } from "@mui/material";
import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

import {
    apiErrorAtom,
    apikeyAtom,
    loggedInAtom,
    usernameAtom,
} from "../atoms/login";
import api from "../lib/api";
import styles from "./APILogin.module.css";

export default function APILogin() {
    const [apikey, setAPIKey] = useRecoilState(apikeyAtom);
    const setLoggedIn = useSetRecoilState(loggedInAtom);
    const [error, setError] = useRecoilState(apiErrorAtom);
    const setUserName = useSetRecoilState(usernameAtom);

    const handleAPIKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAPIKey(event.target.value.replace(/[^A-Za-z0-9_-]/g, ""));
    };

    const checkLogin = async () => {
        api.get("/find_user", { headers: { apikey } })
            .then((response) => {
                if (response.data) {
                    setLoggedIn(true);
                    setUserName(response.data.username.split("#")[0]);
                    setError(null);
                }
            })
            .catch((error) => {
                setLoggedIn(false);
                setError(
                    error?.response?.status === 401 ? "Invalid API key" : null
                );
            });
    };

    return (
        <div className={styles.container}>
            <TextField
                type="password"
                error={Boolean(error)}
                label="API Key"
                value={apikey}
                onChange={handleAPIKeyChange}
                variant="filled"
            />
            <Button variant="contained" onClick={checkLogin} size="large">
                Log in
            </Button>
        </div>
    );
}
