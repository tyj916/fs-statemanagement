const Filter = () => {
  const handleChange = (e) => {

  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} data-testid="filter" />
    </div>
  )
}

export default Filter
