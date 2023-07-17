import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import "./App.css";

const Wrapping = () => {
  const [selectedForm, setSelectedForm] = useState("login");

  const handleFormChange = (event) => {
    setSelectedForm(event.target.value);
  };

  return (
    <div className="container">
      <div className="form-container">
        {selectedForm === "login" && (
          <>
           
            <LoginForm />
          </>
        )}
        {selectedForm === "registration" && (
          <>
           
            <RegistrationForm />
          </>
        )}
      </div>
      <div className="form-selection">
        <label>
          <input
            type="radio"
            value="login"
            checked={selectedForm === "login"}
            onChange={handleFormChange}
          />
          Login
        </label>
        <label>
          <input
            type="radio"
            value="registration"
            checked={selectedForm === "registration"}
            onChange={handleFormChange}
          />
          Registration
        </label>
      </div>
    </div>
  );
};

export default Wrapping;
