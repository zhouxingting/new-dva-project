import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Support pass props from layout to child routes
const RouteWithProps = ({ path, exact, strict, render, location, ...rest }) => (
  <Route
    path={path}
    exact={exact}
    strict={strict}
    location={location}
    render={(props) => render({ ...props, ...rest })}
  />
);

export default function renderRoutes(
  routes,
  extraProps = {},
  switchProps = {}
) {
  return routes ? (
    <Switch {...switchProps}>
      {routes.map((route, i) => {
        if (route.redirect) {
          return (
            <Redirect
              key={route.key || i}
              from={route.path}
              to={route.redirect}
              exact={route.exact}
              strict={route.strict}
            />
          );
        }
        const RouteRoute = RouteWithProps;

        return (
          <RouteRoute
            key={route.key || i}
            path={route.path}
            exact={route.exact}
            strict={route.strict}
            sensitive={route.sensitive}
            render={(props) => {
              const childRoutes = renderRoutes(
                route.routes,
                {},
                {
                  location: props.location,
                }
              );
              if (route.component) {
                return (
                  <route.component {...props} route={route}>
                    {childRoutes}
                  </route.component>
                );
              } else {
                return childRoutes;
              }
            }}
          />
        );
      })}
    </Switch>
  ) : null;
}
