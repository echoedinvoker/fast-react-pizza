import { Link } from "react-router-dom"

function Button({ children, disabled, to, type, onClick }) {
  const base = "inline-block bg-yellow-500 rounded-full text-stone-800 font-semibold tracking-wide uppercase hover:bg-yellow-400 \
    transition-colors duration-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed"

  const styles = {
    primary: base + ' py-3 px-4 md:py-4 md:px-5',
    small: base + ' py-2 px-3 md:py-3 md:px-4 text-sm',
    round: base + ' py-1 px-2.5 md:px-3.5 md:py-2 text-sm',
    secondary: "inline-block border-2 border-stone-500 rounded-full text-stone-500 font-semibold tracking-wide uppercase hover:bg-stone-400 \
    transition-colors duration-300 focus:outline-none focus:ring focus:ring-stone-300 focus:ring-offset-2 disabled:cursor-not-allowed \
    py-2.5 px-3.5 md:py-3.5 md:px-4.5 hover:text-stone-800"
  }

  if (to) return <Link className={styles[type]} to={to} > {children} </Link>

  if (onClick) return <button disabled={disabled} className={styles[type]} onClick={onClick} > {children} </button>

  return <button disabled={disabled} className={styles[type]} > {children} </button>
}

export default Button
