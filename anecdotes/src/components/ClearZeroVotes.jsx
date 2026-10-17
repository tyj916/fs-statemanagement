import { useAnecdotesActions } from "../store"

const ClearZeroVotes = () => {
  const { clearZeroVotes } = useAnecdotesActions()

  const handleClear = () => {
    clearZeroVotes()
  }

  return (
    <div>
      <button onClick={handleClear}>Clear Zero Votes</button>
    </div>
  )
}

export default ClearZeroVotes
