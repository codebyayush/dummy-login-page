import React, {useEffect, useState} from 'react';

//use anonymous function (dummy) to store a function
//you want to pass from provider.
const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: () => {},
    onLogin: (email , password) => {}
})


export const AuthContextProvider = (props) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    useEffect(() => {
        const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
        console.log('user logged in');
        if (storedUserLoggedInInformation === '1') {
          setIsLoggedIn(true);
        }
      }, [isLoggedIn]);
    

    const loginHandler = () => {
        localStorage.setItem('isLoggedIn', '1');
        setIsLoggedIn(true);
      };
    
    const logoutHandler = () => {
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
      };

    return (
        <AuthContext.Provider
            value = {{
                isLoggedIn,
                onLogout: logoutHandler,
                onLogin: loginHandler
            }}
        >{props.children}</AuthContext.Provider>
    )
}

export default AuthContext;