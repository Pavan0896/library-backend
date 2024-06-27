import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let [role, setRole] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      userName,
      email,
      password,
      role,
    };
    try {
      let response = await fetch(
        "https://librarybackend-uaga.onrender.com/user/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      let data = await response.json();
      console.log(data);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ marginTop: "2%", display: "flex", justifyContent: "center" }}>
      <form>
        <input
          type="text"
          placeholder="User Name"
          value={userName}
          onInput={(e) => setUserName(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onInput={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onInput={(e) => setPassword(e.target.value)}
        />
        <br />
        <select onChange={(e) => setRole(e.target.value)} value={role}>
          <option value="">Select Role</option>
          <option value="creator">Creator and Viewer</option>
          <option value="view_all">View All</option>
        </select>
        <br />
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
};

export default Register;
