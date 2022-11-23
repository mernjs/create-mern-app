import React from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';

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

export default ({ children }) => {
  const is_dark_theme = useSelector((state) => state.core.is_dark_theme);
  return (
    <ThemeProvider
      theme={
        themes[is_dark_theme ? 'darkTheme' : 'defaultTheme'] ||
        themes.defaultTheme
      }
    >
      {children}
    </ThemeProvider>
  );
};
