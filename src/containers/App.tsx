import ProtectedRoute, { ProtectedRouteProps } from "../components/ProtectedRoute";
import { useSessionContext } from "../contexts/SessionContext";
import { Route, Routes } from 'react-router';
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
    redirectPath: sessionContext.redirectPath || '',
    setRedirectPath: setRedirectPath
  };

  return (
    <div>
      <Routes>
        <ProtectedRoute {...defaultProtectedRouteProps} path='/' ><Homepage /></ProtectedRoute>
        <ProtectedRoute {...defaultProtectedRouteProps} path='dashboard'><Dashboard /></ProtectedRoute>
        <ProtectedRoute {...defaultProtectedRouteProps} path='protected'><Protected /></ProtectedRoute>
        <ProtectedRoute {...defaultProtectedRouteProps} path='nested'>
          <Route path='one'><Protected /></Route>
          <Route path='two'><Protected /></Route>
        </ProtectedRoute>
        <Route path='login'><Login /></Route>
      </Routes>
    </div>
  );
};
