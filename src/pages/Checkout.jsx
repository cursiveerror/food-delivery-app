import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useCartStore from '../store/useCartStore';
import { useAuth } from '../context/AuthContext';

const inputClass =
  'w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all';
const labelClass = 'block text-sm font-medium text-slate-700 mb-1.5';

const Checkout = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  const cartTotal = useCartStore((state) => state.getCartTotal());
  const clearCart = useCartStore((state) => state.clearCart);
  const { addOrder, user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    paymentMethod: 'card',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    setIsSubmitting(true);

    let nextOrderId = 1;
    if (user && user.orders && user.orders.length > 0) {
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
      <motion.div 
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}
        className="max-w-lg mx-auto px-4 py-16 text-center"
      >
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Кошик порожній</h2>
        <button
          onClick={() => navigate('/')}
          className="bg-emerald-600 text-white py-2 px-6 rounded-xl font-semibold hover:bg-emerald-500 transition-all"
        >
          Повернутися до меню
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}
      className="max-w-2xl mx-auto px-4 py-8"
    >
      <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-8">Оформлення замовлення</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Ваші дані</h2>
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

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Телефон
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all dark:text-white"
                  placeholder="+380"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Адреса доставки
                </label>
                <textarea
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none dark:text-white"
                  rows="3"
                  placeholder="Місто, вулиця, будинок, квартира"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-emerald-600 text-white py-3 px-4 rounded-xl font-bold hover:bg-emerald-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
          >
            Підтвердити замовлення
          </button>
        </form>

        <div>
          <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 transition-colors">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Ваше замовлення</h2>
            
            <div className="space-y-3 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <span className="font-mono text-slate-400 dark:text-slate-500">{item.quantity}x</span>
                    <span className="line-clamp-1">{item.name}</span>
                  </div>
                  <span className="font-mono font-medium text-slate-800 dark:text-slate-200 whitespace-nowrap">
                    {item.price * item.quantity} ₴
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-200 dark:border-slate-800 pt-4 space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <div className="flex justify-between">
                <span>Вартість страв</span>
                <span className="font-mono">{cartTotal} ₴</span>
              </div>
              <div className="flex justify-between">
                <span>Доставка</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400">Безкоштовно</span>
              </div>
            </div>

            <div className="border-t border-slate-200 dark:border-slate-800 pt-4 mt-4">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-800 dark:text-white">До сплати</span>
                <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                  {cartTotal} ₴
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Checkout;
