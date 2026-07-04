import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthCard from '../components/AuthCard';
import { useAuth } from '../context/AuthContext';

const inputClass =
  'w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all';

const labelClass = 'block text-sm font-medium text-slate-700 mb-1.5';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
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
    if (!formData.name.trim()) newErrors.name = "Ім'я є обов'язковим";
    
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
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Паролі не збігаються';
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

    const response = register(formData.name, formData.email, formData.password);
    if (response.success) {
      navigate('/');
    } else {
      setServerError(response.error);
    }
  };

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
        {serverError && <div className="p-3 bg-red-50 text-red-600 text-sm rounded-xl">{serverError}</div>}
        
        <div>
          <label htmlFor="register-name" className={labelClass}>
            Ім'я
          </label>
          <input
            id="register-name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ваше ім'я"
            autoComplete="name"
            className={`${inputClass} ${errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
          />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="register-email" className={labelClass}>
            Email
          </label>
          <input
            id="register-email"
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
          <label htmlFor="register-password" className={labelClass}>
            Пароль
          </label>
          <input
            id="register-password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            autoComplete="new-password"
            className={`${inputClass} ${errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
          />
          {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
        </div>

        <div>
          <label htmlFor="register-confirm" className={labelClass}>
            Підтвердження пароля
          </label>
          <input
            id="register-confirm"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="••••••••"
            autoComplete="new-password"
            className={`${inputClass} ${errors.confirmPassword ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
          />
          {errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-600 text-white py-2.5 px-4 rounded-xl text-sm font-semibold hover:bg-emerald-500 active:scale-[0.98] transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-emerald-600/20"
        >
          Зареєструватися
        </button>
      </form>
    </AuthCard>
  );
};

export default Register;
