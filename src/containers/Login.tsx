import { useSessionContext } from "../contexts/SessionContext";

export default function Login() {
  const [session, setSession] = useSessionContext();

  const handleLogin = () => {
    setSession({...session, isAuthenticated: true});
  }

  return <button onClick={handleLogin}>Login</button>;
}