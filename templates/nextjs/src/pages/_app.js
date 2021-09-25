import React from "react";
import App from "next/app";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import { makeStore } from "../Store";
import '../App.css'

class MyApp extends App {
    
    static async getInitialProps({ Component, ctx }) {
        const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
        return { pageProps };
    }

    render() {
        const { Component, pageProps, store, router } = this.props;
        return (
            <Provider store={store}>
                <Component {...pageProps} router={router} />
            </Provider>
        )
    }
}

export default withRedux(makeStore)(MyApp);