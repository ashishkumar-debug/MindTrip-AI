import React, { useState } from 'react';
import axios from 'axios';

const DestinationInput = ({ onChange }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length < 3) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await axios.get('https://api.geoapify.com/v1/geocode/autocomplete', {
        params: {
          text: value,
          apiKey: '9935e85da76448eca46052d7a3b29939',
          limit: 5,
        },
      });

      setSuggestions(response.data.features);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleSelect = (place) => {
    const formatted = place.properties.formatted;
    setQuery(formatted);
    setSuggestions([]);

    // ✅ Notify parent
    if (onChange) {
      onChange(formatted);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <label htmlFor="destination" className="block text-lg font-semibold mb-2">
        Select Destination:
      </label>
      <input
        type="text"
        id="destination"
        value={query}
        onChange={handleInputChange}
        placeholder="Enter a city, landmark, or address"
        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {suggestions.length > 0 && (
        <ul className="mt-2 border border-gray-300 rounded-lg shadow-sm bg-white divide-y divide-gray-200">
          {suggestions.map((place) => (
            <li
              key={place.properties.place_id}
              onClick={() => handleSelect(place)}
              className="px-4 py-2 cursor-pointer hover:bg-blue-50"
            >
              {place.properties.formatted}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DestinationInput;