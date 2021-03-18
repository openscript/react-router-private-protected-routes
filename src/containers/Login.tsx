import { useNavigate } from "react-router";
import { useSessionContext } from "../contexts/SessionContext";

export default function Login() {
  const [session, setSession] = useSessionContext();
  const navigate = useNavigate();

  const handleLogin = () => {
    setSession({...session, isAuthenticated: true});
    navigate('/');
  }

  return <button onClick={handleLogin}>Login</button>;
}