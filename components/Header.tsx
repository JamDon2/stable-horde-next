import { AppBar, Toolbar } from "@mui/material";
import React from "react";

import APILogin from "./APILogin";
import styles from "./Header.module.css";
import LoginStatus from "./LoginStatus";

export default function Header() {
    return (
        <AppBar elevation={0} color="transparent">
            <Toolbar className={styles.container}>
                <div></div>
                <div className={styles.group}>
                    <LoginStatus />
                    <APILogin />
                </div>
            </Toolbar>
        </AppBar>
    );
}
