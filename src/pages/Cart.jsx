import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <motion.section 
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}
        className="max-w-lg mx-auto px-4 sm:px-6 py-16 sm:py-24"
      >
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
      </motion.section>
    );
  }

  return (
    <motion.section 
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}
      className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12"
    >
      <div className="flex justify-between items-end mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Мій кошик</h1>
        <button
          onClick={clearCart}
          className="text-sm font-medium text-slate-500 hover:text-red-500 transition-colors"
        >
          Очистити кошик
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">
        <ul className="divide-y divide-slate-100">
          {cartItems.map((item) => (
            <li key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <div className="w-full sm:w-24 h-24 bg-slate-50 rounded-xl overflow-hidden flex-shrink-0">
                {item.imageURL ? (
                  <img src={item.imageURL} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-emerald-100 flex items-center justify-center">
                    <span className="text-emerald-500 text-2xl">🍔</span>
                  </div>
                )}
              </div>
              
              <div className="flex-grow">
                <h3 className="text-lg font-bold text-slate-800 mb-1">{item.name}</h3>
                <p className="text-emerald-600 font-semibold">{item.price} ₴</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center bg-slate-50 rounded-lg p-1 border border-slate-200">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="w-8 h-8 flex items-center justify-center rounded-md text-slate-500 hover:bg-white hover:shadow-sm disabled:opacity-50 transition-all"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-medium text-slate-700">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center rounded-md text-slate-500 hover:bg-white hover:shadow-sm transition-all"
                  >
                    +
                  </button>
                </div>
                
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-6">
        <div>
          <p className="text-slate-500 mb-1">Загальна сума</p>
          <p className="text-3xl font-bold text-slate-800">{cartTotal} ₴</p>
        </div>
        
        <Link
          to="/checkout"
          className="w-full sm:w-auto bg-emerald-600 text-white py-3 px-8 rounded-xl font-semibold hover:bg-emerald-500 active:scale-[0.98] transition-all shadow-sm text-center"
        >
          Оформити замовлення
        </Link>
      </div>
    </motion.section>
  );
};

export default Cart;
