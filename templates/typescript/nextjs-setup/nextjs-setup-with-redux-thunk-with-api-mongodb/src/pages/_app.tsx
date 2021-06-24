import React from "react";
import App from "next/app";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import { makeStore } from "../core/store";
import '../assets/css/app.css'

class MyApp extends App<any> {
    
    static async getInitialProps({ Component, ctx }: any) {
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