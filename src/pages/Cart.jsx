import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useCartStore from '../store/useCartStore';

const Cart = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  const cartTotal = useCartStore((state) => state.getCartTotal());
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  if (cartItems.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}
        className="max-w-lg mx-auto px-4 py-20 text-center"
      >
        <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-slate-400 dark:text-slate-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">Кошик порожній</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-8">Схоже, ви ще нічого не додали до кошика.</p>
        <Link
          to="/"
          className="inline-flex items-center justify-center bg-emerald-600 text-white py-3 px-8 rounded-xl font-semibold hover:bg-emerald-500 transition-colors"
        >
          Перейти до меню
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto px-4 py-8 sm:py-12"
    >
      <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-8">Ваше замовлення</h1>
      
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <div className="w-full lg:w-2/3 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex gap-4 sm:gap-6 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
              <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden flex-shrink-0">
                {item.imageURL && <img src={item.imageURL} alt={item.name} className="w-full h-full object-cover" />}
              </div>
              
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="font-bold text-slate-800 dark:text-white text-lg">{item.name}</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{item.description}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-1.5 text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </button>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-1">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-white dark:hover:bg-slate-700 rounded-md transition-colors"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-mono font-medium text-slate-700 dark:text-slate-300">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-white dark:hover:bg-slate-700 rounded-md transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="font-mono font-bold text-slate-800 dark:text-white text-lg">{item.price * item.quantity} ₴</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full lg:w-1/3 sticky top-24">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Підсумок</h2>
            
            <div className="space-y-4 mb-6 text-slate-600 dark:text-slate-400">
              <div className="flex justify-between">
                <span>Вартість страв</span>
                <span className="font-mono">{cartTotal} ₴</span>
              </div>
              <div className="flex justify-between">
                <span>Доставка</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400 font-medium">Безкоштовно</span>
              </div>
            </div>

            <div className="border-t border-slate-200 dark:border-slate-800 pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-800 dark:text-white">До сплати</span>
                <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 font-mono">{cartTotal} ₴</span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="block w-full text-center bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              Оформити замовлення
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Cart;
