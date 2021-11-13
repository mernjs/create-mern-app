import React from "react";
import App from "next/app";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import { PersistGate } from 'redux-persist/integration/react'
import { makeStore } from "../Store";
import ThemeProvider from '../theme'

class MyApp extends App {
    
    static async getInitialProps({ Component, ctx }) {
        const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
        return { pageProps };
    }

    render() {
        const { Component, pageProps, store, router } = this.props;
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={store.__PERSISTOR}>
                    <ThemeProvider>
                        <Component {...pageProps} router={router} />
                    </ThemeProvider>
                </PersistGate>
            </Provider>
        )
    }
}

export default withRedux(makeStore)(MyApp);