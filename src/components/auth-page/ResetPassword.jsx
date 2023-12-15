import React from 'react'
import Link from "next/link";
import { Col, Button, Row, Container, Card, Form, InputGroup } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useState } from 'react';
import ResetPasswordSuccess from './ResetPasswordSuccess';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import authService from '@/auth/auth-service';

const ResetPassword = ({ token, email }) => {
    const { register, handleSubmit } = useForm();
    const [commit, setCommit] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [checkPass, setCheckPass] = useState(null);
   
    const onSubmit = async (d) => {
        const { password} = d;

        if (password != confirmPassword) {
            setCheckPass(("Xác thực mật khẩu không trùng khớp"));
        } else {     
            await authService.sentResetPassword(token, email, password).then(res => {
                if (res.data == "Reset password success") {
                    setCommit(true)
                }
            }
            );
        }

    };

    return (
        <>
            {commit ? (
                <ResetPasswordSuccess />
            ) :
                (<Container>
                    <Row className="vh-100 d-flex justify-content-center align-items-center">
                        <Col md={8} lg={6} xs={12}>
                            <Card className="shadow">
                                <Card.Body>
                                    <div className="mb-2 mt-md-4">
                                        <h2 className="fw-bold mb-2 text-uppercase ">Reset your password</h2>

                                        <div className="mb-3">
                                            <Form onSubmit={handleSubmit(onSubmit)}>

                                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                                    <Form.Label className="text-center">
                                                        Your new password
                                                    </Form.Label>
                                                    <InputGroup>
                                                        <Form.Control
                                                            type={showPassword ? "text" : "password"}
                                                            placeholder="Enter your new password"
                                                            {...register("password")}
                                                        />
                                                        <Button onClick={() => setShowPassword(!showPassword)}>
                                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                                        </Button>
                                                    </InputGroup>
                                                </Form.Group>

                                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                                    <Form.Label className="text-center">
                                                        Confirm new password
                                                    </Form.Label>
                                                    <InputGroup>
                                                        <Form.Control
                                                            type={showConfirmPassword ? "text" : "password"}
                                                            placeholder="Confirm new password"
                                                            value={confirmPassword}
                                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                                        />
                                                        <Button onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                                        </Button>
                                                    </InputGroup>
                                                </Form.Group>

                                                {
                                                    checkPass && (
                                                        <Form.Text className="text-danger">
                                                            {checkPass}
                                                        </Form.Text>
                                                    )
                                                }

                                                <div className="d-grid">
                                                    <Button variant="primary" type="submit">
                                                        Submit
                                                    </Button>
                                                </div>
                                            </Form>
                                            <div className="mt-3">
                                                <p className="text-center">
                                                    Remember your account?{" "}
                                                    <Link
                                                        href="/auth/sign-in"
                                                        className="text-primary fw-bold"
                                                    >
                                                        Sign In
                                                    </Link>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>)}
        </>
    )
}

export default ResetPassword
