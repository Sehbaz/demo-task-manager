import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { token as tokenUtil } from "../../store/slices/token";
import { useLogin } from "./hooks";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginMutation = useLogin({
    onSuccess: () => {
      console.log("lets navigate to login screen...");
      navigate("/projects");
    },
    onError: () => {
      alert("invalid creds");
    },
  });

  const handleLogin = () => {
    loginMutation.mutate({ email, password });
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Login haha</h2>
      <input
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
