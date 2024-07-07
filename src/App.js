
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import './App.css';
// import SignupPage from './components/SignupPage';
// import SigninPage from './components/SigninPage';
// import MainPage from './components/MainPage';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<SigninPage />} />
//         <Route path="/signin" element={<SigninPage />} />
//         <Route path="/signup" element={<SignupPage />} />
//         <Route path="/main" element={<MainPage />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import MainPage from './components/MainPage';
// import SigninPage from './components/SigninPage';
// import SignupPage from './components/SignupPage';
// import QuestionBoard from './components/QuestionBoard';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<SigninPage/>} />
//         <Route path="/signin" element={<SigninPage />} />
//         <Route path="/signup" element={<SignupPage />} />
//         <Route path="/main" element={<MainPage />} />
//         <Route path="/board/:boardKey" element={<QuestionBoard />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage';
import QuestionBoard from './components/QuestionBoard';
import SigninPage from './components/SigninPage';
import SignupPage from './components/SignupPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SigninPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/board/:boardKey" element={<QuestionBoard />} />
      </Routes>
    </Router>
  );
};

export default App;


