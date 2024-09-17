import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [time, setTime] = useState(60); // Starting from 60 seconds
  const [isOn, setIsOn] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [val, setval] = useState("DASH");
  const [isOpena, setIsOpena] = useState(false);
  const [vala, setvala] = useState("INR");
  const [prices, setPrices] = useState([]);


  const collectiondata = async () => {
    try {
      const response = await axios.get("http://localhost:5000/dbroutes/getdata");
      setPrices(response.data);
      console.log(response.data);
      console.log("price", prices)
    } catch (err) {
      console.error("Error in fetching data", err);
    };
  }

  useEffect(() => {
    collectiondata();
  }, [1])


  useEffect(() => {
    // Check if time is greater than 0 to continue counting down
    if (time > 0) {
      const timer = setTimeout(() => setTime(time - 1), 1000); 
      return () => clearTimeout(timer); 
    } else {
      setTimeout(() => setTime(60), 1000); 
    }
  }, [time]);

  // Function to simulate data updates
  useEffect(() => {
    const interval = setInterval(() => {
    }, 60000); 
    return () => clearInterval(interval);
  }, []);

  const toggleSwitch = () => {
    setIsOn(!isOn);
  };

  // Array of dropdown options 
  const options = ['BTC', 'ETH', 'USDT', 'XRP', 'TRX', 'DASH', 'ZEC', 'XEM', 'IOST', 'WIN', 'BTT', 'WRX'];

  // Function to toggle the dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const setvalue = (e) => {
    setval(e);
    setIsOpen(false);
  }

  // Array of dropdown options 
  const optionsa = ['INR'];

  // Function to toggle the dropdown
  const toggleDropdowna = () => {
    setIsOpena(!isOpen);
  };

  const setvaluea = (e) => {
    setvala(e);
    setIsOpena(false);
  }

  return (
    <>

      <header className={`py-4 flex flex-col items-center justify-around bg-gray-900 w-full bg-cover text-white sm:flex sm:flex-row ${isOn ? "bg-gray-900" : "bg-white"
        } `}>
        <div >
          <h1 className="text-4xl font-bold text-center text-teal-300">HODLINFO</h1>
        </div>
        <div className=" flex justify-around w-60 m-3 ">
          <div className="relative inline-block text-left ">
            <div>
              <button
                onClick={toggleDropdowna}
                type="button"
                className={`inline-flex justify-center w-full rounded-xl border border-gray-800 shadow-sm px-4 py-2 bg-slate-800 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-gray-300 ${isOn ? "bg-slate-700" : "bg-gray-100  text-gray-950 border-none"
                  }`}
              >
                {vala}
                <svg
                  className="-mr-1 ml-2 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.707a1 1 0 011.414 0L10 11.414l3.293-3.707a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            {/* Dropdown menu */}
            {isOpena && (
              <div className={`origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 `}>
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="dropdownButton">
                  {/* Map through the options array to render dropdown items */}
                  {optionsa.map((option, index) => (
                    <a
                      key={index}
                      href="#"
                      className="block px-4 py-2 text-sm text-black hover:bg-gray-100"
                      role="menuitem"
                      onClick={() => setvaluea(option)}
                    >
                      {option}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className=" mx-2 relative inline-block text-left">
            <div>
              <button
                onClick={toggleDropdown}
                type="button"
                className={`inline-flex justify-center w-full rounded-xl border border-gray-800 shadow-sm px-4 py-2 bg-slate-800 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-gray-300 ${isOn ? "bg-slate-700" : "bg-gray-100  text-gray-950 border-none"
                  }`}
              >
                {val}
                <svg
                  className="-mr-1 ml-2 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.707a1 1 0 011.414 0L10 11.414l3.293-3.707a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            {/* Dropdown menu */}
            {isOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="dropdownButton">
                  {/* Map through the options array to render dropdown items */}
                  {options.map((option, index) => (
                    <a
                      key={index}
                      href="#"
                      className="block px-4 py-2 text-sm text-black hover:bg-gray-100"
                      role="menuitem"
                      onClick={() => setvalue(option)}
                    >
                      {option}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
          {/* cmt */}

          <button className={`inline-flex justify-center w-full rounded-xl border border-gray-800 shadow-sm px-4 py-2 bg-slate-800 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-gray-300 ${isOn ? "bg-slate-700" : "bg-gray-100  text-gray-950 border-none"
            }`}>BUYBTC</button>
        </div>


        <div className="flex justify-around w-88 items-center ">

          <div className="m-2">
            {/* Circular background to mimic a clock */}
            <div className="w-10 h-10 rounded-full border-4 border-teal-500 flex justify-center items-center">
              {/* Display the countdown number */}
              <span className="text-teal-300 text-sm font-bold">{time}</span>
            </div>
          </div>

          <button className="bg-teal-500 text-white font-medium rounded-lg flex justify-center w-48">
            {/* Optional: You can use an icon here */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8 m-1 flex items-center "
            >
              <path d="M12 2C6.477 2 2 6.477 2 12c0 5.522 4.477 10 10 10s10-4.478 10-10C22 6.477 17.523 2 12 2zm4.575 7.264l-1.653 7.788c-.125.57-.48.71-.973.442l-2.695-1.986-1.299 1.25c-.144.144-.263.263-.537.263l.192-2.713 4.949-4.46c.216-.192-.048-.298-.337-.106l-6.1 3.848-2.632-.82c-.57-.18-.58-.57.12-.844l10.297-3.957c.48-.18.894.107.73.847z" />
            </svg>
            <div className="font-bold w-40 h-10 flex items-center">Connect Telegram</div>
          </button>

          <div
            onClick={toggleSwitch}
            className={`w-14 h-8 m-2 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ease-in-out ${isOn ? "bg-gray-700" : "bg-slate-100"
              }`}
          >
            {/* Toggle circle */}
            <div
              className={`w-6 h-6 bg-teal-300 rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${isOn ? "translate-x-6" : "bg-gray-700"
                }`}
            />
          </div>

        </div>

      </header>
      <div className={`min-h-screen bg-gray-900 bg-cover text-white flex flex-col items-center ${isOn ? "bg-gray-900" : "bg-white"
        }`}>


        {/* Current Price Section */}
        <p className="text-lg text-gray-400">Best Price to Trade</p>
        <div className="my-4 w-2/3 flex justify-around items-center">
          {/* <div className="flex justify-around space-x-4 mt-2 text-sm text-gray-400"> */}
          <div className="flex flex-col">
            <span className="text-teal-300 text-2xl text-center font-bold">+0.1%</span>
            <span> 5 Mins</span>
          </div>
          <div className="flex flex-col">
            <span className="text-teal-300 text-2xl text-center font-bold">+0.96%</span>
            <span> 1 Hour</span>
          </div>
          <div>
            <h2 className={`text-5xl font-bold mx-4 ${isOn ? "text-white" : "text-gray-700"
              }`}>₹26,56,110</h2>
          </div>
          <div className="flex flex-col">
            <span className="text-teal-300 text-2xl text-center font-bold">+2.73% </span>
            <span> 1 Day</span>
          </div>
          <div className="flex flex-col">
            <span className="text-teal-300 text-2xl text-center font-bold">+7.51%</span>
            <span> 7 Days</span>
          </div>
        </div>
        <p className="text-lg text-gray-400">Average BTC/INR net price including commission</p>

        {/* Table */}
        <div className={`w-5/6 bg-gray-900 shadow-md ${isOn ? "bg-gray-700" : "bg-slate-100"
          }`}>
          <table className="w-full border-separate border-spacing-y-2">
            <thead>
              <tr className="bg-gray-900">
                <th className="p-4 text-center font-bold text-gray-400">#</th>
                <th className="p-4 text-center font-bold text-gray-400">Name</th>
                <th className="p-4 text-center font-bold text-gray-400">Last </th>
                <th className="p-4 text-center font-bold text-gray-400">Buy </th>
                <th className="p-4 text-center font-bold text-gray-400">Sell</th>
                <th className="p-4 text-center font-bold text-gray-400">Volume</th>
                <th className="p-4 text-center font-bold text-gray-400">Base_Unit</th>
              </tr>
            </thead>
            <tbody>
              {prices.map((price, index) => (
                <tr
                  key={price.platform}
                  className=" border-2  bg-gray-800  border-gray-600 hover:bg-gray-700"
                >
                  <td className="p-4 rounded-l-lg text-center font-bold">{index + 1}</td>
                  <td className="p-4 text-center font-bold">{price.name}</td>
                  <td className="p-4 text-center font-bold">{price.last}</td>
                  <td className="p-4 text-center font-bold">
                    {price.buy}
                  </td>
                  <td className={`p-4 text-center font-bold`}>
                    {price.sell}
                  </td>
                  <td className={`p-4 text-center font-bold`}>
                    {price.volume}
                  </td>
                  <td className={`p-4 rounded-r-lg text-center font-bold `}>
                    {price.base_unit}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <footer className="mt-8">
          <button className="bg-gray-900 border-2  border-teal-300 text-teal-300 py-2 px-4 rounded mb-8">
            Add hodlinfo to home screen
          </button>
        </footer>
      </div>
    </>
  );
};

export default App;

