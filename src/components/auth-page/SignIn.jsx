import React from "react";
import Link from "next/link";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import useRouter from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from 'react';
import { FaEye, FaEyeSlash, FaFacebook, FaGoogle } from 'react-icons/fa';
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
            if(data.user[0].role == "admin"){
              router.push({
                pathname: "/admin/home",
              });
            }else if(data.user[0].role == "teacher"){
              router.push({
                pathname: "/teacher/home",
              });
            }else if(data.user[0].role == "student"){
              router.push({
                pathname: "/home-page",
              });
            }           
          }
        }

      }
    });
  };

  const handleFacebookLogin = (d) => {
    window.open("http://localhost:5000/auth/facebook", "_self");
  }
  const handleGoogleLogin = (d) => {
    console.log("GOOGLE CLICK")
    authService.loginGoogle()
  }

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
                    <div className="divider d-flex align-items-center my-4">
                      <p className="text-center fw-semi-bold mx-3 mb-0 text-muted">OR</p>
                    </div>
                    <div className="text-center flex items-center justify-center">
                      <span className="mr-3">
                        Sign in with
                      </span>
                      <span className="mx-3">
                        <FaFacebook size={40} color="#3b5998" onClick={handleFacebookLogin}/>
                      </span>
                      <span>
                        <FaGoogle size={40} color="#dd4b39" onClick={handleGoogleLogin}/>
                      </span>
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
