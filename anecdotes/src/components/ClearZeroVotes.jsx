import { useAnecdotesActions } from "../store"
import { useNotificationActions } from "../stores/notification"

const ClearZeroVotes = () => {
  const { clearZeroVotes } = useAnecdotesActions()
  const { setNotification } = useNotificationActions()

  const handleClear = () => {
    clearZeroVotes()
    setNotification('Cleared zero votes anecdotes')
    setTimeout(() => {
      setNotification('')
    }, 5000)
  }

  return (
    <div>
      <button onClick={handleClear}>Clear Zero Votes</button>
    </div>
  )
}

export default ClearZeroVotes
