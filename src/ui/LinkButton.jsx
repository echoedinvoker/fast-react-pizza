import { Link } from "react-router-dom"

function LinkButton({ children, onClick, to }) {
  const className = 'text-sm text-blue-500 hover:text-blue-700 hover:underline'

  if (to) return <Link to={to} className={className}>
    {children}
  </Link>

  return <button className={className} onClick={onClick}>
    {children}
  </button>
}

export default LinkButton
