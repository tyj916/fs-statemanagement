import { useAnecdotes, useAnecdotesActions } from "../store"
import { useNotificationActions } from "../stores/notification"

const AnecdoteList = () => {
  const anecdotes = useAnecdotes()

  const { vote, remove } = useAnecdotesActions()
  const { setNotification } = useNotificationActions()

  const handleVote = (anecdote) => {
    vote(anecdote.id)
    setNotification(`you voted '${anecdote.content}'`)
    setTimeout(() => {
      setNotification('')
    }, 5000)
  }

  const handleDelete = (anecdote) => {
    remove(anecdote.id) 
    setNotification(`Deleted '${anecdote.content}'`)
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
          {!anecdote.votes && <div>
            <button onClick={() => handleDelete(anecdote)}>delete</button>
          </div>}
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
