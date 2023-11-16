import React from 'react'
import Image from 'next/image'
import assets from '../../assets/img/verify-email.jpg'
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
const SentEmail = ({ email }) => {
    return (
        <div className="container">

            <section className="section error-404 min-vh-100 d-flex flex-column align-items-center justify-content-center">
                <div>Check your Email</div>
                <div>We've send an email to {email}</div>
                <div>to reset your password.</div>
                <Button variant="primary" type="submit">
                Resend email
                </Button>
                <Image src={assets} alt='ICON' />
            </section>

        </div>
    )
}

export default SentEmail
