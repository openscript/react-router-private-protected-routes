import ProtectedRoute, { ProtectedRouteProps } from "../components/ProtectedRoute";
import { useSessionContext } from "../contexts/SessionContext";
import { Route, Routes } from 'react-router';
import Homepage from "./Homepage";
import Dashboard from "./Dashboard";
import Protected from "./Protected";
import Login from "./Login";
import Layout from "../layouts/Layout";

export default function App() {
  const [sessionContext, updateSessionContext] = useSessionContext();

  const setRedirectPath = (path: string) => {
    updateSessionContext({...sessionContext, redirectPath: path});
  }

  if(!sessionContext.redirectPath) {
    setRedirectPath('dashboard');
  }

  const defaultProtectedRouteProps: Omit<ProtectedRouteProps, 'outlet'> = {
    isAuthenticated: !!sessionContext.isAuthenticated,
    authenticationPath: '/login',
    redirectPath: sessionContext.redirectPath,
    setRedirectPath: setRedirectPath
  };

  return (
    <div>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='dashboard' element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<Dashboard />} />} />
        <Route path='protected' element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<Protected />} />} />
        <Route path='nested' element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<Layout />} />}>
          <Route path='one' element={<Protected />} />
          <Route path='two' element={<Protected />} />
        </Route>
        <Route path='login' element={<Login />} />
      </Routes>
    </div>
  );
};
