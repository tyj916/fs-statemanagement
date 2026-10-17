import { useAnecdotesActions } from "../store"

const AnecdoteForm = () => {
  const { add } = useAnecdotesActions()

  const addAnecdote = async (e) => {
    e.preventDefault()
    await add(e.target.anecdote.value)
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
