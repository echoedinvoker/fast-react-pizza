import { useState } from "react"
import { useNavigate } from "react-router-dom"

function SearchOrder() {
  const [query, setQuery] = useState("")
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    navigate(`/order/${query}`)
  }

  return <form onSubmit={handleSubmit}>
    <input
      className="rounded-full bg-yellow-100 py-2 px-3 text-sm placeholder:text-stone-400
      w-24 sm:w-72
      focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-opacity-50 sm:focus:w-80
      transition-all duration-300"
      placeholder="Search order #"
      value={query}
      onChange={e => setQuery(e.target.value)}
    />
  </form>
}

export default SearchOrder
