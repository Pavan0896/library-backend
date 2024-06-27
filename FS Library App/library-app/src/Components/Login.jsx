import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      email,
      password,
    };
    try {
      let res = await fetch(
        "https://librarybackend-uaga.onrender.com/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      let data = await res.json();
      console.log(data);
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", JSON.stringify(data.role));
      navigate("/library");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div style={{ marginTop: "2%", display: "flex", justifyContent: "center" }}>
      <form>
        <input
          type="text"
          placeholder="email"
          value={email}
          onInput={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onInput={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
};

export default Login;
