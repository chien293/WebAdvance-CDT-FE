import React from 'react'
import Link from "next/link";
import { Button, Checkbox, Form, Input, Card, Row, Typography, Divider, InputNumber } from 'antd';
import { useState } from 'react';
import ResetPasswordSuccess from './ResetPasswordSuccess';
import authService from '@/auth/auth-service';

const ResetPassword = ({ token, email }) => {
    const [commit, setCommit] = useState(false);
    const [form] = Form.useForm();

    const onSubmit = async (d) => {
        const { password } = d;
        console.log(password)
        await authService.sentResetPassword(token, email, password).then(res => {
            console.log(res.data)
            if (res.data == "Reset password success") {
                setCommit(true)
            }
        })
    };

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    const validateMessages = {
        required: '${label} is required!',
    };

    return (
        <>
            {commit ? (
                <ResetPasswordSuccess />
            ) :
                (<div style={{
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
                            <Typography.Title className="block text-center" style={{ fontSize: 35, padding: 5 }}>
                                Reset your password
                            </Typography.Title>
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

                            <span className="block text-right">
                                <Typography >
                                    Remember your account ? <Link href="/auth/sign-in" style={{ fontSize: 16, color: 'blue', marginLeft: 5 }}>
                                        Login now!
                                    </Link>
                                </Typography>
                            </span>

                            <Form.Item style={{ marginLeft: 150 }}>
                                <Button type="primary" htmlType="submit" className="login-form-button"
                                    style={{ backgroundColor: '#e0b6b6', borderColor: '#e0b6b6', fontSize: 16, marginTop: 10 }} block>
                                    Submit
                                </Button>
                            </Form.Item >
                        </Form>
                    </Card>
                </div>

                )}
        </>
    )
}

export default ResetPassword
