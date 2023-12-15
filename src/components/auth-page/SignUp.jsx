import Link from "next/link";
import { useForm } from "react-hook-form";
import { Button, Checkbox, Form, Input, Card, Row, Typography, Divider, InputNumber } from 'antd';

import { useState } from 'react';
import authService from "@/auth/auth-service";
import useRouter from "next/router";

export default function SignUpComponent() {
  const { register, handleSubmit } = useForm();
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [form] = Form.useForm();
  const router = useRouter;

  const onSubmit = async (d) => {
    const { email, fullname, password } = d;
    authService.register(email, fullname, password).then(res => {
      if (res.data == "Email exists") {
        setErrorMessage("Email đã tồn tại");
      } else {
        setSuccessMessage('Đăng ký thành công');
        setErrorMessage("")
        setTimeout(() => {
          authService.sentValidateEmail(email);
          router.push({
            pathname: "/auth/validate-email",
          });
        }, 1000)
      }
    })

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
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      marginTop: 100,
      height: '70vh',

    }}>
      <Card style={{ width: 500 }}>
        <Form
          {...layout}
          form={form}

          name="dependencies nest-messages"
          onFinish={onSubmit}
          style={{ maxWidth: 600 }}
          validateMessages={validateMessages}
        >
          <Typography style={{ fontSize: 35, marginLeft: 160, padding: 5 }}>Sign Up</Typography>
          <Form.Item name="fullname"label="Fullname" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="password2"
            dependencies={['password']}
            rules={[
              {
                required: true,
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The new password that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Typography style={{ marginLeft: 205 }}>
            Already have an account? <Link href="/auth/sign-in" style={{ fontSize: 16, color: 'blue', marginLeft: 2 }}>
              Login now!
            </Link>
          </Typography>
          
          {errorMessage && (
            <Typography  style={{ marginLeft: 150 }}>{errorMessage}</Typography>
          )}
          {successMessage && (
            <Typography  style={{ marginLeft: 150 }}>{successMessage}</Typography>
          )}
          <Form.Item style={{ marginLeft: 150 }}>
            <Button type="primary" htmlType="submit" className="login-form-button"
              style={{ backgroundColor: '#e0b6b6', borderColor: '#e0b6b6', fontSize: 16, marginTop: 10 }} block>
              Sign up
            </Button>
          </Form.Item >
        </Form>
      </Card>
    </div>

  );
}
