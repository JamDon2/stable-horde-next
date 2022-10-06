import type { AppProps } from "next/app";
import Head from "next/head";
import { RecoilRoot } from "recoil";

import "../styles/globals.css";
import Layout from "../components/Layout";

function StableHordeApp({ Component, pageProps }: AppProps) {
    return (
        <RecoilRoot>
            <Layout>
                <Head>
                    <title>Stable Horde</title>
                </Head>

                <Component {...pageProps} />
            </Layout>
        </RecoilRoot>
    );
}

export default StableHordeApp;
