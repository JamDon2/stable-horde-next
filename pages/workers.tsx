import {
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Grid,
    Typography,
    useTheme,
} from "@mui/material";
import type { NextPage } from "next";
import React from "react";
import useSWR from "swr";
import api from "../lib/api";
import humanizeDuration from "humanize-duration";
import { useRecoilState, useSetRecoilState } from "recoil";
import { myWorkersAtom } from "../atoms/workers";

const Workers: NextPage = () => {
    const theme = useTheme();
    const [myWorkers, setMyWorkers] = useRecoilState(myWorkersAtom);
    const [updateTimestamp, setUpdateTimestamp] = React.useState(Date.now());
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
            console.log("unmounting");
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
                data.map((worker: any) => (
                    <Card
                        key={worker.id}
                        variant="elevation"
                        sx={{ minWidth: 275, maxWidth: 375, margin: 1 }}
                    >
                        <CardContent>
                            <Typography variant="h6">{worker.name}</Typography>
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
                                        const newMyWorkers = { ...myWorkers };
                                        newMyWorkers[worker.id] = worker;
                                        return newMyWorkers;
                                    });
                                }}
                                disabled={Boolean(myWorkers[worker.id])}
                            >
                                Save Worker
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

export default Workers;
