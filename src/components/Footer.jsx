import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
          <div>
            <p className="font-mono font-bold text-emerald-600 mb-2">Ctrl+Eat</p>
            <p className="text-sm text-slate-500 leading-relaxed">
              Доставка їжі для тих, хто цінує швидкість і смак.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Навігація</p>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-slate-600 hover:text-emerald-600 transition-colors">Меню</Link></li>
              <li><Link to="/cart" className="text-slate-600 hover:text-emerald-600 transition-colors">Кошик</Link></li>
              <li><Link to="/profile" className="text-slate-600 hover:text-emerald-600 transition-colors">Профіль</Link></li>
              <li><Link to="/login" className="text-slate-600 hover:text-emerald-600 transition-colors">Вхід</Link></li>
              <li><Link to="/register" className="text-slate-600 hover:text-emerald-600 transition-colors">Реєстрація</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Контакти</p>
            <ul className="space-y-2 text-sm text-slate-500 font-mono">
              <li>hello@ctrl-eat.dev</li>
              <li>+380 44 123 45 67</li>
              <li>Київ, Україна</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-slate-400">
          <p>&copy; {new Date().getFullYear()} Ctrl+Eat. Усі права захищені.</p>
          <p className="font-mono">v1.0.0 — minimalist geek edition</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
