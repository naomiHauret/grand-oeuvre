import React from 'react'

const FormSearch = (props) => {
  const { handleSubmit, handleInput } = props

  return <form onSubmit={handleSubmit}>
    <input type="text" onInput={handleInput} />
    <button type="submit">Go</button>
  </form>
}



export default FormSearch