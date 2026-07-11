import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import ProductCard from '../components/ProductCard'
import restaurants from '../data/restaurants.json'
import { useCart } from '../context/CartContext'

const Home = () => {
  const [activeCategory, setActiveCategory] = useState('Усі')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOrder, setSortOrder] = useState('default')

  const categories = useMemo(
    () => ['Усі', ...new Set(restaurants.map((dish) => dish.category))],
    []
  )

  const filteredDishes = useMemo(
    () => {
      let filtered = restaurants
      if (activeCategory !== 'Усі') {
        filtered = filtered.filter((dish) => dish.category === activeCategory)
      }
      if (searchTerm.trim() !== '') {
        filtered = filtered.filter((dish) => 
          dish.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          dish.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
      }
      
      if (sortOrder === 'price-asc') {
        filtered = [...filtered].sort((a, b) => a.price - b.price)
      } else if (sortOrder === 'price-desc') {
        filtered = [...filtered].sort((a, b) => b.price - a.price)
      }
      
      return filtered
    },
    [activeCategory, searchTerm, sortOrder]
  )

  const { addToCart } = useCart()

  const handleAddToCart = (dish) => {
    addToCart(dish)
    toast.success(`Страву "${dish.name}" додано в кошик!`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 relative">
          <p className="font-mono text-xs uppercase tracking-widest text-emerald-600 mb-4">
            // food_delivery.init()
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-800 tracking-tight mb-4 max-w-xl">
            Смачна їжа —{' '}
            <span className="text-emerald-600">один клік</span> від вас
          </h1>
          <p className="text-slate-500 text-lg max-w-lg leading-relaxed mb-8">
            Оберіть з {restaurants.length} страв і замовте доставку прямо зараз.
            Швидко, зручно, без зайвого шуму.
          </p>

          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Страв', value: restaurants.length },
              { label: 'Категорій', value: categories.length - 1 },
              { label: 'Доставка', value: '~30 хв' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 min-w-[100px]"
              >
                <p className="font-mono text-xl font-bold text-emerald-600">{stat.value}</p>
                <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <div className="flex flex-col mb-8 gap-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Меню</h2>
              <p className="text-slate-500 text-sm mt-1">
                {filteredDishes.length} {filteredDishes.length === 1 ? 'страва' : 'страв'} доступно
              </p>
            </div>

            <div className="flex-1 max-w-md w-full sm:ml-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Пошук страв..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 pl-10 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
                />
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                    activeCategory === category
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-300 hover:text-emerald-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="px-4 py-1.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
            >
              <option value="default">Сортування: За замовчуванням</option>
              <option value="price-asc">Сортування: Від дешевих до дорогих</option>
              <option value="price-desc">Сортування: Від дорогих до дешевих</option>
            </select>
          </div>
        </div>

        {filteredDishes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDishes.map((dish) => (
              <ProductCard key={dish.id} dish={dish} onAddToCart={handleAddToCart} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-slate-200 border-dashed">
            <p className="text-slate-500">За вашим запитом нічого не знайдено.</p>
            <button 
              onClick={() => {setSearchTerm(''); setActiveCategory('Усі'); setSortOrder('default');}}
              className="mt-4 text-emerald-600 font-medium hover:text-emerald-700 transition-colors"
            >
              Скинути фільтри
            </button>
          </div>
        )}
      </section>
    </motion.div>
  )
}

export default Home
