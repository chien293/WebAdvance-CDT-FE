import Link from "next/link";
import { useForm } from "react-hook-form";
import { Col, Button, Row, Container, Card, Form, InputGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from 'react';
import authService from "@/auth/auth-service";
import useRouter from "next/router";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function SignUpComponent() {
  const { register, handleSubmit } = useForm();
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter;
  const onSubmit = async (d) => {
    const { email, fullname, password } = d;
    if (password != confirmPassword) {
      setErrorMessage("Xác nhận mật khẩu chưa trùng khớp");
    } else {
      authService.register(email, fullname, password).then(res => {
        if (res.data == "Email exists") {
          setErrorMessage("Email đã tồn tại");
        } else {
          setSuccessMessage('Đăng ký thành công');
          setTimeout(() => {
            authService.sentValidateEmail(email);
            router.push({
              pathname: "/auth/validate-email",
            });
          }, 1000)
        }
      })
    }
  };

  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-uppercase ">Sign Up</h2>
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

                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Full Name
                        </Form.Label>
                        <Form.Control
                          type="name"
                          placeholder="Enter full name"
                          {...register("fullname")}
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
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

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Confirm Password</Form.Label>
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

                        {errorMessage && (
                          <div>
                            <br />
                            <Form.Text className="text-danger">
                              {errorMessage}
                            </Form.Text>
                          </div>
                        )}
                        {successMessage && (
                          <div>
                            <br />
                            <Form.Text className="text-success">
                              {successMessage}
                            </Form.Text>
                          </div>
                        )}
                      </Form.Group>

                      <div className="d-grid">
                        <Button variant="primary" type="submit">
                          Sign Up
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Already have an account?{" "}
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
    </div>
  );
}
