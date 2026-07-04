import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthCard from '../components/AuthCard';
import { useAuth } from '../context/AuthContext';

const inputClass =
  'w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all';

const labelClass = 'block text-sm font-medium text-slate-700 mb-1.5';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
    if (serverError) setServerError('');
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email є обов'язковим";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Некоректний формат email';
    }
    if (!formData.password) {
      newErrors.password = "Пароль є обов'язковим";
    } else if (formData.password.length < 6) {
      newErrors.password = 'Пароль має містити щонайменше 6 символів';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const response = login(formData.email, formData.password);
    if (response.success) {
      navigate('/');
    } else {
      setServerError(response.error);
    }
  };

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
        {serverError && <div className="p-3 bg-red-50 text-red-600 text-sm rounded-xl">{serverError}</div>}
        <div>
          <label htmlFor="login-email" className={labelClass}>
            Email
          </label>
          <input
            id="login-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            autoComplete="email"
            className={`${inputClass} ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
          />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="login-password" className={labelClass}>
            Пароль
          </label>
          <input
            id="login-password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            autoComplete="current-password"
            className={`${inputClass} ${errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
          />
          {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-600 text-white py-2.5 px-4 rounded-xl text-sm font-semibold hover:bg-emerald-500 active:scale-[0.98] transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-emerald-600/20"
        >
          Увійти
        </button>
      </form>
    </AuthCard>
  );
};

export default Login;
