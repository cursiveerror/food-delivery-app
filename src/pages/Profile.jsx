import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

const Profile = () => {
  const { user, updateNickname } = useAuth()
  const [nickname, setNickname] = useState(user?.nickname || '')
  const [isEditing, setIsEditing] = useState(false)
  
  useEffect(() => {
    if (user?.nickname) {
      setNickname(user.nickname)
    }
  }, [user?.nickname])

  const orders = user?.orders || []
  const totalSpent = orders.reduce((sum, order) => sum + order.total, 0)

  const handleSaveNickname = () => {
    updateNickname(nickname)
    setIsEditing(false)
  }

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Будь ласка, увійдіть</h2>
        <p className="text-slate-500">Щоб переглянути профіль, потрібно авторизуватись.</p>
      </div>
    )
  }

  return (
    <motion.section 
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}
      className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-14"
    >
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-6 sm:p-8 border-b border-slate-100 bg-gradient-to-br from-emerald-50/50 to-white">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-600 rounded-2xl flex items-center justify-center text-white text-xl sm:text-2xl font-bold font-mono shadow-sm shadow-emerald-600/20">
              {user.name.substring(0, 2).toUpperCase()}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">{user.name}</h1>
              {isEditing ? (
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    className="border border-slate-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 max-w-[150px]"
                    autoFocus
                  />
                  <button
                    onClick={handleSaveNickname}
                    className="text-xs bg-emerald-600 text-white px-3 py-1.5 rounded-md hover:bg-emerald-700 transition-colors font-medium"
                  >
                    Зберегти
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 mt-0.5 group/edit">
                  <p className="text-slate-500 text-sm">@{nickname}</p>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-slate-400 hover:text-emerald-600 opacity-0 group-hover/edit:opacity-100 transition-all duration-200"
                    title="Змінити нікнейм"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-6">
            {[
              { label: 'Замовлень', value: orders.length },
              { label: 'Витрачено', value: `${totalSpent} ₴` },
              { label: 'Статус', value: 'VIP' },
            ].map((stat) => (
              <div key={stat.label} className="px-3 py-3 rounded-xl bg-white border border-slate-200 text-center">
                <p className="font-mono text-sm sm:text-base font-bold text-emerald-600">{stat.value}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Історія замовлень</h2>
          <ul className="space-y-3">
            {orders.map((order) => (
              <li
                key={order.id}
                className="group p-4 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center hover:border-emerald-200 hover:bg-emerald-50/30 transition-all duration-200"
              >
                <div>
                  <p className="font-mono text-sm font-bold text-slate-800">
                    #{order.id}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">{order.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono font-bold text-emerald-600">{order.total} ₴</p>
                  <p className="text-[11px] text-emerald-600/70 mt-0.5">{order.status}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.section>
  )
}

export default Profile
