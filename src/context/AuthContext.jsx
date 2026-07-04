import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = sessionStorage.getItem('ctrl_eat_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      sessionStorage.setItem('ctrl_eat_user', JSON.stringify(user));
    } else {
      sessionStorage.removeItem('ctrl_eat_user');
    }
  }, [user]);

  const login = (email, password) => {
    if (email && password.length >= 6) {
      // Перевіряємо чи є такий користувач в "базі" (localStorage)
      const users = JSON.parse(localStorage.getItem('ctrl_eat_users') || '[]');
      const existingUser = users.find(u => u.email === email && u.password === password);

      if (existingUser) {
        setUser(existingUser);
        return { success: true };
      }

      // Якщо користувача немає, але це тестовий вхід - генеруємо ім'я з email
      const generatedName = email.split('@')[0];
      const capitalizedName = generatedName.charAt(0).toUpperCase() + generatedName.slice(1);
      
      setUser({
        name: capitalizedName,
        email,
        nickname: generatedName.toLowerCase(),
        orders: [
          { id: '1024', date: '12 Травня 2026', total: 450, status: 'Доставлено' },
          { id: '0988', date: '03 Травня 2026', total: 820, status: 'Доставлено' },
        ],
      });
      return { success: true };
    }
    return { success: false, error: 'Invalid email or password' };
  };

  const register = (name, email, password) => {
    if (name && email && password.length >= 6) {
      const newUser = {
        name,
        email,
        password, // Зберігаємо тільки для локальної імітації
        nickname: name.toLowerCase().replace(/\s+/g, '_'),
        orders: [],
      };
      
      // Зберігаємо в нашу локальну "базу"
      const users = JSON.parse(localStorage.getItem('ctrl_eat_users') || '[]');
      users.push(newUser);
      localStorage.setItem('ctrl_eat_users', JSON.stringify(users));

      setUser(newUser);
      return { success: true };
    }
    return { success: false, error: 'Invalid registration data' };
  };

  const logout = () => {
    setUser(null);
  };

  const updateNickname = (newNickname) => {
    if (user && newNickname) {
      setUser((prevUser) => ({
        ...prevUser,
        nickname: newNickname,
      }));
      return { success: true };
    }
    return { success: false, error: 'User not logged in or invalid nickname' };
  };

  const addOrder = (order) => {
    if (user) {
      setUser((prevUser) => ({
        ...prevUser,
        orders: [order, ...(prevUser.orders || [])],
      }));
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    updateNickname,
    addOrder,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
