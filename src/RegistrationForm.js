import React, { useState } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";
// import VerifyEmailPage from "./VerifyEmailPage";

const RegistrationForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a FormData object and append form data
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("confirmPassword", confirmPassword);

    // Make the API request
    fetch("https://test.e-prathibha.com/apis/register", {
      method: "POST",
      body: formData,
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data);

        const data = result.data;
        // const x = data;
        // console.log(result.data);
        // Handle the API response here
        if (result.status === 200) {
          navigate("/VerifyEmailPage", { state: { msg: data } });
          // navigate("/VerifyEmailPage",prop={x});
        } else {
          setMessage(data);
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registration</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={handleNameChange}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={handleEmailChange}
      />
      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={handlePhoneChange}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
      />
      <button type="submit">Register</button>
      <p>Already have an account ? Just Login</p>
      <h5>{message}</h5>
    </form>
  );
};

export default RegistrationForm;
