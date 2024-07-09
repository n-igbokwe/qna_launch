
import React, { useState } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import '../SignupPage.css'; // Import CSS file

const universities = [
  "example.edu",
  "another.edu",
  "someother.edu",
  "hotmail.com",
  "gmail.com"
];

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState(universities[0]);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const signup = async () => {
    if (!email.endsWith(`@${selectedUniversity}`)) {
      setErrorMessage("Email must match the selected university domain.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);
      await signOut(auth);
      setErrorMessage("Verification email sent. Please check your inbox.");
    } catch (error) {
      console.error("Error signing up: ", error);
      setErrorMessage(error.message);
    }
  };

  const goToSignin = () => {
    navigate('/signin');
  };

  return (
    <div className="SignupPage">
      <div className="logo">q+a</div>
      <select onChange={(e) => setSelectedUniversity(e.target.value)}>
        {universities.map((domain, index) => (
          <option key={index} value={domain}>{domain}</option>
        ))}
      </select>
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
        <button onClick={signup}>Sign Up</button>
        <button onClick={goToSignin}>Sign In</button>
      </div>
      {errorMessage && <p className="errorMessage">{errorMessage}</p>}
    </div>
  );
};

export default SignupPage;
