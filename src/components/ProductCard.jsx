const ProductCard = ({ dish, onAddToCart }) => {
  return (
    <article className="group bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col transition-all duration-300 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-600/5 hover:-translate-y-1">
      <div className="relative overflow-hidden">
        <img
          src={dish.imageURL}
          alt={dish.name}
          className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm text-slate-700 border border-slate-200/80">
          {dish.category}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start gap-3 mb-2">
          <h3 className="text-base font-semibold text-slate-800 leading-snug group-hover:text-emerald-700 transition-colors">
            {dish.name}
          </h3>
          <span className="shrink-0 font-mono text-sm font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
            {dish.price} ₴
          </span>
        </div>

        <p className="text-sm text-slate-500 leading-relaxed mb-5 line-clamp-2 flex-1">
          {dish.description}
        </p>

        <button
          type="button"
          onClick={() => onAddToCart?.(dish)}
          className="w-full bg-emerald-600 text-white py-2.5 px-4 rounded-xl text-sm font-semibold hover:bg-emerald-500 active:scale-[0.98] transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-emerald-600/20"
        >
          Додати в кошик
        </button>
      </div>
    </article>
  )
}

export default ProductCard
