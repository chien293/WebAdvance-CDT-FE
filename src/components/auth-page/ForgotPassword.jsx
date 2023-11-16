import React from 'react'
import Link from "next/link";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import useRouter from "next/router";
import { useState } from 'react';
import authService from "@/auth/auth-service";
import "bootstrap/dist/css/bootstrap.min.css";
const ForgotPassword = () => {
    const { register, handleSubmit } = useForm();
    //const [emailInput, setEmailInput] = useState('');
    const router = useRouter;

    const onSubmit = (d) => {
        const { email } = d;
        console.log(email)
        // router.push({
        //     pathname: "/auth/sent-email",
        //     }
        // );
        router.push({
            pathname: "/auth/sent-email",
            query: { email: email },
        });


        // const URL = "http://localhost:5000/auth";
        // authService.login(email, password).then((data) => {
        //     if (data) {
        //         if (data == "Wrong password" || data == "No user found") {
        //             setErrorMessage("Tài khoản hoặc mật khẩu không tồn tại");
        //         } else {
        //             router.push({
        //                 pathname: "/home-page",
        //             });
        //         }

        //     }
        // });
    };

    return (
        <Container>
            <Row className="vh-100 d-flex justify-content-center align-items-center">
                <Col md={8} lg={6} xs={12}>
                    <Card className="shadow">
                        <Card.Body>
                            <div className="mb-2 mt-md-4">
                                <h2 className="fw-bold mb-2 text-uppercase ">Forgot your password</h2>

                                <div className="mb-3">
                                    <Form onSubmit={handleSubmit(onSubmit)}>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label className="text-center">
                                                Email address
                                            </Form.Label>
                                            <Form.Control
                                                type="email"
                                                placeholder="Enter email"
                                                
                                                {...register("email")}
                                            />
                                        </Form.Group>

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
        </Container>

    )
}

export default ForgotPassword
