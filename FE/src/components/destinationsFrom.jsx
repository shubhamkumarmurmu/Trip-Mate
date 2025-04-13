import React, { useCallback, useState, useRef, useEffect } from "react";
import { Plus } from "lucide-react";
import axios from "axios";

const popularDestinations = [
  {
    id: "1",
    name: "Paris, France",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: "2",
    name: "Tokyo, Japan",
    image:
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: "3",
    name: "New York, USA",
    image:
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: "4",
    name: "Rome, Italy",
    image:
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: "5",
    name: "Bali, Indonesia",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: "6",
    name: "Barcelona, Spain",
    image:
      "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&q=80&w=1000",
  },
];



const DestinationsForm = ({ newDestination, setNewDestination }) => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const timeoutIdRef = useRef(null);


  const handleInputChange = useCallback((e) => {
    const value = e.target.value;
    setInput(value);

    if (value.length > 2) {
      console.log(value.length)
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }

      timeoutIdRef.current = setTimeout(() => {
        axios
          .get(`http://10.1.8.45:3000/discover/autocomplete?value=${value}`)
          .then((response) => {
            setSuggestions(response.data.values);
          })
          .catch((error) => {
            console.error("Error fetching suggestions:", error);
          });
      }, 1000);
    } else {
      setSuggestions([]);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, []);

  const handleSelect = useCallback((item) => {

    setInput(item);
    setSuggestions([]);
    setNewDestination(item)
    
  
  }, []);

  const handle =(e)=>{
    setInput(e.target.value);
    setNewDestination(e.target.value)
    setTimeout(handleInputChange(e), 2000);
  } 

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-semibold mb-6">Choose Your Destinations</h2>
      <p className="text-gray-600 mb-8">
        Select places you want to visit during your trip
      </p>

      <div className="mb-8">
        <div className="flex gap-2">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Add a destination (e.g. London, UK)"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={input}
              onChange={handle}
            />

            {suggestions.length > 0 && (
              <ul className="absolute left-0 right-0 z-10 bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-y-auto shadow-lg">
                {suggestions.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => handleSelect(item)}
                    className="p-3 hover:bg-blue-100 cursor-pointer"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add
          </button> */}
        </div>
      </div>

      <h3 className="text-lg font-semibold mb-4">Popular Destinations</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {popularDestinations.map((destination) => (
          <div
            key={destination.id}
            className="relative rounded-lg overflow-hidden group cursor-pointer"
          >
            <img
              src={destination.image}
              alt={destination.name}
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
              <span className="text-white font-medium">{destination.name}</span>
            </div>
            <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>

      {/* <div className="flex justify-between">
        <button
          className="px-6 py-3 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          onClick={onBack}
        >
          Back
        </button>
        <button
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          onClick={onContinue}
        >
          Continue
        </button>
      </div> */}
    </div>
  );
};
export default DestinationsForm;
