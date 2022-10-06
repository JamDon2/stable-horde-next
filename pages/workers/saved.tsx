import {
    Button,
    Card,
    CardActions,
    CardContent,
    Grid,
    Typography,
    useTheme,
} from "@mui/material";
import humanizeDuration from "humanize-duration";
import type { NextPage } from "next";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import useSWR from "swr";

import { loggedInAtom } from "../../atoms/login";
import { myWorkersAtom } from "../../atoms/workers";
import api from "../../lib/api";

const SavedWorkers: NextPage = () => {
    const theme = useTheme();
    const [myWorkers, setMyWorkers] = useRecoilState(myWorkersAtom);
    const [updateTimestamp, setUpdateTimestamp] = React.useState(Date.now());
    const loggedIn = useRecoilValue(loggedInAtom);
    const [time, setTime] = React.useState(Date.now());
    const { data } = useSWR("/workers", async (path) => {
        const res = await api.get(path);

        if (!res.data) throw new Error("No data");

        setUpdateTimestamp(Date.now());

        return res.data;
    });

    React.useEffect(() => {
        const interval = setInterval(() => setTime(Date.now()), 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
        >
            {data ? (
                data
                    .filter((worker: { id: string }) => myWorkers[worker.id])
                    .map((worker: any) => (
                        <Card
                            key={worker.id}
                            variant="elevation"
                            sx={{ minWidth: 275, maxWidth: 375, margin: 1 }}
                        >
                            <CardContent>
                                <Typography variant="h6">
                                    {worker.name}
                                </Typography>
                                <Typography variant="caption">
                                    Uptime:{" "}
                                    {humanizeDuration(
                                        worker.uptime * 1000 +
                                            (time - updateTimestamp),
                                        {
                                            largest: 3,
                                            round: true,
                                        }
                                    )}
                                </Typography>
                                <Typography variant="body2">
                                    {worker.performance}
                                </Typography>
                                {worker.info && (
                                    <Typography variant="body2">
                                        Information: <i>{worker.info}</i>
                                    </Typography>
                                )}
                                <Typography variant="body2">
                                    Supports NSFW:{" "}
                                    <strong
                                        style={{
                                            color: worker.nsfw
                                                ? theme.palette.success.main
                                                : theme.palette.error.main,
                                        }}
                                    >
                                        {worker.nsfw ? "yes" : "no"}
                                    </strong>
                                </Typography>
                                <Typography variant="body2">
                                    Maintenance mode{" "}
                                    <strong
                                        style={{
                                            color: worker.maintenance_mode
                                                ? theme.palette.error.main
                                                : theme.palette.success.main,
                                        }}
                                    >
                                        {worker.maintenance_mode ? "on" : "off"}
                                    </strong>
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    size="small"
                                    onClick={() => {
                                        setMyWorkers((myWorkers) => {
                                            const newMyWorkers = {
                                                ...myWorkers,
                                            };
                                            delete newMyWorkers[worker.id];
                                            return newMyWorkers;
                                        });
                                    }}
                                >
                                    Unsave Worker
                                </Button>
                                <Button
                                    size="small"
                                    disabled={!loggedIn}
                                    onClick={() => {
                                        setMyWorkers((myWorkers) => {
                                            const newMyWorkers = {
                                                ...myWorkers,
                                            };
                                            delete newMyWorkers[worker.id];
                                            return newMyWorkers;
                                        });
                                    }}
                                >
                                    Configure
                                </Button>
                            </CardActions>
                        </Card>
                    ))
            ) : (
                <Typography variant="caption">Loading...</Typography>
            )}
        </Grid>
    );
};

export default SavedWorkers;
