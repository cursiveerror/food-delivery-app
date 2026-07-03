import React, { useState, useMemo } from 'react';

const SearchFilter = ({ items = [] }) => {
  // 1. Створи стан searchTerm
  const [searchTerm, setSearchTerm] = useState('');
  
  // Стан для вибраної категорії
  const [selectedCategory, setSelectedCategory] = useState('All');

  // 1. Отримай унікальні категорії через Set
  const categories = ['All', ...new Set(items.map((item) => item.category))];

  // 2. Використовуй .filter() для масиву ресторанів (страв)
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // 3. Переводь все в .toLowerCase(), щоб пошук не залежав від регістру
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [items, searchTerm, selectedCategory]);

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">Меню</h2>
        
        {/* Поле вводу для пошуку */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Пошук страв..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border-2 border-green-200 rounded-lg focus:outline-none focus:border-green-500 transition-colors"
          />
        </div>

        {/* 2. Створи кнопки категорій динамічно */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              // 3. При кліку оновлюй стан selectedCategory
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-green-600 text-white shadow-md'
                  : 'bg-green-50 text-green-700 hover:bg-green-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Відфільтровані результати */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm border border-green-100 overflow-hidden hover:shadow-md transition-shadow">
              <img src={item.imageURL} alt={item.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                  <span className="text-green-600 font-bold">{item.price} ₴</span>
                </div>
                <p className="text-sm text-gray-500 mb-3">{item.category}</p>
                <p className="text-gray-600 text-sm line-clamp-2">{item.description}</p>
              </div>
            </div>
          ))}
          {filteredItems.length === 0 && (
            <div className="col-span-full text-center text-gray-500 py-10">
              Нічого не знайдено за вашим запитом.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
