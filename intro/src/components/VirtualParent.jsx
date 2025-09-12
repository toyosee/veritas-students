import React, { useState } from 'react';

const TendToBaby = ({ situation, actions }) => {
  return (
    <div className="p-4 mt-4 bg-blue-50 border border-blue-200 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-3">Tending to Baby 👶</h2>

      {situation && actions && actions.length > 0 ? (
        <>
          <p className="text-gray-700 mb-2"><strong>Situation:</strong> {situation}</p>
          <div>
            <p className="text-gray-700 mb-2 font-semibold">Suggested Actions:</p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {actions.map((act, idx) => (
                <li key={idx} className="bg-white p-2 rounded shadow-sm">{act}</li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <p className="text-gray-700">Baby is doing just fine. Remember to check on baby every 15 minutes ⏰.</p>
      )}
    </div>
  );
};

const VirtualParent = () => {
  const cryingActions = [
    'Pick up and comfort baby 🤱',
    'Sing a lullaby 🎵',
    'Offer pacifier 🍼',
    'Check diaper for mess 💩',
    'Gently rock baby 🤗',
    'Play soothing music 🎶'
  ];
  const hungryActions = [
    'Feed baby with breast or bottle 🍼',
    'Offer water if older than 6 months 💧',
    'Check for signs of teething or discomfort 😬',
    'Burp baby after feeding 🐣'
  ];
  const sleepyActions = [
    'Dim lights and reduce noise 🌙',
    'Rock baby gently 🤱',
    'Sing lullaby 🎵',
    'Place baby in crib safely 🛏️',
    'Swaddle baby snugly 🧣'
  ];
  const timeOfDayActions = [
    'Morning: Plan tummy time or short walk 🌅',
    'Afternoon: Play with toys or read a story 📚',
    'Evening: Prepare for bedtime routine 🌙'
  ];
  const weatherActions = [
    'Sunny: Apply sunscreen, dress lightly ☀️',
    'Rainy: Keep baby dry and indoors 🌧️',
    'Cloudy: Moderate clothing, suitable for light play ☁️',
    'Cold: Dress warmly, consider indoor activities 🧤',
    'Hot: Keep hydrated, dress lightly, avoid direct sun 🥵'
  ];

  const [situation, setSituation] = useState('');
  const [actions, setActions] = useState([]);

  // === Handlers for each situation ===
  const handleCrying = () => {
    setSituation('Crying 😢');
    setActions(cryingActions);
  };

  const handleHungry = () => {
    setSituation('Hungry 🍽️');
    setActions(hungryActions);
  };

  const handleSleepy = () => {
    setSituation('Sleepy 😴');
    setActions(sleepyActions);
  };

  const handleTimeOfDay = () => {
    const time = ['Morning 🌅', 'Afternoon ☀️', 'Evening 🌙'][Math.floor(Math.random() * 3)];
    setSituation(`Time of Day: ${time}`);
    setActions(timeOfDayActions.filter(act => act.startsWith(time.split(' ')[0])));
  };

  const handleWeather = () => {
    const w = ['Sunny ☀️', 'Rainy 🌧️', 'Cloudy ☁️', 'Cold 🥶', 'Hot 🥵'][Math.floor(Math.random() * 5)];
    setSituation(`Weather: ${w}`);
    setActions(weatherActions.filter(act => act.startsWith(w.split(' ')[0])));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      <h1 className="text-2xl font-bold text-center mb-6">Welcome to Mama Born Boy 👶</h1>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <button onClick={handleCrying} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition">
          Baby Crying 😢
        </button>
        <button onClick={handleHungry} className="bg-yellow-400 text-white py-2 px-4 rounded hover:bg-yellow-500 transition">
          Baby Hungry 🍽️
        </button>
        <button onClick={handleSleepy} className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 transition">
          Baby Sleepy 😴
        </button>
        <button onClick={handleTimeOfDay} className="bg-blue-400 text-white py-2 px-4 rounded hover:bg-blue-500 transition">
          Set Time of Day ⏰
        </button>
        <button onClick={handleWeather} className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition">
          Set Weather 🌤️
        </button>
      </div>

      <TendToBaby situation={situation} actions={actions} />
    </div>
  );
};

export default VirtualParent;
