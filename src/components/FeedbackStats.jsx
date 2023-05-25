
import { useContext } from 'react'
import FeedbackContext from '../context/FeedbackContext'

function FeedbackStats() {
  const { feedback } = useContext(FeedbackContext)
  const totalRating = feedback.reduce((acc, { rating }) => {
    const parsedRating = Number(rating);
    if (!isNaN(parsedRating)) {
      return acc + parsedRating;
    }
    return acc;
  }, 0);
  
  const average = feedback.length > 0 ? totalRating / feedback.length : 0;
   
  return (
    <div className='feedback-stats'>
      <h4>{feedback.length} Reviews</h4>
      <h4>Average Rating: 
        {average.toFixed(1).replace(/[.,]0$/, '')}
        </h4>
    </div>
  )
}

export default FeedbackStats