import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

const ForgetSection = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation logic
    const errors = {};
    if (!email) {
      errors.email = "Email is required";
    }
    if (!password) {
      errors.password = "Password is required";
    }
    // Handle form submission or display errors
    if (Object.keys(errors).length === 0) {
      // Submit form
      console.log("Submitting form...");
    } else {
      setErrors(errors);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#80060c",
      }}
    >
      <Container>
        <Row className="justify-content-center align-items-center" >
          <Col md={6} lg={12} >
            <div className="shadow-lg bg-white rounded-3 p-3 h-96" style={{ width: '400px' }}>
              <h4 className="text-center mt-4">Forget Password</h4>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label mt-3">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                  {errors.email && (
                    <div className="text-danger">{errors.email}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  {errors.password && (
                    <div className="text-danger">{errors.password}</div>
                  )}
                </div>
                <div className='d-flex justify-content-center mt-3'>
                  <Button variant="primary" type="submit" className="w-100 mt-4">
                    Submit
                  </Button>
                </div>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ForgetSection;
