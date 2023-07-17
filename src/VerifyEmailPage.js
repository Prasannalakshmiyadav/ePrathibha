

import React from "react";
import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function VerifyEmailPage() {
  const [regCode, setRegCode] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();
  const { msg } = location.state || "";
  console.log(msg);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      reg_code: regCode,
    };

    try {
      const response = await axios.post(
        "https://test.e-prathibha.com/apis/verifyEmail",
        formData
      );

      // console.log(response.data);

      if (response.data.status === 200) {
        setMessage(response.data.data.message);
        navigate("/");
      } else {
        setError(response.data);
      }
      setRegCode("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="text-center">
      <h4>VerifyEmail</h4>
      <form onSubmit={handleSubmit}>
        <label>Registration Code:</label>
        <input
          type="text"
          value={regCode}
          onChange={(e) => setRegCode(e.target.value)}
        />
        <button type="submit">Verify Email</button>
      </form>
      <h6>{message}</h6>
      <h6>{msg}</h6>
      <h6>{error}</h6>
    </div>
  );
}

export default VerifyEmailPage;
