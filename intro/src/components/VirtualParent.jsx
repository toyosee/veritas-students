import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSmile,
  FiCloud,
  FiMoon,
  FiCheckCircle,
  FiHome,
  FiClock,
  FiHeart,
  FiCoffee,
} from "react-icons/fi";

const TendToBaby = ({ situation, actions }) => {
  return (
    <motion.div
      key={situation}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.5 }}
      className="p-5 bg-blue-50 border border-blue-200 rounded-xl shadow-md flex-1"
    >
      <h2 className="text-xl font-semibold mb-3 flex items-center gap-2 text-blue-800">
        <FiHeart className="text-red-500" /> Tending to Baby
      </h2>

      {situation && actions && actions.length > 0 ? (
        <>
          <p className="text-gray-700 mb-2">
            <strong>Situation:</strong> {situation}
          </p>
          <div>
            <p className="text-gray-700 mb-2 font-semibold">
              Suggested Actions:
            </p>
            <ul className="space-y-2">
              <AnimatePresence>
                {actions.map((act, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: idx * 0.1, duration: 0.3 }}
                    className="flex items-center gap-2 bg-white p-3 rounded-lg shadow-sm hover:bg-blue-100 transition"
                  >
                    <FiCheckCircle className="text-green-500" /> {act}
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </div>
        </>
      ) : (
        <p className="text-gray-700 flex items-center gap-2">
          <FiSmile className="text-pink-500" /> Baby is doing just fine. Remember to check on baby every 15 minutes{" "}
          <FiClock className="text-blue-500" />
        </p>
      )}
    </motion.div>
  );
};

const VirtualParent = () => {
  const cryingActions = [
    "Pick up and comfort baby",
    "Sing a lullaby",
    "Offer pacifier",
    "Check diaper for mess",
    "Gently rock baby",
    "Play soothing music",
  ];
  const hungryActions = [
    "Feed baby with breast or bottle",
    "Offer water if older than 6 months",
    "Check for signs of teething or discomfort",
    "Burp baby after feeding",
  ];
  const sleepyActions = [
    "Dim lights and reduce noise",
    "Rock baby gently",
    "Sing lullaby",
    "Place baby in crib safely",
    "Swaddle baby snugly",
  ];
  const timeOfDayActions = [
    "Morning: Plan tummy time or short walk",
    "Afternoon: Play with toys or read a story",
    "Evening: Prepare for bedtime routine",
  ];
  const weatherActions = [
    "Sunny: Apply sunscreen, dress lightly",
    "Rainy: Keep baby dry and indoors",
    "Cloudy: Moderate clothing, suitable for light play",
    "Cold: Dress warmly, consider indoor activities",
    "Hot: Keep hydrated, dress lightly, avoid direct sun",
  ];

  const [situation, setSituation] = useState("");
  const [actions, setActions] = useState([]);

  // === Handlers ===
  const handleCrying = () => {
    setSituation("Crying");
    setActions(cryingActions);
  };

  const handleHungry = () => {
    setSituation("Hungry");
    setActions(hungryActions);
  };

  const handleSleepy = () => {
    setSituation("Sleepy");
    setActions(sleepyActions);
  };

  const handleTimeOfDay = () => {
    const time = ["Morning", "Afternoon", "Evening"][
      Math.floor(Math.random() * 3)
    ];
    setSituation(`Time of Day: ${time}`);
    setActions(timeOfDayActions.filter((act) => act.startsWith(time)));
  };

  const handleWeather = () => {
    const w = ["Sunny", "Rainy", "Cloudy", "Cold", "Hot"][
      Math.floor(Math.random() * 5)
    ];
    setSituation(`Weather: ${w}`);
    setActions(weatherActions.filter((act) => act.startsWith(w)));
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-xl rounded-2xl mt-8">
      <motion.h1
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-center mb-6 flex items-center justify-center gap-2"
      >
        <FiHome className="text-blue-600" /> Welcome to Mama Born Boy
      </motion.h1>

      {/* Flex container for buttons (left) and responses (right) */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Buttons */}
        <div className="flex flex-col gap-4 w-full md:w-1/3">
          {[
            { label: "Baby Crying", icon: <FiHeart />, action: handleCrying, color: "bg-red-500 hover:bg-red-600" },
            { label: "Baby Hungry", icon: <FiCoffee />, action: handleHungry, color: "bg-yellow-400 hover:bg-yellow-500" },
            { label: "Baby Sleepy", icon: <FiMoon />, action: handleSleepy, color: "bg-purple-500 hover:bg-purple-600" },
            { label: "Set Time of Day", icon: <FiClock />, action: handleTimeOfDay, color: "bg-blue-400 hover:bg-blue-500" },
            { label: "Set Weather", icon: <FiCloud />, action: handleWeather, color: "bg-green-500 hover:bg-green-600" },
          ].map((btn, idx) => (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={btn.action}
              className={`${btn.color} text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition`}
            >
              {btn.icon} {btn.label}
            </motion.button>
          ))}
        </div>

        {/* Responses */}
        <AnimatePresence mode="wait">
          <TendToBaby key={situation} situation={situation} actions={actions} />
        </AnimatePresence>
      </div>
    </div>
  );
};

export default VirtualParent;
