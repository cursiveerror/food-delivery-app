import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const inputClass =
  'w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all';
const labelClass = 'block text-sm font-medium text-slate-700 mb-1.5';

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { addOrder, user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    paymentMethod: 'card',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Ім'я є обов'язковим";
    if (!formData.phone.trim()) newErrors.phone = "Телефон є обов'язковим";
    else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) newErrors.phone = "Некоректний формат телефону";
    if (!formData.address.trim()) newErrors.address = "Адреса є обов'язковою";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Determine sequential order ID
    let nextOrderId = 1;
    if (user && user.orders && user.orders.length > 0) {
      // Find the highest existing order ID (if they are numeric)
      const numericIds = user.orders.map(o => parseInt(o.id, 10)).filter(id => !isNaN(id));
      if (numericIds.length > 0) {
        nextOrderId = Math.max(...numericIds) + 1;
      }
    }

    const newOrder = {
      id: nextOrderId.toString(),
      date: new Date().toLocaleDateString('uk-UA', { day: 'numeric', month: 'long', year: 'numeric' }),
      total: cartTotal,
      status: 'В обробці',
    };
    if (addOrder && user) {
      addOrder(newOrder);
    }

    alert('Замовлення успішно оформлено!');
    clearCart();
    navigate('/');
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Кошик порожній</h2>
        <button
          onClick={() => navigate('/')}
          className="bg-emerald-600 text-white py-2 px-6 rounded-xl font-semibold hover:bg-emerald-500 transition-all"
        >
          Повернутися до меню
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Оформлення замовлення</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div>
              <label htmlFor="name" className={labelClass}>Ім'я та Прізвище</label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className={`${inputClass} ${errors.name ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' : ''}`}
                placeholder="Іван Іваненко"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="phone" className={labelClass}>Телефон</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className={`${inputClass} ${errors.phone ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' : ''}`}
                placeholder="+380..."
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label htmlFor="address" className={labelClass}>Адреса доставки</label>
              <input
                id="address"
                name="address"
                type="text"
                value={formData.address}
                onChange={handleChange}
                className={`${inputClass} ${errors.address ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' : ''}`}
                placeholder="м. Київ, вул. Хрещатик, 1"
              />
              {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
            </div>

            <div>
              <label className={labelClass}>Спосіб оплати</label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="card">Карткою онлайн</option>
                <option value="cash">Готівкою при отриманні</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-emerald-500 transition-all shadow-sm"
            >
              Підтвердити замовлення
            </button>
          </form>
        </div>

        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm h-fit">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Ваше замовлення</h3>
          <ul className="space-y-4 mb-6">
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between text-sm">
                <span className="text-slate-600">{item.name} x{item.quantity}</span>
                <span className="font-semibold text-slate-800">{item.price * item.quantity} ₴</span>
              </li>
            ))}
          </ul>
          <div className="border-t border-slate-200 pt-4 flex justify-between items-center">
            <span className="font-bold text-slate-800">До сплати:</span>
            <span className="text-xl font-bold text-emerald-600">{cartTotal} ₴</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
