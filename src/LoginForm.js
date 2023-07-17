import React, { useState } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    // const object1 = {
    //   email: email,
    //   password: password,
    // };
    e.preventDefault();

    // Create a FormData object and append form data
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    // Make the API request
    fetch("https://test.e-prathibha.com/apis/login", {
      method: "POST",
      body: formData,
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);

        // alert("");
        // console.log(result);
        if (result.status === 200) {
          sessionStorage.setItem("user", JSON.stringify(result.data));
          navigate("/FreeExamList");
        }
        // Handle the API response here
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <form>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={handleEmailChange}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
      />
      <button onClick={handleSubmit}>Login</button>
      <br />
      <p>new user? create account by Registering</p>
    </form>
  );
};

export default LoginForm;
