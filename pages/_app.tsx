import React, { Children } from "react";
import Head from "next/head";
import "../styles/globals.css";

import Layout from "../components/Layout";
import { MessageProvider } from "../lib/message";
import { AuthProvider } from "../lib/auth";

function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <MessageProvider>
        <AuthProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthProvider>
      </MessageProvider>
    </React.Fragment>
  );
}

export default MyApp;