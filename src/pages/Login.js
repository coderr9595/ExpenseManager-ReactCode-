import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import "../styles/login.css"; 

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post("http://localhost:5000/api/v1/users/login", values);
      setLoading(false);
      message.success("Login successful");
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, password: "" })
      );
      navigate("/");
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <div className="login-container">
        <div className="login-box">
          <div className="login-header">
            <h1>Welcome Back!</h1>
            <p>Please login to continue</p>
          </div>
          {loading && <Spinner />}
          <Form layout="vertical" onFinish={submitHandler}>
            <Form.Item label="Email" name="email">
              <Input type="email" placeholder="Enter your email" />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input type="password" placeholder="Enter your password" />
            </Form.Item>
            <div className="login-footer">
              <button className="btn btn-primary">Login</button>
              <Link to="/register">Not a user? Click Here to register</Link>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;

