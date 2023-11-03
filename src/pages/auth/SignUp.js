import Link from "next/link"
import "bootstrap/dist/css/bootstrap.min.css";
export default function SignUp() {
  return (
    <div className='signup template d-flex justify-content-center align-items-center 100-w vh-100 bg-primary'>
      <div className='40-w p-5 bg-white'>
        <form>
          <h3>Sign up</h3>
          <div className='mb-2'>
            <label htmlFor='email'>Full Name</label>
            <input type='email' placeholder='Enter Full Name' className='form-control' />
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
          <Link href="/auth/SignIn">Sign In</Link>
        </form>
      </div>
    </div>
  )
}
