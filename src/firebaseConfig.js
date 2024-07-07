import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCb9pJtl4YASiAdDo7t2Za-1ROcLeU7rMU",
  authDomain: "qna1-62656.firebaseapp.com",
  projectId: "qna1-62656",
  storageBucket: "qna1-62656.appspot.com",
  messagingSenderId: "227916301631",
  appId: "1:227916301631:web:4ce7d0e266851fb7f23f8a",
  measurementId: "G-YJ67FB5JCB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// export default auth;

export {auth, db}


// rules_version = '2';

// service cloud.firestore {
//   match /databases/{database}/documents {
//     match /{document=**} {
//       allow read, write: if true;
//     }
//   }
// }


// service cloud.firestore {
//   match /databases/{database}/documents {
//     match /questionBoards/{boardId} {
//       allow read, write: if request.auth != null;
//     }
//     match /questions/{questionId} {
//       allow read, write: if request.auth != null;
//     }
//   }
// }

// service cloud.firestore {
//   match /databases/{database}/documents {
//     match /questionBoards/{boardId} {
//       allow read, write: if request.auth != null;
//     }
//     match /questions/{questionId} {
//       allow read, write: if request.auth != null;
//     }
//   }
// }
