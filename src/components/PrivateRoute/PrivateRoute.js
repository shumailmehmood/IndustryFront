import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from 'context/auth';
function PrivateRoute({ component: Component, ...rest }) {

  // const { authTokens } = useAuth();
  return (
    <Route {...rest} render={(props) => (
      // authTokens && authTokens.access_token
      true ? (
        <Component {...props} />
      ) : (
        <Redirect
        to={{ pathname: "/account/login" }}
      />
          
        )
    )}
    />
  );
}

export default PrivateRoute;