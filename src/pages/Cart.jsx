import { Link } from 'react-router-dom'

const Cart = () => {
  return (
    <section className="max-w-lg mx-auto px-4 sm:px-6 py-16 sm:py-24">
      <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 text-center shadow-sm">
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center">
          <span className="font-mono text-3xl text-slate-300">[]</span>
        </div>

        <h1 className="text-2xl font-bold text-slate-800 mb-2">Кошик порожній</h1>
        <p className="text-slate-500 text-sm leading-relaxed mb-8 max-w-xs mx-auto">
          Схоже, ви ще нічого не додали. Загляньте в меню — там чекають смачні страви.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-emerald-600 text-white py-2.5 px-6 rounded-xl text-sm font-semibold hover:bg-emerald-500 transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-emerald-600/20"
        >
          <span className="font-mono text-xs opacity-80">→</span>
          Перейти до меню
        </Link>
      </div>
    </section>
  )
}

export default Cart
