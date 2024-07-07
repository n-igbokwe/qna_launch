
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import '../SigninPage.css'; // Import CSS file

const SigninPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const signin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      if (!user.emailVerified) {
        throw new Error("Email not verified. Please verify your email before signing in.");
      }
      
      navigate('/main');
    } catch (error) {
      console.error("Error signing in: ", error);
      setErrorMessage(error.message);
    }
  };

  const goToSignup = () => {
    navigate('/signup');
  };

  return (
    <div className="SigninPage">
      <div className="logo">q+a</div>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="button-container">
        <button onClick={signin}>Sign In</button>
        <button onClick={goToSignup}>Sign Up</button>
      </div>
      {errorMessage && <p className="errorMessage">{errorMessage}</p>}
    </div>
  );
};

export default SigninPage




