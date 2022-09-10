import React from "react";
import useAuth  from 'hooks/useAuth'
import { useSelector } from 'react-redux'
import { Sidebar, Navbar } from 'adminlte-2-react';
const { Item } = Sidebar;
const { Entry } = Navbar;
  
export default () => {
    const user = useSelector(state => state.auth.user)
    let { logout } = useAuth()

    return (
      <>
        {user === null &&
          <>
            <Item icon="fa-user" text="Login" to="/login" />
            <Item icon="fa-user" text="Signup" to="/signup" />
          </>
        }
        {user !== null &&
          <>
            <Item icon="fa-user" text={user?.email || ''} to="/" />
            <Entry onClick={logout} icon="fas-power-off"/>
          </>
        }
      </>
    );
}