const ClearZeroVotes = () => {
  const handleClear = () => {
    console.log('Clear zero')
  }

  return (
    <div>
      <button onClick={handleClear}>Clear Zero Votes</button>
    </div>
  )
}

export default ClearZeroVotes
