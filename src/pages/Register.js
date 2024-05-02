import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import "../styles/register.css"; 

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const submitHandler = async (values) => {
    try {
      setLoading(true);
      await axios.post("http://localhost:5000/api/v1/users/register", values);
      message.success("Registration successful");
      setLoading(false);
      navigate("/login");
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
      <div className="register-container">
        <div className="register-box">
          <div className="register-header">
            <h1>Create an Account</h1>
            <p>Please fill in the form to register</p>
          </div>
          {loading && <Spinner />}
          <Form layout="vertical" onFinish={submitHandler}>
            <Form.Item label="Name" name="name">
              <Input placeholder="Enter your name" />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input type="email" placeholder="Enter your email" />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input type="password" placeholder="Enter your password" />
            </Form.Item>
            <div className="register-footer">
              <button className="btn btn-primary">Register</button>
              <Link to="/login">Already registered? Click Here to login</Link>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Register;
