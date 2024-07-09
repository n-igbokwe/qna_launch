
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db, auth } from '../firebaseConfig';
import { collection, addDoc, query, where, orderBy, onSnapshot, serverTimestamp, doc, updateDoc, increment, getDoc, getDocs } from "firebase/firestore";
import '../QuestionBoard.css'; 

const QuestionBoard = () => {
  const { boardKey } = useParams();
  const [question, setQuestion] = useState("");
  const [questions, setQuestions] = useState([]);
  const [hostEmail, setHostEmail] = useState('');
  const [currentUserEmail, setCurrentUserEmail] = useState('');
  const [userUpvotedQuestions, setUserUpvotedQuestions] = useState([]);
  const [upvoteMessages, setUpvoteMessages] = useState({});

  useEffect(() => {
    const fetchQuestionBoard = () => {
      try {
        const boardRef = collection(db, 'questionBoards');
        const boardQuery = query(boardRef, where('key', '==', boardKey));
    
        getDocs(boardQuery).then(boardSnapshot => {
          if (!boardSnapshot.empty) {
            const boardData = boardSnapshot.docs[0].data();
            setHostEmail(boardData.hostEmail);
            console.log('Host email is:', boardData.hostEmail);
          } else {
            console.log('No question board found for key:', boardKey);
          }
    
          const user = auth.currentUser;
          if (user) {
            setCurrentUserEmail(user.email);
            console.log('Current user email:', user.email);
          } else {
            console.log('No current user found');
          }
        }).catch(error => {
          console.error('Error fetching question board:', error);
        });
      } catch (error) {
        console.error('Unexpected error:', error);
      }
    };
    
    const fetchBoardDetails = async () => {
      const boardDoc = await getDoc(doc(db, 'questionBoards', boardKey));
      if (boardDoc.exists()) {
        setHostEmail(boardDoc.data().hostEmail);
      }
    };

    fetchBoardDetails();

    const q = query(
      collection(db, 'questions'),
      where('boardKey', '==', boardKey),
      orderBy('timestamp', 'desc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const questionsData = [];
      querySnapshot.forEach((doc) => {
        questionsData.push({ id: doc.id, ...doc.data() });
      });
      setQuestions(questionsData);
    });

    const fetchQuestions = async () => {
      try {
        const questionRef = collection(db, 'questions');
        const questionQuery = query(questionRef, where('boardKey', '==', boardKey));
        const questionSnapshot = await getDocs(questionQuery);
        
        const questionList = questionSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        questionList.sort((a, b) => b.upvotes - a.upvotes);
        
        setQuestions(questionList);
        console.log('Questions:', questionList);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestionBoard();
    fetchQuestions();
    return () => unsubscribe();
  }, [boardKey]);

  const askQuestion = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert("You must be signed in to ask a question");
      return;
    }

    console.log("just user", user);
    console.log("just host", hostEmail);

    await addDoc(collection(db, 'questions'), {
      boardKey,
      question,
      email: user.email,
      timestamp: serverTimestamp(),
      upvotes: 0,
    });

    setQuestion("");
  };

  const upvoteQuestion = async (id) => {
    const user = auth.currentUser;
    if (!user) {
      alert("You must be signed in to upvote a question");
      return;
    }

    if (userUpvotedQuestions.includes(id)) {
      setUpvoteMessages({
        ...upvoteMessages,
        [id]: 'You have already upvoted this question'
      });
      setTimeout(() => {
        setUpvoteMessages({
          ...upvoteMessages,
          [id]: ''
        });
      }, 3000);
      return;
    }

    const questionRef = doc(db, 'questions', id);
    await updateDoc(questionRef, {
      upvotes: increment(1)
    });

    setUserUpvotedQuestions([...userUpvotedQuestions, id]);
  };

  useEffect(() => {
    console.log("Host Email:", hostEmail);
  }, [hostEmail]);
  
  return (
    <div className="QuestionBoard">
      <div className="logo">q+a</div>
      <div className="room-key">Room Key: {boardKey}</div>
      <div className="QuestionsList">
        {questions.map((q) => (
          <div key={q.id} className="Question">
            <p>{q.question}</p>
            {currentUserEmail === hostEmail && <p><small>Asked by: {q.email}</small></p>}
            <button onClick={() => upvoteQuestion(q.id)}>Upvote</button>
            <p>Upvotes: {q.upvotes}</p>
            <p className="upvote-message">{upvoteMessages[q.id]}</p>
            <hr />
          </div>
        ))}
      </div>
      <div className="QuestionInput">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question..."
        />
        <button onClick={askQuestion}>Submit</button>
      </div>
    </div>
  );
};

export default QuestionBoard;


