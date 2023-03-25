import { lazy } from 'react';

const Button = lazy(() => import('./Button'));
const Footer = lazy(() => import('./Footer'));
const H2 = lazy(() => import('./H2'));
const Header = lazy(() => import('./Header'));
const TextInput = lazy(() => import('./TextInput'));

export {
    Button,
    Footer,
    H2,
    Header,
    TextInput,
};
