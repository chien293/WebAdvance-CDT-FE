import Link from "next/link";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

export default function SignUp() {
  const { register, handleSubmit } = useForm();
  const onSubmit = async (d) => {
    const { email, fullName, password } = d;
    const URL = 'http://localhost:5000/auth';
    const data = await axios.post(`${URL}/signup`, {
      email, fullName, password
    })
  };

  return (

    <div className="card mb-3">
      <div className="card-body">
        <div className="pt-4 pb-2">
          <h5 className="card-title text-center pb-0 fs-4">Create an Account</h5>
          <p className="text-center small">Enter your personal details to create
            account</p>
        </div>
        <form className="row g-3 needs-validation" noValidate onSubmit={handleSubmit(onSubmit)}>
          <div className="col-12">
            <label htmlFor="yourName" className="form-label">Your Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              id="yourName"
              required
              {...register("fullName")}
            />
            <div className="invalid-feedback">Please, enter your name!</div>
          </div>
          <div className="col-12">
            <label htmlFor="yourEmail" className="form-label">Your Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              id="yourEmail"
              required
              {...register("email")}
            />
            <div className="invalid-feedback">Please enter a valid Email adddress!</div>
          </div>
          <div className="col-12">
            <label htmlFor="yourUsername" className="form-label">Username</label>
            <div className="input-group has-validation">
              <span className="input-group-text" id="inputGroupPrepend">@</span>
              <input
                type="text"
                name="username"
                className="form-control"
                id="yourUsername"
                required
                {...register("username")}
              />
              <div className="invalid-feedback">Please choose a username.</div>
            </div>
          </div>
          <div className="col-12">
            <label htmlFor="yourPassword" className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              id="yourPassword"
              required
              {...register("password")}
            />
            <div className="invalid-feedback">Please enter your password!</div>
          </div>
          <div className="col-12">
            <div className="form-check">
              <input
                className="form-check-input"
                name="terms"
                type="checkbox"
                value=""
                id="acceptTerms"
                required
              />
              <label className="form-check-label" htmlFor="acceptTerms">I agree and accept
                the
                <a href="#">terms and conditions</a></label>
              <div className="invalid-feedback">You must agree before submitting.</div>
            </div>
          </div>
          <div className="col-12">
            <button className="btn btn-primary w-100" type="submit">Create Account</button>
          </div>
          <div className="col-12">
            <p className="small mb-0">Already have an account?
              <Link href="/auth/SignIn">Log in</Link></p>
          </div>
        </form>
      </div>
    </div>

  );
}
