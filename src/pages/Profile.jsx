import React from 'react';

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <div className="flex items-center space-x-4 mb-8 pb-6 border-b border-gray-200">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-3xl font-bold">
            FE
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Foodie Explorer</h1>
            <p className="text-gray-500">Профіль користувача</p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Історія замовлень</h2>
          <ul className="space-y-4">
            <li className="p-4 rounded-lg bg-gray-50 border border-gray-100 flex justify-between items-center">
              <div>
                <p className="font-bold text-gray-800">Замовлення #1024</p>
                <p className="text-sm text-gray-500">12 Травня 2026</p>
              </div>
              <span className="text-green-600 font-bold">450 ₴</span>
            </li>
            <li className="p-4 rounded-lg bg-gray-50 border border-gray-100 flex justify-between items-center">
              <div>
                <p className="font-bold text-gray-800">Замовлення #0988</p>
                <p className="text-sm text-gray-500">03 Травня 2026</p>
              </div>
              <span className="text-green-600 font-bold">820 ₴</span>
            </li>
            <li className="p-4 rounded-lg bg-gray-50 border border-gray-100 flex justify-between items-center">
              <div>
                <p className="font-bold text-gray-800">Замовлення #0852</p>
                <p className="text-sm text-gray-500">15 Квітня 2026</p>
              </div>
              <span className="text-green-600 font-bold">360 ₴</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
