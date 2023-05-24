import { createContext } from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const FeedbackContext = createContext();
export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      rating: 10,
      text: "this is a stupendes application keep up the good work!",
    },
    {
      id: 2,
      rating: 9,
      text: "I like it very much, but there is room to do more. nice work overall!",
    },
    {
      id: 3,
      rating: 8,
      text: "The app is beautiful. I enjoy it very much. Yet, I still prefer things more brighter.",
    },
  ]);
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });
  // delete feedback
  const deleteFeedback = (id) => {
    if (window.confirm("Are you sure you want to delete this feedback?")) {
      setFeedback(feedback.filter((feedback) => feedback.id !== id));
    }
  };
  // update feedback
    const updateFeedback = (id,upditem) => {
    setFeedback(feedback.map((item) => (item.id === id ?{...item, ...upditem}: item)));
    
    
    };

  // set for editing feedback
  const editFeedback = (item) => {
    setFeedbackEdit({ item, edit: true });
  };
  // add feedback
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4();
    setFeedback([newFeedback, ...feedback]);
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        deleteFeedback,
        addFeedback,
        editFeedback,  
        updateFeedback,  
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};
export default FeedbackContext;
