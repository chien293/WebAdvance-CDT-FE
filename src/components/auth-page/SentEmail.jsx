import React from 'react'
import Image from 'next/image'
import assets from '../../assets/img/verify-email.jpg'


const SentEmail = ({ email }) => {
    return (
        <div className="container">

            <section className="section error-404 min-vh-100 d-flex flex-column align-items-center justify-content-center">
                <div>Check your Email</div>
                <div>We've send an email to {email}</div>
                <div>to reset your password.</div>
                <button variant="primary" type="submit">
                Resend email
                </button>
                <Image src={assets} alt='ICON' />
            </section>

        </div>
    )
}

export default SentEmail
