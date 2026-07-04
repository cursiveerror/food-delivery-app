import { NavLink, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

const navLinkClass = ({ isActive }) =>
  `relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
    isActive
      ? 'text-emerald-700 bg-emerald-50'
      : 'text-slate-600 hover:text-emerald-600 hover:bg-slate-50'
  }`

const Header = () => {
  const { cartCount } = useCart();
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <NavLink to="/" className="group flex items-center gap-2.5">
            <span className="flex items-center gap-1 font-mono text-lg sm:text-xl font-bold tracking-tight">
              <kbd className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-700 text-sm sm:text-base group-hover:border-emerald-300 group-hover:bg-emerald-50 transition-colors">
                Ctrl
              </kbd>
              <span className="text-emerald-600">+</span>
              <kbd className="px-2 py-0.5 rounded-md bg-emerald-600 border border-emerald-600 text-white text-sm sm:text-base group-hover:bg-emerald-500 group-hover:border-emerald-500 transition-colors shadow-sm">
                Eat
              </kbd>
            </span>
          </NavLink>

          <nav className="flex items-center gap-1">
            <NavLink to="/" end className={navLinkClass}>
              Головна
            </NavLink>
            <NavLink to="/cart" className={navLinkClass}>
              <span className="flex items-center gap-1.5">
                Кошик
                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200">
                  {cartCount}
                </span>
              </span>
            </NavLink>
            {user ? (
              <>
                <NavLink to="/profile" className={navLinkClass}>
                  {user.nickname || user.name}
                </NavLink>
                <button
                  onClick={logout}
                  className="ml-1 px-4 py-2 rounded-lg text-sm font-semibold bg-red-50 text-red-600 hover:bg-red-100 transition-colors shadow-sm"
                >
                  Вийти
                </button>
              </>
            ) : (
              <NavLink
                to="/login"
                className="ml-1 px-4 py-2 rounded-lg text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-500 transition-colors shadow-sm"
              >
                Увійти
              </NavLink>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
