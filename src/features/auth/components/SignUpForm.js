// import React, { useState } from "react";
// import { Form, Button, Container, Row, Col } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";

// const SignUp = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     user_ref_id: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validate(formData);
//     if (Object.keys(validationErrors).length === 0) {
//       try {
//         const response = await fetch("http://localhost:7000/api/create", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(formData),
//         });

//         if (response.status === 201) {
//           const data = await response.json();
//           setMessage(data.message);
//           setTimeout(() => {
//             navigate("/account/login");
//           }, 2000);
//         } else {
//           const errorData = await response.json();
//           setMessage(`Error: ${errorData.message}`);
//         }
//       } catch (error) {
//         console.error("Error registering user:", error);
//         setMessage("Error registering user");
//       }
//     } else {
//       setErrors(validationErrors);
//     }
//   };

//   const validate = (data) => {
//     const errors = {};
//     if (!data.username.trim()) {
//       errors.username = "Username is required";
//     }
//     if (!/\S+@\S+\.\S+/.test(data.email)) {
//       errors.email = "Email address is invalid";
//     }
//     if (data.password.length < 6) {
//       errors.password = "Password must be at least 6 characters long";
//     }
//     if (!data.user_ref_id.trim()) {
//       errors.user_ref_id = "User reference ID is required";
//     }
//     return errors;
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         minHeight: "100vh",
//         backgroundColor: "#80060c",
//       }}
//     >
//       <Container>
//         <Row className="justify-content-center align-items-center">
//           <Col span={12} sm={6} style={{ width: "350px" }}>
//             <div className="shadow-lg bg-white rounded-3 p-3">
//               <h2 className="text-center">Sign Up</h2>
//               <Form onSubmit={handleSubmit}>
//                 <Form.Group controlId="username">
//                   <Form.Label>Username</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="username"
//                     value={formData.username}
//                     onChange={handleChange}
//                     isInvalid={!!errors.username}
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     {errors.username}
//                   </Form.Control.Feedback>
//                 </Form.Group>

//                 <Form.Group controlId="email">
//                   <Form.Label>Email address</Form.Label>
//                   <Form.Control
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     isInvalid={!!errors.email}
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     {errors.email}
//                   </Form.Control.Feedback>
//                 </Form.Group>

//                 <Form.Group controlId="password">
//                   <Form.Label>Password</Form.Label>
//                   <Form.Control
//                     type="password"
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     isInvalid={!!errors.password}
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     {errors.password}
//                   </Form.Control.Feedback>
//                 </Form.Group>

//                 <Form.Group controlId="user_ref_id">
//                   <Form.Label>User Reference ID</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="user_ref_id"
//                     value={formData.user_ref_id}
//                     onChange={handleChange}
//                     isInvalid={!!errors.user_ref_id}
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     {errors.user_ref_id}
//                   </Form.Control.Feedback>
//                 </Form.Group>

//                 {message && <p>{message}</p>}

//                 <div className="d-flex justify-content-center mt-3">
//                   <Button variant="primary" type="submit" className="w-100">
//                     Sign Up
//                   </Button>
//                 </div>
//               </Form>
//             </div>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default SignUp;

import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    user_ref_id: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length === 0) {
      setLoading(true); // Show loader
      try {
        const response = await fetch("http://localhost:7000/api/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.status === 201) {
          const data = await response.json();
          setMessage(data.message);
          setTimeout(() => {
            setLoading(false); // Hide loader
            navigate("/account/login");
          }, 2000);
        } else {
          const errorData = await response.json();
          setMessage(`Error: ${errorData.message}`);
          setLoading(false); // Hide loader
        }
      } catch (error) {
        console.error("Error registering user:", error);
        setMessage("Error registering user");
        setLoading(false); // Hide loader
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const validate = (data) => {
    const errors = {};
    if (!data.username.trim()) {
      errors.username = "Username is required";
    }
    if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Email address is invalid";
    }
    if (data.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }
    if (!data.user_ref_id.trim()) {
      errors.user_ref_id = "User reference ID is required";
    }
    return errors;
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
        <Row className="justify-content-center align-items-center">
          <Col span={12} sm={6} style={{ width: "350px" }}>
            <div className="shadow-lg bg-white rounded-3 p-3">
              <h2 className="text-center">Sign Up</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    isInvalid={!!errors.username}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    isInvalid={!!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="user_ref_id">
                  <Form.Label>User Reference ID</Form.Label>
                  <Form.Control
                    type="text"
                    name="user_ref_id"
                    value={formData.user_ref_id}
                    onChange={handleChange}
                    isInvalid={!!errors.user_ref_id}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.user_ref_id}
                  </Form.Control.Feedback>
                </Form.Group>

                {message && <p>{message}</p>}

                <div className="d-flex justify-content-center mt-3">
                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />{" "}
                        Registering...
                      </>
                    ) : (
                      "Sign Up"
                    )}
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignUp;
