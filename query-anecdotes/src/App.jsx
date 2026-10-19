import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useAnecdotes } from './hooks/useAnecdotes'
import useNotification from './hooks/useNotification'

const App = () => {
  const { anecdotes, isPending, isError, voteAnecdote } = useAnecdotes()
  const { setNotificationMessage } = useNotification()

  const handleVote = (anecdote) => {
    voteAnecdote(anecdote)
    setNotificationMessage(`anecdote ${anecdote.content} voted`)
  }

  if (isPending) {
    return <div>Loading data...</div>
  }

  if (isError) {
    return <p>anecdote service not available due to problems in server</p>
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

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

export default App