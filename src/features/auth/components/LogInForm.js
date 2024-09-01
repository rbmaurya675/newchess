
// import React, { useState } from "react";
// import { Button, Container, Form } from "react-bootstrap";
// import { Link, useNavigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode"; // Use named import

// const LogInForm = () => {
//   const navigate = useNavigate(); // Initialize useNavigate hook
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogIn = async (e) => {
//     e.preventDefault();

//     const apiRes = await fetch("https:moneychess.in/api/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         email: email,
//         password: password,
//       }),
//     });

//     if (apiRes.status === 200) {
//       const data = await apiRes.json();
//       localStorage.setItem('token', data.token);
//       const decodedToken = jwtDecode(data.token); // Use jwtDecode here
//       const userRole = decodedToken.role;

//       if (userRole === 'admin') {
//         navigate("/admin");
//       } else if (userRole === 'user') {
//         navigate("/dashboardheader");
//       } else {
//         console.log("Unknown user role");
//       }
//     } else {
//       console.log("Error logging in");
//       // Handle unsuccessful login
//     }
//   };

//   return (
//     <>
//       <Container
//         fluid
//         className="d-flex align-items-center justify-content-center"
//         style={{ minHeight: "100vh", backgroundColor: "#80060c" }}
//       >
//         <Form
//           onSubmit={handleLogIn}
//           className="bg-light d-flex flex-column w-75 gap-3 border rounded p-3"
//           style={{ minWidth: "300px", maxWidth: "400px" }}
//         >
//           <h2 className="text-center">Log In</h2>
//           <Form.Group controlId="Email">
//             <Form.Label>Email</Form.Label>
//             <Form.Control
//               onChange={(e) => setEmail(e.target.value)}
//               type="email"
//               placeholder="Email address"
//               required
//             />
//           </Form.Group>
//           <Form.Group controlId="Password">
//             <Form.Label>Password</Form.Label>
//             <Form.Control
//               onChange={(e) => setPassword(e.target.value)}
//               type="password"
//               placeholder="Password"
//               required
//             />
//           </Form.Group>
//           <Form.Check type="checkbox" id="remember-me" label="Remember me" />
//           <Button type="submit">Submit</Button>

//           <p className="text-center border-top pt-1">Need an account?</p>
//           <div
//             className="d-flex justify-content-between"
//             style={{ marginTop: "-3rem" }}
//           >
//             <div style={{ width: "200px" }}>
//               <Link to="/account/signup">SIGN UP</Link>
//             </div>
//             {/* <div>
//               <Link to="/forget">Forget Password</Link>
//             </div> */}
//           </div>
//         </Form>
//       </Container>
//     </>
//   );
// };

// export default LogInForm;

import React, { useState } from "react";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";  // Corrected import

const LogInForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // For loader
  const [message, setMessage] = useState(""); // For displaying messages
  const [messageColor, setMessageColor] = useState("red"); // Message color

  const handleLogIn = async (e) => { 
    e.preventDefault();
    setLoading(true);
    setMessage(""); // Clear any previous messages 

    const apiRes = await fetch("https:moneychess.in/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (apiRes.status === 200) {
      const data = await apiRes.json();
      localStorage.setItem("token", data.token);
      const decodedToken = jwtDecode(data.token);
      const userRole = decodedToken.role;

      setMessage("Login successful!");
      setMessageColor("green");

      setTimeout(() => {
        if (userRole === "admin") {
          navigate("/admin");
        } else if (userRole === "user") {
          navigate("/dashboardheader");
        } else {
          console.log("Unknown user role");
        }
      }, 2000);
    } else {
      setMessage("Incorrect password or email.");
      setMessageColor("red");
    }

    setLoading(false);
  };

  return (
    <>
      <Container
        fluid
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh", backgroundColor: "#80060c" }}
      >
        <Form
          onSubmit={handleLogIn}
          className="bg-light d-flex flex-column w-75 gap-3 border rounded p-3"
          style={{ minWidth: "300px", maxWidth: "400px" }}
        >
          <h2 className="text-center">Log In</h2>
          {message && (
            <p className="text-center" style={{ color: messageColor }}>
              {message}
            </p>
          )}
          <Form.Group controlId="Email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email address"
              required
            />
          </Form.Group>
          <Form.Group controlId="Password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              required
            />
          </Form.Group>
          <Form.Check type="checkbox" id="remember-me" label="Remember me" />
          <Button type="submit" disabled={loading} style={{ color: "white" }}>
            {loading ? <Spinner animation="border" size="sm" /> : "Submit"}
          </Button>

          <p className="text-center border-top pt-1">Need an account?</p>
          <div
            className="d-flex justify-content-between"
            style={{ marginTop: "-3rem" }}
          >
            <div style={{ width: "200px" }}>
              <Link to="/account/signup">SIGN UP</Link>
            </div>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default LogInForm;
