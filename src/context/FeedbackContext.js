import { createContext } from "react";
import { useState , useEffect} from "react";

const FeedbackContext = createContext();
export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState([]);
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });
  useEffect(() => {
      fetchFeedback()
    },[])
    // fetch feedback from local host 5000
    const fetchFeedback = async () => {
      const res = await fetch("/feedback?_sort=id&_order=desc");
      const data = await res.json();
      setFeedback(data) ; 
      setIsLoading(false);
    };
  // delete feedback
  const deleteFeedback =  async (id) => {
    if (window.confirm("Are you sure you want to delete this feedback?")) {
      await fetch(`/feedback/${id}`, {
        method: "DELETE",
      });
      setFeedback(feedback.filter((feedback) => feedback.id !== id));
    }
  };
  // update  feedback
    const updateFeedback = async(id,upditem) => {
      const res = await fetch(`/feedback/${id}`, {
        method: "PUT",
        headers: {"Content-type": "application/json", },
        body: JSON.stringify(upditem),
        });
      const data = await res.json();

    setFeedback(feedback.map((item) => (item.id === id ?{...item, ...data}: item)));
    
    
    };

  // set for editing feedback
  const editFeedback = (item) => {
    setFeedbackEdit({ item, edit: true });
  };
  // add feedback
  const addFeedback = async(newFeedback) => {
    const res = await fetch("/feedback", {
      method: "POST",
      headers: {"Content-type": "application/json", },
      body: JSON.stringify(newFeedback),
      });    
    const data = await res.json();
    setFeedback([data, ...feedback]);
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        isLoading,
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
