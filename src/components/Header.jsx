import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import useCartStore from '../store/useCartStore'
import useThemeStore from '../store/useThemeStore'
import { useAuth } from '../context/AuthContext'

const navLinkClass = ({ isActive }) =>
  `relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
    isActive
      ? 'text-emerald-700 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-900/30'
      : 'text-slate-600 hover:text-emerald-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:text-emerald-400 dark:hover:bg-slate-800'
  }`

const Header = () => {
  const cartCount = useCartStore((state) => state.getCartCount())
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useThemeStore()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <NavLink to="/" className="group flex items-center gap-2.5 z-50" onClick={() => setIsMobileMenuOpen(false)}>
            <span className="flex items-center gap-1 font-mono text-lg sm:text-xl font-bold tracking-tight">
              <kbd className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm sm:text-base group-hover:border-emerald-300 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/30 transition-colors">
                Ctrl
              </kbd>
              <span className="text-emerald-600 dark:text-emerald-500">+</span>
              <kbd className="px-2 py-0.5 rounded-md bg-emerald-600 border border-emerald-600 text-white text-sm sm:text-base group-hover:bg-emerald-500 group-hover:border-emerald-500 transition-colors shadow-sm">
                Eat
              </kbd>
            </span>
          </NavLink>

          {/* Desktop Nav */}
          <nav className="hidden sm:flex items-center gap-1">
            <button
              onClick={toggleTheme}
              className="p-2 mr-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <NavLink to="/" end className={navLinkClass}>
              Головна
            </NavLink>
            <NavLink to="/cart" className={navLinkClass}>
              <span className="flex items-center gap-1.5">
                Кошик
                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
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
                  className="ml-1 px-4 py-2 rounded-lg text-sm font-semibold bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors shadow-sm"
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

          {/* Mobile Menu Toggle */}
          <div className="flex sm:hidden items-center gap-2 z-50">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="sm:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden"
          >
            <nav className="flex flex-col p-4 gap-2">
              <NavLink to="/" end className={navLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
                Головна
              </NavLink>
              <NavLink to="/cart" className={navLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
                <span className="flex items-center justify-between w-full">
                  Кошик
                  <span className="font-mono text-[10px] px-1.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                    {cartCount}
                  </span>
                </span>
              </NavLink>
              {user ? (
                <>
                  <NavLink to="/profile" className={navLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
                    Профіль ({user.nickname || user.name})
                  </NavLink>
                  <button
                    onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                    className="mt-2 w-full text-left px-4 py-2 rounded-lg text-sm font-semibold bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
                  >
                    Вийти
                  </button>
                </>
              ) : (
                <NavLink
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mt-2 text-center px-4 py-2.5 rounded-lg text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-500 transition-colors"
                >
                  Увійти
                </NavLink>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header
