import { Link } from 'react-router-dom'
import AuthCard from '../components/AuthCard'

const inputClass =
  'w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all'

const labelClass = 'block text-sm font-medium text-slate-700 mb-1.5'

const Register = () => {
  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <AuthCard
      title="Реєстрація"
      subtitle="Створіть акаунт і почніть замовляти улюблені страви"
      footer={
        <>
          Вже маєте акаунт?{' '}
          <Link to="/login" className="text-emerald-600 font-medium hover:text-emerald-700 transition-colors">
            Увійти
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="register-name" className={labelClass}>
            Ім'я
          </label>
          <input
            id="register-name"
            type="text"
            name="name"
            placeholder="Ваше ім'я"
            autoComplete="name"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="register-email" className={labelClass}>
            Email
          </label>
          <input
            id="register-email"
            type="email"
            name="email"
            placeholder="you@example.com"
            autoComplete="email"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="register-password" className={labelClass}>
            Пароль
          </label>
          <input
            id="register-password"
            type="password"
            name="password"
            placeholder="••••••••"
            autoComplete="new-password"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="register-confirm" className={labelClass}>
            Підтвердження пароля
          </label>
          <input
            id="register-confirm"
            type="password"
            name="confirmPassword"
            placeholder="••••••••"
            autoComplete="new-password"
            className={inputClass}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-600 text-white py-2.5 px-4 rounded-xl text-sm font-semibold hover:bg-emerald-500 active:scale-[0.98] transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-emerald-600/20"
        >
          Зареєструватися
        </button>
      </form>
    </AuthCard>
  )
}

export default Register
