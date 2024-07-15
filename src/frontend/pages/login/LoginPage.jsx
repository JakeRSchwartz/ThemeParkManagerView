import React from "react";
import "../../styles/login.styles/loginpage.css";
import LoginForm from "../../components/login.components/LoginForm";
import logo from "../../assets/Mainlogo.png";

const LoginPage = () => {

  return (
    <>
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="container">
        
        <LoginForm />
      </div>
    </>
  );
}
export default LoginPage;
