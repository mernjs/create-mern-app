import React from 'react';
import { Helmet } from 'react-helmet';

const Head = ({ title }) => {
    return (
        <>
            <Helmet>
                <title>{title} Create MERN App</title>
                <meta name="description" content="The MERN App provides a versatile set of boilerplates that streamline the development process for various applications. Whether you're building a web app, mobile app, desktop app, Chrome extension, or an NPM package in JavaScript, our comprehensive templates will help you get started quickly and efficiently." />
            </Helmet>
        </>
    )
}

export default Head;