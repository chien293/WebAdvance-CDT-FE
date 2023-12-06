import React from "react";
import Link from "next/link";
import {
  Col,
  Button,
  Row,
  Container,
  Card,
  Form,
  InputGroup,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useState } from "react";
import ResetPasswordSuccess from "./ResetPasswordSuccess";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import authService from "@/auth/auth-service";
import SentEmail from "./SentEmail";

const ForgotPassword = () => {
  const { register, handleSubmit } = useForm();
  const [commit, setCommit] = useState(false);
  const [checkEmail, setCheckEmail] = useState(null);

  const onSubmit = async (d) => {
    const { email } = d;
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

  return (
    <>
      {commit ? (
        <SentEmail />
      ) : (
        <Container>
          <Row className="vh-100 d-flex justify-content-center align-items-center">
            <Col md={8} lg={6} xs={12}>
              <Card className="shadow">
                <Card.Body>
                  <div className="mb-2 mt-md-4">
                    <h2 className="fw-bold mb-2 text-uppercase ">
                      Reset your password
                    </h2>

                    <div className="mb-3">
                      <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label className="text-center">
                            Your email
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter your new password"
                            {...register("email")}
                          />
                        </Form.Group>

                        {checkEmail && (
                          <Form.Text className="text-danger">
                            {checkEmail}
                          </Form.Text>
                        )}

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
      )}
    </>
  );
};

export default ForgotPassword;
