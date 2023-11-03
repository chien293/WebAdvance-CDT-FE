import React from 'react'
import Link from "next/link"
import "bootstrap/dist/css/bootstrap.min.css";
const SignIn = () => {
    return (
        <div className='login template d-flex justify-content-center align-items-center 100-w vh-100 bg-primary'>
            <div className='40-w p-5 bg-white'>
                <form>
                    <h3>Sign in</h3>
                    <div className='mb-2'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' placeholder='Enter Email' className='form-control' />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='password'>Password</label>
                        <input type='password' placeholder='Enter Password' className='form-control' />
                    </div>
                    <div className='mb-2'>
                        <input type='checkbox' className='custom-control custom-checkbox' id='check' />
                        <label htmlFor='check' className='custom-input-label'>Remember me</label>
                    </div>
                    <div className='d-grip'>
                        <button className='btn btn-primary'>Sign In</button>
                    </div>
                    <p>
                        <a href='#'>Forgot Password?</a>

                    </p>
                    <Link href="/auth/SignUp">Sign Up</Link>
                </form>
            </div>

        </div>
    )
}

export default SignIn
