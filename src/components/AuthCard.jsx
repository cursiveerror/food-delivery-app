const AuthCard = ({ title, subtitle, children, footer }) => {
  return (
    <section className="max-w-md mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 sm:px-8 pt-8 pb-6 border-b border-slate-100 bg-gradient-to-br from-emerald-50/50 to-white text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-emerald-600 mb-3">
            // auth.init()
          </p>
          <h1 className="text-2xl font-bold text-slate-800">{title}</h1>
          {subtitle && (
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">{subtitle}</p>
          )}
        </div>

        <div className="px-6 sm:px-8 py-8">
          {children}
        </div>

        {footer && (
          <div className="px-6 sm:px-8 py-5 border-t border-slate-100 bg-slate-50/50 text-center text-sm text-slate-500">
            {footer}
          </div>
        )}
      </div>
    </section>
  )
}

export default AuthCard
