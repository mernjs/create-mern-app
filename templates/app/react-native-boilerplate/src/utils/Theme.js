import React from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';

const themes = {
    defaultTheme: {
        colors: {
            primaryColor: '#4c84ff',
            bgColor: 'rgb(245, 245, 245)',
            textColor: '#494d55',
            buttonTextColor: '#fff',
        },
        fonts: ['Montserrat'],
        fontSizes: {
            small: '1em',
            medium: '2em',
            large: '3em',
        },
    },
    darkTheme: {
        colors: {
            primaryColor: 'rgba(0,0,0,0.87)',
            bgColor: '#272828',
            textColor: '#fff',
            buttonTextColor: '#494d55',
        },
        fonts: ['Montserrat'],
        fontSizes: {
            small: '1em',
            medium: '2em',
            large: '3em',
        },
    },
};

const Theme = ({ children }) => {
    const isDarkTheme = useSelector((state) => state.core.isDarkTheme);
    return (
        <ThemeProvider
            theme={
                themes[isDarkTheme ? 'darkTheme' : 'defaultTheme'] ||
                themes.defaultTheme
            }
        >
            {children}
        </ThemeProvider>
    );
};

Theme.propTypes = {
    children: PropTypes.element,
};

export default Theme;
