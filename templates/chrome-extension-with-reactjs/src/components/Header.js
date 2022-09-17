import React from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom'
import { AiFillAlert } from 'react-icons/ai';
import useCore  from '../hooks/useCore'
import useAuth  from '../hooks/useAuth'
import { useSelector } from 'react-redux'

export default (props) => {

    const user = useSelector(state => state.auth.user)

    let { switchTheme } = useCore()
    let { logout } = useAuth()
    
    return (
        <Header>
            <div className="container">
                <Navbar>
                    <Logo>
                        <Link to="/"><b>Chrome</b></Link> 
                    </Logo>
                    <ul>
                        {user === null &&
                            <>
                                <li>
                                    <Link to="/login">
                                        Login
                                    </Link> 
                                </li>
                                <li>
                                    <Link to="/signup">
                                        Signup
                                    </Link>
                                </li> 
                            </>
                        }
                         {user !== null &&
                            <>
                                <li>
                                    <Link to="/dashboard">
                                        Dashboard
                                    </Link> 
                                </li>
                                <li>
                                    <a onClick={logout} href="javaScript:void(0)">
                                        Logout
                                    </a> 
                                </li>
                            </>
                        }
                        <li> 
                            <AiFillAlert style={{cursor: 'pointer', fontSize: '20px', marginTop: '3px'}} onClick={switchTheme} />
                        </li>
                    </ul>
                </Navbar>
            </div>
        </Header>
    );
}

const Header = styled.header`
    padding: 20px 0;
    background-color: #fff;
    width: 100%;
    border-top: 5px solid #4c84ff;
    box-shadow: 0 2px 10px 0 #00000017;
`;

const Logo = styled.div`
    flex:6;
    display: flex;
    justify-content: flex-start;
`;

const Navbar = styled.nav`
    flex:5;
    display: flex;
    justify-content: flex-end;
    padding:0 25px;
    display:flex;
    align-items:center;
    justify-content:flex-end;
    ul{
        margin:0;
        list-style-type:none;
        display:flex;
        align-items:center;
        li{
            margin-left:30px;
        }
    }
`