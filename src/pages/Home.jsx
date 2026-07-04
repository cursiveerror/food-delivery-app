import { useMemo, useState } from 'react'
import ProductCard from '../components/ProductCard'
import restaurants from '../data/restaurants.json'
import { useCart } from '../context/CartContext'

const Home = () => {
  const [activeCategory, setActiveCategory] = useState('Усі')

  const categories = useMemo(
    () => ['Усі', ...new Set(restaurants.map((dish) => dish.category))],
    []
  )

  const filteredDishes = useMemo(
    () =>
      activeCategory === 'Усі'
        ? restaurants
        : restaurants.filter((dish) => dish.category === activeCategory),
    [activeCategory]
  )

  const { addToCart } = useCart()

  const handleAddToCart = (dish) => {
    addToCart(dish)
  }

  return (
    <>
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
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Меню</h2>
            <p className="text-slate-500 text-sm mt-1">
              {filteredDishes.length} {filteredDishes.length === 1 ? 'страва' : 'страв'} доступно
            </p>
          </div>

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
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDishes.map((dish) => (
            <ProductCard key={dish.id} dish={dish} onAddToCart={handleAddToCart} />
          ))}
        </div>
      </section>
    </>
  )
}

export default Home
