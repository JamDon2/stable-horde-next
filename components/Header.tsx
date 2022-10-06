import { AppBar, Button, Toolbar } from "@mui/material";
import Link from "next/link";
import React from "react";

import APILogin from "./APILogin";
import styles from "./Header.module.css";
import LoginStatus from "./LoginStatus";

export default function Header() {
    return (
        <AppBar elevation={0} color="inherit" position="sticky">
            <Toolbar className={styles.container}>
                <div className={styles.group}>
                    <Link href="/">
                        <span className={styles.title}>Stable Horde</span>
                    </Link>
                    <Link href="/workers">
                        <Button variant="outlined">All workers</Button>
                    </Link>
                    <Link href="/workers/saved">
                        <Button variant="outlined">My workers</Button>
                    </Link>
                </div>
                <div className={styles.group}>
                    <LoginStatus />
                    <APILogin />
                </div>
            </Toolbar>
        </AppBar>
    );
}
