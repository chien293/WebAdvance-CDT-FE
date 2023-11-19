import React from "react";
import Link from "next/link";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import useRouter from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from 'react';
import authService from "@/auth/auth-service";

const SignInComponent = () => {
  const { register, handleSubmit } = useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter;

  const onSubmit = async (d) => {
    const { email, password } = d;

    const URL = "http://localhost:5000/auth";
    authService.login(email, password).then((data) => {
      if (data) {
        if (data == "Wrong password" || data == "No user found") {
          setErrorMessage("Tài khoản hoặc mật khẩu không tồn tại");
        } else {
          if (data == "Email is not verified") {
            router.push({
              pathname: "/auth/not-verify",
            });
          }
          else {
            router.push({
              pathname: "/home-page",
            });
          }
        }

      }
    });
  };

  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-uppercase ">Sign In</h2>
                  <p className=" mb-5">Please enter your login and password!</p>
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

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          {...register("password")}
                        />
                        {errorMessage && (
                          <Form.Text className="text-danger">
                            {errorMessage}
                          </Form.Text>
                        )}
                      </Form.Group>

                      <div className="mb-3">
                        <p className="mb-0  text-right">
                          <Link
                            href="/auth/forgot-password"
                            className="text-primary fw-bold"
                          >
                            Forgot your password ?
                          </Link>
                        </p>
                      </div>

                      <div className="d-grid">
                        <Button variant="primary" type="submit">
                          Sign In
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Don't have an account?{" "}
                        <Link
                          href="/auth/sign-up"
                          className="text-primary fw-bold"
                        >
                          Sign Up
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
    </div>
  );
};

export default SignInComponent;
