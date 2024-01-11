import React, {useContext} from 'react';

import Navigation from './Navigation';
import classes from './MainHeader.module.css';
import AuthContext from '../Context store/auth-context';

const MainHeader = (props) => {

  const AuthCtx = useContext(AuthContext)

  return (
    <header className={classes['main-header']}>
      <h1>A Typical Page</h1>
      <Navigation isLoggedIn={props.isAuthenticated} onLogout={AuthContext.onLogout} />
    </header>
  )
};

export default MainHeader;