// Example of a Private Route
import React from 'react';
import { Route as ReactDOMROute, Redirect } from 'react-router-dom';

// import { useAuth } from 'useAuth';

function Route({ isPrivate = false, component: Component, ...rest }) {
  // const { user } = useAuth();

  // terrible wait to verify authentication
  const { token } = localStorage;

  console.log('custom route!', isPrivate, !!token);

  return (
    <ReactDOMROute
      {...rest}
      render={({ location }) => {
        return isPrivate === !!token ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathName: isPrivate ? '/auth' : '/',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
}

export default Route;

// <Route path="login" component={Login} />
// <Route path="/dashboard" component={Dashboard} isPrivate />
