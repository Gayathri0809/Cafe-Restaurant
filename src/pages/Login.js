import React, { useState } from "react";
import RegistrationForm from "./RegistrationForm";
import"./login.css";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
  
    // create an object with the user's details
    const user = {
      email: email,
      password: password,
    };
  
    // validate the user's input
    const errors = validate(user);
  
    if (Object.keys(errors).length === 0) {
      // if there are no validation errors, submit the data
      fetch("http://localhost:8080/registers")
        .then((response) => response.json())
        .then((data) => {
          const userMatch = data.find((storeduser) => storeduser.email === email);
          if (!userMatch) {
            // if the user's email is not found in the "registers" table
            setMessage("Email not found");
          } else {
            // if the user's email is found in the "registers" table
            const storedpassword = userMatch.password;
            if (password === storedpassword) {
              // if the password matches the stored password
              setMessage("Login successful");
              // redirect to the dashboard or home page
              window.location.href = "/search";
            } else {
              // if the password does not match the stored password
              setMessage("Incorrect password");
            }
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      // if there are validation errors, set the errors state variable
      setErrors(errors);
    }
  }
  

  function validate(user) {
    let errors = {};

    // validate email
    if (!user.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      errors.email = "Email is invalid";
    }

    // validate password
    if (!user.password) {
      errors.password = "Password is required";
    } else if (user.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }

    return errors;
  }

  return (
    
    <div className="round">
      <div className="containers" >
        <div className="table">
          <div className="mx-auto col-md-6  pt-4">
            <div className="card mb-5 p-2 shadow rounded">
              <div className="card-body mt-2">
                <div className="row mb-3">
                  <h3 className="text-success text-center border-bottom border-success p-3">
                    LOGIN FORM
                  </h3>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3 mt-2">
                    <label htmlFor="Email" className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="form-control border-success shadow-none "
                      id="Email"
                      aria-describedby="emailHelp"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && (
                      <span className="text-danger">{errors.email}</span>
                    )}
                  </div>
                  
                  <div className="mb-3">
                <label htmlFor="Password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  className="form-control border-success shadow-none"
                  id="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && (
                  <span className="text-danger">{errors.password}</span>
                )}
              </div>
              <div class="row mt-3">
                            
                             <div class="col-sm-3"></div>
                             <div class="col-sm-3"></div>
                             <div class="col-sm-3"></div>
                            <div class="col-sm-3"><a href="/register" class="text-decoration-none mb-3 text-success fw-bold ">New User?</a></div>
                            
                        </div>
                       
              <button type="submit" className="btn btn-success mt-3">
                Login
              </button>
              {message && (
                <div className="mt-3">
                  <span className="text-success">{message}</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

   
);

}

export default Login;