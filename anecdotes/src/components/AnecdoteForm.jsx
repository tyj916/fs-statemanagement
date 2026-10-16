import { useAnecdotesActions } from "../store"

const AnecdoteForm = () => {
  const { add } = useAnecdotesActions()

  const addAnecdote = (e) => {
    e.preventDefault()
    add(e.target.anecdote.value)
    e.target.reset()
  }

  return (
    <form onSubmit={addAnecdote}>
      <div>
        <input data-testid="new" name="anecdote" />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default AnecdoteForm
