import React from 'react';
import Link from 'next/link';

const FBLoginButton = () => {
    return (
        <>
            <Link href="#" style={btn}>
                Login with Facebook
            </Link>
        </>
    );
};

export default FBLoginButton;

const btn = {
    width: '100 %',
    padding: '12px',
    border: 'none',
    borderRadius: '4px',
    margin: '5px 0',
    opacity: 0.85,
    display: 'inline - block',
    fontSize: '17px',
    lineHeight: '20px',
    textDecoration: 'none',
    backgroundColor: '#3B5998',
    color: 'white'
}