import { Navigate, Route, RouteProps, useLocation } from 'react-router';

export type ProtectedRouteProps = {
  isAuthenticated: boolean;
  authenticationPath: string;
  redirectPath: string;
  setRedirectPath: (path: string) => void;
} & RouteProps;

export default function ProtectedRoute(props: ProtectedRouteProps) {
  const currentLocation = useLocation();
  
  let redirectPath = props.redirectPath;
  if (!props.isAuthenticated) {
    props.setRedirectPath(currentLocation.pathname);
    redirectPath = props.authenticationPath;
  }

  if (redirectPath !== currentLocation.pathname) {
    return <Navigate to={{ pathname: redirectPath }} />;
  } else {
    return <Route {...props} />;
  }
};