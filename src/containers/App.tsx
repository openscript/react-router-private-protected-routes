import ProtectedRoute, { ProtectedRouteProps } from "../components/ProtectedRoute";
import { useSessionContext } from "../contexts/SessionContext";
import { Route, Switch } from 'react-router';
import Homepage from "./Homepage";
import Dashboard from "./Dashboard";
import Protected from "./Protected";
import Login from "./Login";

export default function App() {
  const [sessionContext, updateSessionContext] = useSessionContext();

  const setRedirectPath = (path: string) => {
    updateSessionContext({...sessionContext, redirectPath: path});
  }

  const defaultProtectedRouteProps: ProtectedRouteProps = {
    isAuthenticated: !!sessionContext.isAuthenticated,
    authenticationPath: '/login',
    redirectPath: sessionContext.redirectPath,
    setRedirectPath: setRedirectPath
  };

  return (
    <div>
      <Switch>
        <Route exact={true} path='/' component={Homepage} />
        <ProtectedRoute {...defaultProtectedRouteProps} path='/dashboard' component={Dashboard} />
        <ProtectedRoute {...defaultProtectedRouteProps} path='/protected' component={Protected} />
        <Route path='/login' component={Login} />
      </Switch>
    </div>
  );
};
