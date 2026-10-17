import { useAnecdotesActions } from "../store"
import { useNotificationActions } from "../stores/notification"

const AnecdoteForm = () => {
  const { add } = useAnecdotesActions()
  const { setNotification } = useNotificationActions()

  const addAnecdote = async (e) => {
    e.preventDefault()

    const anecdote = e.target.anecdote.value

    await add(anecdote)
    
    setNotification(`Added '${anecdote}'`)
    setTimeout(() => {
      setNotification('')
    }, 5000)

    e.target.reset()
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input data-testid="new" name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
