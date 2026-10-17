import { useAnecdotes, useAnecdotesActions } from "../store"
import { useNotificationActions } from "../stores/notification"

const AnecdoteList = () => {
  const anecdotes = useAnecdotes()

  const { vote } = useAnecdotesActions()
  const { setNotification } = useNotificationActions()

  const handleVote = (anecdote) => {
    vote(anecdote.id)
    setNotification(`You voted '${anecdote.content}'`)
    setTimeout(() => {
      setNotification('')
    }, 5000)
  }

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
