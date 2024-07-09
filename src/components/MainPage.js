import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../firebaseConfig';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import '../MainPage.css'; 

const MainPage = () => {
  const navigate = useNavigate();
  const [joinKey, setJoinKey] = useState("");

  const createQuestionBoard = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert("You must be signed in to create a question board");
      return;
    }

    const boardKey = Math.random().toString(36).substr(2, 9);

    try {
      await addDoc(collection(db, 'questionBoards'), {
        key: boardKey,
        timestamp: serverTimestamp(),
        hostEmail: user.email,
      });

      navigate(`/board/${boardKey}`);
    } catch (error) {
      console.error("Error creating question board:", error);
    }
  };

  const joinQuestionBoard = () => {
    navigate(`/board/${joinKey}`);
  };


  return (
    <div className="MainPage">
        <div className="main-logo">q+a</div>
      <button onClick={createQuestionBoard}>Create Question Board</button>
      <div className="join-board">
        <p>Join Question Board</p>
        <input 
          type="text" 
          placeholder="Question board key" 
          value={joinKey} 
          onChange={(e) => setJoinKey(e.target.value)} 
        />
        <button onClick={joinQuestionBoard}>Join</button>
      </div>
    </div>
  );
};

export default MainPage;


