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
    const savedUser = localStorage.getItem('ctrl_eat_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('ctrl_eat_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('ctrl_eat_user');
    }
  }, [user]);

  const login = (email, password) => {
    // Mock login logic
    if (email && password.length >= 6) {
      setUser({
        name: 'John Doe',
        email,
        nickname: 'johndoe',
        orders: [
          { id: '1024', date: '12 Травня 2026', total: 450, status: 'Доставлено' },
          { id: '0988', date: '03 Травня 2026', total: 820, status: 'Доставлено' },
          { id: '0852', date: '15 Квітня 2026', total: 360, status: 'Доставлено' },
        ],
      });
      return { success: true };
    }
    return { success: false, error: 'Invalid email or password' };
  };

  const register = (name, email, password) => {
    // Mock register logic
    if (name && email && password.length >= 6) {
      setUser({
        name,
        email,
        nickname: name.toLowerCase().replace(/\s+/g, '_'),
        orders: [],
      });
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
