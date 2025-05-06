import { GoogleLogin } from "@react-oauth/google";
import React from "react";

const LoginPage = () => {
  const handleLoginSuccess = (credentialResponse) => {
    console.log("Token:", credentialResponse.credential);

    fetch("http://localhost:5000/google/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tokenId: credentialResponse.credential }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("User from backend:", data);
        if (data && data.user) {
          console.log(data.user.id);
          
            localStorage.setItem("userId", data.user.id); 
          localStorage.setItem("token", credentialResponse.credential); // Optionally, store the token too

        }
      })
      .catch((err) => console.error("Login error:", err));
  };

  const handleLoginError = () => {
    console.error("Login Failed");
  };

  return (
    <div>
      <h2>Login with Google</h2>
      <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginError} />
    </div>
  );
};

export default LoginPage;
