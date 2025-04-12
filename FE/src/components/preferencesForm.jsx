import React from 'react'

const PreferencesForm = () => {
    return (
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-6">Set Your Travel Preferences</h2>
          <p className="text-gray-600 mb-8">Help us tailor your itinerary to match your travel style</p>
    
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-4">Daily Budget (USD per person)</h3>
              <input
                type="range"
                min="50"
                max="1000"
                step="50"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>$50</span>
                <span>$500</span>
                <span>$1000+</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">Estimate how much you want to spend per day</p>
            </div>
    
            <div>
              <h3 className="text-lg font-medium mb-4">Travel Style</h3>
              <div className="space-y-3">
                {[
                  'Relaxed - Plenty of downtime, leisurely pace',
                  'Balanced - Mix of activities and free time',
                  'Active - Packed schedule, maximum experiences'
                ].map((style) => (
                  <label key={style} className="flex items-center">
                    <input
                      type="radio"
                      name="travelStyle"
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-3">{style}</span>
                  </label>
                ))}
              </div>
            </div>
    
            <div>
              <h3 className="text-lg font-medium mb-4">Preferred Accommodation</h3>
              <div className="space-y-3">
                {[
                  'Budget (Hostels, Guesthouses)',
                  'Mid-range (3-4 Star Hotels)',
                  'Luxury (4-5 Star Hotels, Resorts)'
                ].map((accommodation) => (
                  <label key={accommodation} className="flex items-center">
                    <input
                      type="radio"
                      name="accommodation"
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-3">{accommodation}</span>
                  </label>
                ))}
              </div>
            </div>
    
            <div>
              <h3 className="text-lg font-medium mb-4">Interests</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  'Culture & History',
                  'Nature & Outdoors',
                  'Food & Cuisine',
                  'Adventure & Sports',
                  'Shopping',
                  'Nightlife',
                  'Relaxation & Wellness',
                  'Photography'
                ].map((interest) => (
                  <label key={interest} className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-3">{interest}</span>
                  </label>
                ))}
              </div>
            </div>
    
            <div>
              <h3 className="text-lg font-medium mb-4">Meal Preferences</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  'Vegetarian',
                  'Vegan',
                  'Gluten-Free',
                  'Dairy-Free',
                  'Halal',
                  'Kosher'
                ].map((preference) => (
                  <label key={preference} className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-3">{preference}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-8">
          </div>
        </div>
      );
}

export default PreferencesForm