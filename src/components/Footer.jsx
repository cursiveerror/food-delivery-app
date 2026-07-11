import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800/80 mt-auto transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-1">
            <Link to="/" className="group flex items-center gap-2 mb-4 w-fit">
              <span className="flex items-center gap-1 font-mono text-xl font-bold tracking-tight">
                <kbd className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm group-hover:border-emerald-300 transition-colors">
                  Ctrl
                </kbd>
                <span className="text-emerald-600 dark:text-emerald-500">+</span>
                <kbd className="px-2 py-0.5 rounded-md bg-emerald-600 border border-emerald-600 text-white text-sm shadow-sm group-hover:bg-emerald-500 group-hover:border-emerald-500 transition-colors">
                  Eat
                </kbd>
              </span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Доставка їжі для тих, хто цінує швидкість і смак.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-slate-800 dark:text-white mb-4">Навігація</h3>
            <ul className="space-y-2.5">
              <li><Link to="/" className="text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 text-sm transition-colors">Меню</Link></li>
              <li><Link to="/cart" className="text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 text-sm transition-colors">Кошик</Link></li>
              <li><Link to="/profile" className="text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 text-sm transition-colors">Профіль</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-slate-800 dark:text-white mb-4">Компанія</h3>
            <ul className="space-y-2.5">
              <li><Link to="/" className="text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 text-sm transition-colors">Про нас</Link></li>
              <li><Link to="/" className="text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 text-sm transition-colors">Контакти</Link></li>
              <li><Link to="/" className="text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 text-sm transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-slate-800 dark:text-white mb-4">Контакти</h3>
            <ul className="space-y-2.5 text-sm text-slate-500 dark:text-slate-400 font-mono">
              <li>hello@ctrl-eat.dev</li>
              <li>+380 44 123 45 67</li>
              <li>Київ, Україна</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-400 dark:text-slate-500">
            © {new Date().getFullYear()} Ctrl+Eat. Всі права захищено.
          </p>
          <div className="flex items-center gap-4 text-sm text-slate-400 dark:text-slate-500">
            <Link to="/" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Правила</Link>
            <Link to="/" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Конфіденційність</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
