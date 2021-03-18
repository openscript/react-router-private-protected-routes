import { useHistory } from "react-router";
import { useSessionContext } from "../contexts/SessionContext";

export default function Login() {
  const [session, setSession] = useSessionContext();
  const history = useHistory();

  const handleLogin = () => {
    setSession({...session, isAuthenticated: true});
    history.push(session.redirectPath);
  }

  return <button onClick={handleLogin}>Login</button>;
}