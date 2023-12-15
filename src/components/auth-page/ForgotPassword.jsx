import React from "react";
import Link from "next/link";
import { Button, Checkbox, Form, Input, Card, Row, Typography, Divider, InputNumber } from 'antd';
import { useForm } from "react-hook-form";
import { useState } from "react";
import ResetPasswordSuccess from "./ResetPasswordSuccess";
import authService from "@/auth/auth-service";
import SentEmail from "./SentEmail";

const ForgotPassword = () => {
  const { register, handleSubmit } = useForm();
  const [commit, setCommit] = useState(false);
  const [checkEmail, setCheckEmail] = useState(null);
  const [userEmail, setEmail] = useState("");
  const [form] = Form.useForm();
  const onSubmit = async (d) => {
    const { email } = d;
    setEmail(email);
    try {
      const res = await authService.sentForgotPassword(email);
      console.log(res);
      if (res.data === "Sent email reset") {
        setCommit(true);
      } else {
        setCheckEmail("Email not exists");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
    },
  };

  return (
    <>
      {commit ? (
        <SentEmail email={userEmail} />
      ) : (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          marginTop: 100,
          height: '70vh',

        }}>

          <Form
            form={form}
            {...layout}
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onSubmit}
            validateMessages={validateMessages}
          >
            <Typography.Title className="block text-center" style={{ fontSize: 35 }}>Forgot Password</Typography.Title>
            <Form.Item
              name="email"
              style={{ marginBottom: 8 }}
              rules={[{ required: true, type: 'email' }]}
            >
              <Input
                placeholder="Email for recovery"
                style={{ fontSize: 16, width: 300 }}
              />
            </Form.Item>
            <Typography className="block text-right " >
              Remember your account?{" "}
              <Link
                href="/auth/sign-in"
                style={{ fontSize: 16, color: 'blue' }}
              >
                Sign In
              </Link>
            </Typography>
            {checkEmail &&
              <Typography style={{ marginLeft: 203 }} >{checkEmail}</Typography>
            }
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button"
                style={{ backgroundColor: '#e0b6b6', borderColor: '#e0b6b6', fontSize: 16, marginLeft: 55, marginTop: 5 }} block>
                Submit
              </Button>
            </Form.Item >

          </Form>
        </div>
      )}
    </>
  );
};



export default ForgotPassword;
