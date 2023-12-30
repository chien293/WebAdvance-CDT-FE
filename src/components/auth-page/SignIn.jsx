import React from "react";
import Link from "next/link";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Card,
  Row,
  Typography,
  Divider,
} from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import authService from "@/auth/auth-service";
import BanAccountComponent from "../admin/BanAccount";

const SignInComponent = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [banState, setBanState] = useState(false);
  const router = useRouter();
  const URL = process.env.SERVER_URL + "/auth";

  const onSubmit = async (d) => {
    const { email, password } = d;

    authService.login(email, password).then((data) => {
      if (data) {
        if (data === "Wrong password" || data === "No user found") {
          setErrorMessage("Tài khoản hoặc mật khẩu không tồn tại");
        } else {
          if (data === "Email is not verified") {
            router.push({
              pathname: "/auth/not-verify",
            });
          } else if (data === "Your account has been banned") {
            setBanState(true);
          } else {
            if (["teacher", "student", "user"].includes(data.user[0].role)) {
              router.push({
                pathname: "/home-page",
              });
            } else if (data.user[0].role === "admin") {
              router.push({
                pathname: "/admin/home",
              });
            }
          }
        }
      }
    });
  };

  const handleFacebookLogin = (d) => {
    window.open(URL + "/facebook", "_self");
  };
  const handleGoogleLogin = (d) => {
    authService.loginGoogle();
  };

  return (
    <div>
      {banState ? (
        <BanAccountComponent />
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            marginTop: 100,
            height: "70vh",
          }}
        >
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onSubmit}
          >
            <Typography.Title
              className="block text-center"
              style={{ fontSize: 35 }}
            >
              Login
            </Typography.Title>
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
                style={{ fontSize: 16 }}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
              style={{ marginBottom: 8 }}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                style={{ fontSize: 16 }}
              />
            </Form.Item>
            {errorMessage && <Typography>{errorMessage}</Typography>}
            <Form.Item style={{ marginBottom: 8 }}>
              <span className="block text-right">
                <Link
                  href="/auth/forgot-password"
                  style={{ fontSize: 16, color: "blue" }}
                >
                  Forgot password
                </Link>
              </span>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                style={{
                  backgroundColor: "#e0b6b6",
                  borderColor: "#e0b6b6",
                  fontSize: 16,
                  textAlign: "center",
                }}
                block
              >
                Log in
              </Button>
            </Form.Item>
            <Typography className="block text-right">
              Don't have an account?
              <Link
                href="/auth/sign-up"
                style={{ fontSize: 16, color: "blue", marginLeft: 15 }}
              >
                Register now!
              </Link>
            </Typography>

            <Divider style={{ borderColor: "black" }}>Or Login with</Divider>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 24,
                fontSize: 24,
              }}
            >
              <FaGoogle
                size={40}
                color="#dd4b39"
                onClick={handleGoogleLogin}
                className="cursor-pointer"
              />
              <FaFacebook
                size={40}
                color="#3b5998"
                onClick={handleFacebookLogin}
                className="cursor-pointer"
              />
            </div>
          </Form>
        </div>
      )}
    </div>
  );
};

export default SignInComponent;
