import { Link } from 'react-router-dom'
import AuthCard from '../components/AuthCard'

const inputClass =
  'w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all'

const labelClass = 'block text-sm font-medium text-slate-700 mb-1.5'

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <AuthCard
      title="Вхід"
      subtitle="Увійдіть до акаунту Ctrl+Eat, щоб оформлювати замовлення"
      footer={
        <>
          Немає акаунту?{' '}
          <Link to="/register" className="text-emerald-600 font-medium hover:text-emerald-700 transition-colors">
            Зареєструватися
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="login-email" className={labelClass}>
            Email
          </label>
          <input
            id="login-email"
            type="email"
            name="email"
            placeholder="you@example.com"
            autoComplete="email"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="login-password" className={labelClass}>
            Пароль
          </label>
          <input
            id="login-password"
            type="password"
            name="password"
            placeholder="••••••••"
            autoComplete="current-password"
            className={inputClass}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-600 text-white py-2.5 px-4 rounded-xl text-sm font-semibold hover:bg-emerald-500 active:scale-[0.98] transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-emerald-600/20"
        >
          Увійти
        </button>
      </form>
    </AuthCard>
  )
}

export default Login
